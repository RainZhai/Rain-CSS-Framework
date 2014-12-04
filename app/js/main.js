require.config({
	urlArgs: 'v=' + new Date().getTime(),
	"baseUrl": "./js/",
	paths: {
		jquery: 'lib/jquery-1.7.2',
		html: 'lib/freehtml',
		template: 'lib/template',
		util: 'lib/util',
		swipe: 'lib/swipe',
		head: 'app/view/head',
		foot: 'app/view/foot',
		nav: 'app/view/nav',
		gamelist: 'app/data/gamelist',
		common: 'app/data/common',
		searchhead: 'app/view/searchHead',
		searchmain: 'app/view/searchMain',
		list: 'app/view/list',
		cate: 'app/view/category',
		catedata: 'app/data/category',
		topic: 'app/view/topic',
		topicdetail: 'app/view/topicdetail',
		topicdata: 'app/data/topic',
		json: 'app/service/json'
	},
	shim: {
		'util': {
			deps: ['jquery'],
			exports: 'util'
		},
		'swipe': {
			deps: ['jquery'],
			exports: 'swipe'
		}
	},
	priority: ['jquery']
});
require(['jquery', 'html', 'template', 'util', 'swipe', 'head', 'nav', 'foot'], function($, _html, t, util, swipe, head, nav, foot) {
	var html = _html.htmlObj;
	var headhtml;
	var navhtml;
	var foothtml;
	var gamelist;
	var slide;
	//创建loading弹出框
	var loading =new util.loading({loadingClass:'bglgrey'});
	var tip = new util.loading({loadingClass:'bgw',icon:false});

	var main = new html('#body');

	util.addRoute('/', '', function() {
		main.remove();
		main.add(headhtml).add(slide).add(navhtml).add(gamelist).add(foothtml);
	});
	//nav3路由
	util.addRoute('/nav3', '#main', function() {
		main.remove('#main');
		require(['cate', 'catedata'], function(c, d) {
			var list = c(d); 
			main.add(list);
		});
	});
	//nav3路由
	util.addRoute('/nav4', '#main', function() {
		main.remove();
		require(['topic'], function(t) {
			loading.setContent('正在加载...').show();
			$.get("js/app/data/topic.php", function(d){
				if(d.list.length>0){
					var list = t(d); 
					main.add(headhtml).add(slide).add(navhtml).add(list).add(foothtml); 
				}else{
					tip.setContent("没有记录").show(1000);
				}
				loading.hide();
			});
		});
	});
	//分类路由
	util.addRoute('/cate1', '#cate1', function() { 
		log(url);
		main.remove();
		require(['list'], function(l) {
			loading.show();
			$.get("js/app/data/searchcate.php?c=1", function(d){
				loading.hide(); 
				smainhtml = l(d);
				main.add(headhtml).add(smainhtml);
			});
		});
	});
	//主题路由
	util.addRoute('/topic1', '#topic1', function() { 
		main.remove();
		require(['topicdetail'], function(l) {
			loading.show();
			$.get("js/app/data/searchtopic.php?c=1", function(d){
				loading.hide(); 
				smainhtml = l(d);
				main.add(headhtml).add(smainhtml);
			});
		});
	});

	/*搜索模块路由*/
	util.addRoute('/search', '#body', function() {
		main.remove();
		require(['jquery', 'searchhead', 'searchmain','list'], function($, h, m,l) {
			var sheadhtml = h({});
			var smainhtml; 
			var searchtips = main.find("#searchtips");
			main.add(sheadhtml);
			//搜索控制
			main.find("#searchbox").on("keyup", function() {
				var me = $(this);
				if (me.val()) {
					main.find("#clearbtn").show();
				} else {
					main.find("#clearbtn").hide();
				}
			});
			main.find("#searchbtn").on("click", function() {
				//debugger;
				if(main.find("#searchbox").val()){
					var param = util.filter(main.find("#searchbox").val());
					loading.show();
					$.get("js/app/data/searchresult.php?p="+param, function(d){
						main.remove("#main");
						loading.hide(); 
						smainhtml = l(d);
						main.add(smainhtml);
						main.find("#searchtips").show().text("共搜索到"+d.gamelist.length+"条结果");
					});
				}else{
					tip.setContent("请输入搜索关键字").show(1000);
				}
			});
			main.find("#clearbtn").on("click", function() {
				main.find("#searchbox").val("").focus();
				$(this).hide();
			});
			$.get("js/app/data/searchsuggest.php", function(d){
				smainhtml = m(d);
				main.add(smainhtml);
				//换一批推荐
				main.find("#reSuggest").live("click", function() {
					loading.setContent('正在加载...').show();
					$.ajax({
						url: "js/app/data/searchsuggest.php",
						cache: false,
						success: function(d) {
							main.remove("#main");
							loading.hide();
							smainhtml = m(d);
							main.add(smainhtml);
						}
					});
				});
			});
		});
	});

	/*主页模块路由*/
	require(['common', 'gamelist'], function(s, g) {
		gamelist = t("list-templ", g);
		headhtml = head(s.headdata);
		foothtml = foot(s.footdata);
		navhtml = nav(s.navdata);
		slide = new $.swipe({
			touchSelector: ".c_touch",
			imgArray: s.slidedata.data,
			linksArray: s.slidedata.srcs,
			time: 5000,
			autorun: true,
			width: main.getJQobj().width(),
			height: 95,
			responsive: false,
			tipswrapStyle: {
				bottom: "10px",
				right: "5px"
			}
		});
		main.add(headhtml).add(slide).add(navhtml).add(gamelist).add(foothtml);
	});
});