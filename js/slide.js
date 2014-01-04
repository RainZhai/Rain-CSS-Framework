/**
 * slide插件，完成图片滑动，定时轮播。
 * @author mingdd。
 * @param  {object} 配置参数 。
 */
(function ($) {
    $.extend({
        "slide": function (opt) {
            var opts = $.extend({
                box: '.slide',  //滑动的块s
                wrap: '.slidewrap',     //li的包装集
                fix: false,  //是否固定大小
                width: 320, //宽
                height: 195, //高
                images: 3,  //展示图片的格式
                slides: 1,  //每次滑动图片个数
                length: 40, //触屏最小滑动长度
                auto: true, //自动轮播
                speed: 800, //滑动速度
                delay: 5000 //滚动间隔
            }, {}, opt);
            var box = opts.box, wrap = opts.wrap;
            var _box = $(box), _wrap = $(wrap);
            var s = _wrap.find('li').size();
            var sls = opts.slides, imgs = opts.images, ms = sls > imgs ? sls : imgs;
            var i = 0, starX = 0;
            var timer;
            var width, w, h;

            var o = {
                //初始化UI
                initUI: function () {
                    width = o.getWidth(), h = o.getHeight, w = o.getItemWidth();
                    if (opts.fix) {
                        _box.width(width).height(h);
                    }
                    //复制节点
                    _wrap.find('li').slice(0, ms).clone(true).appendTo(wrap);
                    _wrap.find('li').slice(s - ms, s).clone(true).prependTo(wrap);
                    //更改位置
                    _wrap.css({marginLeft: -ms * w}).find('li').each(function () {
                        $(this).width(w);
                    });
                    _box.width(width);
                },
                //获取box的宽
                getWidth: function () {
                    if (opts.fix) {
                        return opts.width;
                    }
                    return _box.width();
                },
                //获取box的高
                getHeight: function () {
                    return opts.height;
                },
                //获取每个li的宽
                getItemWidth: function () {
                    return o.getWidth() / imgs;
                },
                //获取展示图片的张数
                getImgs: function () {
                    return opts.imgs;
                },
                //左移
                leftMove: function () {
                    w = o.getItemWidth();
                    if (!_wrap.is(':animated')) {
                        o.lazyLoad(i + sls, imgs);
                        if (i + sls >= s) {
                            o.lazyLoad(i + sls - s, imgs);
                        }
                        _wrap.stop().animate({marginLeft: '-=' + sls * w}, opts.speed, function () {
                            i += sls;
                            if (i + sls >= s) {
                                i = i - s;
                                _wrap.css({marginLeft: -i * w - ms * w});
                            }
                        });
                    }
                },
                //右移
                rightMove: function () {
                    w = o.getItemWidth();
                    if (!_wrap.is(':animated')) {
                        o.lazyLoad(i - sls, imgs);
                        if (i - sls <= 0) {
                            o.lazyLoad(i - sls + s, imgs);
                        }
                        _wrap.stop().animate({marginLeft: '+=' + sls * w}, opts.speed, function () {
                            i -= sls;
                            if (i < 0) {
                                i = i + s;
                                _wrap.css({marginLeft: -i * w - ms * w});
                            }
                        });
                    }
                },
                //懒加载
                lazyLoad: function (index, n) {
                    var _img = _wrap.find('img');
                    var _item;
                    for (var i = 0; i < n; i++) {
                        _item = _img.eq(ms + i + index);
                        if (_item.attr('data-src')) {
                            _item.attr('src', _item.attr('data-src')).removeAttr('data-src');
                        }
                    }
                },
                //touchStar事件
                touchStar: function (event) {
                    o.endLoop();
                    starX = parseInt(event.touches[0].clientX, 10);
                },
                //touchMove事件
                touchMove: function (event) {
                    o.endLoop();
                },
                // touchEnd事件
                touchEnd: function (event) {
                    var endX = parseInt(event.changedTouches[0].clientX, 10);
                    var d = parseInt((endX - starX), 10);
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
                //绑定事件
                bindEvent: function () {
                    _box[0].addEventListener("touchstart", o.touchStar, false);
                    _box[0].addEventListener("touchend", o.touchEnd, false);
                    _box[0].addEventListener("touchmove", o.touchMove, false);
                },
                //初始化
                init: function () {
                    o.initUI();
//                    o.startLoop();
//                    o.bindEvent();
//                    o.lazyLoad(i, imgs);
                }
            };
            o.init();
            return o;
        }
    });
})(jQuery);