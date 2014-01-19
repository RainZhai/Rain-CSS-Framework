(function($) {
	/**
	 * 基于jquery的在手机端显示的外包组件
	 * 
	 * @param {Object}
	 *          obj Object对象。可以自定义传入的参数。
	 */
	$.group = function(obj) {
		var opt = $.extend({
			groupSelector : "",
			itemClass : "ggrey greybtn",
			itemStyle : {},
			groupClass : "round-10 border",
			groupStyle : {},
			childObj : null,
			align : 'horizontal',
			icon : false, // 是否有图标
			iconClass : 'bggrey roundall', // 图标的样式
			iconSite : 'right', // 图标的位置
			iconType : 'icon-chevron-right icon-white', // 图标的类型
		}, obj || {});
		var groupobj = $(opt.groupSelector), childObj = opt.childObj;
		var o = {
			htmlobj : [],
			childContArr : [],
			childContent : [],
			childHtmlArr : [],
			childHtml : [],
			/** 得到子组件的数目 */
			getChildContent : function() {
				$.each(childObj, function(i) {
					if (typeof childObj[i] === 'string') {
						o.childContent.push(childObj[i]);
					} else if ((typeof childObj[i] === 'object')) {
						childContArr = childObj[i].getContent();
						$.each(childContArr, function(j) {
							o.childContent.push(childContArr[j]);
						});
						return o.childContent;
					}
				});
			},
			/** 得到控制器 */
			getSelector : function() {
				return groupobj;
			},
			/** 初始化UI */
			initUI : function() {
				o.getChildContent();
				var _html = '';
				groupobj.addClass(opt.groupClass);
				groupobj.css(opt.groupStyle);
				$.each(o.childContent, function(i) {
					o.htmlobj[i] = $('<li class="c_box btn block tdn p posr"></li>');
					(o.htmlobj[i]).addClass(opt.itemClass);
					(o.htmlobj[i]).css(opt.itemStyle);
					_html += (o.htmlobj[i][0].outerHTML);
				});
				groupobj.append($(_html));
				return o.htmlobj;
			},
			/** 根据参数，设置子组件的显示 */
			setChild : function() {
				o.initChild(childObj);
			},
			/** 得到子对象中的html */
			getChildHtml : function() {
				$.each(childObj, function(i) {
					childHtmlArr = childObj[i].getHtml();
					$.each(childHtmlArr, function(j) {
						o.childHtml.push(childHtmlArr[j]);
					})
				});
				return o.childHtml;
			},
			/** 显示子组件 */
			initChild : function(obj) {
				$.each(childObj, function(i) {
					if (typeof childObj[i] === 'string') {
						groupobj.find('.c_box').each(function(j) {
							$(this).append(o.childContent.pop());
						});
					} else if (typeof childObj[i] === 'object') {
						groupobj.find('.c_box').each(function(i) {
							$(this).append(o.getChildHtml()[i]);
						});
					}
				});
				o.alignBox();
			},
			/** 设置组件是横向还是纵向排列 */
			alignBox : function() {
				if (opt.align === 'vertical') {
					groupobj.addClass('vgroup  oh  nop');
				} else if (opt.align === 'horizontal') {
					groupobj.addClass('hgroup oh ib  clearfix nop');
					$('.c_box').each(function() {
						$(this).addClass('l fl');
					});
				}
			},
			/**
			 * 设置图标
			 */
			setIcon : function() {
				if (opt.icon) {
					var _item = groupobj.find('li').addClass('pr-3');
					if (opt.iconSite) {
						opt.iconClass += ' iconbtn-' + opt.iconSite;
					}
					var icons = '<span class="micon ib tac posa ' + opt.iconClass + '"><i class="' + opt.iconType
							+ '"></i></span>';
					_item.each(function() {
						$(this).append($(icons));
					});
				}
			},

			/** 绑定回调事件 */
			registerEvents : function() {
				$.each(childObj, function(i) {
					if (childObj[i].childEvents) {
						return childObj[i].childEvents();
					}
				})

			},
			/** 初始化 */
			init : function() {
				o.initUI();
				o.setChild();
				o.setIcon();
				o.registerEvents();
			}
		};
		o.init();
		return o;
	};
})(jQuery);