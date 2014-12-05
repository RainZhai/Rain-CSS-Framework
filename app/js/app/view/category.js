//category templ moudule
define(['template'],function (t) {
	var source = '<div class="main mts mlss mrss pb-6" id="main">'+
		 '{{each list as value i}} '+
			'<a class="j_catelist listitem wf-100 h-7 clearfix bgw so mts rounds block" href="javascript:;" name="{{i}}">'+
			        '<div class="l fl wf-40 fullh">'+
				        '<span class="block tdn oh hf-80 ps" href="{{value.url}}"><img src="{{value.imgurl}}" alt="{{value.name}}" height="100%"/></span>'+
				'</div>'+
				'<div class="l fl wf-50 fullh">'+
					'<span class="block tal tdn fs14px mts pls" >{{value.name}}</span>'+
					'<span class="oh h-4 block pls" >{{value.intro}}</span>'+
				'</div>'+
				'<div class="l fl wf-10 fullh lh-7 tar">'+
				'<span class="hm ib tac mr">&gt;</span>'+
				'</div>'+
			'</a>'+
		'{{/each}}'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
