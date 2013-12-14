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
			buttonsStyle:[{}],//按钮组style
			buttonsClass:['heightS css3_roundS css3_gradient_blue button blueButton marginLeft'],//按钮class组
			closeCallback: function(){},
			buttons:null,//常用按钮
			buttonsArray:[],//按钮组
			buttonsCallback:{},//按钮的回调
			buttonsAttr:[],//按钮的属性
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
			o.initHtml().initBtns().initModule();
		};
		o.getDialogID = function(){
			return dialogHandleClass;
		};
		o.setContent = function(obj){
			var html = o.getHtml().addClass('vf');
			if(typeof(obj)==='string'){
				html.find('.c_contentWrap').empty().append($('<p>'+obj+'</p>'));
			}	else if((contentObj instanceof jQuery)){
				html.find('.c_contentWrap').empty().append(obj.show());
			} else if(obj && 'nodeName' in obj){
				html.find('.c_contentWrap').empty().append($(obj).show());
			}
			o._setDialogHeight(html.removeClass('vf'));
			return o;
		};
		o._show = function(callback){
			if($('body').find('.'+dialogHandleClass).length==0){
				$('body').append(o.html);
			}else{
				$("."+dialogHandleClass).show(callback);
			} 
		};
		o.show = function(s,callback){
			o.beforeShow();
			if(s){setTimeout(function(){o._show(callback);}, s);}else{o._show(callback);}
			o.afterShow();
			if(typeof(callback)==='function'){callback();}
			return o;
		};
		o.hide = o.close = function(callback){
			$("."+dialogHandleClass).hide();
			if(typeof(callback)==='function'){	callback();}
			return o;
		};
		o.getBtn = function(i){
			if(i>-1 && o.jqbtns){
				return o.jqbtns[i];
			}
			return null;
		};
		o.setHeight = function(h/*number*/){
			if(typeof(h)==='number'){if(o.html){o.html.find(".c_dialogBox").height(h);}}
			return o;
		};
		o.setHandle = function(obj){
			o.handle = obj;
			return o;
		};
		o.initUpload = function(){
			var html = o.getHtml();
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
		};
		
		o.initBtns = function(){
			var _html = o.getHtml();
			//设置按钮
			var buttonsWrap = _html.find(".c_btnWrap");
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
						button[i].on("click", {name : o.buttons,type: button[i].attr('btype')}, btnHandler);
						buttonsWrap.append(button[i]);
					}
			} else {
				// 遍历设置的按钮数组,将相应的按钮进行显示并绑定相应事件
				var buttonsArray = o.buttonsArray;
				var buttonsCallback = o.buttonsCallback;
				var buttonDom = _html.find(".c_button");
				function btnsHandler(e) {
					var _callback = buttonsArray[e.data.index];
					if (typeof buttonsCallback[_callback] == 'function') {buttonsCallback[_callback](e);}
				}
				o.jqbtns = []; 
				// 按钮绑定事件
				for ( var i = 0; i < buttonsArray.length; i++) {
					var btnClass = o.buttonsClass[i] || '';
					var btnStyle = o.buttonsStyle[i] || {};
					var btnAttr = o.buttonsAttr[i] || {};
					var buttons = $("<a href='javascript:void(0);' class='c_button ib tdn "+btnClass+"'>"+buttonsArray[i]+"</a>").css(btnStyle).attr(btnAttr);
					buttons.on("click", {index : i}, btnsHandler);
					buttonsWrap.append(buttons);
					o.jqbtns.push(buttons);
				}
			}
			buttonsWrap.append('<div class="touchWrap posa fullw fullh"></div>');
			return o;
		};
		o.initHtml = function(){
			if(o.header){
				var closehtml = '';
				if(o.showClose){
					closehtml = '<span class="'+closeClass+' close block posa oh tac fontBord">X</span>';
				}
				html = $('<div id="'+dialogHandleClass+'" class="'+dialogHandleClass+' dialogWrap tal posf">'+
				'<div class="dialogWrapIE o posa c_bgColor"></div>'+
				'<div class="c_dialogBox dialogBox posa"> '+
					'<div class="c_dialogTitle p"><span class="c_titletext bottom">'+o.titleText+'</span>'+closehtml+'</div>'+
					'<div class="c_contentWrap pl pr"></div>'+
					'<p class="c_btnWrap m posr"> </p>'+
				'</div></div>');
			}else{
				html = $('<div class="'+dialogHandleClass+' dialogWrap tal posf">'+
						'<div class="dialogWrapIE o posa c_bgColor"></div>'+
						'<div class="c_dialogBox dialogBox posa"> '+
						'<div class="c_contentWrap p"></div><p class="c_btnWrap m posr"> </p></div></div>');
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
			o.html = html;
			html = null;
			return o;
		};
		o.initModule = function(){
			var html = o.getHtml();
			//控制框是否可以拖拽
			if(o.draggable){
				$('.'+dialogHandleClass).show().find('.c_dialogBox').draggable({cursor:'move', handle:'.c_dialogTitle', scroll:false, containment: 'html'});
			}
			//设置上传控制
			if(o.upload){ o.initUpload(); } 

			//关闭按钮绑定事件
			html.find("."+closeClass).bind("click",{name : 'closebtn',type: 'close'},function(e){
				o.beforeClose(e);
				o.close(o.closeCallback);
				o.afterClose(e);
			});
			
			//设置样式
			html.find(".c_bgColor").height($("body").height()).css({ "background-color": o.bgColor});
			html.find("."+closeClass).css(o.closeStyle).addClass(o.headClass);
			if(o.dialogStyle) html.find(".c_dialogBox").css(o.dialogStyle);
			if(o.dialogClass) html.find(".c_dialogBox").addClass(o.dialogClass);
			html.find(".c_dialogTitle").css(o.headStyle).addClass(o.headClass);
			html.find(".c_contentWrap").css(o.contentStyle).addClass(o.contentClass);
			html.find(".c_btnWrap").css(o.btnsWrapStyle).addClass(o.btnsWrapClass);
			$('body').append(html.addClass('vf'));
			o._setDialogHeight(html.removeClass('vf'));
			html.hide();
			return o;
		};
		
		o._setDialogHeight = function(obj){
			//获取dialog宽度和高度
			var _width = $('body').width()/5+150;
			var _height = obj.find('.c_contentWrap').outerHeight(true) + obj.find('.c_dialogTitle').outerHeight(true) + obj.find('.c_btnWrap').outerHeight(true);
			//计算弹出层的大小和位置
			if(o.width>0 && o.height>0){
				obj.find(".c_dialogBox").css({ "width": o.width, "height":o.height, "top":o.top, "left":o.left });
			}else{
				obj.find(".c_dialogBox").css({ "width": _width, "height":_height, "top":o.top, "left":o.left });
			}
			return o;
		};
		o.getHtml = function(){
			return o.html;
		};
		o.setTitleText = function(txt){
			o.getHtml().find('.c_titletext').text(txt);
			return o;
		};
		o.init();
		return o;
};
})(jQuery);