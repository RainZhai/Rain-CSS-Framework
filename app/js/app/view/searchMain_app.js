//search head moudule
define(['template'],function (t) {
	var source = '<div id="main" class="main mts mlss mrss pb-6 wf-100">'+
	'{{each gamelist as value i}}'+
		'<div class="l fl wf-33">'+
			'<a href1="{{value.url}}" href="javascript:;" class="j_start roundss block tdn p tac ms bgw so">'+
			'{{if value.showimg}}<img src="{{value.imgurl}}" class="round" alt="{{value.name}}" width="50%"/>{{/if}}'+
			'<span class="ib wsn toe oh fullw">{{value.intro}}</span>'+
			'</a>'+
		'</div>'+
	'{{/each}}'+
'<div class="tac">'+
	'<a href="javascript:;" id="reSuggest" class="roundss ib tdn p tac ms bgw so">换一批</a>'+
'</div>'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
