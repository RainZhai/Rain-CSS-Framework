/**
 * 滑动条工具
 * @author zhaiyu
 * @date 2014.7.11
 */
(function ($,doc) {
	window.slider = $.slider = function(obj) {
	  this.obj = obj;
	  $.extend(this,{
	    barHandler:".j_sliderbar",
	    btnHandler:".j_sliderbtn1",
	    outputHandler:"#slider-1",
	    bgbarHandler:".j_sliderbg1",
	    bgbarStyle:{
	    	"background-color":"#fc7c26"
	    },
	    bgbarHandler2:".j_sliderbg2",
	    bgbarStyle2:{
	    	"background-color":"#000"
	    },
	    max:100,
	    min:1,
	    divs:20,//分割数
	    data:[],//数据对应的数组
	    initValue:0,//初始实际值
	    prevValue: 0,//之前实际值
	    before:function(){},//对象执行之前的执行函数
	    startCallback:function(){},//事件执行之前的回调
	    endCallback:function(){}//事件执行之后的回调
	  }, this.obj || {});
	  this.bar = $(this.barHandler),this.btn = $(this.btnHandler),
	  this.output= $(this.outputHandler),
	  this.bgbar = $(this.bgbarHandler),
	  this.bgbar2 = $(this.bgbarHandler2),
	  this.drag=false,
	  this.value = 0,
	  this.x = 0,
	  this.y = 0,
	  this.leftValue = 0,
	  this.tempX = 0,
	  this.tempY = 0,
	  this.currentX = 0,
	  this.currentY = 0;
	  var o = this;
	  return o;
	};
	slider.prototype = {
		barWidth:0,
		init:function(){
			var t = this;
			t.barWidth = t.bar.width();
			t.before();
			if(t.getMin()<t.getMax()){
				t.initProcess();
				t.initBgbar();
				t.registerEvents();
			}
			return this;
		},
		getData: function(){
			return this.data;
		},
		setValue: function(i){
			this.value = i;
		},
		getValue: function(){
			return this.value;
		},
		setMin: function(i){
			this.min = i;
		},
		getMin: function(){
			return this.min;
		},
		setMax: function(i){
			this.max = i;
		},
		getMax: function(){
			return this.max;
		},
		/** 初始化背景条*/
		initBgbar: function(){
			var t = this;
			var per = t.getValue()/t.getMax();
			t.bgbar.css(t.bgbarStyle);
			t.bgbar.width(t.barWidth*per);
			
			var per2 = t.getMin()/t.getMax();
			log(per,per2);
			t.bgbar2.css(t.bgbarStyle2);
			t.bgbar2.width(t.barWidth*per2);
		},
		/** 初始化进度条*/
		initProcess: function(){
			var t = this;
			if(t.divs<1){
				if(t.getMin()>1){
					t.setValue(t.getMin());
					var w = t.transValuetoWidth(t.getValue());
					t.btn.css({"left":w+"px"});
				}
			}else{
				if(t.getMin()>1){
					if((t.initValue<=0 && t.prevValue<=0) || t.initValue > t.prevValue ){
						var stepSize = parseInt(t.getMax()/t.divs,10);
						var minStep = parseInt(t.getMin()/stepSize,10);
						var residue = t.getMin()%stepSize;
						if(residue === 0){
							t.setValue(t.getMin());
						}else{
							if(residue>stepSize/2){
								t.setValue((minStep+1)*stepSize);
								t.setMin((minStep+1)*stepSize);
							}else{
								t.setValue(minStep*stepSize);
								t.setMin(minStep*stepSize);
							}
						}
					}
					var w = t.transValuetoWidth(t.getValue());
					t.btn.css({"left":w+"px"});
				}
			}
			t.resetOutput();
		},
		/** 根据分割计算当前进度值 */
		resetValueByDiv: function(v){
			var t= this;
			if(v>0){
				if(t.divs>0){
					var stepSize = parseInt(t.getMax()/t.divs,10);
					var minStep = parseInt(v/stepSize,10);
					var residue = v%stepSize;
					if(residue === 0){
						t.setValue(v);
					}else{
						if(residue>stepSize/2){
							t.setValue((minStep+1)*stepSize);
						}else{
							t.setValue(minStep*stepSize);
						}
					}
				}else{
					if(t.getMin()>v){
						t.setValue(t.getMin());
					}else{
						t.setValue(v);
					}
				}
			}
		},
		/** 更新输出*/
		resetOutput: function(){
			var t = this;
			var v = t.getValue();
			t.output.css({"left":t.transValuetoWidth(t.getValue())-27+"px"});
			if(t.data.length>0 && t.divs>0){
				t.output.val(v);
				t.output.find(".j_slidervalue").text(t.data[v/10-1].name);
			}else{
				t.output.val(v);
				t.output.find(".j_slidervalue").text(v);
			}
		},
		/** 更新背景条*/
		resetBgbar: function(){
			var t = this;
			var per = t.getValue()/t.getMax();
			t.bgbar.width(t.barWidth*per);
		},
		/** 将坐标转化为进度值 */
		transCoordinate: function(x){
			var t = this;
			var per = x/t.barWidth;
			var v = parseInt(t.getMax()*per,10);
			return v;
		},
		/** 将进度值转换为宽度值 */
		transValuetoWidth: function(v){
			var t = this;
			if(v>0 && v<=t.getMax()){
				return parseInt(t.barWidth * (v/t.getMax()),10);
			} 
			return 0;
		},
		/** 注册事件 */
		registerEvents:function(){
			var me = this;
			if(util.supportTouch){
				util.touch.registerEvent(me.btn,function(e){
						e.preventDefault();
						var _this = $(this);
						me.drag = true;
						me.leftValue = _this.position().left;
						me.tempX=_this.offset().left;
						me.tempY=_this.offset().top;
						me.x=e.clientX || e.touches[0].pageX;
						me.y=e.clientY || e.touches[0].pageX;
						me.startCallback();
					},function(e){
						e.preventDefault();
						var _this = $(this);
						var w = me.bar.width();
						if(e.clientX){
							me.currentX = me.leftValue + e.clientX-me.x;
						}else{
							me.currentX = me.leftValue + e.touches[0].pageX-me.x;
						}
						me.currentY = e.clientY || e.touches[0].pageY;
						//if(me.currentY<me.tempY-20 || me.currentY>me.tempY+20){ me.drag = false; return;}
						if(me.drag){
							if (me.currentX < me.transValuetoWidth(me.getMin())){
								me.currentX = me.transValuetoWidth(me.getMin());
							} 
							if (me.currentX>w){me.currentX=w;}
							var v = me.transCoordinate(me.currentX);
							me.resetValueByDiv(v);
							me.btn.css({"left":me.transValuetoWidth(me.getValue())+"px"});
							me.resetOutput();
							me.resetBgbar();
						}
					},function(e){
						e.preventDefault();
						var _this = $(this);
						me.drag = false;
						me.endCallback();
					}
				);
			}else{
				me.btn.on("mousedown",function(e){
					var _this = $(this);
					me.drag = true;
					me.leftValue = _this.position().left;
					me.tempX=_this.offset().left;
					me.tempY=_this.offset().top;
					me.x=e.clientX || e.touches[0].pageX;
					me.y=e.clientY || e.touches[0].pageX;
					me.endCallback();
				});
				$(doc).on("mousemove",function(e){
					var _this = $(this);
					var w = me.bar.width();
					if(e.clientX){
						me.currentX = me.leftValue + e.clientX-me.x;
					}else{
						me.currentX = me.leftValue + e.touches[0].pageX-me.x;
					}
					me.currentY = e.clientY || e.touches[0].pageY;
					if(me.currentY<me.tempY-20 || me.currentY>me.tempY+20){ me.drag = false; return;}
					if(me.drag){
						if (me.currentX < me.transValuetoWidth(me.getMin())){
							me.currentX = me.transValuetoWidth(me.getMin());
						} 
						if (me.currentX>w){me.currentX=w;}
						var v = me.transCoordinate(me.currentX);
						me.resetValueByDiv(v);
						me.btn.css({"left":me.transValuetoWidth(me.getValue())+"px"});
						me.resetOutput();
						me.resetBgbar();
					}
				});
				$(doc).on("mouseup",function(e){
					var _this = $(this);
					me.drag = false;
					me.endCallback();
				});
			}
		}
	}
	})(jQuery,document);