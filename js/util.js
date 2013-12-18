/**
*	define util function
*/ 
(function(){
	if(!window.console){window.console = function(){};window.console.info = window.console.debug = window.console.warn = window.console.log = window.console.error = function(str){alert(str);}};

	window.log = function(){
		if(arguments.length>0){
			var s='';
			for(var i=0,l=arguments.length;i<l; i++){s = s + arguments[i]+',';} 
			console.log(util.clearLastComma(s));
		}
	};
	window.util = util = {};
	util.clearLastComma =function(str){
		return str=str.replace(/,$/,'');
	};
}());