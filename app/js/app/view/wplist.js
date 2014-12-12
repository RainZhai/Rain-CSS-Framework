//category templ moudule
define(['template'],function (t) {
	t.config("escape", false);
	var source = '<div class="main mts mlss mrss pb-6" id="main">'+
		'<div id="listwrap" class="listwrap wplistwrap">'+
		 '{{each posts as value i}} '+
			'<a class="j_picitem listitem block wf-100 bgw so mts" href="javascript:;" postid="{{value.id}}" index="{{i}}" >'+
				'<div class="ps">'+
				'{{value.content}}'+
				'<p class="topictitle css3_flexbox">'+
					'<span class="block wf-55">{{value.title}}</span>'+
					'<span class="block wf-45 tar">{{value.date}}</span>'+
				'</p>'+
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
