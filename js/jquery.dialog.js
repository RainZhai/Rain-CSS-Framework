/**
* dailog 1.3
* -----------------------------------------------
* the plugin to generate warp div to show dialog
* Anthor: zhaiyu
* Date: 2013.1.21
*/
(function($) {
	$.dialogWrap = function(o) {
	o = $.extend({
		width: 540, //弹出框宽度
		height: 0,//弹出框高度
		top: "20%",//离顶部的距离
		left: "50%",//离左边的距离
		draggable: false,//是否可以拖拽
		header:true,
		content:null,//弹出框内显示的内容
		contentSelector:null,//内容区域对象
		closeHandleClass:"c_close",//关闭图标的句柄
		dialogWrapHandleClass:"c_dialogwrap",//弹出层句柄
		dialogTitletext:"提示框",//弹出层文本
		bgColor:"#fff",//遮罩背景色
		borderCSS:{"border":"8px solid #ededed"},//设置边框效果
		titleCSS:{"background":"#F5F5F5"},
		buttonsAlign:"right",
		buttonsClass:["heightS css3_roundS css3_gradient_blue button blueButton marginLeft"],
		closeCallback: function(){},
		buttonsArray:[],
		buttonsCallback:{},
		beforeShow:function(){},
		upload:false
	}, o || {});
	
	var randomStr = Math.round(Math.random()*1000000)+1000000+'',
		width = o.width,
		height = o.height,
		top = o.top,
		left = o.left,
		contentObj = o.content,
		bgColor = o.bgColor,
		closeClass = o.closeHandleClass+randomStr,
		dialogWrapHandleClass = o.dialogWrapHandleClass+randomStr,
		dialogTitletext = o.dialogTitletext,
		closeCallback = o.closeCallback,
		header = o.header,
		html = null;
		console.info(randomStr);
	var beforeShow=o.beforeShow;
	o.show = function(callback){
		(typeof (beforeShow)=="function")&& beforeShow();
		
		if($("body").find("."+dialogWrapHandleClass).length==0){
			if(header){
				html = $('<div class="'+dialogWrapHandleClass+' dialogWrap textAlignLeft positionFix">'+
				'<div class="dialogWrapIE opacity positionA c_bgColor"></div>'+
				'<div class="dialogBoxSize dialogBox2 positionFix"> '+
				'<div class="c_dialogTitle padding"><h3 class="bottom">'+dialogTitletext+'</h3>'+
				'<span class="'+closeClass+' close displayBlock positionA overflowHide textAlignCenter fontBord">X</span> </div>'+
				'<div class="c_contentWrap"></div><p class="c_dialogButtonWrap dialogButtonWrap margin"> </p></div></div>');
			}else{
				html = $('<div class="'+dialogWrapHandleClass+' dialogWrap textAlignLeft positionFix">'+
						'<div class="dialogWrapIE opacity positionA c_bgColor"></div>'+
						'<div class="dialogBoxSize dialogBox2 positionFix"> '+
						'<div class="c_contentWrap"></div><p class="c_dialogButtonWrap dialogButtonWrap margin"> </p></div></div>');
			}
			//将内容追加到弹出框,并再追加到body
			if(typeof(contentObj)==='string'){
				width=200,height=50,left="59%";
				html.find(".c_contentWrap").append($("<p style='text-align:center; font-size:14px; padding-top:15px;'>"+contentObj+"</p>"));
			}	else if((contentObj instanceof jQuery)){
				html.find(".c_contentWrap").append(contentObj.show());
			}
			$("body").append(html);
			//控制框是否可以拖拽
			if(o.draggable){
				$("."+dialogWrapHandleClass).show().find(".dialogBox2").draggable({cursor:"move", handle:".c_dialogTitle", scroll:false, containment: "html"});
			}
			//获取dialog宽度和高度
			var _width = $("body").width()/5+200; 
			var _height = html.find(".c_contentWrap").height() + html.find(".c_dialogTitle").height() + html.find(".c_dialogButtonWrap").height() +100;
			//设置上传控制
			if(o.upload){
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
					html.find(".dialogBoxSize").css({ "width": _width, "height":_height, "top":top, "left":left });
					uploadHtml.find(".c_picArea").removeClass("hide");
				});
				uploadHtml.find(".c_closeUploadBox").bind("click",function(){
					_height = _height - 30;
					html.find(".dialogBoxSize").css({ "width": _width, "height":_height, "top":top, "left":left });
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
			}
			//设置遮罩颜色
			$(".c_bgColor").css({ "background-color": bgColor});
			//遍历设置的按钮数组,将相应的按钮进行显示并绑定相应事件
			var buttonsArray = o.buttonsArray;
			var buttonsCallback = o.buttonsCallback;
			var buttonsWrap = html.find(".c_dialogButtonWrap");
			var buttonDom = html.find(".c_button");
			function functionHandler(event){
				var _callback = buttonsArray[event.data.index];
				buttonsCallback[_callback]();
			}
			//按钮绑定事件
			if(buttonsArray.length>0){
				for(var i=0; i<buttonsArray.length; i++){
					var btnClass = o.buttonsClass[i] || '';
					var buttons = $("<input type='button' value='"+buttonsArray[i]+"' class='c_button "+btnClass+"' />");
					buttons.bind("click",{index:i},functionHandler);
					buttonsWrap.append(buttons);
				}
			}
			//关闭按钮绑定事件
			html.find("."+closeClass).bind("click",function(){
				$("."+dialogWrapHandleClass).hide();
				closeCallback();
			});
			
			html.find(".c_bgColor").height($("body").height());
			//设置样式
			html.find(".dialogBox2").css(o.borderCSS);
			html.find(".c_dialogTitle").css(o.titleCSS);
			html.find(".c_dialogButtonWrap").css({"text-align":o.buttonsAlign});
			//计算弹出层的大小和位置
			if(height>0){
				html.find(".dialogBoxSize").css({ "width": width, "height":height, "top":top, "left":left });
			}else{
				html.find(".dialogBoxSize").css({ "width": _width, "height":_height, "top":top, "left":left });
			}
			if(callback){	callback();}
		}else{
			$("."+dialogWrapHandleClass).show(callback);
		}
	}
	o.close = function(callback){
		$("."+dialogWrapHandleClass).hide();
		if(callback){	callback();}
	}
	o.height = function(h/*number*/){
		if(typeof(h)==='number'){if(html){html.find(".dialogBoxSize").height(h);}}
	}
	
	return o;
}
})(jQuery);