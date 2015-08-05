//gamepics detail templ moudule 图片列表详情
define(['template'],function (t) {
	var source = '<div id="main" class="itemdetail oh posr bgw" postid="{{id}}" index="{{i}}">'+
		'<div class="ps">'+
			'<p class="block ps">{{title}}</p>'+
			'{{content}}'+
		'</div>'+
	'</div>';

	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
