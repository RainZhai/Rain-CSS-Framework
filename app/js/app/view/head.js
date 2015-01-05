//head moudule
define(['template'],function (t) {
	var source = '<div id="header" class="header posf fullw z-1000">'+
	'<div class="wf-100 clearfix">'+
	'<div class="l fl wf-25 ggrey h-5 h50"><a href="#/" class="block fsm ts nobr tac">{{name}}</a> </div>'+
	'<div class="l fl wf-75 ggrey tar h-5"><a class="ib fsm ts mt  pl pr pts mr" href="#/search"><svg class="h-2 w-2"><use xlink:href="#icon-search"></use></svg></a></div>'+
	'</div>'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
