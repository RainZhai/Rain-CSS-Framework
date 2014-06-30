/**
* define util function
*/ 
(function(win,$){
  win.util = util = {};
  util.touch = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      /** 触摸事件注册 */
      registerEvent: function (selector, startfunc, movefunc, endfunc) {
        if ($.isFunction(startfunc)) selector[0].addEventListener("touchstart", startfunc, false);
        if ($.isFunction(movefunc)) selector[0].addEventListener("touchmove", movefunc, false);
        if ($.isFunction(endfunc)) selector[0].addEventListener("touchend", endfunc, false);
      }
  };
  if(!win.console){win.console = function(){};win.console.info = win.console.debug = win.console.warn = win.console.log = win.console.error = function(str){alert(str);}};
  win.log = function(){
    if(arguments.length>1){
      var s='';
      for(var i=0,l=arguments.length;i<l; i++){s = s + arguments[i]+',';}
      console.log(util.clearLastComma(s));
    }
  };
  /**
   * 浏览器的特性的简单检测，并非精确判断。
   */
  function detectBrowser(ns){
    var ua = ns.ua = navigator.userAgent;   
    ns.isWebKit = (/webkit/i).test(ua);
    ns.isMozilla = (/mozilla/i).test(ua); 
    ns.isIE = (/msie/i).test(ua);
    ns.isFirefox = (/firefox/i).test(ua);
    ns.isChrome = (/chrome/i).test(ua);
    ns.isSafari = (/safari/i).test(ua) && !this.isChrome;
    ns.isMobile = (/mobile/i).test(ua);
    ns.isOpera = (/opera/i).test(ua);
    ns.isIOS = (/ios/i).test(ua);
    ns.isIpad = (/ipad/i).test(ua);
    ns.isIpod = (/ipod/i).test(ua);
    ns.isIphone = (/iphone/i).test(ua) && !this.isIpod;
    ns.isAndroid = (/android/i).test(ua);
    ns.supportStorage = "localStorage" in win;
    ns.supportOrientation = "orientation" in win;
    ns.supportDeviceMotion = "ondevicemotion" in win;
    ns.supportTouch = "ontouchstart" in win;
    ns.supportCanvas = document.createElement("canvas").getContext != null;
    ns.cssPrefix = ns.isWebKit ? "webkit" : ns.isFirefox ? "Moz" : ns.isOpera ? "O" : ns.isIE ? "ms" : "";
  };
  detectBrowser(util);
  /* 清除字符串尾部的逗号 */
  util.clearLastComma =function(str){ return str=str.replace(/,$/,'');};
  /*检查对象属性*/
  util.checkprop = function(propName, obj) { /*obj.hasOwnProperty */return propName in obj; };
  util.queryByTag = function(t){return document.getElementsByTagName(t);};
  util.queryById = function(t){return document.getElementById(t);};
  /*增加历史状态*/
  util.pushState = function(obj){
    if (history && util.checkprop('pushState',history)) {
    var opt = $.extend({data:{}, title:''}, obj || {});
    history.pushState(opt.data, opt.title, opt.url);
    }
  };
  /*替换历史状态*/
  util.replaceState = function(obj){
    if (history && util.checkprop('replaceState',history)) {
    var opt = $.extend({data:{}, title:'',url:''}, obj || {});
    history.replaceState(opt.data, opt.title, opt.url);
    }
  };
  /*获取当前状态*/
  util.state = function(){
    if(history && util.checkprop('state',history)){
      return history.state;
    }
  };
  /*获取当前页面title*/
  util.getTitle = function(){
    var t = util.queryByTag('title');
    if(t.length >0){return t[0].innerText;}
    return '';
  };
  /*注册状态改变事件*/
  util.registerStateChange=function(callback){
    if('onpopstate' in win){
      win.onpopstate = function(){callback();}
    }
  };
  /*获取地址参数值并调用对象方法*/
  util.initObjByUrl=function(obj){
    var urlparam = location.href.split("?")[1];
    if(urlparam && obj && urlparam in obj){obj[urlparam]();}
  };
  
  /*添加本地存储*/
  util.savedata = function(k,v){
	  if(util.supportStorage && k && v){
		  localStorage.setItem(k,v);
	  }
  };
  /*获取本地存储*/
  util.getdata = function(k){
	  if(util.supportStorage && k){
		  return localStorage.getItem(k);
	  }
	  return null;
  };
  /**
  * @description 类式继承
  * @method
  * @param {Function} subClass - 子类
  * @param {Function} superClass - 父类
  * @example $.freehtml.extend(Author, Person);
  */
  util.extend = function(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superclass = superClass.prototype;
    if(superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
    }
  };
  /**
  * @description 原型继承
  * @method
  * @param {object} object 对象 - 要进行克隆的对象
  * @example var a = $.freehtml.clone(Person);
  */
  util.clone = function(object) {
    function F(){};
    F.prototype = object;
    return new F;
  };
  /**
  * @description Augment function, improved. 
  * @method
  * @param {object} receivingClass - 接受mixin的对象
  * @param {object} givingClass - 提供mixin的对象
  * @example var a = $.freehtml.augment(Teacher,Person);
  */
  util.augment = function(receivingClass, givingClass) {
    if(arguments[2]) { // Only give certain methods.
      for(var i = 2, len = arguments.length; i < len; i++) {
        receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
      }
    }else { // Give all methods.
      for(methodName in givingClass.prototype) { 
        if(!receivingClass.prototype[methodName]) {
          receivingClass.prototype[methodName] = givingClass.prototype[methodName];
        }
      }
    }
  };
  var emptyConstructor = function() {};
  /**
   * 继承方法。
   * @param {Function} childClass 子类。
   * @param {Function} parentClass 父类。
   */
  util.inherit = function(childClass, parentClass){
	emptyConstructor.prototype = parentClass.prototype;
	childClass.superClass = parentClass.prototype;
	childClass.prototype = new emptyConstructor();
	childClass.prototype.constructor = childClass;
  };
  /**
   * 把props参数指定的属性或方法复制到obj对象上。
   * @param {Object} obj Object对象。
   * @param {Object} props 包含要复制到obj对象上的属性或方法的对象。
   * @param {Boolean} strict 指定是否采用严格模式复制。默认为false。
   * @return {Object} 复制后的obj对象。
   */
  util.merge = function(obj, props, strict){
  	for(var key in props){
  		if(!strict || obj.hasOwnProperty(key) || obj[key] !== undefined) obj[key] = props[key];
  	}
  	return obj;
  };
  /**
   * 把图片转换成dataURL格式的位图。
   * @param {DisplayObject} obj 要缓存的显示对象。
   * @param {Boolean} toImage 指定是否把缓存转为DataURL格式的。默认为false。
   * @param {String} type 指定转换为DataURL格式的图片mime类型。默认为"image/png"。
   * @return {Object} Image对象。
   */
  util.cacheImg = function(obj, type, callback){
	  	var w = obj.width, h = obj.height;
		var canvas = util.createDOM("canvas", {
			width : w,
			height : h
		});
		var image = new Image();
		image.src = obj.src;
		if (canvas == null){return false;}
		var context = canvas.getContext("2d");
		context.fillStyle = "#EEEEFF";
		context.fillRect(0, 0, w, h);
		image.onload = function() {
			context.drawImage(image, 0, 0);
			var img = new Image();
			img.width = w;
			img.height = h;
			img.src = canvas.toDataURL(type || "image/png");
			callback(img);
		};
  };
  /**
	 * 创建一个指定类型type和属性props的DOM对象。
	 * 
	 * @param {String}
	 *            type 指定DOM的类型。比如canvas，div等。
	 * @param {Object}
	 *            props 指定生成的DOM的属性对象。
	 * @return {HTMLElement} 新生成的DOM对象。
	 */
  util.createDOM = function(type, props){
  	var dom = document.createElement(type);
  	for(var p in props){
  		var val = props[p];
  		if(p == "style"){
  			for(var s in val) dom.style[s] = val[s];
  		}else{
  			dom[p] = val;
  		}
  	}
  	return dom;
  };
  /**
   * 通用loader对象
   * @param {Object} 参数对象
   * @return {Object} 返回一个公有对象
   */
  util.loading = $.fn.loading = $.loading = function(obj){
    var opt = $.extend({
      content:"",//文本
      loadingStyle:{},//loading的样式
      loadingClass:"",//loading class。
      textStyle:{"font-size":"1.2em"},//文本的样式
      textClass:""//文本的class
    }, obj || {});
    var randomStr = Math.round(Math.random() * 1e6 + 1) + "",
    _content=opt.content;
    var o = {
        htmlobj:null,
        /** 初始化 */
        init:function(){
          o.initHtml();
          o.initUI();
        },
        /** 初始化html*/
        initHtml:function(){
          if(!o.html){
            o.html = $('<div id="j_loader'+randomStr+'" class="j_loader'+randomStr+' ui-loader round-5 ps posf hide"><span class="ui-icon-loading block center roundall o-5"></span><div class="j_content tac"></div></div>');
          }
          if(_content){o.html.find('.j_content').html(_content);}
          return o.html;
        },
        /** 设置样式*/
        initUI:function(){
          o.html.addClass(opt.loadingClass);
          o.html.css(opt.loadingStyle);
          o.html.find('.j_content').css(opt.textStyle);
          o.html.find('.j_content').addClass(o.textClass);
          $('body').append(o.html);
        },
        /**
         * 设置文本内容
         * @param {string} 文本
         */
        setContent:function(s){
           o.html.find('.j_content').html(s);
        },
        /** loading显示 */
        show:function(){
          o.html.removeClass("hide");
        },
        /** loading隐藏 */
        hide:function(){
          o.html.addClass("hide");
        }
    };

    o.init();
    return o;
  };
  /**
   * 通用列表加载方法
   * @param {Object} 参数对象
   * @return {function} 回调函数
   */
  util.listload = $.listload = function(obj,callback){
    var opt = $.extend({
      lastItemHandle:'.list:last-child',
      loadurl:"",
      params:null,
      wrapHandle:'#listbox'
    }, obj || {});
    
    var win = $(window);
    var wrapbox = $(opt.wrapHandle);
    var o ={
    /**
     * @method 获取列表容器对象
     * @public
     */
    getDatabox : function() {
      return wrapbox;
    },
    /**
     * @method 设置获取数据参数
     * @public
     * @param {object} 参数对象
     */
    setParams : function(obj) {
      opt.params = obj;
    },
    /** @method 设置获取数据参数 */
    getParams : function() {
      return opt.params;
    },
    /** @method 设置可用数据
     *  @public
     *  @param {object} 对象
     */
    setData: function(d){
      o.data = d;
    },
    /** @method 获取可用数据 */
    getData: function(){
      return o.data
    },
    init : function(){
      win.scroll(function(){
          //手机端滚动到底部加载height=device-height;
          if ($(opt.lastItemHandle).is(':visible')){
           if(win.scrollTop() + win.height() >= $(document).height()){
             if(opt.loadurl){
               var p  = o.getParams();
               $.getJSON(opt.loadurl, p, function(data) {
                 o.setData(data);
                 if($.isFunction(callback)) callback();
               });
             }
           }
          }
      });
    }
    };
    o.init();
    return o;
  };
  
})(window,jQuery);