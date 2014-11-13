//head moudule
define(['jquery','html','template'],function (jq,html,t) {
	var source = '<div class="header">'+
	'<div class="wf-100 clearfix">'+
	'<div class="l fl wf-25 ggrey h-5 h50"><a href="#/" class="block fsm ts nobr tac">{{name}}</a> </div>'+
	'<div class="l fl wf-75 ggrey tar h-5"><a class="ib fsm ts mtl pss mr" href="#/search"><i class="icon-search mt"></i></a></div>'+
	'</div>'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
