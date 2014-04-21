/**
 * select 1.0.0 Anthor: zhaiyu Date: 2013.12.10 lastUpdate : 2014.1.2
 */
(function($) {
	/**
	 * @description 通用selects对象
	 * @constructor
	 * @param {object}
	 *          参数对象
	 */
	window.selects = $.selects = function(obj) {
		var opt = $.extend({
			event : 'click',
			selectHandler : '#j_select',
			next : null,// 设置下一个联动select
			selectClass : 'ui-select ggrey btn greybtn round-10 posr oh',
			selectStyle : {},
      innerClass : 'paddingL tac toe block oh wsn fs-1',
      innerStyle : {},
      ULClass : 'vgroup round-10 oh border mts nop lsn',
      ULStyle : {},
      linkClass : 'ggrey btn greybtn block tdn p tac posr',
      linkStyle : {},
			data : {},
			dataUrl : null,
			dataParams : {},
      mark:false,
      listiconClass:'iconbtn-right ib hs micon tac posa icon-ok-sign icon-white',
      iconwrapClass: 'h-3 w-3 bgGreen2 ib posa tac',
      iconwrapStyle:{"top":"0","right":"0"},
      iconClass: 'icon-chevron-down',
      iconStyle:{},
      pageIndex: 0,
      limit:10,
      callback : function(){},
      //判断是否一次加载完成 待完成
      loadonce: false
		}, obj || {});
		var selectobj = $(opt.selectHandler), lis = '';
        var o = {
            selectIndex: 0,
            dataParams: {},//查询数据参数
            next: null,
            data: null,
            /** @method 弹出框UL对象 */
            ulobj: $("<ul class='c_ul " + opt.ULClass + "'></ul>"),
            /**
             * @method 设置获取数据参数
             * @public
             * @param {object} 参数对象
             */
            setParams: function (obj) {
                o.dataParams = obj;
            },
            /** @method 设置获取数据参数 */
            getParams: function () {
                return o.dataParams;
            },
            /** @method 获取列表长度 */
            getSize:function(){
                return o.getUlobj().find("li").length;
            },
            /**
             * @method 下一个联动对象
             * @public
             * @param {object} 参数对象
             */
            setNext: function (obj) {
                o.next = obj;
            },
            /** @method 下一个联动对象 */
            getNext: function () {
                return o.next;
            },
            /** @method 获取UL对象 */
            getUlobj: function () {
                return o.ulobj;
            },
            /** @method 设置select 显示文本 */
            setText: function (v) {
                selectobj.find(".j_innerbtn").text(v);
                return o;
            },
            /** @method 设置select值 */
            setValue: function (v) {
                o.getNativeSelect().val(v);
                return o;
            },
            /** @method 设置selectUL对象 内容 */
            setUlobj: function (c) {
                o.getUlobj().empty().append(c);
                //弹出选择列表绑定事件
                o.getUlobj().find('li').on(opt.event, function (e) {
                    o.checkUlItem(e,$(this), $(this).index());
                });
                return o;
            },
            /** @method 追加selectUL对象 内容 */
            addUlobj:function(c){
                o.getUlobj().append(c);
                //弹出选择列表绑定事件
                o.getUlobj().find('li').on(opt.event, function (e) {
                    o.checkUlItem(e,$(this), $(this).index());
                });
                return o;
            },
            /** @method 设置selectUL对象 内容 */
            checkUlItem: function (e, obj, i) {
                var li = o.getUlobj().find('li');
                li.attr('state', 'n');
                //选择状态
                li.find('span').addClass('icon-white');
                obj.attr('state', 's');
                obj.find('span').removeClass('icon-white');
                o.selectIndex = i;
                opt.callback();
                return o;
            },
            remark: function () {
                var i = o.selectIndex;
                if (opt.mark && i > 10) {
                    var li = o.getUlobj().find('li');
                    (li.eq(i)).insertAfter(li.eq(3));
                    o.selectIndex = 4;
                }
                return o;
            },
            /**
             * @method 设置select对象的dialog
             * @public
             * @param {object} dialog对象
             */
            setDialog: function (d) {
                o.dialog = d;
                return o;
            },
            /** @method 获取dialog对象 */
            getDialog: function () {
                return o.dialog;
            },
            /** @method 获取原生select对象 */
            getNativeSelect: function () {
                return selectobj.find('select');
            },
            /** @method 注册事件 */
            registerEvents: function () {
                /* 输入框事件控制 */
                selectobj.on(opt.event, function (e) {
                    var i = 0;
                    if (opt.mark) {
                        i = o.selectIndex;
                    } else {
                        i = $(this).find('select')[0].selectedIndex;
                    }
                    o.getDialog().show();
                });
            },
            /** @method select对象的option转换为li */
            _transOptionToLi: function () {
                var iconhtml = '';
                if (opt.listiconClass) {
                    iconhtml = '<span class="' + opt.listiconClass + '"></span>';
                }
                $.each(selectobj.find("option"), function (i, elem) {
                    if (i === 0) {
                        selectobj.find(".j_innerbtn").text($(elem).text());
                    }
                    lis += '<li class="oh" val="' + $(elem).attr('value') + '" text= "' + $(elem).text()
                        + '"><a class="j_listlink" href="javascript:;">'
                        + iconhtml + $(elem).text()
                        + '</a></li>';
                });
                o.setUlobj(lis);
                return o;
            },
            /**
             * @method 设置下一select对象的所需数据
             * @public
             * @param {object}数据对象
             */
            setNextData: function (o) {
                nextData = o;
            },
            /** @method 获取下一对象数据 */
            getNextData: function (o) {
                return nextData;
            },
            /**
             * @method 将数据分割为10条
             * @private
             * @param {object}数据对象
             * @param {number} 数据前后阀值
             */
             divData:function(threshold){
                //游标操作来显示十条记录
                var index = o.selectIndex;
                var min = 0;
                var max = min+2*threshold;
                if(index>threshold) {
                    min = index - threshold;
                    max = index + threshold;
                }
                if(max>o.data.length){
                    max = o.data.length;
                    min = o.data.length - 2*threshold;
                }
                var li = o.getUlobj().find('li').addClass("hide");
                for(var i=min;i<max;i++){
                    li.eq(i).removeClass("hide");
                }
             },
            /**
             * @method 解析数据并设置select对象内容
             * @private
             * @param {object}数据对象
             */
            _parseData: function (data) {
                var iconhtml = '';
                if (opt.listiconClass) {
                    iconhtml = '<span class="' + opt.listiconClass + '"></span>';
                }
                var d = data, options = '', lis = '';

                for (var i = 0,l=d.length; i < l; i++) {
                    options += '<option value="' + d[i].value + '">' + d[i].name + '</option>';
                    lis += '<li state="n" val="' + d[i].value + '" text= "' + d[i].name
                        + '"><a class="j_listlink" href="javascript:;">'
                        + iconhtml + d[i].name
                        + '</a></li>';
                }
                o.getNativeSelect().append(options);
                o.setText(d[0].name);
                o.addUlobj(lis);
                if (opt.next) {
                    opt.next.setParams(d[0]);
                }
                o.getUlobj().find(".j_listlink").addClass(opt.linkClass).css(opt.linkStyle);
                //o.divData(5);
            },
            /** @method 初始化ui */
            initUI: function () {
                selectobj.addClass(opt.selectClass).css(opt.selectStyle);
                selectobj.find(".j_iconwrap").addClass(opt.iconwrapClass).css(opt.iconwrapStyle);
                selectobj.find(".j_icon").addClass(opt.iconClass).css(opt.iconStyle);
            },
            /** @method 构建html */
            buildHtml: function () {
                var _html = '<span class="j_iconwrap"><i class="j_icon"></i></span>'
                    + '<span class="j_innerbtn ' + opt.innerClass + '"></span>' + '<select></select>';
                selectobj.append(_html);
                return o;
            },
            reloadData:function(){
                $.getJSON(opt.dataUrl+"?pageIndex="+o.pageIndex+"&limit="+opt.limit, null, function (data) {
                    o.data = data.list;
                    o._parseData(o.data);
                });
            },
            checkReload: function(){
                console.log("o.selectIndex==="+o.selectIndex);
                console.log("o.pageIndex==="+o.pageIndex);
                console.log("o.getSize==="+o.getSize()); 
                if(o.selectIndex >= o.getSize()-1){
                    o.pageIndex ++;
                    o.reloadData();
                }
            },
            /** @method 设置对象数据 */
            setData: function () {
                var p = o.getParams();
                //判断数据是否加载
                if(!o.data){
                    if (opt.dataUrl) {
                        $.getJSON(opt.dataUrl+"?pageIndex="+o.pageIndex+"&limit="+opt.limit, p, function (data) {
                            o.data = data.list;
                            o._parseData(o.data);
                        });
                    } else if (opt.data) {
                        o.data = opt.data;
                        o._parseData(o.data);
                    }
                }else{
                    o._parseData(o.data);
                }
                return o;
            },
            /** @method 对象初始化 */
            init: function () {
                o.pageIndex = opt.pageIndex;
                o.setParams(opt.dataParams);
                o.setNext(opt.next);
                o.setData();
                o.buildHtml();
                o.initUI();
                o.registerEvents();
            }
        };
		o.init();
		return o;
	};
})(jQuery);