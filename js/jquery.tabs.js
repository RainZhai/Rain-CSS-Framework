$.extend({
		rainTab : function(o) {
				o = $.extend({                  
					tabSelector:".c_tab",
					panelSelector:"#tab",
					tabEvent:"click",
					styleClass:"currentLink",
					hoverClass:"itemLightGrey"
				}, o || {});
				//tab 的钩子
				var temp_tab = o.tabSelector,
				//受控的id开头
				temp_panel = o.panelSelector,
				tabsize = $(temp_tab).length,
				//tab触发事件
				tabE = o.tabEvent,
				//当前tablink的样式类
				tabClass = o.styleClass,
				//未选中tablink的hover类
				hoverClass = o.hoverClass;
				
				$(temp_tab).bind(tabE,function(){  
						if(tabsize>0){
							$(temp_tab).children().removeClass(tabClass);
							$(this).children().addClass(tabClass);						
							$(temp_tab).children().addClass(hoverClass);
							$(this).children().removeClass(hoverClass);	
							showTab($(this).index(),tabsize);
						}
				});
				
				function showTab(num,tabsize){
						for(var i=0;i<tabsize;i++){  
								if(num===i){
									$(temp_panel+'-'+i).removeClass("hide");  
								}else{
									$(temp_panel+'-'+i).addClass("hide");  
								}
						}
				}  
		}
});