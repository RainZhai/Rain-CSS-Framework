//head moudule
define(['template'],function (t) {
	var source = '<div id="header" class="header posf fullw z-1000">'+
	'<div class="wf-100 clearfix">'+
	'<div class="l fl wf-25 ggrey h-5 h50"><a href="#/" class="block fsm ts nobr tac">{{name}}</a> </div>'+
	'<div class="l fl wf-75 ggrey tac h-5 posr"><a class="ptl ib tdunder" href="wandeme.apk">安卓版客户端下载↓</a><a class="ib fsm ts posa" style="top:10px; right:10px; " href="#/search"><svg class="h-2 w-2"><use xlink:href="#icon-search"></use></svg></a></div>'+
	'</div>'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
