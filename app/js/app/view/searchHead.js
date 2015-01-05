//search head moudule
define(['template'],function (t) {
	var source = '<div class="header posf fullw z-1000" id="searchhead">'+
	'<div class="wf-100 clearfix">'+
	'<div class="l fl wf-25 ggrey h-5 h50"><a class="fs14px nobr block tac" href="#/">返回</a> </div>'+
	'<div class="l fl wf-75 ggrey tar h-5 oh">'+
		'<div class="search posr bgw tal h-3 wf-90 b mt">'+
			'<input id="searchbox" class="searchbox wf-90 nop nob" type="text" placeholder="搜索" maxlength="18" />'+
			'<span id="clearbtn" class="clearbtn block w-2 h-2 bglgrey roundall posa tac grey hide">x</span>'+
			'<a id="searchbtn" class="searchicon ib fsm ts h-2 posa pl" href="javascript:;"><svg class="h-2 w-2"><use xlink:href="#icon-search"></use></svg></a>'+
		'</div>'+
	'</div>'+
	'</div>'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
