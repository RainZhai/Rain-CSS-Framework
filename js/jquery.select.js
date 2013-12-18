/**
* select 1.0.0
* Anthor: zhaiyu
* Date: 2013.12.10
* lastUpdate : 2013.12.18
*/
(function($) {
/**
*	@description 通用selects对象
* @constructor
*	@param {object} 参数对象
*/
$.selects = function(obj) {
	var opt = $.extend({
		event : 'click',
		selectHandler: '#j_select', 
		next: null,//设置下一个联动select
		selectClass:'ui-select ggrey btn greybtn round-10 posr oh',
		selectStyle:{},
		data: {},
		dataUrl: null,
		dataParams:{}
	}, obj || {});
	var selectobj=$(opt.selectHandler),lis = '';
	var o ={
	/**@method 弹出框UL对象*/
	ulobj : $("<ul class='c_ul vgroup round-10 oh border mts nop lsn'></ul>"),
  /**
   * @method 设置获取数据参数
   * @public
   * @param {object} 参数对象
   */
	setParams : function(obj){
		o.dataParams = obj; 
	},
  /**@method 设置获取数据参数*/
	getParams : function(){
		return o.dataParams; 
	},
  /**@method 获取UL对象*/
	getUlobj : function(){
		return o.ulobj;
	},
  /**@method 设置select 显示文本*/
	setText : function(v){
		selectobj.find(".j_innerbtn").text(v);
		return o;
	},
  /**@method 设置select值*/
	setValue : function(v){
		o.getNativeSelect().val(v);
		return o;
	},
  /**@method 设置selectUL对象 内容*/
	setUlobj : function(c){
		o.getUlobj().empty().append(c);
		o.getUlobj().find('li').on(opt.event,function(){
			o.checkUlItem($(this));
		});
		return o;
	},
  /**@method 设置selectUL对象 内容*/
	checkUlItem : function(obj){
		o.getUlobj().find('li').attr('state','n');
		o.getUlobj().find('li').find('span').addClass('icon-white');
		obj.attr('state','s');
		obj.find('span').removeClass('icon-white');
		return o;
	},
  /**
   * @method 设置select对象的dialog
   * @public
   * @param {object} dialog对象
   * */
	setDialog : function(d){
		o.dialog = d;
		return o;
	},
  /**@method 获取dialog对象*/
	getDialog : function(){
		return o.dialog;
	},
  /**@method 获取原生select对象*/
	getNativeSelect : function(){
		return selectobj.find('select');
	},
  /**@method 注册事件*/
	registerEvents:function(){
	  /*输入框事件控制*/
	  selectobj.on(opt.event, function() {
	    var i = $(this).find('select')[0].selectedIndex;
	    o.checkUlItem(o.getUlobj().find('li').eq(i));
	    o.getDialog().show();
	  });
	},
  /**@method select对象的option转换为li*/
	_transOptionToLi : function(){
		$.each(selectobj.find("option"),function(i,elem){
			if(i===0){selectobj.find(".j_innerbtn").text($(elem).text());}
			lis += '<li class="oh" val="'+$(elem).attr('value')+'" text= "'+$(elem).text()+'"><a class="ggrey btn greybtn block tdn p tac posr" href="javascript:;">'+
			'<span class="iconbtn-right ib hs micon tac posa icon-ok-sign icon-white"></span>'+
			$(elem).text()+'</a></li>';
		});
		o.setUlobj(lis);
		return o;
	},
  /**
   * @method 设置下一select对象的所需数据
   * @public
   * @param {object}数据对象
   */
	setNextData : function(o){
		nextData = o;
	}, 
  /**@method 获取下一对象数据*/
	getNextData : function(o){
		return nextData;
	},
  /**
   * @method 解析数据并设置select对象内容
   * @private
   * @param {object}数据对象
   */
	_parseData : function(data){
		var d = data.list,options='',lis='';
		for(var i =0,l = d.length;i<l;i++){
			options += '<option value="'+d[i].value+'">'+d[i].name+'</option>';
			lis += '<li val="'+d[i].value+'" text= "'+d[i].name+'"><a class="ggrey btn greybtn block tdn p tac posr" href="javascript:;">'+
			'<span class="iconbtn-right ib hs micon tac posa icon-ok-sign icon-white"></span>'+d[i].name+'</a></li>';
		}
		o.getNativeSelect().append(options);
		o.setText(d[0].name);
		o.setUlobj(lis);
		if (opt.next){ opt.next.setParams(d[0]);}
	},
  /**@method 初始化ui*/
	initUI : function(){
		selectobj.addClass(opt.selectClass).css(opt.selectStyle);
	},
  /**@method 构建html*/
	buildHtml : function(){
		var _html = '<i class="icon-chevron-down posa iconbtn-right"></i>'+
		'<span class="j_innerbtn paddingL tac toe block oh wsn fs-1"></span>'+
		'<select></select>';
		selectobj.append(_html);
		return o;
	},
  /**@method 设置对象数据*/
	setData:function(){
    if(opt.dataUrl){
      $.getJSON(opt.dataUrl, opt.dataParams , function(data){
        o._parseData(data);
      });
    }else if(opt.data){
      o._parseData(opt.data);
    }
    return o;
	},
  /**@method 对象初始化*/
	init : function(){
		o.initUI();
		o.buildHtml();
		o.registerEvents();
		o.setData();
	}
	};
	o.init();
	return o;
};
})(jQuery);