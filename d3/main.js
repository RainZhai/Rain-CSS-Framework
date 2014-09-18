!function(a,b){function c(b){var c=b.ua=navigator.userAgent;b.isWebKit=/webkit/i.test(c),b.isMozilla=/mozilla/i.test(c),b.isIE=/msie/i.test(c),b.isFirefox=/firefox/i.test(c),b.isChrome=/chrome/i.test(c),b.isSafari=/safari/i.test(c)&&!this.isChrome,b.isMobile=/mobile/i.test(c),b.isOpera=/opera/i.test(c),b.isIOS=/ios/i.test(c),b.isIpad=/ipad/i.test(c),b.isIpod=/ipod/i.test(c),b.isIphone=/iphone/i.test(c)&&!this.isIpod,b.isAndroid=/android/i.test(c),b.supportStorage="localStorage"in a,b.supportOrientation="orientation"in a,b.supportDeviceMotion="ondevicemotion"in a,b.supportTouch="ontouchstart"in a,b.supportCanvas=null!=document.createElement("canvas").getContext,b.cssPrefix=b.isWebKit?"webkit":b.isFirefox?"Moz":b.isOpera?"O":b.isIE?"ms":""}a.util=util={},util.touch={startX:0,startY:0,endX:0,endY:0,registerEvent:function(a,c,d,e){b.isFunction(c)&&a[0].addEventListener("touchstart",c,!1),b.isFunction(d)&&a[0].addEventListener("touchmove",d,!1),b.isFunction(e)&&a[0].addEventListener("touchend",e,!1)}},a.console||(a.console=function(){},a.console.info=a.console.debug=a.console.warn=a.console.log=a.console.error=function(a){alert(a)}),a.log=function(){if(arguments.length>0){for(var a="",b=0,c=arguments.length;c>b;b++)a=a+arguments[b]+",";console.log(util.clearLastComma(a))}},c(util),util.clearLastComma=function(a){return a=a.replace(/,$/,"")},util.checkprop=function(a,b){return a in b},util.queryByTag=function(a){return document.getElementsByTagName(a)},util.queryById=function(a){return document.getElementById(a)},util.getRandomNum=function(a,b){if(b>a){var c=b-a,d=Math.random();return a+Math.round(d*c)}return 0},util.pushState=function(a){if(history&&util.checkprop("pushState",history)){var c=b.extend({data:{},title:""},a||{});history.pushState(c.data,c.title,c.url)}},util.replaceState=function(a){if(history&&util.checkprop("replaceState",history)){var c=b.extend({data:{},title:"",url:""},a||{});history.replaceState(c.data,c.title,c.url)}},util.state=function(){return history&&util.checkprop("state",history)?history.state:void 0},util.getTitle=function(){var a=util.queryByTag("title");return a.length>0?a[0].innerText:""},util.registerStateChange=function(b){"onpopstate"in a&&(a.onpopstate=function(){b()})},util.initObjByUrl=function(a){var b=location.href.split("?")[1];b&&a&&b in a&&a[b]()},util.savedata=function(a,b){util.supportStorage&&a&&b&&localStorage.setItem(a,b)},util.getdata=function(a){return util.supportStorage&&a?localStorage.getItem(a):null},util.extend=function(a,b){var c=function(){};c.prototype=b.prototype,a.prototype=new c,a.prototype.constructor=a,a.superclass=b.prototype,b.prototype.constructor==Object.prototype.constructor&&(b.prototype.constructor=b)},util.clone=function(a){function b(){}return b.prototype=a,new b},util.augment=function(a,b){if(arguments[2])for(var c=2,d=arguments.length;d>c;c++)a.prototype[arguments[c]]=b.prototype[arguments[c]];else for(methodName in b.prototype)a.prototype[methodName]||(a.prototype[methodName]=b.prototype[methodName])};var d=function(){};util.inherit=function(a,b){d.prototype=b.prototype,a.superClass=b.prototype,a.prototype=new d,a.prototype.constructor=a},util.merge=function(a,b,c){for(var d in b)(!c||a.hasOwnProperty(d)||void 0!==a[d])&&(a[d]=b[d]);return a},util.cacheImg=function(a,b,c){var d=a.width,e=a.height,f=util.createDOM("canvas",{width:d,height:e}),g=new Image;if(g.src=a.src,null==f)return!1;var h=f.getContext("2d");h.fillStyle="#EEEEFF",h.fillRect(0,0,d,e),g.onload=function(){h.drawImage(g,0,0);var a=new Image;a.width=d,a.height=e,a.src=f.toDataURL(b||"image/png"),c(a)}},util.createDOM=function(a,b){var c=document.createElement(a);for(var d in b){var e=b[d];if("style"==d)for(var f in e)c.style[f]=e[f];else c[d]=e}return c},util.binarySearch=function(a,b){for(var c=0,d=a.length-1;d>=c;){var e=parseInt((c+d)/2,10);if(b==a[e].name)return e;b<a[e].name?d=e-1:c=e+1}return d+1},util.loading=b.fn.loading=b.loading=function(a){var c=b.extend({content:"",loadingStyle:{},loadingClass:"",textStyle:{"font-size":"1.2em"},textClass:""},a||{}),d=Math.round(1e6*Math.random()+1)+"",e=c.content,f={htmlobj:null,init:function(){f.initHtml(),f.initUI()},initHtml:function(){return f.html||(f.html=b('<div id="j_loader'+d+'" class="j_loader'+d+' ui-loader round-5 ps posf hide"><span class="ui-icon-loading block center roundall o-5"></span><div class="j_content tac"></div></div>')),e&&f.html.find(".j_content").html(e),f.html},initUI:function(){f.html.addClass(c.loadingClass),f.html.css(c.loadingStyle),f.html.find(".j_content").css(c.textStyle),f.html.find(".j_content").addClass(f.textClass),b("body").append(f.html)},setContent:function(a){f.html.find(".j_content").html(a)},show:function(){f.html.removeClass("hide")},hide:function(){f.html.addClass("hide")}};return f.init(),f},util.listload=b.listload=function(a,c){var d=b.extend({lastItemHandle:".list:last-child",loadurl:"",params:null,wrapHandle:"#listbox"},a||{}),e=b(window),f=b(d.wrapHandle),g={getDatabox:function(){return f},setParams:function(a){d.params=a},getParams:function(){return d.params},setData:function(a){g.data=a},getData:function(){return g.data},init:function(){e.scroll(function(){if(b(d.lastItemHandle).is(":visible")&&e.scrollTop()+e.height()>=b(document).height()&&d.loadurl){var a=g.getParams();b.getJSON(d.loadurl,a,function(a){g.setData(a),b.isFunction(c)&&c()})}})}};return g.init(),g}}(window,jQuery);
$.fn.extend({
	// 最新更新可以支持任意子元素绑定tabs效果
	tabs : function(obj) {
		var o = $.extend({
			tabSelector:null,
			panelSelector:null,
			'event':"click",
			currentClass:'',
			hoverClass:'',
			panelClass:'',
			index:0,
			callback:$.noop
		}, obj || {});
		var _this =$(this),
		index = o.index,
		// tab 的钩子
		tab = o.tabSelector || 'li',
		// 受控的id开头
		panel = o.panelSelector || 'div',
		tabsize = $(tab).length,
		// tab触发事件
		tabE = o.event || 'click',
		// 当前tablink的样式类
		tabClass = o.currentClass,
		// 未选中tablink的hover类
		hoverClass = o.hoverClass,
	  panelClass = o.panelClass,
		call=o.callback;
		function tabsHandler(event) {
			if (tabsize > 0) {
				var tabs = event.data.tabs;
				var panels = event.data.panels;
				tabs.removeClass(tabClass).addClass(hoverClass);
				$(this).addClass(tabClass).removeClass(hoverClass);
				panels.removeClass(panelClass).hide();
				$(panels[event.data.index]).addClass(panelClass).show();
				event.data.callbacks.call(this,event.data.index);
			}
		}
		// tabs为多个，给每个tab设置样式
		for(var i =0;i<_this.length;i++){
			var tabs = $(_this[i]).find(tab);
			var panels = $(_this[i]).find(panel).hide();
			$(tabs[index]).addClass(tabClass).removeClass(hoverClass);
			$(panels[index]).addClass(panelClass).show();
		  
			for(var j =0; j<tabs.length; j++){
				$(tabs[j]).on(tabE, {index : j, tabs: tabs, panels: panels ,callbacks:call}, tabsHandler);
			}
		}
		$(tabs[index]).trigger(tabE);
		return _this;
}
});
/**
 * 首页饼图滚动动画
 * @authors 13072952
 * @date    2014-08-14 09:18:44
 * @version  1.0
 */
var Tween = {
    Linear: function(t, b, c, d) {
        return c * t / d + b;
    }
}
Math.tween = Tween;

//html5请求帧动画的垫片
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());

var allowDraw = true,showTextTimer;
//互联通用js
var snnet = snnet || {};
snnet = {
    //绘制首页饼图
    drawPie: function(selector, data) {
        allowDraw = false;
        var ppp=document.getElementById('ppp');

        if (!selector) {
            return false;
        }

        //数据类型
        var dataSet = data;
        //控制每块的颜色
        var colors = ['#ff277e', '#2a95c7', '#f8b13d'];
        //控制每个框的宽度
        var strokeWidth = [54, 36, 14];

        //设置canvas动画
        var canvas = selector;
        var ctx = canvas.getContext('2d');
        canvas.width = 640;
        canvas.height = 520;

        //绘制文字图层ctx
        var canvas1 = document.getElementById('pieGraphText1');
        var ctxText1 = canvas1.getContext('2d');
        canvas1.width = 640;
        canvas1.height = 520;
        canvas1.style.opacity = 0;
        var canvas2 = document.getElementById('pieGraphText2');
        var ctxText2 = canvas2.getContext('2d');
        canvas2.width = 640;
        canvas2.height = 520;
        canvas2.style.opacity = 0;
        var canvas3 = document.getElementById('pieGraphText3');
        var ctxText3 = canvas3.getContext('2d');
        canvas3.width = 640;
        canvas3.height = 520;
        canvas3.style.opacity = 0;
				for(var i = 1;i<=3;i++){
				  $('#pieGraphText'+i).css({'top':0,'left':'50%','margin-left':-1*$('#pieGraphText'+i).width()/2});
				}
        //计算总支出
        var sum = 0;
        for (var i = 0; i < dataSet.length; i++) {
            sum += parseInt(dataSet[i].cost);
        }
        //canvas绘制属性
        var RADIUS = 144;
        var LRATE = 1.40;
        var DX = 320;
        var DY = 260;

        var PI=Math.PI;
        var SR = -1 / 2 * PI;
        //申明各类型的百分比
        var p1 = 0,p2 = 0,p3 = 0;
        dealData();
        //处理数据
        function dealData() {
            //根据每个类型的支出排序
            // dataSet.sort(function compare(a, b) {
            //     return parseInt(b.cost) - parseInt(a.cost);
            // });

            //根据套餐支持是否全是零，计算每个类型支出的占比
            if (sum == 0) {
                p1 = p3 = 0.33;
                p2 = 0.34;
            } else {
                p1 = parseFloat(dataSet[0].cost) / sum;
                p2 = parseFloat(dataSet[1].cost) / sum;
                p3 = parseFloat(dataSet[2].cost) / sum;
            }
        }

        var an = 0;
        var step=0.0000083;
        var INCR=0.002;
        //var vspeed = 0.00005//0.001
        var vspeed = 0.002;

        //绘制饼图第1块的动画
        function drawOne() {
            //清屏
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.strokeStyle = colors[0];
            ctx.lineWidth = strokeWidth[0];
            if(an<=0.3){
                step=step+vspeed/2;
            }else if(an<0.6 && an>0.3){
                step=step+vspeed;
            }else{
                step=step-vspeed*1.2;
                if(step<=0.006){
                    step = 0.006;
                }
            }
            an = an + step;
            //根据弧度绘制第1个饼图，不断改变弧度，重绘就形成了动画
            ctx.arc(DX, DY, RADIUS, SR, -an * 2 * PI + SR, true);
            //控制弹簧效果的动画
            //ctx.arc(DX, DY, RADIUS, -p1 * 2 * Math.PI - p2 * 2 * Math.PI + SR, -Tween.Linear(cn, 0, p3, p3).toFixed(3) * 2 * Math.PI - p1 * 2 * Math.PI - p2 * 2 * Math.PI + SR, true);
            ctx.stroke();
            ctx.closePath();
            
            //根据弧度判断第1块是否绘制完毕，如果完成进行第2块的绘制
            if (an <= p1) {
                requestAnimationFrame(drawOne);
            } else {
                drawTwo();
            }
        }
        //绘制饼图第2块的动画
        function drawTwo() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //绘制第1块饼图
            savePathOne();

            ctx.beginPath();
            ctx.strokeStyle = colors[1];
            ctx.lineWidth = strokeWidth[1];
            if(an<=0.3){
                step=step+vspeed/2;
            }else if(an<0.6 && an>0.3){
                step=step+vspeed;
            }else{
                step=step-vspeed*1.2;
                if(step<=0.006){
                    step = 0.006;
                }
            }
            an = an+step;
            //根据弧度绘制第2个饼图，不断改变弧度，重绘就形成了动画
            ctx.arc(DX, DY, RADIUS, -p1 * 2 * PI + SR,  -an * 2 * PI + SR, true);
            ctx.stroke();
            ctx.closePath();

            if (an <= p1+p2) {
                requestAnimationFrame(drawTwo);
            } else {
                drawThree();
            }
        }
        //绘制饼图第3块的动画
        function drawThree() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //绘制前两块饼图
            savePathOne();
            savePathTwo();

            ctx.beginPath();
            ctx.alpha =0.3
            ctx.strokeStyle = colors[2];
            ctx.lineWidth = strokeWidth[2];
            if(an<=0.3){
                step=step+vspeed/2;
            }else if(an<0.6 && an>0.3){
                step=step+vspeed;
            }else{
                step=step-vspeed*1.2;
                if(step<=0.006){
                    step = 0.006;
                }
            }
            an = an + step;
            //根据弧度绘制第3个饼图，不断改变弧度，重绘就形成了动画
            ctx.arc(DX, DY, RADIUS, -p1 * 2 * PI - p2 * 2 * PI + SR,  -an * 2 * PI + SR, true);
            ctx.stroke();
            ctx.closePath();
            
            if(an>=1){
                an = 1;
                savePathThree();
                showText();
                allowDraw = true;
                $('.remain-money div').addClass('show')
            }else{
                requestAnimationFrame(drawThree);
            }
           
        }
        function showText(){
            var _alpha = 0;
            clearInterval(showTextTimer)
            showTextTimer = setInterval(function(){
                _alpha += 0.06;
                canvas1.style.opacity = _alpha>1?1:_alpha;
                canvas2.style.opacity = (_alpha-0.4)<0?0:(_alpha-0.4)>1?1:(_alpha-0.4);
                canvas3.style.opacity = (_alpha-0.8)<0?0:(_alpha-0.8)>1?1:(_alpha-0.8);
                if(canvas3.style.opacity >= 1){
                    clearInterval(showTextTimer);
                    canvas1.style.opacity = 1;
                    canvas2.style.opacity = 1;
                    canvas3.style.opacity = 1;
                }                
            },30)
        }
        //保存第1个块绘制完毕的图像
        function savePathOne() {
            //根据占比，判断是否绘制
            if (p1 != 0) {
                //计算第1块的中间弧度
                var centerPoint = -p1 * PI + SR;
                //计算第2块的中间弧度
                var p2cPoint = -p1 * PI * 2 - p2 * PI + SR;
                //计算第3块的中间弧度
                var p3cPoint = -p1 * PI * 2 - p2 * PI *2-p3*PI+ SR;

                //坐标点  圆环的中心点
                var hx = DX + RADIUS * Math.cos(centerPoint);
                var hy = DY + RADIUS * Math.sin(centerPoint);
                //根据前后点坐标  判断折线方向
                var nhx = DX + RADIUS * Math.cos(p2cPoint);
                var nhy = DY + RADIUS * Math.sin(p2cPoint);
                var ehx = DX + RADIUS * Math.cos(p3cPoint);
                var ehy = DY + RADIUS * Math.sin(p3cPoint);
                //折线的折点
                var tx = DX + RADIUS * LRATE * Math.cos(centerPoint);
                var ty = DY + RADIUS * LRATE * Math.sin(centerPoint);

                var t = tx > hx ? (tx + 40) : (tx - 40);
                var e = 0, ex = 0;
                // var e = tx > hx ? (tx + 50) : (tx - 50);
                //根据前后点坐标  判断折线方向
                if (Math.abs(nhy - hy) <= 43 && Math.abs(nhx - hx) <= 18) {
                    e = tx + 30;
                    ex = tx + 70;
                }else if (Math.abs(ehy - hy) <= 43 && Math.abs(ehx - hx) <= 43) {
                    e = tx -30;
                    ex = tx - 70;
                } 
                else if (tx > hx) {
                    e = tx + 30;
                    ex = tx + 70;
                } else {
                    e = tx - 30;
                    ex = tx - 70;
                }


                //绘制饼图
                ctx.beginPath();
                ctx.strokeStyle = colors[0];
                ctx.lineWidth = strokeWidth[0];
                //根据开始弧度和结束弧度绘制饼块
                ctx.arc(DX, DY, RADIUS, SR, -p1 * 2 * PI + SR, true);
                ctx.stroke();
                ctx.closePath();
                // 折线动态出现
                var _e = 0;
                //if(_e < e){
                    //requestAnimationFrame(lineone)
                //}                
                lineone();
                //绘制折线
                function lineone(){
                		ctxText1.clearRect(0,0,canvas1.width,canvas1.height);
                    ctxText1.beginPath()
                    ctxText1.moveTo(hx, hy);
                    ctxText1.lineTo(tx, ty);
                    ctxText1.lineTo(e, ty);
                    ctxText1.strokeStyle = colors[0];
                    ctxText1.lineWidth = 2;
                    ctxText1.stroke();
                    ctxText1.closePath();

                    //绘制小原点
                    ctxText1.beginPath();
                    ctxText1.fillStyle = colors[0];
                    ctxText1.arc(e, ty, 6, 0, PI * 2, false);
                    ctxText1.fill();
                    ctxText1.closePath();

                    //绘制文本
                    ctxText1.font = "normal 26px Microsoft YaHei,Arial";
                    ctxText1.textAlign = 'center';
                    //根据ex，ty绘制文本
                    ctxText1.fillText(dataSet[0].use, ex, ty - 16);
                    ctxText1.fillText(dataSet[0].type, ex, ty + 16);
                }
                
            }
        }
        //保存第2个块绘制完毕的图像
        function savePathTwo() {
            //根据占比，判断是否绘制
            if (p2 != 0) {
                //计算第2块的中间弧度
                var centerPoint = -p1 * PI * 2 - p2 * PI + SR;
                //计算第1块的中间弧度
                var p1cPoint = -p1 * PI + SR;
                //计算第3块的中间弧度
                var p3cPoint = -p1 * PI * 2 - p2 * PI *2-p3*PI+ SR;

                //坐标点
                var hx = DX + RADIUS * Math.cos(centerPoint);
                var hy = DY + RADIUS * Math.sin(centerPoint);
                var nhx = DX + RADIUS * Math.cos(p1cPoint);
                var nhy = DY + RADIUS * Math.sin(p1cPoint);
                var ehx = DX + RADIUS * Math.cos(p3cPoint);
                var ehy = DY + RADIUS * Math.sin(p3cPoint);
                var tx = DX + RADIUS * LRATE * Math.cos(centerPoint);
                var ty = DY + RADIUS * LRATE * Math.sin(centerPoint);
                var t = tx > hx ? (tx + 40) : (tx - 40);
                var e = 0, ex = 0;

                //根据前后块
                if (Math.abs(nhy - hy) <= 43 && Math.abs(nhx - hx) <= 18) {
                    e = tx - 30;
                    ex = tx - 70;
                }else if (Math.abs(ehy - hy) <= 43 && Math.abs(ehx - hx) <= 43) {
                    e = tx + 30;
                    ex = tx + 70;
                }else if (tx > hx) {
                    e = tx + 30;
                    ex = tx + 70;
                } else {
                    e = tx - 30;
                    ex = tx - 70;
                }

                //绘制饼块
                ctx.beginPath();
                ctx.strokeStyle = colors[1];
                ctx.lineWidth = strokeWidth[1];
                //根据开始弧度和结束弧度绘制饼块
                ctx.arc(DX, DY, RADIUS, -p1 * 2 * PI + SR, -p2 * 2 * PI - p1 * 2 * PI + SR, true);
                ctx.stroke();
                ctx.closePath();

                //绘制折线
                ctxText2.clearRect(0,0,canvas2.width,canvas2.height);
                ctxText2.beginPath()
                ctxText2.moveTo(hx, hy);
                ctxText2.lineTo(tx, ty);
                ctxText2.lineTo(e, ty);
                ctxText2.strokeStyle = colors[1];
                ctxText2.lineWidth = 2;
                ctxText2.stroke();
                ctxText2.closePath();

                //绘制小原点
                ctxText2.beginPath();
                ctxText2.fillStyle = colors[1];
                ctxText2.arc(e, ty, 6, 0, PI * 2, false);
                ctxText2.fill();
                ctxText2.closePath();

                //绘制文本
                ctxText2.font = "normal 26px Microsoft YaHei,Arial";               
                ctxText2.textAlign = 'center';
                ctxText2.fillText(dataSet[1].use, ex, ty - 16);
                ctxText2.fillText(dataSet[1].type, ex, ty + 16);
            }
        }
        //保存第3个块绘制完毕的图像
        function savePathThree() {
            //根据占比，判断是否绘制
            if (p3 != 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                savePathOne();
                savePathTwo();

                //计算第3块的中间弧度
                var centerPoint = -p1 * 2 * PI - p2 * 2 * PI - p3 * PI + SR;
                //计算第1块的中间弧度
                var p1cPoint = - p1  * PI  + SR;
                //计算第2块的中间弧度
                var p2cPoint =  -p1 * 2 * PI - p2  * PI + SR;

                //坐标点
                var hx = DX + RADIUS * Math.cos(centerPoint);
                var hy = DY + RADIUS * Math.sin(centerPoint);
                var nhx = DX + RADIUS * Math.cos(p1cPoint);
                var nhy = DY + RADIUS * Math.sin(p1cPoint);
                var ehx = DX + RADIUS * Math.cos(p2cPoint);
                var ehy = DY + RADIUS * Math.sin(p2cPoint);
                var tx = DX + RADIUS * LRATE * Math.cos(centerPoint);
                var ty = DY + RADIUS * LRATE * Math.sin(centerPoint);
                var t = tx > hx ? (tx + 40) : (tx - 40);
                var e = 0,ex = 0;

                //根据前后的
                if(Math.abs(nhy - hy)<= 43 && Math.abs(nhx - hx) <= 18){
                    e = tx +30;
                    ex = tx + 70;
                }else if(Math.abs(ehy - hy)<= 43&&Math.abs(ehx - hx)<= 43){
                    e = tx - 30;
                    ex = tx - 70;
                }else if(tx>hx){
                    e = tx + 30;
                    ex = tx + 70;
                }else{
                    e = tx - 30;
                    ex = tx - 70;
                }


                //绘制饼块
                ctx.beginPath();
                ctx.strokeStyle = colors[2];
                ctx.lineWidth = strokeWidth[2];
                //根据开始弧度和结束弧度绘制饼块
                ctx.arc(DX, DY, RADIUS, -p2 * 2 * PI - p1 * 2 * PI + SR, SR, true);
                ctx.stroke();
                ctx.closePath();

                
                // 绘制折线
                ctxText3.clearRect(0,0,canvas3.width,canvas3.height);
                ctxText3.beginPath()
                ctxText3.moveTo(hx, hy);
                ctxText3.lineTo(tx, ty);
                ctxText3.lineTo(e, ty);
                ctxText3.strokeStyle = colors[2];
                ctxText3.lineWidth = 2;
                ctxText3.stroke();
                ctxText3.closePath();

                //绘制小圆点
                ctxText3.beginPath();
                ctxText3.fillStyle = colors[2];
                ctxText3.arc(e, ty, 6, 0, PI * 2, false);
                ctxText3.fill();
                ctxText3.closePath();

                //绘制文本
                ctxText3.font = "normal 26px Microsoft YaHei,Arial";       
                ctxText3.textAlign = 'center';
                ctxText3.fillText(dataSet[2].use, ex, ty - 16);
                ctxText3.fillText(dataSet[2].type, ex, ty + 16);

            }
        }
        drawOne();
        // savePathThree();
    },
    // 本月支出动画
    showExpend: function(selector, expend) {

        if (!selector) {
            return false;
        }

        var selector = selector;
        var t = 0;

        function show() {
            //改变时间   改变D     1s=60
            var b = 0,c = expend,d = 40;
            //制作数字不断增加的效果
            selector.innerHTML = Tween.Linear(t, b, c, d).toFixed(2);
            if (t < d) {
                t++;
                requestAnimationFrame(show);
            } else {
                t = 0;
                selector.innerHTML = c.toFixed(2);
            }
        }
        show();
    }
};
// 基于jquery的tap
;(function($) {
    var touch = {}, tapTimeout;
    var now, delta;
    $(function(){
        $(document.body).on('touchstart', function(e) {
            now = Date.now();
            delta = now - (touch.last || now);
            var e = e.originalEvent;
            touch.el = $(e.touches[0].target);
            if (delta > 0 && delta <= 250) {touch.isDoubleTap = true;}
            touch.last = now
        }).on('touchmove', function(e) {
            var e = e.originalEvent;
            cancelAll()
        }).on('touchend', function(e) {
            if ('last' in touch)
                tapTimeout = setTimeout(function() {
                    touch.el.trigger("tap");
                    if (touch.isDoubleTap) {
                        touch.el.trigger('doubleTap')
                        touch = {}
                    }
                }, 10);
        }).on('touchcancel', cancelAll);
    });
    function cancelAll() {
        if (tapTimeout) {clearTimeout(tapTimeout);}
        tapTimeout = null
        touch = {}
    }
    ['doubleTap', 'tap'].forEach(function(m) {
        $.fn[m] = function(callback) {
            return this.on(m, callback);
        }
    });
})(jQuery);
/** 检测使用滑动固定元素 */
(function ($) {
  "use strict";
  $.fn.pin = function (options) {
      var scrollY = 0, elements = [], disabled = false, $window = $(window);

      options = options || {};

      var recalculateLimits = function () {
          for (var i=0, len=elements.length; i<len; i++) {
              var $this = elements[i];

              if (options.minWidth && $window.width() <= options.minWidth) {
                  if ($this.parent().is(".pin-wrapper")) { $this.unwrap(); }
                  $this.css({width: "", left: "", top: "", position: ""});
                  if (options.activeClass) { $this.removeClass(options.activeClass); }
                  disabled = true;
                  continue;
              } else {
                  disabled = false;
              }

              var $container = options.containerSelector ? $this.closest(options.containerSelector) : $(document.body);
              var offset = $this.offset();
              var containerOffset = $container.offset();
              var parentOffset = $this.offsetParent().offset();

              if (!$this.parent().is(".pin-wrapper")) {
                  $this.wrap("<div class='pin-wrapper'>");
              }

              var pad = $.extend({
                top: 0,
                bottom: 0
              }, options.padding || {});

              $this.data("pin", {
                  pad: pad,
                  from: (options.containerSelector ? containerOffset.top : offset.top) - pad.top - $(".j_record-check").offset().top+8,
                  to: containerOffset.top + $container.height() - $this.outerHeight() - pad.bottom,
                  end: containerOffset.top + $container.height(),
                  parentTop: parentOffset.top
              });

              $this.css({width: $this.width()});
              $this.parent().css("height", $this.height());
          }
      };

      var onScroll = function () {
          if (disabled) { return; }

          scrollY = $window.scrollTop();

          var elmts = [];
          for (var i=0, len=elements.length; i<len; i++) {          
              var $this = $(elements[i]),
                  data  = $this.data("pin");

              if (!data) { // Removed element
                continue;
              }

              elmts.push($this); 
                
              var from  = data.from,
                  to    = data.to;
            
              if (from + $this.outerHeight() > data.end) {
                  $this.css('position', '');
                  continue;
              }
              if (from < scrollY && to > scrollY) {
                  !($this.css("position") == "fixed") && $this.css({
                      left: $this.offset().left - 25,
                      top: data.pad.top + $(".j_record-check").offset().top-18
                  }).css({"position":"fixed","z-index":99});
                  if (options.activeClass) { $this.addClass(options.activeClass); }
              } else if (scrollY >= to) {
                  $this.css({
                      left: "",
                      top: to - data.parentTop + data.pad.top
                  }).css("position", "absolute");
                  if (options.activeClass) { $this.addClass(options.activeClass); }
              } else {
                  $this.css({position: "", top: "", left: ""});
                  if (options.activeClass) { $this.removeClass(options.activeClass); }
              }
        }
        elements = elmts;
      };

      var update = function () { recalculateLimits(); onScroll(); };

      this.each(function () {
          var $this = $(this), 
              data  = $(this).data('pin') || {};

          if (data && data.update) { return; }
          elements.push($this);
          $("img", this).one("load", recalculateLimits);
          data.update = update;
          $(this).data('pin', data);
      });

      $window.scroll(onScroll);
      $window.resize(function () { recalculateLimits(); });
      recalculateLimits();

      $window.load(update);

      return this;
    };
})(jQuery);
var mobile = window.mobile = {};
mobile.drawLineChart = function (obj) {
	var obj = util.merge({
		elementId:'#lineChart',
		tooltipId:'#tooltip',
		width: 320,
		height:150, 
		data:[],
		duration:100,
		delay:100,
		xTicks: true,//x刻度
		xTickstransX:10,//x轴线原点x坐标
		xTickstransY:150,//x轴线原点y坐标
		xTickamt:6,
		xTicksize:5,
		xAxis: true,//x轴值
		xAxisfill: "#999",
		activexAxisFill:"#fff",
		xAxisamt:6,
		xAxissize:-150,
		xflexline:false,
		xAxisformat: d3.time.format('%m月'),
		yTicks: true,//y刻度
		yTickamt:6,
		yTicksize: 320,
		yAxis: true,//x轴值
		yAxisamt:5,
		yAxissize:5,
		radius:2,//小圆点半径
		stroke:"#359be1",//线条颜色
		fill:"#359be1",//圆点填充颜色
		cycleActive:true,//当前点是否激活
		activeFill:"#fff",//当前圆点颜色
		marginWidth: 50,//折线图两边总间距
		area: false,//是否显示区域
		areafill:"none",
		tipIndex:0, //提示框索引
		tipXDeviation: 0, //提示框偏差
		tipYDeviation: 0, //提示框偏差
		showcurval:true,//是否显示当前文本值
		showtip:true,//默认是否显示提示框
		tipCallback:function(){}
	},obj);
	var parse = d3.time.format('%Y-%m-%d').parse;
	var data1 = obj.data;
	var data = obj.data.map(function(datum) {
		datum.date = parse(datum.date);
		return datum;
	});
	var width = obj.width || 320,
	height = obj.height || 150,
	margin = {top: 30,right: 10,left: 10},
	tooltipId = obj.tooltipId || "#tooltip",
	marginWidth = obj.marginWidth || 100,
	container = d3.select(obj.elementId),
	svg = container.select('svg').attr('width', width).attr('height', height + margin.top),
	xscale = d3.time.scale().range([0, width - marginWidth]).domain([data[0].date, data[data.length - 1].date]),
	yscale = d3.scale.linear().range([height, 22]).domain([0, d3.max(data,function(d) { return d.value;})]),
	
	//区域图
	area = d3.svg.area().interpolate('linear').x(function(d) {
		return xscale(d.date) + marginWidth / 2;
	}).y0(height).y1(function(d) {
		return yscale(d.value)
	}),
	//折线
	line = d3.svg.line().x(function(d) {
		return xscale(d.date) + marginWidth / 2;
	}).y(function(d) {
		return yscale(d.value);
	}).tension(0.1).interpolate("linear"),
	startData = data.map(function(datum) {
		return {
			date: datum.date,
			value: 0
		}
	}),
	circleContainer,
	textwrap;
	var o = {
			xscale:null,
			yscale:null,
			data: [],
			setData: function(d){
				o.data = d;
			},
			getData: function(){
				return o.data;
			},
			init: function(){
				$(obj.elementId).find("g").remove();
				$(obj.elementId).find("path").remove();
				//$(".lineChart-xAxisTicks, .lineChart-xAxis,.lineChart-yAxisTicks,.lineChart-areaLine,.lineChart-area,.lineChart-text,.lineChart-circlewrap").remove();
				o.setData(data); 
				if(obj.xTicks){
					//x轴网格线
					var xAxisTicks = d3.svg.axis().scale(xscale).ticks(obj.xTickamt).tickSize(obj.xTicksize).tickFormat('');
					svg.append('g').attr('class', 'lineChart-xAxisTicks').attr('transform', 'translate(' + obj.xTickstransX + ',' + obj.xTickstransY + ')').call(xAxisTicks);
				}
				if(obj.xAxis){
					//x轴下标
					var xAxis = d3.svg.axis().scale(xscale).ticks(obj.xAxisamt).tickSize(obj.xAxissize).tickFormat(obj.xAxisformat);
					svg.append('g').attr('class', 'lineChart-xAxis').attr('transform', 'translate(' + marginWidth / 2 + ',' + (height + 7) + ')').call(xAxis);
				}
				if(obj.yTicks){
					//y轴网格线
					var yAxisTicks = d3.svg.axis().scale(yscale).ticks(obj.yTickamt).tickSize(obj.yTicksize).tickFormat('').orient('right');
					svg.append('g').attr('class', 'lineChart-yAxisTicks').call(yAxisTicks);
				}
				
				o.drawMainChart();
			},
			drawMainChart: function(){
				//从下往上折线动画
/*			svg.append('path').datum(startData).attr('class', 'lineChart-areaLine').attr("stroke",obj.stroke).transition().duration(obj.duration/2)
				.delay(obj.duration/2)
				.attrTween('d', o.tween(data, line)) 
				.each('end',function(d,i) {
					o.drawEachObjects(data);
				});*/

				//从左到右折线动画
				var pathani = svg.append('path').datum(startData).attr("stroke",obj.stroke).transition().duration(obj.duration/2)
				.delay(obj.duration/2)
				//.attrTween('d', o.tween(data, line))
				.attr("d", function() { return line(data); }).attr("stroke-dashoffset","1000").attr("stroke-dasharray","1000").attr('class', 'lineChart-areaLine')
				.each('end',function(d,i) { 
					o.drawEachObjects(data);
					d3.select(this).attr('class', 'pathAnima'); 
				});
				//从左到右折线动画
/*				svg.append('path').attr('class', 'lineChart-areaLine').attr("stroke",obj.stroke)
        .transition()
        .duration(obj.duration).delay(obj.duration / 2)
        .attrTween('d', o.getInterpolation).each('end',function(d,i) {
					o.drawEachObjects(data);
				});*/
/*				svg.select("defs #graphs_clip_path rect").attr("x", xscale(data[0].date) + marginWidth/2).attr("y", 0).attr("width", obj.width).attr("height", obj.height);
				var new_lines = svg.append('g').classed("line", true);
				//新绘画一条折线 
				new_lines.append("clipPath").attr("class", "clippath").attr("id", "clip_pathtemp").append("rect")
				.attr("x", xscale(data[0].date) + marginWidth/2).attr("width", 0).attr("y", 0).attr("height", obj.height);
				new_lines.append("path").attr("stroke", obj.stroke).attr("fill", "none").style("clip-path", "url(#clip_pathtemp)").attr("d", function() { return line(data); });
				var left_to_right_appear_transition = new_lines.transition().duration(1000).ease("linear");
				//.select(".clippath").remove()
				left_to_right_appear_transition.select("rect").attr("width", obj.width);
				left_to_right_appear_transition.select("path").each('end', function() {
			    	o.drawEachObjects(data);
				    return d3.select(this).style("clip-path", "url(#graphs_clip_path)");
				});*/
				
				if(obj.area){
					svg.append('path').datum(startData).attr('class', 'lineChart-area').attr('d', area).transition().duration(obj.duration/2).attr('fill', obj.areafill)
					.attrTween('d', o.tween(data, area));
				}
			},
			drawEachObjects: function(data){
				circleContainer = svg.append('g').attr('class', 'lineChart-circlewrap');
				textwrap = svg.append("g").attr("class", "lineChart-text").attr("transform","translate("+marginWidth / 2+","+height/2+")");
				data.forEach(function(datum, index) {
					o.drawCircle(circleContainer,datum, index);
					o.drawText(textwrap,datum, index);
				})
			}, 
			drawCircle: function(container,datum, index) {
				container.datum(datum).append('circle').attr('class', 'lineChart-circle').attr('r', 0).attr('fill', obj.fill).attr("stroke",obj.stroke)
				.attr('cx',	function(d) {
					return xscale(d.date) + marginWidth / 2
				})
				.attr('cy',	function(d) {
					return yscale(d.value)
				})
				.transition().delay(obj.duration / 10 * index).attr('r', obj.radius).each('end',function(d,i) {
					//设置默认圆点样式
					if(obj.cycleActive && index===data.length-1){
						o.setCircleStyle(obj.tipIndex,{"fill":obj.fill},{"fill":obj.activeFill});
					}
					//显示提示框
					if(obj.showtip && index===data.length-1){
						o.initTip();
					}
				});
			},
			drawText: function(container,datum, index) {
				container.datum(datum).append('text')
					.attr("display",function(){
						if(index===obj.tipIndex && !obj.showcurval){	return 'none';}
					})
			   .text(function(d,i) {
		        return d.value;
			   	}).attr('fill', obj.xAxisfill).attr("font-size","10px").attr("text-anchor", "middle").attr("opacity","0")
/*					.attr("y", function(d,i) {
						return yscale(d.value) + 100;
					})*/
					.attr("y", function(d,i) {
						return yscale(d.value) - height/2 -12;
					})
					.attr("x", function(d, i) {
						return xscale(d.date);
					})
					.transition().duration(obj.duration/2).delay(obj.duration / 10 * index).attr("opacity","1")
			},
			//初始化气泡
			initTip: function(){
				o.showTip(obj.tipIndex,obj.tipXDeviation,obj.tipYDeviation);
				o.setxAxisStyle(obj.tipIndex,{"fill":obj.xAxisfill},{"fill":obj.activexAxisFill});
			},
			showTip: function(i) {
				if( i>= data.length){	i = data.length-1;}
				if(i < 0){i = 0;}
				var p = 0,q=0;
				if(arguments.length >1 && arguments[1]!=0){p = arguments[1];}
				if(arguments.length >2 && arguments[2]!=0){q = arguments[2];}
				var xPosition = xscale(data[i].date) + p;
				var yPosition =  yscale(data[i].value) + q;
				d3.select(tooltipId).classed("hide",false);
				d3.select(tooltipId).select(".j_value").text(data[i].value);
				d3.select(tooltipId).style("opacity",0)
				.style("left",xPosition+"px")
				.style("top",yPosition+"px")
				.transition().duration(obj.duration/3)
				.style("opacity",1);
				obj.tipCallback();
			},
			//对单个小圆点设置样式
			setCircleStyle: function(i,old,css){
				$(obj.elementId).find("svg").find(".lineChart-circle").css(old);
				$(obj.elementId).find("svg").find(".lineChart-circle").eq(i).css(css);
			},
			//对x轴文本设置样式
			setxAxisStyle: function(i,old,css){
				$(obj.elementId).find("svg").find(".lineChart-xAxis").find(".tick").find("text").css(old);
				$(obj.elementId).find("svg").find(".lineChart-xAxis").find(".tick").find("text").eq(i).css(css);
			},
			hideTip: function(data) {
				d3.select(tooltipId).classed("hide",true);
			},
			initText: function(){
				var textwrap = svg.append("g").attr("class", "lineChart-text").attr("transform","translate("+marginWidth / 2+","+height/2+")");
				//数值  
				textwrap.selectAll("text").data(data1).enter().append("text")
				   .text(function(d,i) {
				  	 		if(i===obj.tipIndex && !obj.showcurval){	return '';}
				        return d.value;
				   })  
				   .attr("text-anchor", "middle")  
				   .attr("x", function(d, i) {
				  	 return xscale(d.date);
				   })
				   .attr("font-size","10px")
				   .attr("fill", obj.xAxisfill)
				   .attr("y", function(d,i) {
				  	 return yscale(d.value)+100;
				   });		
				//数值  
				textwrap.selectAll("text").data(data1)
				.transition()
				.delay(function(d,i){
				    return  i/data1.length*1000;  
				})
				.duration(obj.duration)
				/*.ease("elastic")*/
				.attr("y", function(d) {
					return yscale(d.value) - height/2 -12;
				});

			},
			initFlexline: function(){
				if(obj.xflexline){
					var dashlinewrap = svg.append("g").attr("class", "lineChart-dash").attr("transform","translate("+marginWidth / 2+","+height/2+")");
					dashlinewrap.selectAll("line").data(data1).enter().append("line")
						  .attr("x1", function(d, i) {  
						 	 return xscale(d.date);
						  })  
					   .attr("x2", function(d, i) {  
					  	 return xscale(d.date);
					   })  
					   .attr("y1", function(d,i) {  
					  	 return height/2;
					   })
					   .attr("y2", function(d,i) {  
					  	 return yscale(d.value)- height/2;
					   })
					   .attr("stroke-dasharray", "2,1")
					   .attr("stroke", "#4d4c53")
					   .attr("stroke-width", "1px");
				}
			}, 
			tween:function(b, callback) {
				return function(a) {
					var i = d3.interpolateArray(a, b);
					return function(t) {
						return callback(i(t))
					}
				}
			}, 
			getInterpolation: function() {
			  var interpolate = d3.scale.quantile().domain([0,1]).range(d3.range(1, data.length + 1));
			  return function(t) {
					var interpolatedLine = data.slice(0, interpolate(t));
					return line(interpolatedLine);
			  }
			},
			getSmoothInterpolation: function(data) {
			  return function (d, i, a) {
			      var interpolate = d3.scale.linear().domain([0,1]).range([1, data.length + 1]);
			      return function(t) {
			          var flooredX = Math.floor(interpolate(t));
			          var weight = interpolate(t) - flooredX;
			          var interpolatedLine = data.slice(0, flooredX);
			          log(flooredX,weight,interpolatedLine);     
			          if(flooredX > 0 && flooredX < 31) {
									var weightedLineAverage = yscale(data[flooredX].value) * weight + yscale(data[flooredX-1].value) * (1-weight);
									log(weightedLineAverage);
									interpolatedLine.push({"x":interpolate(t)-1, "y":weightedLineAverage});
							}
			        return line(interpolatedLine);
			    }
			  }
			}
	};
	o.init();
	//o.initText();
	o.initFlexline();
	
	return o;
}
mobile._supportSticky = function(){
    var e = document.createElement("i"),
        n = "-webkit-sticky";
        e.style.position = n;
        var t = e.style.position;
        e = null;
        return t === n;
}


