require.config({
	"baseUrl": "./js/",
	paths: {
		jquery: 'lib/jquery-1.7.2',
		template: 'lib/template',
		html: 'lib/freehtml',
		util:'lib/util',
		swipe: 'lib/swipe'
	},
  priority: ['jquery']
});
require(['jquery','html','template','util','swipe'], function ($,_html,t){
	var o = new $.swipe({
		autorun:true,
		time:5000,
		imgArray:['../images/s1.jpg','../images/s2.jpg','../images/s3.jpg','../images/s4.jpg']
	});
});
