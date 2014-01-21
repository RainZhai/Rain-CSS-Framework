require.config({
    "baseUrl": "./js/",
    paths: {
        jquery: 'jquery-1.7.2',
        util:'util',
        swipe: 'swipe'
    },
    shim : {
        'util' : {
            deps : ['jquery'],
        },
        'swipe' : {
            deps : ['jquery'],
        }
    },
    priority: ['jquery']
});
require(['jquery','util','swipe'], function ($,util,swipe){
	var o = new $.swipe({autorun:true});
});