//foot moudule
define(['jquery','html','template'],function (jq,html,t) {
	var source = 	'<div class="footer wf-100 clearfix posf">'+
	'<div class="l fl wf-25 ggrey"><a href="#" class="p block fsm ts tac">{{title1}}</a></div>'+
	'<div class="l fl wf-25 ggrey"><a href="#" class="p block fsm ts tac">{{title2}}</a></div>'+
	'<div class="l fl wf-25 ggrey"><a href="#" class="p block fsm ts tac">{{title3}}</a></div>'+
	'<div class="l fl wf-25 ggrey"><a href="#" class="p block fsm ts tac">{{title4}}</a></div>'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
