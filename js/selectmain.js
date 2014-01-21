require.config({
	"baseUrl": "./js/",
	paths: {
  	jquery: 'jquery-1.7.2',
  	dialog: 'jquery.dialog',
  	select: 'jquery.select'
	},
  shim : {
    'util' : {
      deps : ['jquery'],
      exports : 'util'
    },
    'dialog' : {
      deps : ['jquery'],
      exports : 'dialog'
    },
    'select' : {
      deps : ['jquery'],
      exports : 'select'
    }
  },
  priority: ['jquery']
});
require(['jquery','dialog','util','select'], function ($,d,util,select){
  var s = new selects({
    event : 'click',
    selectHandler: '#j_select',
    selectClass:'ui-select ggrey btn greybtn round-10 posr oh',
    data: {list:[{ "name": "1", "value":"1" },{ "name": "2", "value":"2" }
    ]},
    dataUrl:'./data/select.json'
  });
  var s1 = new selects({
    event : 'click',
    selectHandler: '#j_select_1',
    selectClass:'ui-select ggrey btn greybtn round-10 posr oh',
    next: null,
    data: {list:[{ "name": "1", "value":"1" },{ "name": "2", "value":"2" }]},
    dataUrl:'./data/select.json'
  });

  var d =new dialog({
    top : '5%',
    titleText : "Select dialog",
    content: s.getUlobj(),
    contentStyle:{
      "height": $( window ).height()*0.65,
      "overflow": "auto"
    },
    btnsWrapStyle : {'text-align' : 'center'},
    buttonsClass : ["hm rounds ggrey btn greybtn ib wf-45", "hm rounds ggrey btn greybtn ml ib wf-45"],
    buttonsArray : ['cancel','ok'],
    beforeShow:function(e){
      var t = util.getTitle();
      if(!util.state()){ util.pushState({data:{name:'show'},title:t,url:'?show'});}else{
        util.replaceState({data:{name:'show'},title:t,url:'?show'});
      }
    },
    buttonsCallback : {'ok':function(){
      var v = d.getHtml().find('.c_ul').find('[state=s]').attr('val');
      var t = d.getHtml().find('.c_ul').find('[state=s]').attr('text');
      s.setValue(v).setText(t).remark();
      var n = s.getNext();
      if(n){
        n.setParams({'name':t,'value':v});
        n.setData();
      }
      history.back();
      d.close();
    },'cancel':function(){
      d.close();
    }}
  });
  var d1 =new dialog({
    top : '5%',
    titleText : "Select dialog",
    content: s1.getUlobj(),
    contentStyle:{
      "height": $( window ).height()*0.65,
      "overflow": "auto"
    },
    btnsWrapStyle : {'text-align' : 'center'},
    buttonsClass : ["hm rounds ggrey btn greybtn ib wf-45", "hm rounds ggrey btn greybtn ml ib wf-45"],
    buttonsArray : ['cancel','ok'],
    beforeShow:function(e){
      var t = util.getTitle();
      if(!util.state()){
        util.pushState({data:{name:'show2'},title:t,url:'?show2'});
        }else{
        util.replaceState({data:{name:'show2'},title:t,url:'?show2'});
      }
    },
    buttonsCallback : {'ok':function(){
      var v = d1.getHtml().find('.c_ul').find('[state=s]').attr('val');
      var t = d1.getHtml().find('.c_ul').find('[state=s]').attr('text');
      s1.setValue(v).setText(t).remark();
      d1.close();
    },'cancel':function(){
      d1.close();
    }}
  });
  s.setNext(s1);
  s.setDialog(d);
  s1.setDialog(d1);
});
