/**
 * slide插件，完成图片滑动，定时轮播。
 * @author mingdd。
 * @param  {object} 配置参数 。
 */
(function ($) {
window.slide = $.slide = function (opt) {
  var opts = $.extend({
		selector: '#slide',  //滑动的块
		src: [],//图片的src
		alt: [],//图片的alt
		text: [],//图片的text
		src: [],   
		alt: [],  
		text: [], 
		fix: false,  //是否固定大小
		width: 320, //宽
		height: 195, //高
		images: 3,  //展示图片的格式
		slides: 1,  //每次滑动图片个数
		length: 40, //触屏最小滑动长度
		control: true, //是有控制按钮
		controlwidth:100,//控制区用于放置按钮的宽
		loop: true, //是否是无缝轮播
		auto: false, //自动轮播
		speed: 800, //滑动速度
		delay: 5000, //滚动间隔
		before:function(){}
  }, {}, opt);
  var _selector = $(opts.selector);
  var src = opts.src, alt = opts.alt, text = opts.text;
  var s = src.length||_selector.find('ul').find('li').size();    //需要展示图片张数
  var slides = opts.slides, images = opts.images, ms = slides > images ? slides : images;//slides每次滑动图片张数，images每次展示的图片张数，ms需要复制的图片张数。
  var i = 0, starX = 0;//i标记图片位置，straX标记触屏初始点
  var timer;  //计时器
  var finish = false;  //标记图片是否全部加载
  var _wrap = _selector.find('.slidewrap');
  var o = {
  		mainwidth: 0,
			getBox: function(){
				return _selector;
			},
      //初始化UI
      initUI: function () {
          if(src.length){
              var html = '<div class="slidemain oh mlrauto"><ul class="slidewrap lsn nop nom w-mx clearfix">';
              for (var i = 0; i < src.length; i++) {
                  if (i < images) {
                      html += '<li class="l fl"><a class="block ps tac" href="javascript:;"><img class="fullw b round-5" src="' + src[i] + '" alt="' + alt[i] + '"/><span class="ms block tac oh wwn toe">' + text[i] + '</span></a></li>';
                  } else {
                      html += '<li class="l fl"><a class="block ps tac" href="javascript:;"><img class="fullw b round-5" data-src="' + src[i] + '" alt="' + alt[i] + '"/><span class="ms block tac oh wwn toe">' + text[i] + '</span></a></li>';
                  }
              }
              html += '</ul></div>';
              if (opts.control) {
                  html += '<a id="btnLeft" class="black posa b" href="javascript:;"></a><a id="btnRight" class="black posa b" href="javascript:;"></a>';
              }
              $(html).prependTo(_selector);
          }
          if (opts.fix) {
          	o.setWidth(opts.width);
            _selector.width(opts.width).height(o.getHeight());
	        }else{
	          log($(opts.selector).width());
          	o.setWidth($(opts.selector).width());
	        }
          //判断是否需要复制节点
          if (opts.loop) { 
              //复制节点
              _wrap.find('li').slice(0, ms).clone(true).appendTo(_wrap);
              _wrap.find('li').slice(s - ms, s).clone(true).prependTo(_wrap);
          } else {
              ms = 0;
          }
	        if(opts.control){
		        _selector.find('.slidemain').width(o.getWidth()-opts.controlwidth);
	          _selector.find('#btnLeft').css(opts.btnLeftStyle);
	          _selector.find('#btnRight').css(opts.btnRightStyle);
	        }else{
	        	_selector.find('.slidemain').width(o.getWidth());
	        }
          //更改ul位置
          _wrap.css({"marginLeft": -ms * o.getItemWidth(),"width":"99999px"}).find('li').each(function () {
              $(this).width(o.getItemWidth());
          });
      },
      setWidth: function(v){
      	o.mainwidth = v;
      },
      //获取selector的宽
      getWidth: function () {
      	return o.mainwidth;
      },
      //获取selector的高
      getHeight: function () {
          return opts.height;
      },
      //获取每个li的宽
      getItemWidth: function () {
        if (opts.control){ return (o.getWidth()-opts.controlwidth) / images;}
        return o.getWidth() / images;
      },
      //获取展示图片的张数
      getimages: function () {
          return opts.images;
      },
      //左移
      leftMove: function () {
          w = o.getItemWidth();
          if (!_wrap.is(':animated')) {
              o.lazyLoad('left', i + slides, images);
              //判断是否做无缝滚动
              if (!opts.loop && i + images + slides > s) {
                  _wrap.stop().animate({marginLeft: -(s - images) * w}, opts.speed, function () {
                      i = s - images;
                  });
              } else {
                  _wrap.stop().animate({marginLeft: '-=' + slides * w}, opts.speed, function () {
                      i += slides;
                      if (i + slides > s) {
                          i = i - s;
                          _wrap.css({marginLeft: -i * w - ms * w});
                      }
                  });
              }
          }
      },
      //右移
      rightMove: function () {
          w = o.getItemWidth();
          if (!_wrap.is(':animated')) {
              o.lazyLoad('right', i - slides, images);
              //判断是否做无缝滚动
              if (!opts.loop && i - slides < 0) {
                  _wrap.stop().animate({marginLeft: 0}, opts.speed, function () {
                      i = 0;
                  });
              } else {
                  _wrap.stop().animate({marginLeft: '+=' + slides * w}, opts.speed, function () {
                      i -= slides;
                      if (i < 0) {
                          i = i + s;
                          _wrap.css({marginLeft: -i * w - ms * w});
                      }
                  });
              }
          }
      },
      //图片懒加载
      lazyLoad: function (towards, index, n) {
          if (!finish) {
              //根据方向加载图片
              switch (towards) {
                  case 'left':
                      if (index + slides > s) {
                          index -= s;
                      }
                      break;
                  case 'right':
                      if (index < slides) {
                          index += s;
                      }
                      break;
              }
              var _img = _wrap.find('img');
              var _item;
              //加载图片
              for (var i = 0; i < n; i++) {
                  _item = _img.eq(ms + i + index);
                  if (_item.attr('data-src')) {
                      _item.attr('src', _item.attr('data-src')).removeAttr('data-src');
                  }
              }
              o.judge(_img);
          }
      },
      //判断图片是否加载完
      judge: function (img) {
          finish = true;
          for (var i = 0; i < s; i++) {
              if (img.eq(ms + i).attr('data-src')) {
                  finish = false;
              }
          }
          //图片加载完，更改所有节点的data-src。
          if (finish) {
              for (i = 0; i < s + 2 * ms; i++) {
                  if (img.eq(i).attr('data-src')) {
                      img.eq(i).attr('src', img.eq(i).attr('data-src')).removeAttr('data-src');
                  }
              }
          }
      },
      //touchStar事件
      touchStar: function (event) {
					//event.preventDefault();
          o.endLoop();
          starX = parseInt(event.touches[0].clientX, 10);
      },
      //touchMove事件
      touchMove: function (event) {
				event.preventDefault();
				o.endLoop();
      },
      // touchEnd事件
      touchEnd: function (event) {
          var endX = parseInt(event.changedTouches[0].clientX, 10);
          var d = parseInt((endX - starX), 10);
					event.preventDefault();
          if (d < -opts.length) {
              o.leftMove();
          } else if (d > opts.length) {
              o.rightMove();
          }
          o.startLoop();
      },
      //开始轮播
      startLoop: function () {
          if (opts.auto) {
              timer = setInterval(o.leftMove, opts.delay);
          }
      },
      // 停止轮播
      endLoop: function () {
          if (opts.auto && timer) {
              clearInterval(timer);
          }
      },
      //绑定触屏事件
      bindEvent: function () {
				if (util.supportTouch) {
          _selector[0].addEventListener("touchstart", o.touchStar, false);
          _selector[0].addEventListener("touchend", o.touchEnd, false);
          _selector[0].addEventListener("touchmove", o.touchMove, false);
         _selector.find('#btnLeft')[0].addEventListener("touchstart", o.rightMove, false);
         _selector.find('#btnRight')[0].addEventListener("touchstart", o.leftMove, false);
				}else{
         _selector.find('#btnLeft').on('click', o.rightMove);
         _selector.find('#btnRight').on('click', o.leftMove);
				}
      },
      bindCommonEvent: function () {
      },
      //初始化
      init: function () {
					opts.before();
          o.initUI();
          //加载初次展示的图片，如果dom的初始就为src可以删去。
          //o.lazyLoad('right', 0, images);
          o.startLoop(); 
          o.bindEvent();
        }
    };
    o.init();
    return o;
}
})(jQuery);