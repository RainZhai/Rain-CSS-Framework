//gamepics detail templ moudule
define(['template'],function (t) {
	var source = '<div id="slide" class="slide oh posr fullh fullw bgBlack">'+
		 '<div class="slidemain oh mlrauto">'+
		 '<ul class="slidewrap lsn nop nom clearfix oh">'+
		   '<li class="l fl">'+
		       '<h2 class="fs14px white pl pt"><a href="http://wande.me" class="white" style="text-decoration: underline;" target="_blank" >玩的么</a>《看美眉》 (第{{period}}期)</h2>'+
		       '<p class="fs12px white pl">{{name}}</p>'+
		       '<a class="block ps tac" href="javascript:;"><img class="fullw round-5" src="http://ww3.sinaimg.cn/mw690/005vSBqygw1emzsan0ortj308c0hm40s.jpg" /></a>'+
		    '</li>'+
		 '{{each imglist as value i}} '+
			 '<li class="l fl">'+
			   '<a class="block ps tac" href="{{value.url}}"><img class="fullw round-5" src="{{value.imgurl}}"/ ></a>'+
			 '</li>'+
		'{{/each}}'+
		    '<li class="l fl bgw">'+
		       '<p class="tar wf-90 mlrauto pt">更多精彩尽在 <a href="http://wande.me" class="fs-2" style="text-decoration: underline;color:#FF6D00;" target="_blank">玩的么</a></p>'+
		       '<p class="tar wf-90 mlrauto">新浪微博 <a href="http://weibo.com/wandeme" class="fs-1" style="color:#FF6D00;" target="_blank">@玩的么</a></p>'+
		       '<a class="block wf-90 mlrauto b" title="html5小游戏微信公众号" href="http://mp.weixin.qq.com/s?__biz=MzA4MzI3MTMzMw==&amp;mid=10000007&amp;idx=1&amp;sn=826a5629230c0fd39a03d1ae528be4a0">'+
		       '<img width="100%" alt="html5小游戏微信公众号" src="http://wande.me/images/qrcode_for_gh_a649c5a3135f_344.jpg">'+
		       '</a>'+
		       '<p class="tar wf-90 mlrauto pt"><a href="http://wande.me/game/kmm" style="font-size:16px;color:#000;" target="_blank">往期回顾</a></p>'+
		       '<p class="tar wf-90 mlrauto pb"><a href="http://wande.me" class="fs-1" style="color:#000;" target="_blank">wande.me 2014</a></p>'+
		    '</li>'+
		   '</ul>'+
		 '</div>'+
		 '<a id="btnLeft" class="j_slidebtn posa bgWhite o-5 tac hll fs-1 roundall" href="javascript:;">&lt;</a>'+
		 '<a id="btnRight" class="j_slidebtn posa bgWhite o-5 tac hll fs-1 roundall" href="javascript:;">&gt;</a>'+
		 '</div>';

	var render = t.compile(source);
	return function(data){
		return render(data);
	};
});
