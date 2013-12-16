(function($) {
/**
*	@description 通用selects
*	@class
*	@param {object} 对象
*/
$.selects = function(obj) {
	var o = $.extend({
		event : 'click',
		selectHandler: '#j_select', 
		next: null,//设置下一个联动select
		selectClass:'ui-select ggrey btn greybtn round-10 posr oh',
		selectStyle:{},
		data: {},
		dataUrl: null,
		dataParams:{}
	}, obj || {});
	var _event=o.event;
	var selectobj=$(o.selectHandler);
	var lis = '';
	var nextData={};
	o.ulobj = $("<ul class='c_ul vgroup round-10 oh border nop lsn'></ul>");
	
	o.getUlobj = function(){
		return o.ulobj;
	};
	o.setText = function(v){
		selectobj.find(".j_innerbtn").text(v);
		return o;
	};
	o.setValue = function(v){
		o.getNativeSelect().val(v);
		return o;
	};
	o.setUlobj = function(c){
		o.getUlobj().empty().append(c);
		o.getUlobj().find('li').on(_event,function(){
			o.checkUlItem($(this));
		});
		return o;
	};
	o.checkUlItem = function(obj){
		o.getUlobj().find('li').attr('state','n');
		o.getUlobj().find('li').find('span').addClass('icon-white');
		obj.attr('state','s');
		obj.find('span').removeClass('icon-white');
		return o;
	};
	o.setDialog = function(d){
		o.dialog = d;
		return o;
	};
	o.getDialog = function(){
		return o.dialog;
	};
	o.getNativeSelect = function(){
		return selectobj.find('select');
	};
	/*输入框事件控制*/
	selectobj.on(_event, function() {
		var i = $(this).find('select')[0].selectedIndex;
		o.checkUlItem(o.getUlobj().find('li').eq(i));
		$('.footer').removeClass('posf').addClass('posa');
		o.getDialog().show();
	});
	o._transOptionToLi = function(){
		//从html读取的option属性设置未设置
		$.each(selectobj.find("option"),function(i,elem){
			if(i===0){selectobj.find(".j_innerbtn").text($(elem).text());}
			lis += '<li val="'+$(elem).attr('value')+'" text= "'+$(elem).text()+'"><a class="ggrey btn greybtn block tdn p tac posr" href="javascript:;">'+
			'<span class="iconbtn-right ib hs micon tac posa icon-ok-sign icon-white"></span>'+
			$(elem).text()+'</a></li>';
		});
		o.setUlobj(lis);
		return o;
	};
	o.setNextData = function(o){
		nextData = o;
	};
	o.getNextData = function(o){
		return nextData;
	};
	o._parseData = function(data){
		var d = data.list,options='',lis='';
		for(var i =0,l = d.length;i<l;i++){
			options += '<option value="'+d[i].value+'">'+d[i].name+'</option>';
			lis += '<li val="'+d[i].value+'" text= "'+d[i].name+'"><a class="ggrey btn greybtn block tdn p tac posr" href="javascript:;">'+
			'<span class="iconbtn-right ib hs micon tac posa icon-ok-sign icon-white"></span>'+d[i].name+'</a></li>';
		}
		o.getNativeSelect().append(options);
		o.setText(d[0].name);
		o.setUlobj(lis);
		o.setNextData(d[0]);
	};
	o.initUI = function(){
		selectobj.addClass(o.selectClass).css(o.selectStyle);
	};
	o.buildHtml = function(){
		var _html = '<i class="icon-chevron-down posa iconbtn-right"></i>'+
		'<span class="j_innerbtn paddingL tac toe block oh wsn fs-1"></span>'+
		'<select></select>';
		selectobj.append(_html);
		return o;
	};
	o.init = function(){
		o.initUI();
		o.buildHtml();
		if(o.dataUrl){
			$.getJSON(o.dataUrl, o.dataParams , function(data){
				o._parseData(data);
			});
		}else if(o.data){
			o._parseData(o.data);
		}
	};
	o.init();
	return o;
};
})(jQuery);