require.config({
	urlArgs: 'v=' + new Date().getTime(),
	"baseUrl": "./js/",
	paths: {
		jquery: 'lib/jquery-1.7.2.min',
		html: 'lib/freehtml',
		template: 'lib/template',
		util: 'lib/util',
		swipe: 'lib/swipe',
		slide: 'lib/slide',
		headview: 'app/view/head',
		footview: 'app/view/foot',
		navview: 'app/view/nav',
		commondata: 'http://wande.me/app/js/app/data/common',
		//commondata: 'app/data/common',
		searchheadview: 'app/view/searchHead',
		searchmainview: 'app/view/searchMain',
		listview: 'app/view/list',
		cateview: 'app/view/category',
		catedata: 'http://wande.me/app/js/app/data/category',
		//catedata: 'app/data/category',
		topicview: 'app/view/topic',
		topicdetailview: 'app/view/topicdetail', 
		gamepicview: 'app/view/gamepic',
		gamepicdetailview: 'app/view/gamepicdetail',
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
		},
		'slide': {
			deps: ['jquery','util'],
			exports: 'slide'
		}
	},
	priority: ['jquery']
});
require(['jquery', 'html', 'util'], function($, _html, util) {
	var html = _html.htmlObj;
	var headhtml;
	var navhtml;
	var foothtml;
	var gamelist;
	var slide;
	//var prefix = 'http://wande.me/app/';
	var prefix = 'http://127.0.0.1/Rain-CSS-Framework/app/';
	//创建loading弹出框
	var loading =new util.loading({loadingClass:'bglgrey'});
	var tip = new util.loading({loadingClass:'bgw',icon:false});

	var main = new html('#body');

	util.addRoute('/', '', function() {
		main.remove();
		main.add(headhtml).add(slide).add(navhtml).add(gamelist).add(foothtml);
	});
	//nav1路由
	util.addRoute('/nav1', '#main', function() {
		main.remove();
		main.add(headhtml).add(slide).add(navhtml).add(gamelist).add(foothtml);
	});
	//nav2路由
	util.addRoute('/nav2', '#main', function() {
		main.remove("#main");
		loading.setContent('正在加载...').show(); 
		$.getScript(prefix+"js/app/data/gamelist2.js",function() {
			main.remove("#main");
			loading.hide();
			var d = data;
			require(['listview'], function(l) {
				var list = l(d);
				main.add(list).add(foothtml);
			});
		});
	});
	//nav3路由
	util.addRoute('/nav3', '#main', function() {
		main.remove();
		require(['cateview', 'catedata'], function(c, d) {
			var list = c(d); 
			main.add(headhtml).add(list).add(foothtml); 
		});
	});
	//nav3路由-专题列表
	util.addRoute('/nav4', '#main', function() {
		main.remove();
		require(['topicview'], function(t) {
			loading.setContent('正在加载...').show();
			$.getScript(prefix+"js/app/data/topic.php", function(d){
				var d = data;
				if(d.list.length>0){
					var list = t(d); 
					main.add(headhtml).add(list).add(foothtml); 
				}else{
					tip.setContent("没有记录").show(1000);
				}
				loading.hide();
			});
		});
	});
	//分类页面加载
	main.find(".j_catelist").live("click",function(){
		main.remove();
		var c = this.name;
		require(['listview'], function(l) {
			loading.show();
			$.getScript(prefix+"js/app/data/searchcate.php?c="+c, function(){
				loading.hide(); 
				var d = data;
				smainhtml = l(d);
				main.add(headhtml).add(smainhtml);
				window.location.hash = "catedetail";
			});
		});
	});
	//专题详情页面加载
	main.find(".j_topicitem").live("click",function(){
		main.remove();
		var c = this.name;
		require(['topicdetailview'], function(l) {
			loading.show();
			$.getScript(prefix+"js/app/data/searchtopic.php?c="+c, function(d){
				var d = data;
				loading.hide(); 
				smainhtml = l(d);
				main.add(headhtml).add(smainhtml);
				window.location.hash = "topicdetail";
			});
		});
	}); 
	//游戏图列表路由
	util.addRoute('/gamepic', '#gamepic', function() { 
		main.remove();
		require(['gamepicview'], function(l) {
			loading.show();
			//http://wande.me/app/js/app/data/gamepic.php?c=1
			$.getScript(prefix+"js/app/data/gamepic.js", function(){
				var d = data;
				loading.hide(); 
				smainhtml = l(d);
				main.add(headhtml).add(smainhtml).add(foothtml);
			});
		});
	});
	//游戏图详情页面加载
	main.find(".j_picitem").live("click",function(){
		main.remove();
		//debugger;
		var i = parseInt(this.name);
		require(['gamepicdetailview','slide'], function(l,s) {
			loading.show();
			$.getScript(prefix+"js/app/data/gamepic.js", function(){
				var d = data;
				loading.hide(); 
				smainhtml = l(d.list[i]);
				main.add(headhtml).add(smainhtml).add(foothtml);
				var slide = new $.slide({
					selector: '#slide', //滑动的块 
					src: [],
					alt: [],
					text: [],
					fix: false, //是否固定大小
					width: 320, //宽
					height: 195, //高
					images: 1, //每屏展示图片的个数
					slides: 1, //每次滑动图片个数
					length: 200, //触屏最小滑动长度
					control: true, //是有控制按钮
					controlwidth: 0,
					btnLeftStyle: {"left": "10px","bottom": "50%","width": "40px"},
					btnRightStyle: {"right": "10px","bottom": "50%","width": "40px"},
					loop: true, //是否是无缝轮播
					auto: false, //自动轮播
					speed: 600, //滑动速度
					delay: 5000, //滚动间隔
					preloadamt: 3,
					before: function() {
						if (!(util.isIOS || util.isAndroid)) {
							$("#slide").addClass("w-40 mlrauto");
						}
					}
				});
				window.location.hash = "gamepicdetail";
			});
		});
	}); 

	/*搜索模块路由*/
	util.addRoute('/search', '#body', function() {
		main.remove();
		require(['jquery', 'searchheadview', 'searchmainview','listview'], function($, h, m,l) {
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
					$.getScript(prefix+"js/app/data/searchresult.php?p="+param, function(d){
					var d = data;
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
			$.getScript(prefix+"js/app/data/searchsuggest.php", function(d){
				var d = data;
				smainhtml = m(d);
				main.add(smainhtml);
				//换一批推荐
				main.find("#reSuggest").live("click", function() {
					loading.setContent('正在加载...').show();
					$.getScript(prefix+"js/app/data/searchsuggest.php",function(d) {
						main.remove("#main");
						loading.hide();
					var d = data;
						smainhtml = m(d);
						main.add(smainhtml);
					});
				});
			});
		});
	});

	/*主页模块路由*/
	require(['commondata','listview', 'swipe', 'headview', 'navview', 'footview'], function(s, l, swipe, head, nav, foot) {
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
			tipswrapStyle: {bottom: "10px",right: "5px"}
		});
		main.add(headhtml).add(slide).add(navhtml);
		loading.setContent('正在加载...').show();
		
		$.getScript(prefix+"js/app/data/gamelist.js",function() {
			main.remove("#main");
			loading.hide();
			var d = data;
			gamelist = l(d);
			main.add(gamelist).add(foothtml);
		});
	});
});