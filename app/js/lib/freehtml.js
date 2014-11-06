/**
*	define jquery plugin freehtml
*/
(function() {
	(function(){
		if(!window.console){window.console = function(){};window.console.info = window.console.debug = window.console.warn = window.console.log = window.console.error = function(str){alert(str);}}

		window.log = function(){
			if(arguments.length>0){
				for(var i=0,l=arguments.length;i<l; i++){ console.log(arguments[i]);}
			}
		}
	}());
	/**
	* @description 为requirejs注册一个插件Register a plugin.
	* @param {Object}  - The plugin Object.
	*/
	function plugin($){
		$.freehtml = {};
		/**
		*	@description 接口声明
		*	@class
		*	@param {string} name - dom对象名称 The name of the html element.
		*	@param {object} [可选]样式对象
		*	@param {object} [可选]属性对象
		*	@example var dom = _html.create('p',{'height':'40px','background':'#000'},{'title':'sdfds'});
		*/
		$.freehtml.create = function(obj){
			if(arguments<1){ throw new Error('Can not create element with no argument');}
			var ele = document.createElement(obj);
			var _style = ele.style;
			if(arguments[1]){
				for(var s in arguments[1])
					_style[s] = arguments[1][s];
			}
			if(arguments[2]){
				for(var p in arguments[2])
					ele[p] = arguments[2][p];
			}
			return ele;
		}
		/**
		*	@description 接口声明
		*	@constructor
		*	@param {string} name - 接口名称 The name of the interface.
		*	@param {Array} methods - 接口下的方法 The methods in the interface
		*	@example var BoxIf = new $.freehtml.interface('Box', ['add', 'remove']);
		*/
		$.freehtml.interface = function(name, methods) { 
			if(arguments.length != 2) {
				throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
			}
			
			this.name = name;
			this.methods = [];
			for(var i = 0, len = methods.length; i < len; i++) {
				if(typeof methods[i] !== 'string') {
					throw new Error("Interface constructor expects method names to be passed in as a string.");
				}
				this.methods.push(methods[i]);        
			}
		}
		/**
		*	@description 类式继承
		*	@method
		*	@param {Function} subClass - 子类
		*	@param {Function} superClass - 父类
		*	@example $.freehtml.extend(Author, Person);
		*/
		$.freehtml.extend = function(subClass, superClass) {
		  var F = function() {};
		  F.prototype = superClass.prototype;
		  subClass.prototype = new F();
		  subClass.prototype.constructor = subClass;

		  subClass.superclass = superClass.prototype;
		  if(superClass.prototype.constructor == Object.prototype.constructor) {
			superClass.prototype.constructor = superClass;
		  }
		}
		/**
		*	@description 原型继承
		*	@method
		*	@param {object} object 对象 - 要进行克隆的对象
		*	@example var a = $.freehtml.clone(Person);
		*/
		$.freehtml.clone = function(object) {
			function F(){};
			F.prototype = object;
			return new F;
		}
		/**
		*
		*	@description Augment function, improved. 
		*@method
		*	@param {object} receivingClass - 接受mixin的对象
		*	@param {object} givingClass - 提供mixin的对象
		*	@example var a = $.freehtml.augment(Teacher,Person);
		*/
		$.freehtml.augment = function(receivingClass, givingClass) {
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
		}
		/** 
		*	@description 检查方法是否实现了接口
		*	@method
		*	@param {Function} 函数
		*	@param {string} 接口名称
		*	@example $.freehtml.ensureImplements(div.actions,BoxIf);
		*/
		$.freehtml.ensureImplements = function(object) {
			if(arguments.length < 2) {
				throw new Error("Function Interface.ensureImplements called with " + arguments.length  + "arguments, but expected at least 2.");
			}
		
			for(var i = 1, len = arguments.length; i < len; i++) {
				var interface = arguments[i];
				if(interface.constructor !== $.freehtml.interface) {
					throw new Error("Function Interface.ensureImplements expects arguments two and above to be instances of Interface.");
				}
				
				for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
					var method = interface.methods[j];
					if(!object[method] || typeof object[method] !== 'function') {
						throw new Error("Function ensureImplements: object " 
							+ "does not implement the " + interface.name + " interface. Method " + method + " was not found.");
					}
				}
			} 
		};
		/**
		*
		*  @description 单体对象声明
		*  @instance
		*  @example var c = $.freehtml.classObj.getInstance();
		*/
		$.freehtml.classObj=(function(){
				var uniqueInstance;
				function constructor() {
					var o = {
							getClass:function(c/*classes*/,type/*string*/, param/*string*/){
								if(c && type && typeof(parseInt(param,10))==='number'){
									var name;
									switch(type){
										case 'fontsize':
											name = c['font']['fontsize']+'-'+param+' '; break;
										case 'textIndent':
											name = c['text']['textIndent']+'-'+param+' '; break;
										case 'lineHight':
											name = c['box']['lineHight']+'-'+param+' '; break;
										case 'width':
											name = c['box']['width']+'-'+param+' '; break;
										case 'fwidth':
											name = c['box']['width-fluid']+'-'+param+' '; break;
										case 'height':
											name = c['box']['height']+'-'+param+' '; break;
										case 'fheight':
											name = c['box']['height-fluid']+'-'+param+' '; break;
										case 'padding':
											name = c['box']['padding']+'-'+param+' '; break;
										case 'paddingTop':
											name = c['box']['paddingTop']+'-'+param+' '; break;
										case 'paddingBottom':
											name = c['box']['paddingBottom']+'-'+param+' '; break;
										case 'paddingLeft':
											name = c['box']['paddingLeft']+'-'+param+' '; break;
										case 'paddingRight':
											name = c['box']['paddingRight']+'-'+param+' '; break;
										case 'margin':
											name = c['box']['margin']+'-'+param+' '; break;
										case 'marginTop':
											name = c['box']['marginTop']+'-'+param+' '; break;
										case 'marginBottom':
											name = c['box']['marginBottom']+'-'+param+' '; break;
										case 'marginLeft':
											name = c['box']['marginLeft']+'-'+param+' '; break;
										case 'marginRight':
											name = c['box']['marginRight']+'-'+param+' '; break;
										case 'z':
											name = c['box']['z']+'-'+param+' '; break;
									}
									return name;
								} 
								return '';
							}
					};
					return o;
				}
				
				return {
					getInstance: function() {
						if(!uniqueInstance) {
							uniqueInstance = constructor();
						}
						return uniqueInstance;
					}
				}
			})();
		/**
		*	@description html对象声明
		*	@constructor
		*	@param {Object} 参数对象
		*	@example var div = new $.freehtml.htmlObj({id:'header',tagName:'div',class:'red',content:'hello world',css:{color:'red'}});
		*	
		*/
		$.freehtml.htmlObj=function(obj) {
			var o = {
				html: null,
				jq: null,
				parent: null,
				child: null,
				url: null,/** 指定对象url*/
				view: null,/** 指定对象视图，用来作action动作分配*/
				/** 设置构造器*/
				constructor: function(){
					o.getHtml();
					o.getJQobj();
					/** 设置对象的父级元素*/
					if(obj.parent){ o.setParent(obj.parent);}
					/** 设置对象的子级元素*/
					if(obj.child){o.add(obj.child);}
					/** 加载远程内容*/
					if(obj.url){o.load(obj.url);}
					/** 设置默认样式*/
					if(obj.css){o.css(obj.css);}
					/** 添加事件 */
					if(obj.events){
						for(var s in obj.events)
						o.jq.on(s,obj.events[s]);
					}
				},
				/**	@method
				*		@private 添加标签内容 指定类型若为url则进行加载
				*/
				_add: function(ele/*string | jq | htmlobj*/,type){
					if(ele){
						if(!type){
							var _ele = ele.jq || ele;
							o.jq.append(_ele);
						}else if(type==='url' && typeof(ele)==='string'){
							o.load(ele);
						}
					}else{
						throw new Error('parameter is invalid');
					}
					//return o;				
				},
				/** 
				*	@method 检查对象属性*/
				checkObj: function(propName/*string*/, obj) {
					if(!(propName in obj)){
						throw new Error('Invalid property.');
					}
				},
				/**	@method 设置默认动作*/
				actions: function(){},
				/**	@method 设置样式*/
				css: function(obj){
					o.jq.css(obj);
				},
				/**	@method 设置html标签*/
				getHtml: function(){
					if(!o.html){
						/** 传入参数为string,html对象为传入字符,方便获取页面现有html标签并封装成htmlobj */
						if(typeof(obj)==='string'){ o.html = obj;}
						if(obj.tagName){
							var prop = (function(){
							if(obj.props){
								var p =' ';
								for(var s in obj.props)
									p = p + s + '="'+obj.props[s]+'"'; 
								return p;
							}
							return ' ';
							})();
							var id = (function(){ if(typeof(obj.id)==='string'){return ' id="'+obj.id+'"';}
								return ' ';
							})();
							var c = (function(){ if(typeof(obj.classes)==='string'){return ' class="'+obj.classes+'"';}
								return ' ';
							})();
							var content = (function(){
								if(typeof(obj.content)==='string'){return obj.content;}
								return '';
							})();
							var w = (function(){ 
								if(typeof(obj.width)==='number'){return ' width="'+obj.width+'"';}
								return ' ';
							})();
							var h = (function(){ 
								if(typeof(obj.height)==='number'){return ' height="'+obj.height+'"';}
								return ' ';
							})();
							if(obj.tagName === 'img' && obj.src){
								o.html = "<"+obj.tagName+id+c+prop+w+h+" src='"+obj.src+"' />";
								return o.html;
							}
							if(obj.tagName === 'a' && obj.href){
								o.html = "<"+obj.tagName+id+c+prop+W+h+" href="+obj.href+">"+content+"</"+obj.tagName+">";
								return o.html;
							}
							o.html = "<"+obj.tagName+id+c+prop+w+h+">"+content+"</"+obj.tagName+">";
						}
					}
					return o.html;
				},
				/**	@method 获取jq对象*/
				getJQobj: function(){
					if(!o.jq){
						if(o.html){ o.jq =  $(o.html); }
					}
					return o.jq;
				},
				/**	@method 设置父元素*/
				setParent: function(selector/*string*/){
					var _parent = selector.jq || selector;
					if(!(_parent instanceof jQuery)){ _parent = $(_parent);}
					_parent.append(o.getJQobj());
					return o;
				},
				/**	@method 设置标签内容*/
				content: function(ele/*string | jq | htmlobj*/){
					var _ele = ele.jq || ele;
					o.jq.empty().append(_ele);
					return o;
				},
				/**	@method 添加标签内容 指定类型若为url则进行加载*/
				add: function(){
					if(arguments.length>0){
						for(var i=0,l=arguments.length;i<l;i++){
							o._add(arguments[i]);
						}
					}
					return o;
				},
				/**	@method 载入指定url里面的内容*/
				load: function(url/*url,[data,[callback]]*/){
					o.jq.load(url);
					return o;
				},
				/**	@method 清除标签内容*/
				remove: function(ele/*string | jq | htmlobj*/){
					if(ele){
					var _ele = ele.jq || ele;
					o.jq.remove(_ele);
					}else{
					o.jq.empty();
					}
					return o;
				},
				/**	@method 添加class样式名*/
				classes: function(classes){
					o.jq.addClass(classes);
					return o;
				}
			};
			o.constructor();
			return o;
		}
		
		return $.freehtml;
	}

	/** 把插件注册到requirejs,Register the plugin. */
	if (typeof define !== 'undefined' && define.amd) {
		define(['jquery'], plugin);
	} else if (typeof jQuery !== 'undefined') {
		plugin(jQuery);
	}
}());