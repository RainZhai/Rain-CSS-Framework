$.fn.extend({
	//最新更新可以支持任意子元素绑定tabs效果
	tabs : function(obj) {
		var o = $.extend({
			tabSelector:null,
			panelSelector:null,
			'event':"click",
			currentClass:'',
			hoverClass:''
		}, obj || {});
		var _this =$(this),
		//tab 的钩子
		temp_tab = o.tabSelector || 'li',
		//受控的id开头
		temp_panel = o.panelSelector || 'div',
		tabsize = $(temp_tab).length,
		//tab触发事件
		tabE = o.event || 'click',
		//当前tablink的样式类
		tabClass = o.currentClass,
		//未选中tablink的hover类
		hoverClass = o.hoverClass;
		var tabs = _this.find(temp_tab);
		var panels = _this.find(temp_panel).hide();
		$(tabs[0]).addClass(tabClass).removeClass(hoverClass);
		$(panels[0]).show();
		function tabsHandler(event) {
			if (tabsize > 0) {
				$(temp_tab).removeClass(tabClass).addClass(hoverClass);
				$(this).addClass(tabClass).removeClass(hoverClass);
				panels.hide();
				$(panels[event.data.index]).show();
			}
		}
		for(var i =0; i<tabs.length; i++){
			$(tabs[i]).bind(tabE, {index : i}, tabsHandler);
		}
		return _this;
	}
});