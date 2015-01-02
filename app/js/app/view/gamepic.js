//category templ moudule
define(['template'],function (t) {
	var source = '<div class="main mts mlss mrss pb-6" id="main">'+
		'<div id="listwrap" class="listwrap">'+
		 '{{each list as value i}} '+
			'<a class="j_mmitem listitem block wf-100 bgw so mts" href="javascript:;" name="{{i}}" >'+
				'<div class="ps">'+
				'<img src="{{value.imgurl}}" width="100%"/>'+
				'<p class="topictitle css3_flexbox">'+
					'<span class="block wf-75">{{value.name}}</span>'+
					'<span class="block wf-25">{{value.date}}</span>'+
				'</p>'+
				'<p class="topicinfo">{{value.intro}}</p>'+
				'</div>'+
			'</a>'+
		'{{/each}}'+
		'</div>'+ 
		'{{if morebtn}}'+
		'<a href="javascript:;" id="moretopic" class="p mts block mlrauto bgw tac">更多</a>'+
		'{{/if}}'+
	'</div>';

	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
