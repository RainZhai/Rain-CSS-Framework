$.star = window.star = function(obj) {
  this.obj = obj;
  $.extend(this,{
    boxHandler:"#starbox",
    event:'click',
    value: 5,
    boxClass:"",
    boxStyle:{},
    starClass:"",
    starStyle:{},
    selectedClass:"",
    selectedStyle:{}
  }, this.obj || {});
  this.box = $(this.boxHandler);
  this.init();
  return this;
};
star.prototype = {
		starvalue:5,
		init: function(){
			var t = this;
			t.inithtml();
			t.initstar();
			t.registerEvents();
		},
		getStars: function(){
			return this.box.find('span');
		},
		setValue: function(i){
			this.starvalue = i;
		},
		getValue: function(){
			return this.starvalue;
		},
		initstar: function(){
			var t = this;
			if(t.value>0){
				for(var i=0,l = t.value; i<l; i++){
					t.getStars().eq(i).addClass(t.selectedClass).css(t.selectedStyle);
				}
			}
			t.setValue(t.value);
		},
		inithtml: function(){
			var t = this;
			t.box.addClass(t.boxClass).css(t.boxStyle);
			var stars = t.box.find('span');
			if(stars.length>0){
				stars.addClass(t.starClass).css(t.starStyle);
			}else{
				t.box.append('<span class="j_star ib"></span><span class="j_star ib"></span><span class="j_star ib"></span><span class="j_star ib"></span><span class="j_star ib"></span>');
				t.box.find('span').addClass(t.starClass).css(t.starStyle);
			}
			return t;
		},
		registerEvents: function(){
			var t = this;
			var stars = t.getStars();
			stars.on(t.event, function(){
				var me = $(this);
				stars.removeClass(t.selectedClass);
				for(var i=0,l = me.index(); i<l+1; i++){
					stars.eq(i).addClass(t.selectedClass).css(t.selectedStyle);
				}
				t.setValue(me.index() + 1);
			});
		}
};