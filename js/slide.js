/**
 * slide插件，完成图片滑动，定时轮播。
 * @author mingdd。
 * @param  {object} 配置参数 。
 */
(function ($) {
    $.extend({
        "slide": function (opt) {
            var opts = $.extend({
                box: '.slide',  //滑动的块
                wrap: '.slidewrap',     //li的包装集
                fix: false,  //是否固定大小
                width: 250, //宽
                height: 120, //高
                images: 3,  //展示图片的格式
                slides: 2,  //每次滑动图片个数
                length: 40, //触屏最小滑动长度
                auto: true, //自动轮播
                speed: 300, //滑动速度
                delay: 3000 //滚动间隔
            }, {}, opt);
            var _box = $(opts.box), _wrap = $(opts.wrap);
            var s = _wrap.find('li').size();
            var sls = opts.slides, imgs = opts.images;
            var i = 0;
            var starX = 0;
            var timer;
            var width, w, h, m;

            var o = {
                /**
                 * 初始化UI
                 */
                initUI: function () {
                    if (opts.fix) {
                        width = opts.width;
                        h = opts.height;
                        _box.width(width).height(h);
                    } else {
                        width = _box.width();
                    }

                    w = (width / imgs).toFixed(1);
                    m = parseInt(_wrap.find('img').css('margin'));

                    _wrap.find('li').slice(0, s).clone(true).appendTo('.slidewrap');
                    _wrap.find('li').slice(0, s).clone(true).prependTo('.slidewrap');

                    /**
                     * 设置每个li的height和width
                     */
                    _wrap.css({marginLeft: -s * w}).find('li').each(function () {
                        if (opts.fix) {
                            $(this).width(w).height(h).find('img').width(w - 2 * m).height(h - 2 * m);
                        } else {
                            $(this).width(w).find('img').width(w - 2 * m);
                        }
                    });
                    /**
                     * 对于不定高的，根据加载的第一张图片高度设置容器的高
                     */
                    if(!opts.fix){
                        var img = _wrap.find('img:first');
                        img.on("load", function () {
                            _box.height(_wrap.height());
                        });                        
                    }
                },
                /**
                 * 图片懒加载函数
                 */
                lazyLoad: function () {
                    $('.lazyload').find("img:visible").each(function () {
                        var _this = $(this);
                        if (_this.attr("src3")) {
                            _this.attr("src", $(this).attr("src3"));
                            _this.removeAttr("src3");
                        }
                    });
                },
                /**
                 * 图片向左滚动
                 */
                leftMove: function () {
                    if (!_wrap.is(":animated")) {
                        _wrap.stop().animate({"left": "-=" + sls * w}, opts.speed, function () {
                            i += sls;
                            if (i >= s) {
                                i = i - s;
                                _wrap.css({left: -i * w});
                            }
                        });
                    }
                    o.lazyLoad();
                },
                /**
                 * 图片向左滚动
                 */
                rightMove: function () {
                    if (!_wrap.is(":animated")) {
                        _wrap.stop().animate({"left": "+=" + sls * w}, opts.speed, function () {
                            i -= sls;
                            if (i <= -s + sls) {
                                i = i + s;
                                _wrap.css({left: -i * w});
                            }
                        });
                    }
                    o.lazyLoad();
                },
                /**
                 * touchStar事件
                 * @param  {object} event [touch事件]
                 */
                touchStar: function (event) {
                    event.preventDefault();
                    o.endLoop();
                    starX = parseInt(event.touches[0].clientX, 10);
                },
                 /**
                 * touchMove事件
                 * @param  {object} event [touch事件]
                 */
                touchMove: function (event) {
                    event.preventDefault();
                    o.endLoop();
                },
                /**
                 * touchEnd事件
                 * @param  {object} event [touch事件]
                 */
                touchEnd: function (event) {
                    event.preventDefault();
                    var endX = parseInt(event.changedTouches[0].clientX, 10);
                    var d = parseInt((endX - starX), 10);
                    if (d < -opts.length) {
                        o.leftMove();
                    } else if (d > opts.length) {
                        o.rightMove();
                    }
                    o.startLoop();
                },
                /**
                 * 开始轮播
                 */
                startLoop: function () {
                    if (opts.auto) {
                        timer = setInterval(o.leftMove, opts.delay);
                    }
                    o.lazyLoad();
                },
                /**
                 * 停止轮播
                 */
                endLoop: function () {
                    if (opts.auto && timer) {
                        clearInterval(timer);
                    }
                },
                /**
                 * 绑定事件
                 */
                bindEvent: function () {
                    _box[0].addEventListener("touchstart", o.touchStar, false);
                    _box[0].addEventListener("touchend", o.touchEnd, false);
                    _box[0].addEventListener("touchmove", o.touchMove, false);
                },
                /**
                 * 初始化
                 */
                init:function(){
                    o.initUI();
                    o.lazyLoad();
                    o.startLoop();
                    o.bindEvent();
                }
            };
            o.init();
            return o;
        }
    });
})(jQuery);