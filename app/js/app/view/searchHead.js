//search head moudule
define(['jquery','html','template'],function (jq,html,t) {
	var source = '<div class="header">'+
	'<div class="wf-100 clearfix">'+
	'<div class="l fl wf-25 ggrey h-5 h50"><a class="fs14px nobr block tac" href="#/">返回</a> </div>'+
	'<div class="l fl wf-75 ggrey tar h-5 oh">'+
		'<div class="search posr bgw tal h-3 wf-90 b mt">'+
			'<input class="searchbox wf-90 nop nob" type="text" placeholder="搜索" maxlength="20" />'+
			'<a class="searchicon ib fsm ts h-2 posa" href="#/goSearch"><i class="icon-search"></i></a>'+
		'</div>'+
	'</div>'+
	'</div>'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
