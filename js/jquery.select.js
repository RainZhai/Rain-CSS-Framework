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
			mark : false,
			//是否设置选中图标
			listIcon: false,
			listiconClass : 'iconbtn-right ib hs micon tac posa icon-ok-sign icon-white',
			iconwrapClass : 'h-3 w-3 bgGreen2 ib posa tac',
			iconwrapStyle : {
				"top" : "0",
				"right" : "0"
			},
			iconClass : 'icon-chevron-down',
			iconStyle : {},
			pageIndex : 0,
			limit : 10,
			initByHistory: true,
			activeItemClass:"yellow",
			activeItemStyle : {},
			inActiveItemStyle : {},
            activeIconClass:"",
            activeIconStyle:"",
            inActiveIconStyle : {},
			callback : function() {},
			//判断是否一次加载完成
			loadonce : false,
            auto:false//判断是否自动加载不需要触发
		}, obj || {});
		var selectobj = $(opt.selectHandler), lis = '';
        var o = {
            selectIndex: 0,
            dataParams: {},//查询数据参数
            next: null,
            data: null,
            /** @method 弹出框UL对象 */
            ulobj: $("<ul class='c_ul " + opt.ULClass + "'></ul>"),
            setSelectindex: function(i){
            	o.selectIndex = i; 
            },
            getSelectindex: function(){
            	return o.selectIndex;
            },
            /**
             * @method 设置获取数据参数
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
            /** @method 设置select值 */
            setPageindex: function(i){
            	o.pageIndex = i;
            },
            getPageindex: function(){
            	return o.pageIndex;
            },
            /** @method 获取弹出框列表 */
            getList: function(){
            	return o.getUlobj().find('li');
            },
            /** @method 设置selectUL对象 内容 */
            setUlobj: function (c) {
                o.getUlobj().empty().append(c);
                //弹出选择列表绑定事件
                o.getUlobj().find('li').on(opt.event, function (e) {
                	var _this = $(this);
                    o.setSelectindex(_this.index());
                    o.checkUlItem(_this);
                    o.setValue(_this.attr('val')).setText(_this.attr('text'));
                    opt.callback(e);
                });
                return o;
            },
            /** @method 追加selectUL对象 内容 */
            addUlobj:function(c){
                o.getUlobj().append(c);
                //弹出选择列表绑定事件
                o.getUlobj().find('li').on(opt.event, function (e) {
                	var _this = $(this);
                    o.setSelectindex(_this.index());
                    o.checkUlItem(_this);
                    o.setValue(_this.attr('val')).setText(_this.attr('text'));
                    opt.callback(e);
                });
                return o;
            },
            /** @method 设置每个列表项选中状态和样式 */
            checkUlItem: function (obj) {
                var list = o.getUlobj().find('li');
                list.attr('state', 'n');
                obj.attr('state', 's');
                if(opt.listIcon){
                    list.find('.j_listlink').removeClass(opt.activeItemClass).css(opt.inActiveItemStyle);
                    obj.find('.j_listlink').addClass(opt.activeItemClass).css(opt.activeItemStyle);
	                list.find('.j_listlink').find('span').removeClass(opt.activeIconClass).css(opt.inActiveIconStyle);
	                obj.find('.j_listlink').find('span').addClass(opt.activeIconClass).css(opt.activeIconStyle);
                }else{
	                list.find('.j_listlink').removeClass(opt.activeItemClass).css(opt.inActiveItemStyle);
	                obj.find('.j_listlink').addClass(opt.activeItemClass).css(opt.activeItemStyle);
                }
                return o;
            },
            remark: function () {
                var i = o.getSelectindex();
                if (opt.mark && i > 10) {
                    var li = o.getUlobj().find('li');
                    (li.eq(i)).insertAfter(li.eq(3));
                    o.setSelectindex(4);
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
                if(!opt.auto){
                    /* 输入框事件控制 */
                    selectobj.on(opt.event, function (e) {
                        var i = 0;
                        if (opt.mark) {
                            i = o.getSelectindex();
                        } else {
                            i = $(this).find('select')[0].selectedIndex;
                        }
                        o.getDialog().show();
                    });
                }
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
                var index = o.getSelectindex();
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
                if (opt.listIcon) {
                    iconhtml = '<span class="' + opt.listiconClass + '"></span>';
                }
                var d = data, options = '', lis = '';
                for (var i = 0,l=d.length; i < l; i++) {
                    options += '<option value="' + d[i].value + '">' + d[i].name + '</option>';
                    lis += '<li state="n" val="' + d[i].value + '" text= "' + d[i].name + '"><a class="j_listlink" href="javascript:;">'+ iconhtml + d[i].name+ 
                    '<p>'+d[i].addr+'</p>'+
                    '</a></li>';
                }
                o.getNativeSelect().append(options);
                o.addUlobj(lis);
                if (opt.next) {
                    opt.next.setParams(d[0]);
                }
                o.getUlobj().find(".j_listlink").addClass(opt.linkClass).css(opt.linkStyle);
                //o.divData(5);
            },
            /** @method 初始化ui */
            initUI: function () {
                if(!opt.auto){
                selectobj.addClass(opt.selectClass).css(opt.selectStyle);
                selectobj.find(".j_iconwrap").addClass(opt.iconwrapClass).css(opt.iconwrapStyle);
                selectobj.find(".j_icon").addClass(opt.iconClass).css(opt.iconStyle);
                }
            },
            /** @method 构建html */
            buildHtml: function () {
                if(!opt.auto){
                    var _html = '<span class="j_iconwrap"><i class="j_icon"></i></span><span class="j_innerbtn ' + opt.innerClass + '"></span>' + '<select></select>';
                    selectobj.append(_html);
                }
                return o;
            },
            reloadData:function(callback){
            	var i = o.getPageindex();
                $.getJSON(opt.dataUrl+"?pageIndex="+i+"&limit="+opt.limit, null, function (data) {
                    o.data = data.list;
                    o._parseData(o.data);
                    if(typeof(callback)=='function'){
                    	callback();
                    }
                });
            },
            checkReload: function(){
            	if(!opt.loadonce){
	                console.log("o.selectIndex==="+o.getSelectindex());
	                console.log("o.pageIndex==="+o.getPageindex());
	                console.log("o.getSize==="+o.getSize()); 
	                if(o.getSelectindex() >= o.getSize()-1){
	                	var i = o.getPageindex()+1;
	                    o.setPageindex(i);
	                    o.reloadData();
	                }
            	}
            },
            /** @method 设置对象数据 */
            setData: function () {
                var p = o.getParams();
                if(!opt.initByHistory){
	                //判断是否加载静态数据
	                if(!o.data){
	                	o.setPageindex(opt.pageIndex);
	                    if (opt.dataUrl) {
	                        var i = o.getPageindex();
	                        $.getJSON(opt.dataUrl+"?pageIndex="+i+"&limit="+opt.limit, p, function (data) {
	                            o.data = data.list;
	                            o._parseData(o.data);
	                            o.setText(o.getList().eq(0).attr('text')).setValue(o.getList().eq(0).attr('val'));
	                            o.checkUlItem(o.getList().eq(0));
	                        });
	                    } else if (opt.data) {
	                        o.data = opt.data;
	                        o._parseData(o.data);
	                        o.setText(o.getList().eq(0).attr('text')).setValue(o.getList().eq(0).attr('val'));
                            o.checkUlItem(o.getList().eq(0));
	                    }
	                }else{
	                    o._parseData(o.data);
	                    o.setText(o.getList().eq(0).attr('text')).setValue(o.getList().eq(0).attr('val'));
                        o.checkUlItem(o.getList().eq(0));
	                }
                }else{
                	//从历史记录进行加载
                	var chapterId = 15;
                	o.pageIndex = o.setPageindex(parseInt(parseInt(chapterId)/opt.limit) + 1);
                	o.prepageIndex = o.pageIndex;
                	o.reloadData(function(){
                		o.setSelectindex(parseInt(parseInt(chapterId)%opt.limit)-1);
                    	var curItem= o.getSelectindex();
                    	var curli = o.getUlobj().find("li").eq(curItem);
                        var v = curli.attr('val');
                        var t = curli.attr('text');
                        if(v && t){
                        	o.setText(t).setValue(v);
                        }else{
                            o.setText("  "+t);
                        }
                    	o.checkUlItem(curli);
                	});
                }
                return o;
            },
            /** @method 对象初始化 */
            init: function () {
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