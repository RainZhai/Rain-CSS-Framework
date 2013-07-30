$.fn.extend({
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
		_this.children(temp_panel).hide();
		$(_this.children(temp_panel)[0]).show();
		_this.find(temp_tab).bind(tabE,function(){  
				if(tabsize>0){
					$(temp_tab).removeClass(tabClass).addClass(hoverClass);
					$(this).addClass(tabClass).removeClass(hoverClass);	
					var i = $(this).index();
					_this.children(temp_panel).hide();
					$(_this.children(temp_panel)[i]).show();
				}
		});	
		return _this;
	}
});