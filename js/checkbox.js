(function($) {
		/**
		 *基于jquery的在手机端显示的checkbox组件
		 * @param {Object} obj Object对象。可以自定义传入的参数。
		 */
		$.checkBox = function(o) {
			var opt = $.extend({
				checkboxClass : "",
				checkboxStyle : {},
				position:'left',
				content :['check1','check2','check3','check4','aa'],
				callback:function(){}
			}, o || {});
			var obj={
				boxHtml:[],
				/**构建HTML*/
				buildHtml:function(){
					$.each(opt.content,function(i,num){
						obj.boxHtml[i]=$('<input type="checkbox" class="ui-checkbox "/><div class="c_checkbox round-5 w-2 h-2 bggrey tac"><i class="icon-ok icon-white vf"></i></div><span class="pls">'+opt.content[i]+'</span>');
					});
					return obj.boxHtml;
				},
				/** 初始化UI*/
				initUI : function() {
					$.each(opt.content,function(i){
						$(obj.boxHtml[i][1]).addClass(opt.checkboxClass);
						$(obj.boxHtml[i][1]).css(opt.checkboxStyle);
						if(opt.position==='left'){
							$(obj.boxHtml[i][1]).addClass('l fl');
						}else if(opt.position==='right'){
							$(obj.boxHtml[i][1]).addClass('r fr');
						}
					});
				},
				/**得到content内容数组*/
				getContent:function(){
					return opt.content;
				},
				/**得到构建的HTML*/
				getHtml:function(){
					return obj.boxHtml;
				},
				childEvents:function(){
					return opt.callback();
				},
				/** 初始化 */
				init : function() {
					obj.buildHtml();
					obj.initUI();
				},
			};
			obj.init();
			return obj;
		}
	})(jQuery);
	