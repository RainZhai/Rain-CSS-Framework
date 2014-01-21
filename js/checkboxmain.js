require.config({
    "baseUrl": "./js/",
    paths: {
        jquery: 'jquery-1.7.2',
        checkbox: 'checkbox',
        group:'jquery.group'
    },
    shim : {
    	'checkbox' : {
        deps : ['jquery'],
        exports : 'checkBox'
    		},
	    	'group' : {
	        deps : ['jquery'],
	      }
    },
    priority: ['jquery']
});
require(['jquery','checkbox','group'], function ($,checkBox,group){
	var box=new $.checkBox();
	var g = new $.group({
		groupSelector : "#j_group_1",
		align:'vertical',
		icon : false,
		childObj:[box]
	}); 
});