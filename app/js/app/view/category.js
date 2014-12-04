//category templ moudule
define(['template'],function (t) {
	var source = '<div class="main mts mlss mrss pb-6" id="main">'+
		 '{{each list as value i}} '+
			'<div class="listitem wf-100 h-7 clearfix bgw so mts rounds">'+
			        '<div class="l fl wf-40 fullh">'+
				        '<a class="block tdn oh hf-80 ps" href="{{value.url}}"><img src="{{value.imgurl}}" alt="{{value.name}}" height="100%"/></a>'+
				'</div>'+
				'<div class="l fl wf-50 fullh">'+
					'<a class="block tal tdn fs14px mts pls" href="{{value.url}}">{{value.name}}</a>'+
					'<a class="oh h-4 block pls" href="{{value.url}}">{{value.intro}}</a>'+
				'</div>'+
				'<div class="l fl wf-10 fullh lh-7 tar">'+
				'<a class="hm ib tac mr" href="{{value.url}}" target="_blank">&gt;</a>'+
				'</div>'+
			'</div>'+
		'{{/each}}'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
