//foot moudule
define(['template'],function (t) {
	var source = 	'<div id="footer" class="footer wf-100 clearfix posf">'+
	'<div class="l fl wf-25 ggrey"><a href="{{url1}}" class="p block fsm ts tac">{{title1}}</a></div>'+
	'<div class="l fl wf-25 ggrey"><a href="{{url2}}" class="p block fsm ts tac">{{title2}}</a></div>'+
	'<div class="l fl wf-25 ggrey"><a href="{{url3}}" class="p block fsm ts tac">{{title3}}</a></div>'+
	'<div class="l fl wf-25 ggrey"><a href="{{url4}}" class="p block fsm ts tac">{{title4}}</a></div>'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
