//category templ moudule
define(['template'],function (t) {
	t.config("escape", false);
	var source = '<div id="main" class="listwrap wplistwrap ps">'+
		 '{{each posts as value i}} '+
			'<div class="j_wpgameitem listitem block wf-100 bgw so mts posr" postid="{{value.id}}" index="{{i}}" >'+
				'{{value.content}}'+
				'<div class="posa fullw" style="bottom:30px;"><span class="round-10 gr btn redbtn block tdn p w-10 mlrauto tac">开始游戏</span></div>'+
				'<p class="topictitle css3_flexbox">'+
					'<span class="block wf-55">{{value.title}}</span>'+
					'<span class="block wf-45 tar">{{value.date}}</span>'+
				'</p>'+
			'</div>'+
		'{{/each}}'+
	'</div>';

	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
