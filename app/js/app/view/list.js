//gamelist moudule
define(['template'],function (t) {
	var source = '<div class="main mts mlss mrss pb-6" id="main">'+
	'<div id="searchtips" class="searchtips ps hide"></div>'+
	 '{{each gamelist as value i}} '+
	     '<div class="listitem wf-100 h-7 clearfix bgw so mts rounds"> '+
	         '<div class="l fl wf-25 fullh"> '+
		         '<a class="block tdn oh hf-80 ps" href="{{value.url}}" target="_blank"><img src="{{value.imgurl}}" class="round-10 minw" alt="{{value.name}}" height="100%"/></a> '+
		 '</div> '+
		'<div class="l fl wf-40 fullh">'+
			'<a class="block tal tdn fs14px mtl" href="{{value.url}}" target="_blank">{{value.name}}</a>'+
			'<p class="oh">{{value.intro}}</p>'+
		'</div>'+
		'<div class="l fl wf-35 fullh lh-7 tar">'+
			'<a class="hm ib pl pr rounds gr btn redbtn tac mr" href="{{value.url}}" target="_blank">{{value.start}}</a>'+
		'</div>'+
	    '</div>'+
	'{{/each}}'+
	'</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
