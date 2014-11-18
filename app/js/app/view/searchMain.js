//search head moudule
define(['jquery','html','template'],function (jq,html,t) {
	var source = '<div class="main mts mlss mrss pb-6 wf-100">'+
'<div class="l fl wf-33">'+
	'<a href="{{url}}" class="roundss block tdn p tac ms bgw so">'+
	'<img src="{{imgurl}}" class="round" alt="{{name}}" width="50%"/>'+
	'<span class="ib wsn toe oh fullw">{{intro}}</span>'+
	'</a>'+
'</div>'+
'<div class="l fl wf-33">'+
	'<a href="{{url}}" class="roundss block tdn p tac ms bgw so">'+
	'<img src="{{imgurl}}" class="round" alt="{{name}}" width="50%"/>'+
	'<span class="ib wsn toe oh fullw">{{intro}}</span>'+
	'</a>'+
'</div>'+
'<div class="l fl wf-33">'+
	'<a href="{{url}}" class="roundss block tdn p tac ms bgw so">'+
	'<img src="{{imgurl}}" class="round" alt="{{name}}" width="50%"/>'+
	'<span class="ib wsn toe oh fullw">{{intro}}</span>'+
	'</a>'+
'</div>'+
'<div class="l fl wf-33">'+
  '<a href="{{url}}" class="roundss block tdn p tac ms bgw so">'+
'<span class="ib wsn toe oh fullw">{{intro}}</span>'+
'</a>'+
'</div>'+
'<div class="l fl wf-33">'+
'<a href="{{url}}" class="roundss block tdn p tac ms bgw so">'+
'<span class="ib wsn toe oh fullw">{{intro}}</span>'+
'</a>'+
'</div>'+
'<div class="l fl wf-33">'+
	'<a href="{{url}}" class="roundss block tdn p tac ms bgw so">'+
	'<span class="ib wsn toe oh fullw">{{intro}}</span>'+
	'</a>'+
'</div>'+
'<div class="tac">'+
	'<a href="javascript:;" class="roundss ib tdn p tac ms bgw so">换一批</a>'+
'</div>'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
