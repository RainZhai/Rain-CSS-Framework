jQuery.extend({
	createUploadIframe: function(id, uri)
    {
        //create frame
        var frameId = 'jUploadFrame' + id;
        
        var iframeHtml;
        
        /**if(window.ActiveXObject) {  
            if(jQuery.browser.version=="9.0") {  
                iframeHtml = document.createElement('iframe');  
                iframeHtml.id = frameId;  
                iframeHtml.name = frameId;  
                iframeHtml.style.display = "none";
            } else if(jQuery.browser.version=="6.0"||jQuery.browser.version=="7.0"||jQuery.browser.version=="8.0") {  
            	iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="display:none;position:absolute; top:-9999px; left:-9999px"';
                if(typeof uri== 'boolean'){
                    iframeHtml += ' src="' + 'javascript:false' + '"';
                }
                else if(typeof uri== 'string'){
                    iframeHtml += ' src="' + uri + '"';
                }
                
                iframeHtml += ' />';
            }  
        } else {**/
        	iframeHtml = document.createElement('iframe');  
            iframeHtml.id = frameId;  
            iframeHtml.name = frameId;  
            iframeHtml.style.display = "none";
        /**}**/
        
        jQuery(iframeHtml).appendTo(document.body);
 
        return jQuery('#' + frameId).get(0);           
    },
    createUploadForm: function(id,fileElementId,data,fileElement,compress)
	{
		//create form	
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');	
		if(data)
		{
			for(var i in data)
			{
				//console.log("name='" + i + '" value="' + data[i]);
				jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
			}			
		}
		if ( !compress ) {
			var oldElement;
			if(fileElement == null)
				oldElement = jQuery('#' + fileElementId);
			else
				oldElement = fileElement;
			
			var newElement = jQuery(oldElement).clone(true);
			jQuery(oldElement).attr('id', fileId);
			jQuery(oldElement).before(newElement);
			jQuery(oldElement).appendTo(form);
		}
		//set attributes
		jQuery(form).css('position', 'absolute');
		jQuery(form).css('top', '-1200px');
		jQuery(form).css('left', '-1200px');
		jQuery(form).appendTo('body');		
		return form;
    },

    ajaxFileUpload: function(s) {
    	s = jQuery.extend({}, jQuery.ajaxSettings, s);
    	try 
        {
	        if ( s.compress && window.applicationCache ) {
	        	var element = document.getElementById(s.fileElementId);
	        	if (element && element.files && element.files.length > 0 ) {
	        		jQuery.compress(element,s.newWidth,s.newHeight,s.limitSize,function(data){
	        			
	        			if ( data && data.value && data.value != "" ) {
	        				
	        				if (typeof(s.data)=='undefined'){
	        					s.data = new Object();
	        				}
	        				
	        				s.data[data.script] = data.value;
	        			
	        			} else {
	        				
	        				s.compress = false;
	        			}
	        			
	        			jQuery.ajaxFileUpload_normal(s);
	        		});
	        	} else {
	        		s.compress = false;
	            	jQuery.ajaxFileUpload_normal(s);
	        	}
	        } else {
	        	s.compress = false;
	        	jQuery.ajaxFileUpload_normal(s);
	        }
	        
        } catch(e){
        	
        	s.compress = false;
        	jQuery.ajaxFileUpload_normal(s);
        }
    }, 
    
    ajaxFileUpload_normal: function(s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime();
		var form = jQuery.createUploadForm(id, s.fileElementId, (typeof(s.data)=='undefined'?false:s.data),s.fileElement,s.compress);
		var io = jQuery.createUploadIframe(id, s.secureuri);
		var frameId = 'jUploadFrame' + id;
		var formId = 'jUploadForm' + id;		
        // Watch for a new set of requests
        if ( s.global && ! jQuery.active++ )
		{
			jQuery.event.trigger( "ajaxStart" );
		}            
        var requestDone = false;
        // Create the request object
        var xml = {};
        if ( s.global )
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back
        var uploadCallback = function(isTimeout)
		{			
			var io = document.getElementById(frameId);
            try 
			{		
				if(io.contentWindow)
				{
					 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
                	 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
                	 
				}else if(io.contentDocument)
				{
					 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
                	xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}	
				
            }catch(e)
			{
				jQuery.handleError(s, xml, null, e);
			}
            if ( xml || isTimeout == "timeout") 
			{				
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                    if ( status != "error" )
					{
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData( xml, s.dataType );    
                        // If a local callback was specified, fire it and pass it the data
                        if ( s.success )
                            s.success( data, status,s.compress, s.data );
    
                        // Fire the global callback
                        if( s.global )
                            jQuery.event.trigger( "ajaxSuccess", [xml, s] );
                    } else
                        jQuery.handleError(s, xml, status);
                } catch(e) 
				{
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed
                if( s.global )
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );

                // Handle the global AJAX counter
                if ( s.global && ! --jQuery.active )
                    jQuery.event.trigger( "ajaxStop" );

                // Process result
                if ( s.complete )
                    s.complete(xml, status);

                jQuery(io).unbind();

                setTimeout(function()
									{	try 
										{
											jQuery(io).remove();
											jQuery(form).remove();	
											
										} catch(e) 
										{
											jQuery.handleError(s, xml, null, e);
										}									

									}, 100);

                xml = null;

            }
        };
        // Timeout checker
        if ( s.timeout > 0 ) 
		{
            setTimeout(function(){
                // Check to see if the request is still happening
                if( !requestDone ) uploadCallback( "timeout" );
            }, s.timeout);
        }
        try 
		{

			var form = jQuery('#' + formId);
			jQuery(form).attr('action', s.url);
			jQuery(form).attr('method', 'POST');
			jQuery(form).attr('target', frameId);
            if(form.encoding)
			{
				jQuery(form).attr('encoding', 'multipart/form-data');      			
            }
            else
			{	
				jQuery(form).attr('enctype', 'multipart/form-data');			
            }			
            jQuery(form).submit();

        } catch(e) 
		{			
            jQuery.handleError(s, xml, null, e);
        }
		
		jQuery('#' + frameId).load(uploadCallback);
        return {abort: function(){
			try
			{
				jQuery('#' + frameId).remove();
				jQuery(form).remove();
			}
			catch(e){}
		}};
    },
    
    compress:function(element,newWidth,newHeight,limitSize,callback){
    	
		var files = element.files;
		
		var imgId = element.id || element.name;
		
		var imgPath = element.value;
		
		//var encryptImg = new Array();
		
		for (var i = 0, f; f = files[i]; i++) {
			
			var imgType = f.type;
			var imgSize = f.size;
			
			// Only process image files.
			if (!imgType.match('image.*')) {
				continue;
			}
			
			var reader = new FileReader();
			
			// Closure to capture the file information.
			reader.onload = (function(theFile) {
				
				return function(e) {
					
					var source_img_obj = new Image();
					
					//alert("处理图片");
			    	source_img_obj.onload = function() {
			    		
			    	    var cvs = document.createElement('canvas');
			    	    
			    	    //naturalWidth真实图片的宽度
			    	    //console.log("原图--"+this.width+":"+this.height);
			    	  
			    	    var scale = 1;
			    	    
			    	    if ( limitSize && limitSize > 0 && imgSize > limitSize ) {
			    	    	scale = Math.sqrt(limitSize / imgSize);
			    	    	cvs.width = this.width*scale;
					    	cvs.height = this.height*scale;
			    	    } else if (  newWidth && newWidth > 0 && newHeight && newHeight > 0 ) {
			    	    	cvs.width = newWidth;
					    	cvs.height = newHeight;
			    	    } else {
			    	    	cvs.width = this.width*scale;
					    	cvs.height = this.height*scale;
			    	    }
			    	    
			    	    var ctx=cvs.getContext("2d");
			    	    ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
			    	    var newImageData = cvs.toDataURL(imgType, 0.9);	  
			    	    
			    	    var newfile = new Object();
			    	    newfile.id = imgId;
			    	    newfile.script = "file:" + imgPath;
			    	    newfile.position = i;
			    	    newfile.path = imgPath;
			    	    newfile.type = imgType;
			    	    newfile.value = newImageData && newImageData == ""?"":newImageData.substring(newImageData.indexOf(",") + 1);
			    	    callback(newfile);
			    	    
			    	    //encryptImg.push(newImageData);
			    	};
			    	
			    	source_img_obj.src = e.target.result;
				};
			})(f);
			
			// Read in the image file as a data URL.
			reader.readAsDataURL(f);
		}
	},

    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
		
        // If the type is "script", eval it in global context
        if ( type == "script" )
            jQuery.globalEval( data );
        // Get the JavaScript object, if JSON is used.
        if ( type == "json" )
            eval( "data = " + data );
        // evaluate scripts within html
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();

        return data;
    },
	
	handleError: function( s, xml, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error )
			s.error( xml, status, e );

		// Fire the global callback
		if ( s.global )
			jQuery.event.trigger( "ajaxError", [xml, s, e] );
	}
});