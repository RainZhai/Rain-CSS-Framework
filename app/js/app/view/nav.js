//head moudule
define(['template'],function (t) {
	var source = 	'<div class="mainitem wf-100 clearfix mts">'+
  '<div class="l fl wf-25"><a class="hll mss tac block bgBlue white round-1" href="#/nav1">{{title1}}</a></div>'+
  '<div class="l fl wf-25"><a class="hll mss tac block bgRed white round-1" href="#/nav2">{{title2}}</a></div>'+
  '<div class="l fl wf-25"><a class="hll mss tac block bgGreen white round-1" href="#/nav3">{{title3}}</a></div>'+
  '<div class="l fl wf-25"><a class="hll mss tac block bgYellow white round-1" href="#/nav4">{{title4}}</a></div>'+
  '</div>';
	
	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
