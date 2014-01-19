require.config({
	"baseUrl": "./js/",
	paths: {
  	jquery: 'jquery-1.7.2',
  	dialog: 'jquery.dialog',
  	util:'util'
	},
  priority: ['jquery']
});
require(['jquery','dialog','util'], function ($,d,u){
  var util = window.util;
  var b =new dialog({
    top:'10%',
    draggable: true,
    titleText:"hello dialog 2",
    dialogStyle:{"border":"8px solid #ededed"},
    titleStyle:{"background":"#F5F5F5"},
    btnsWrapStyle:{'text-align':'right'},
    buttonsClass:["hs rounds gb btn bluebtn","hs rounds ggrey btn greybtn ml"],
    closeCallback: function(){},
    buttons:"OKCancel",
    content:$(".c_testwrap2"),
    beforeShow:function(e){
      var t = util.getTitle();
      if(!util.state()){
        util.pushState({data:{name:'show',obj:'b'},title:t,url:'?show'});
      }else{
        util.replaceState({data:{name:'show',obj:'b'},title:t,url:'?show'});
      }
    },
    beforeClose:function(e){ log(e.data.name,e.data.type);},
    afterClose:function(e){ log(e.data.name);},
    upload: false
  });
  util.registerStateChange(function(){
    if(!util.state() && b){b.close();}else{b._show();}
  });
  util.initObjByUrl(b);
  //util.augment(c,b);
  b.show();
  var temp = document.getElementById('c_testwrap3');
  //var a = $.dialog($('<p>你好！</p>'));
  //a.show().close();
});
