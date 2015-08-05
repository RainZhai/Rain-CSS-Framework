//category templ moudule
define(['template'],function (t) {
	t.config("escape", false);
	var source = '<div class="listwrap wplistwrap">'+
		 '{{each posts as value i}} '+
			'<div class="j_picitem listitem block wf-100 bgw so mts" postid="{{value.id}}" index="{{i}}" >'+
				'<div class="ps">'+
				'<div class="j_content">{{value.content}}</div>'+
				'<p class="topictitle css3_flexbox">'+
					'<span class="j_title block wf-55">{{value.title}}</span>'+
					'<span class="block wf-45 tar">{{value.date}}</span>'+
				'</p>'+
				'</div>'+
			'</div>'+
		'{{/each}}'+
	'</div>';

	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
