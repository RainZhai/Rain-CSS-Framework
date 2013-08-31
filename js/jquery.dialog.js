/**
* dailog 1.3
* -----------------------------------------------
* the plugin to generate warp div to show dialog
* Anthor: zhaiyu
* Date: 2013.1.21
* lastUpdate : 2013.8.1
*/
(function($) {
	$.fn.dialog = $.dialog = function(obj) {
	var o = $.extend({
		width: 540, //弹出框宽度
		height: 0,//弹出框高度
		top: "20%",//离顶部的距离
		left: "50%",//离左边的距离
		draggable: false,//是否可以拖拽
		header:true,
		showClose:false,
		content:null,//弹出框内显示的内容
		closeHandleClass:'c_close',//关闭图标的句柄
		dialogHandleClass:'c_dialogwrap',//弹出层句柄
		titleText:'提示框',//弹出层文本
		bgColor:'#fff',//遮罩背景色
		closeStyle:{},
		closeClass:'',
		dialogStyle:{},//设置弹出框样式
		dialogClass:'',//设置弹出框class
		headStyle:{'background':'#F5F5F5'},
		headClass:'',
		contentStyle:{},
		contentClass:'',
		btnsWrapStyle:{'text-align':'right'},
		btnsWrapClass:'',
		buttonsStyle:[{}],
		buttonsClass:['heightS css3_roundS css3_gradient_blue button blueButton marginLeft'],
		closeCallback: function(){},
		buttons:null,
		buttonsArray:[],
		buttonsCallback:{},
		buttonsAttr:[],
		beforeShow:function(){},
		afterShow:function(){},
		beforeClose:function(){},
		afterClose:function(){},
		upload:false
	}, obj || {}); 
	var randomStr = Math.round(Math.random()*1000000+1)+'',
		contentObj = o.content,
		closeClass = o.closeHandleClass+randomStr,
		dialogHandleClass = o.dialogHandleClass+randomStr,
		html = null;
	o.init = function(){
		o.initHtml();
		o.initBtns();
	}
	o.show = function(callback){
		o.beforeShow();
		if($('body').find('.'+dialogHandleClass).length==0){
			$('body').append(html);
		}else{
			$("."+dialogHandleClass).show(callback);
		}
		o.afterShow();
		if(typeof(callback)==='function'){	callback();}
		return o;
	}
	o.hide = o.close = function(callback){
		$("."+dialogHandleClass).hide();
		if(typeof(callback)==='function'){	callback();}
		return o;
	}
	o.getBtn = function(i){
		if(i>-1 && o.jqbtns){
			return o.jqbtns[i];
		}
		return null;
	}
	o.setHeight = function(h/*number*/){
		if(typeof(h)==='number'){if(html){html.find(".c_dialogBox").height(h);}}
		return o;
	}
	o.initUpload = function(){
		var uploadHtml = $('<div class="uploadBox margin">'+
			'<div class="hide c_picArea positionR">'+
				'<form enctype="multipart/form-data" method="post" action="#" id="upload-pic" target="iframe-post-form">'+
					'<input type="text" disabled="true" class="uploadFileName" id="txtFileName">'+
					'<span id="spanButtonPlaceHolder" class="valignMiddle"></span>'+
					'<label id="fsUploadProgress">正在上传...</label>'+
				'</form>'+
				'<span class="c_closeUploadBox closeUploadBox colorGrey positionA cursorPointer">X</span>'+
			'</div>'+
			'<a name="pic-area" class="c_lnPic" href="#">添加照片</a>'+
			'</div>');
		contentObj.append(uploadHtml);
		uploadHtml.find(".c_lnPic").bind("click",function(){
			_height = _height + 30;
			html.find(".c_dialogBox").css({ "width": _width, "height":_height, "top":o.top, "left":o.left });
			uploadHtml.find(".c_picArea").removeClass("hide");
		});
		uploadHtml.find(".c_closeUploadBox").bind("click",function(){
			_height = _height - 30;
			html.find(".c_dialogBox").css({ "width": _width, "height":_height, "top":o.top, "left":o.left });
			uploadHtml.find(".c_picArea").addClass("hide");
		});
		
		//通过swfupload设置上传按钮
		var swfu;
		var settings = {
			flash_url : "swfupload/swfupload.swf",
			upload_url: "upload.php",
			post_params: {"PHPSESSID" : "<?php echo session_id(); ?>"},
			file_size_limit : "10 MB",
			file_types : "*.*",
			file_types_description : "All Files",
			file_upload_limit : 10,
			file_queue_limit : 0,
			custom_settings : {
				progressTarget : "fsUploadProgress",
				cancelButtonId : "btnCancel"
			},
			debug: false,
	
			// Button settings
			button_image_url: "images/XPButtonUploadText_61x22.png",
			button_width: "61",
			button_height: "22",
			button_placeholder_id: "spanButtonPlaceHolder",
			button_text: '<span class="theFont">上传</span>',
			button_text_style: ".theFont { font-size: 12; }",
			button_text_left_padding: 14,
			button_text_top_padding: 1,
			
			// The event handler functions are defined in handlers.js
			file_queued_handler : fileQueued,
			file_queue_error_handler : fileQueueError,
			file_dialog_complete_handler : fileDialogComplete,
			upload_start_handler : uploadStart,
			upload_progress_handler : uploadProgress,
			upload_error_handler : uploadError,
			upload_success_handler : uploadSuccess,
			upload_complete_handler : uploadComplete,
			queue_complete_handler : queueComplete	// Queue plugin event
		};
		swfu = new SWFUpload(settings);
		return o;
	}
	
	o.initBtns = function(){
		//设置按钮
		var buttonsWrap = html.find(".c_btnWrap");
		if (o.buttons && typeof(o.buttons)==='string') {
				function btnHandler(event) {
					o.beforeClose(event);
					o.close();
					o.afterClose(event);
				}
				var button = [];
				if(o.buttons==='OK') button.push($("<input type='button' value='确定' class='c_button' />"));
				if(o.buttons==='OKCancel') button.push($("<input type='button' value='确定' class='c_button' />").attr('btype','ok'), $("<input type='button' value='取消' class='c_button marginLeftS' />").attr('btype','canel'));
				if(o.buttons==='YesNo') button.push($("<input type='button' value='是' class='c_button' />"), $("<input type='button' value='否' class='c_button marginLeftS' />"));
				if(o.buttons==='YesNoCancel') 
					button.push($("<input type='button' value='是' class='c_button' />"),$("<input type='button' value='否' class='c_button marginLeftS' />"),$("<input type='button' value='取消' class='c_button marginLeftS' />"));
				for ( var i = 0; i < button.length; i++) {
					button[i].bind("click", {name : o.buttons,type: button[i].attr('btype')}, btnHandler);
					buttonsWrap.append(button[i]);
				}
		} else {
			// 遍历设置的按钮数组,将相应的按钮进行显示并绑定相应事件
			var buttonsArray = o.buttonsArray;
			var buttonsCallback = o.buttonsCallback;
			var buttonDom = html.find(".c_button");
			function btnsHandler(event) {
				var _callback = buttonsArray[event.data.index];
				if (typeof buttonsCallback[_callback] == 'function')
					buttonsCallback[_callback]();
			}
			o.jqbtns = []; 
			// 按钮绑定事件
			for ( var i = 0; i < buttonsArray.length; i++) {
				var btnClass = o.buttonsClass[i] || '';
				var btnStyle = o.buttonsStyle[i] || {};
				var btnAttr = o.buttonsAttr[i] || {};
				var buttons = $("<input type='button' value='" + buttonsArray[i] + "' class='c_button " + btnClass + "' />").css(btnStyle).attr(btnAttr);
				buttons.bind("click", {index : i}, btnsHandler);
				buttonsWrap.append(buttons);
				o.jqbtns.push(buttons);
			}
		}
		return o;
	} 
	o.initHtml = function(){
		if(o.header){
			html = $('<div class="'+dialogHandleClass+' dialogWrap textAlignLeft positionFix">'+
			'<div class="dialogWrapIE opacity positionA c_bgColor"></div>'+
			'<div class="c_dialogBox dialogBox positionFix"> '+
			'<div class="c_dialogTitle padding"><span class="c_titletext bottom">'+o.titleText+'</span>'+
			'<span class="'+closeClass+' close displayBlock positionA overflowHide textAlignCenter fontBord">X</span> </div>'+
			'<div class="c_contentWrap pl pr"></div><p class="c_btnWrap margin"> </p></div></div>');
		}else{
			html = $('<div class="'+dialogHandleClass+' dialogWrap textAlignLeft positionFix">'+
					'<div class="dialogWrapIE opacity positionA c_bgColor"></div>'+
					'<div class="c_dialogBox dialogBox positionFix"> '+
					'<div class="c_contentWrap padding"></div><p class="c_btnWrap margin"> </p></div></div>');
		}
		if(obj && (typeof(obj)==='string' || obj instanceof jQuery || 'nodeName' in obj)){
			html.find("."+closeClass).hide();
			html.find('.c_contentWrap').append(obj);
		}else{
			//将内容追加到弹出框,并再追加到body
			if(typeof(contentObj)==='string'){
				html.find('.c_contentWrap').append($('<p>'+contentObj+'</p>'));
			}	else if((contentObj instanceof jQuery)){
				html.find('.c_contentWrap').append(contentObj.show());
			} else if(contentObj && 'nodeName' in contentObj){
				html.find('.c_contentWrap').append($(contentObj).show());
			} 
		}

		//控制框是否可以拖拽
		if(o.draggable){
			$('.'+dialogHandleClass).show().find('.c_dialogBox').draggable({cursor:'move', handle:'.c_dialogTitle', scroll:false, containment: 'html'});
		}
		//获取dialog宽度和高度
		var _width = $('body').width()/5+150; 
		var _height = html.find('.c_contentWrap').height() + html.find('.c_dialogTitle').height() + html.find('.c_btnWrap').height() +100;
		//设置上传控制
		if(o.upload){ o.initUpload(); } 

		//关闭按钮绑定事件
		html.find("."+closeClass).bind("click",function(){
			o.beforeClose();
			$("."+dialogHandleClass).hide(o.closeCallback());
			o.afterClose();
		});
		
		//设置样式
		html.find(".c_bgColor").height($("body").height()).css({ "background-color": o.bgColor});
		html.find("."+closeClass).css(o.closeStyle).addClass(o.headClass);
		if(o.dialogStyle) html.find(".c_dialogBox").css(o.dialogStyle);
		html.find(".c_dialogTitle").css(o.headStyle).addClass(o.headClass);
		html.find(".c_contentWrap").css(o.contentStyle).addClass(o.contentClass);
		html.find(".c_btnWrap").css(o.btnsWrapStyle).addClass(o.btnsWrapClass);
		//计算弹出层的大小和位置
		if(o.width>0 && o.height>0){
			html.find(".c_dialogBox").css({ "width": o.width, "height":o.height, "top":o.top, "left":o.left });
		}else{
			html.find(".c_dialogBox").css({ "width": _width, "height":_height, "top":o.top, "left":o.left });
		}
		$('body').append(html.hide());
		return o;
	}
	o.setTitleText = function(txt){
		html.find('.c_titletext').text(txt);
		return o;
	}
	o.init();
	return o;
}
})(jQuery);