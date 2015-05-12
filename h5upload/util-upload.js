function UploadModule( index, domId, uploadurl, swfurl, maxsize, ticket, ishide, readycallback, compeletecallback, errorcallback ){
	
	//alert(index +","+ domId +","+ uploadurl +","+ swfurl +","+ maxsize +","+ ticket);
	
	$( "#" + domId ).uploadify({
		
		'uploader'       : uploadurl,
		'width'          : 198,
		'height'         : 125,
		'auto'           : true,
		'swf'       	 : swfurl,
		'queueID'        : 'fileQueue',
		'fileTypeDesc'   : '*.jpg,*.jpeg,*.bmp',
		'fileTypeExts' 	 : '*.jpg;*.jpeg;*.bmp;',
		'fileSizeLimit'  : maxsize / 1024,
		'method'		 : 'get',
		'multi'          : false,
		'isButton'       : true,
		'hideQueue'      : true,
		'requeueErrors'  : false,
		
		'onSWFReady'     : function(){
			
			if( ishide ) {
				hideUpload(domId);
			}
		},

		'onSelectError'  : function( file ){
			
			if( file.size > maxsize ){
				
				alert("文件尺寸最大不超过"+(maxsize / 1024 / 1024)+"M，请重新上传！");
			}
		},
		
		'onSelect'  	 : function ( file ) {
							
			$( "#" + domId ).uploadify( 'settings', 'formData' , { 
			
				'type'		: index,
				'ticket'	: ticket
			});
			
			if (readycallback) {
				readycallback(domId);
			}
		},
		
		'onUploadSuccess': function( file, data ){
			if (compeletecallback) {
				compeletecallback(file, jQuery.parseJSON(data),domId);
			}
		},
              
		'onUploadError'  : function(file, errorCode, errorMsg, errorString, data){
			
			if(errorcallback) {
				errorcallback(domId);
			}
			
        	alert("上传失败，请重试！");
		}
	});
}

function hideUpload(domId) {
	$(".uploadify[id="+domId+"]").hide();
}

function showUpload(domId) {
	$(".uploadify[id="+domId+"]").show();
}