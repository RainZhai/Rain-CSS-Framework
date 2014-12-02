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

	var main = new html('#body');

	util.addRoute('/', '', function() {
		main.remove();
		main.add(headhtml).add(slide).add(navhtml).add(gamelist).add(foothtml);
	});
	util.addRoute('/nav1', '#gamelist', function() {
		main.remove('#gamelist');
	});
	util.addRoute('/pic1', '#pic1', function() {
		alert(1);
	});

	/*搜索模块路由*/
	util.addRoute('/search', '#body', function() {
		main.remove();
		require(['jquery', 'searchhead', 'searchmain'], function($, h, m) {
			var sheadhtml = h({});
			var smainhtml;
			//创建loading弹出框
			var loading = util.loading({loadingClass:'bglgrey'});
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
			main.find("#clearbtn").on("click", function() {
				main.find("#searchbox").val("").focus();
				$(this).hide();
			});
			$.ajax({
				url: "js/app/data/searchsuggest.php",
				cache: false,
				success: function(d) {
					smainhtml = m(d);
					main.add(smainhtml);
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
				}
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