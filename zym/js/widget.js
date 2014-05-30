var util = util || {};
/**
 * [实时监控input框组件]
 * @param opt {obejct} 传人对象
 * @param hook {string} 钩子需要监控的dom
 * @param showTip {string} 数字的包裹
 * @param currTip {string} 输入的数字
 * @param totalTip {string} 总数字
 * @param warnClass {string} 警告的样式
 * @param isRomn {bool} 是否实时监控
 */
util.Input = function(opt) {
    this.opt = opt || {};
    this.hook = this.opt.hook || "textarea";
    this.showTip = this.opt.showTip || ".show-J";
    this.currTip = this.opt.currTip || ".curr-J";
    this.totalTip = this.opt.totalTip || ".total-J";
    this.warnClass = this.opt.warn || "red",
    this.isRomn = this.opt.isRomn || false;
    this.value = [];
    this.init();
};
util.Input.prototype = {
    constructor: util.Input,
    //初始化函数
    init: function() {
        var _hook = "";
        this.hook ? this.hook instanceof $ ? _hook = this.hook : _hook = $(this.hook) : "";
        var len = _hook.val().length;

        this.isRomn ? _hook.next(this.showTip).children(this.currTip).text(len) : "";
        this.bind(_hook);
        this.isRomn ? this.romn(_hook) : "";
    },
    //绑定事件函数，模拟placeholder的实现
    bind: function(handle) {
        var _hook = handle;
        var showTip = this.showTip;
        var currTip = this.currTip;
        var self = this;

        _hook.each(function(i) {
            var _this = $(this);
            self.value[i] = _hook.eq(i).val();

            _this.on('focus', function() {
                var _this = $(this);
                if (_this.val() == self.value[i]) {
                    _this.val('');
                    self.isRomn ? _this.next(showTip).children(currTip).text("0") : "";
                }
            }).on('blur', function() {
                var _this = $(this);
                if ($.trim(_this.val()) == '' || $.trim(_this.val()) == null) {
                    _this.val(self.value[i]);
                    self.isRomn ? _this.next(showTip).children(currTip).text(self.value[i].length) : "";
                }
            });
        });
    },
    //实时监控
    romn: function(handle) {
        var self = this;
        var _hook = handle;
        var warnClass = self.warnClass;

        _hook.on("input propertychange", function() {
            var _this = $(this);
            var length = _this.val().length;
            var _showTip = _this.next(self.showTip);
            var _totalTip = _showTip.children(self.totalTip);
            var sum = parseInt(_totalTip.text());
            if (length > sum) {
                _showTip.addClass(warnClass);
            } else {
                _showTip.removeClass(warnClass);
            }
            _showTip.children(self.currTip).text(length);
        });
    }
};
/**
 * [广告滚动组件]
 * @param opt {obejct} 传人对象
 * @param box {string} 包装盒子
 * @param list {string} 列表
 * @param item {string} 条目
 * @param size {number} 每次滚动个数
 * @param delay {string} 延迟
 * @param off {boolen} 是否移入暂停
 */
util.NoticeScroll = function(opt) {
    this.opt = opt || {};
    this.box = this.opt.box || "#notice-hook";
    this.list = this.opt.list || "ul";
    this.item = this.opt.item || "li";
    this.size = this.opt.size || 1;
    this.delay = this.opt.delay || 3000;
    this.off = this.opt.off || "true";
    this.config = {};
    this.i = 0;
    this.timer = "";
    this.init();
};
util.NoticeScroll.prototype = {
    constructor: util.NoticeScroll,
    init: function() {
        var _this = this;
        // 缓存配置参数（length是改变dom以前的）
        _this.config.box = $(_this.box);
        _this.config.list = _this.config.box.find(this.list);
        _this.config.item = _this.config.list.find(this.item);
        _this.config.length = _this.config.item.length;
        _this.config.height = _this.config.item.height();
        _this.config.size = _this.size;

        //无缝滚动，节点复制
        _this.config.item.slice(0, _this.config.size * 2).clone(true).appendTo(_this.config.list);
        //自动滚动
        _this.auto();
        //绑定事件
        _this.bind();
    },
    //绑定事件
    bind: function() {
        var _this = this;
        // 鼠标移入停止，移除开始（hover是组合事件）
        _this.config.box.hover(function() {
            _this.stop();
        }, function() {
            _this.auto();
        });
    },
    //滚动函数
    move: function() {
        var _this = this;
        _this.i += _this.config.size;
        _this.config.list.animate({
            //magin-top值必须加px，不然尽情找bug吧。
            "margin-top": "-" + _this.config.height * _this.i + "px"
        }, "slow", function() {
            if (_this.i >= _this.config.length) {
                _this.i -= _this.config.length;
                _this.config.list.css({
                    "margin-top": "-" + _this.config.height * _this.i + "px"
                });
            }
        });
    },
    //自动滚动
    auto: function() {
        var _this = this;
        _this.timer = setInterval(function() {
            _this.move();
        }, _this.delay);
    },
    // 暂停滚动
    stop: function() {
        clearTimeout(this.timer);
    }
};