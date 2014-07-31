/**
 * 可折叠组件
 */
(function($) {
	$.collapsible = function(opt) {
		var o = $.extend({
			colpeSelector : ".c_collaps",
			titleSelector : '.c_colpsTile',
			contentSelector : '.c_colpsDet',
			mainClass : 'vgroup round-10 oh',
			mainStyle : {},
			titleClass : 'gc cyanbtn p',
			titleStyle : {},
			titleContent : 'heading',
			event : 'click'
		}, opt || {});
		var mainSelector = $(o.colpeSelector), titleSelector = $(o.titleSelector);
		var obj = {
			initHtml : function() {
				var html = '<a href="javascript:;" class="micon ib gb bluebtn roundall tac c_icon  "> <i class="icon-minus icon-white"></i></a><span>'+ o.titleContent + '</span>';
				titleSelector.append(html);
			},
			initUI : function() {
				mainSelector.addClass(o.mainClass);
				mainSelector.css(o.mainStyle);
				titleSelector.addClass(o.titleClass);
				titleSelector.css(o.titleStyle);
				titleSelector.addClass(o.titleClass)
			},
			registerEvents : function() {
				titleSelector.on(o.event, function() {
					var _this = $(this);
					findIcon = _this.find('.c_icon').find('i');
					if (findIcon.hasClass('icon-minus')) {
						findIcon.removeClass('icon-minus').addClass('icon-plus');
					} else {
						findIcon.removeClass('icon-plus').addClass('icon-minus');
					}
					_this.next(o.contentSelector).toggleClass("hide");
				})
			},
			init : function() {
				obj.initHtml();
				obj.initUI();
				obj.registerEvents();
			},

		}
		obj.init();
		return obj;
	};
})(jQuery)