require.config({
	urlArgs: 'v='+new Date().getTime(),
	"baseUrl": "./js/",
	paths: {
		jquery: 'lib/jquery-1.7.2',
		html: 'lib/freehtml',
		template: 'lib/template',
		util:'lib/util',
		swipe: 'lib/swipe',
		head:'app/view/head',
		foot:'app/view/foot',
		nav:'app/view/nav',
		gamelist:'app/data/gamelist',
		common:'app/data/common',
		searchhead:'app/view/searchHead',
		searchmain:'app/view/searchMain'
	},
  shim : {
    'util' : {
      deps : ['jquery'],
      exports : 'util'
    },
    'swipe' : {
      deps : ['jquery'],
      exports : 'swipe'
    }
  },
  priority: ['jquery']
});
require(['jquery','html','template','util','swipe','head','nav','foot'], function ($,_html,t,util,swipe,head,nav,foot){
	var html = _html.htmlObj;
	var headhtml;
	var navhtml;
	var foothtml;
	var gamelist;
	var slide;
	
	var main = new html('#body');

	util.addRoute('/','',function(){
		main.remove();
		main.add(headhtml).add(slide).add(navhtml).add(gamelist).add(foothtml);
	});
	util.addRoute('/nav1','#gamelist',function(){
		main.remove('#gamelist');
	});
	util.addRoute('/pic1','#pic1',function(){
		alert(1);
	});
	util.addRoute('/search','#body',function(){
		main.remove();
		require(['searchhead','searchmain'],function(h,m){
			var sheadhtml = h({});
			main.add(sheadhtml);
		});
	});

	require(['common','gamelist'],function(s,g){
		gamelist = t("list-templ",g);
		headhtml = head(s.headdata);
		foothtml = foot(s.footdata);
		navhtml = nav(s.navdata);
		slide = new $.swipe({
			touchSelector : ".c_touch",
			imgArray: s.slidedata.data,
			linksArray: s.slidedata.srcs,
			time : 5000,
			autorun: true,
			width: main.getJQobj().width(),
			height:95,
			responsive: false,
			tipswrapStyle:{ bottom: "10px",right: "5px"}
		});
		main.add(headhtml).add(slide).add(navhtml).add(gamelist).add(foothtml);
	}); 
});
