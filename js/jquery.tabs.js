$.fn.extend({
	//最新更新可以支持任意子元素绑定tabs效果
	tabs : function(obj) {
		var o = $.extend({
			tabSelector:null,
			panelSelector:null,
			'event':"click",
			currentClass:'',
			hoverClass:'',
	    	panelClass:'',
			callback:$.noop
		}, obj || {});
		var _this =$(this),
		//tab 的钩子
		tab = o.tabSelector || 'li',
		//受控的id开头
		panel = o.panelSelector || 'div',
		tabsize = $(tab).length,
		//tab触发事件
		tabE = o.event || 'click',
		//当前tablink的样式类
		tabClass = o.currentClass,
		//未选中tablink的hover类
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
				event.data.callbacks.call(this);
			}
		}
		//tabs为多个，给每个tab设置样式
		for(var i =0;i<_this.length;i++){
			var tabs = $(_this[i]).find(tab);
			var panels = $(_this[i]).find(panel).hide();
			$(tabs[0]).addClass(tabClass).removeClass(hoverClass);
			$(panels[0]).addClass(panelClass).show();
		  
			for(var j =0; j<tabs.length; j++){
				$(tabs[j]).on(tabE, {index : j, tabs: tabs, panels: panels ,callbacks:call}, tabsHandler);
			}
		}
		return _this;
}
});