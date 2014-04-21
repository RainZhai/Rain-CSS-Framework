/**
* dailog 1.3.1
* Anthor: zhaiyu
* Date: 2013.1.21
* lastUpdate : 2013.12.17
*/
(function ($) {
/**
* @description dialog对象声明
* @constructor
* @param {Object} 参数对象
* @example var div = new $.dialog({
* width: 540,
* height: 300,
* top:'20%',
* content:$(".c_testwrap"),
* titleText:"hello dialog",
* dialogStyle:{"border":"8px solid #ededed"},
* titleStyle:{"background":"#F5F5F5"},
* btnsWrapStyle:{'text-align':'right'},
* buttonsClass:["hs rounds gb btn bluebtn ml","hs rounds ggrey bgrey_2 btn greybtn ml"],
* buttons:"OKCancel",
* beforeClose:function(e){ log(e.data.name);log(e.data.type);},
* afterClose:function(e){ log(e.data.name);}
* });
*
*/
  window.dialog = $.dialog = function(obj) {
    this.obj = obj;
    $.extend(this,{
      "width":540,
      // 弹出框宽度
      "height":0,
      // 弹出框高度
      "top":"20%",
      // 离顶部的距离
      "left":"50%",
      // 离左边的距离
      "draggable":false,
      // 是否可以拖拽
      "header":true,
      "showClose":false,
      "content":null,
      // 弹出框内显示的内容
      "closeHandleClass":"c_close",
      // 关闭图标的句柄
      "dialogHandleClass":"c_dialogwrap",
      // 弹出层句柄
      "titleText":"提示框",
      // 弹出层文本
      "bgColor":"#fff",
      // 遮罩背景色
      "closeStyle":{},
      "closeClass":"",
      "dialogStyle":{},
      // 设置弹出框样式
      "dialogClass":"",
      // 设置弹出框class
      "headStyle":{"background":"#F5F5F5"},
      "headClass":"",
      "contentStyle":{},
      "contentClass":"",
      "btnsWrapStyle":{"text-align":"right"},
      "btnsWrapClass":"",
      "buttonsStyle":[ {} ],
      // 按钮组style
      "buttonsClass":[ "hs rounds gb button blueBtn marginLeft" ],
      // 按钮class组
      "closeCallback":function() {},
      "buttons":null,
      // 常用按钮
      "buttonsArray":[],
      // 按钮组
      "buttonsCallback":{},
      // 按钮的回调
      "buttonsAttr":[],
      // 按钮的属性
      "beforeShow":function() {},
      "afterShow":function() {},
      "beforeClose":function() {},
      "afterClose":function() {},
      "upload":false
    }, this.obj || {});
    this.randomStr = Math.round(Math.random() * 1e6 + 1) + "", this.contentObj = this.content, this.closeClass = this.closeHandleClass + this.randomStr, this.dialogHandleClass = this.dialogHandleClass + this.randomStr, this.contentwrapid = "contentwrap" + this.randomStr, this.html = null;
  };
  dialog.prototype = {
      "handle":null,
      "inited":false,
      /**@method 对象初始化*/
      "init":function() {
        var _this = this;
        if(_this.content){
          _this.initHtml();
          _this.initBtns();
          _this.initModule();
        }
        return _this;
      },
      /**@method 获取内容块id*/
      "getContentWrapID":function() {
        return this.contentwrapid;
      },
      /**@method 获取dialog id*/
      "getDialogID":function() {
        return this.dialogHandleClass;
      },
      /** @method 设置内容
       *  @param {Object} 参数对象
       */
      "setContent":function(obj) {
        var html = this.getHtml();
        if (typeof obj === "string") {
          html.find(".c_contentWrap").empty().append(obj);
        } else if (this.contentObj instanceof jQuery) {
          html.find(".c_contentWrap").empty().append(obj.show());
        } else if (obj && "nodeName" in obj) {
          html.find(".c_contentWrap").empty().append($(obj).show());
        }
        return this;
      },
      /** @method 设置内容
       *  @param {Object} 参数对象
       */
      "addContent":function(obj) {
        var html = this.getHtml();
        if (typeof obj === "string") {
          html.find(".c_contentWrap").append(obj);
        } else if (this.contentObj instanceof jQuery) {
          html.find(".c_contentWrap").append(obj.show());
        } else if (obj && "nodeName" in obj) {
          html.find(".c_contentWrap").append($(obj).show());
        }
        this._setDialogHeight(html);
        return this;
      },
      /** @method 获取button对象
       *  @public
       *  @param {number} 索引
       */
      "getBtn":function(i) {
        if (i > -1 && this.jqbtns) {
          return this.jqbtns[i];
        }
        return null;
      },
      /** @method 设置高度
       *  @public
       *  @param {number} 高度值
       */
      "setHeight":function(h) {
        if (typeof h === "number") {
          if (this.html) {
            this.html.find(".c_dialogBox").height(h);
          }
        }
        return this;
      },
      /** @method 设置dialog持有者
       *  @public
       *  @param {object} 对象
       */
      "setHandle":function(obj) {
        this.handle = obj;
        return this;
      },
      /** @method 获取html对象
       *  @public
       */
      "getHtml":function() {
        return this.html;
      },
      /** @method 设置标题文本
       *  @public
       */
      "setTitleText":function(txt) {
        this.getHtml().find(".c_titletext").text(txt);
        return this;
      },
      /** @method 显示dialog
       *  @private
       *  @param {function} 回调函数
       */
      "_show":function(callback) {
          if ($("body").find("." + this.dialogHandleClass).length == 0) {
            $("body").append(this.getHtml().removeClass('vf'));
          } else {
            if (typeof callback === "function") { $("." + this.dialogHandleClass).removeClass('vf');
            callback();
            }else{
              $("." + this.dialogHandleClass).removeClass('vf');
            }
          }
      },
      /** @method 显示dialog
       *  @public
       *  @param {number} 延迟时间
       *  @param {function} 回调函数
       */
      "show":function(s, callback) {
        if(!this.inited) {this.init();this.inited=true;}
        this.beforeShow();
        if (s) {
          setTimeout(function() {this._show(callback);}, s);
        } else {
          this._show(callback);
        }
        this.afterShow();
        return this;
      },
      /** @method 关闭dialog
       *  @public
       *  @param {function} 回调函数
       */
      "close":function(e,callback) {
        log(e);
        this.beforeClose(e);
        if (typeof callback === "function") {
          $("." + this.dialogHandleClass).addClass('vf');
          callback();
        }else{
          $("." + this.dialogHandleClass).addClass('vf');
        }
        this.afterClose(e);
        this.hide = this.close;
        return this;
      },
      /** @method 初始化上传控件
       *  @private
       */
      "_initUpload":function() {
        var html = this.getHtml();
        var uploadHtml = $('<div class="uploadBox margin">' + '<div class="hide c_picArea positionR">' + '<form enctype="multipart/form-data" method="post" action="#" id="upload-pic" target="iframe-post-form">' + '<input type="text" disabled="true" class="uploadFileName" id="txtFileName">' + '<span id="spanButtonPlaceHolder" class="valignMiddle"></span>' + '<label id="fsUploadProgress">正在上传...</label>' + "</form>" + '<span class="c_closeUploadBox closeUploadBox colorGrey positionA cursorPointer">X</span>' + "</div>" + '<a name="pic-area" class="c_lnPic" href="#">添加照片</a>' + "</div>");
        html.find(".c_contentWrap").append(uploadHtml);
        uploadHtml.find(".c_lnPic").on("click", function() {
          _height = _height + 30;
          html.find(".c_dialogBox").css({
            "width":_width,
            "height":_height,
            "top":this.top,
            "left":this.left
          });
          uploadHtml.find(".c_picArea").removeClass("hide");
        });
        uploadHtml.find(".c_closeUploadBox").on("click", function() {
          _height = _height - 30;
          html.find(".c_dialogBox").css({
            "width":_width,
            "height":_height,
            "top":this.top,
            "left":this.left
          });
          uploadHtml.find(".c_picArea").addClass("hide");
        });
        return this;
      },
      /** @method 初始化按钮
       *  @public
       */
      "initBtns":function() {
        var _this = this;
        var _html = this.getHtml();
        var btns = this.buttons;
        var buttonsWrap = _html.find(".c_btnWrap");
        if (btns && typeof btns === "string") {
          var btnHandler = function(event) {
            _this.close(event);
          }
          var button = [];
          if (btns === "OK") button.push($("<a href='javascript:;' class='c_button rounds ggrey btn greybtn ib tdn ps tac ml'>确定</a>"));
          if (btns === "OKCancel") button.push($("<a href='javascript:;' class='c_button rounds ggrey btn greybtn ib tdn ps tac ml'>确定</a>").attr("btype", "ok"), $("<a href='javascript:;' class='c_button rounds ggrey btn greybtn ib tdn ps tac ml'>取消</a>").attr("btype", "canel"));
          if (btns === "YesNo") button.push($("<a href='javascript:;' class='c_button rounds ggrey btn greybtn ib tdn ps tac ml'>是</a>"), $("<a href='javascript:;' class='c_button rounds ggrey btn greybtn ib tdn ps tac ml'>否</a>"));
          if (btns === "YesNoCancel") button.push($("<a href='javascript:;' class='c_button rounds ggrey btn greybtn ib tdn ps tac ml'>是</a>"), $("<a href='javascript:;' class='c_button rounds ggrey btn greybtn ib tdn ps tac ml'>否</a>"), $("<a href='javascript:;' class='c_button rounds ggrey btn greybtn ib tdn ps tac ml'>取消</a>"));
          for (var i = 0; i < button.length; i++) {
            button[i].on("click", {"name":btns,"type":button[i].attr("btype")}, btnHandler);
            buttonsWrap.append(button[i]);
          }
        } else {
          // 遍历设置的按钮数组,将相应的按钮进行显示并绑定相应事件
          var buttonsArray = this.buttonsArray;
          var buttonsCallback = this.buttonsCallback;
          var buttonDom = _html.find(".c_button");
          function btnsHandler(e) {
            var _callback = buttonsArray[e.data.index];
            if (typeof buttonsCallback[_callback] == "function") {
              buttonsCallback[_callback](e);
            }
          }
          this.jqbtns = [];
          // 按钮绑定事件
          for (var i = 0; i < buttonsArray.length; i++) {
            var btnClass = this.buttonsClass[i] || "";
            var btnStyle = this.buttonsStyle[i] || {};
            var btnAttr = this.buttonsAttr[i] || {};
            var buttons = $("<a href='javascript:void(0);' class='c_button ib tdn " + btnClass + "'>" + buttonsArray[i] + "</a>").css(btnStyle).attr(btnAttr);
            buttons.on("click", {
              "index":i
            }, btnsHandler);
            buttonsWrap.append(buttons);
            this.jqbtns.push(buttons);
          }
        }
        buttonsWrap.append('<div class="touchWrap posa fullw fullh"></div>');
        return this;
      },
      /** @method 初始化html
       *  @public
       */
      "initHtml":function() {
        if (!this.html) {
          if (this.header) {
            var closehtml = "";
            if (this.showClose) {
              closehtml = '<span class="' + this.closeClass + ' close block posa oh tac fontBord">X</span>';
            }
            this.html = $('<div id="' + this.dialogHandleClass + '" class="' + this.dialogHandleClass + ' dialogWrap tal posf vf">' + '<div class="dialogWrapIE o posa c_bgColor"></div>' + '<div class="c_dialogBox dialogBox posa"> ' + '<div class="c_dialogTitle p"><span class="c_titletext bottom">' + this.titleText + "</span>" + closehtml + "</div>" + '<div class="c_contentWrap pl pr"></div>' + '<p class="c_btnWrap m posr"> </p>' + "</div></div>");
          } else {
            this.html = $('<div class="' + this.dialogHandleClass + ' dialogWrap tal posf vf">' + '<div class="dialogWrapIE o posa c_bgColor"></div>' + '<div class="c_dialogBox dialogBox posa"> ' + '<div id="' + this.contentwrapid + '" class="c_contentWrap p"></div><p class="c_btnWrap m posr"> </p></div></div>');
          }
        }
        if (this.obj && (typeof this.obj === "string" || this.obj instanceof jQuery || "nodeName" in this.obj)) {
          this.getHtml().find("." + this.closeClass).hide();
          this.getHtml().find(".c_contentWrap").append(this.obj);
        } else {
          this.setContent(this.contentObj);
        }
        return this;
      },
      /** @method 初始化各个模块功能
       *  @public
       */
      "initModule":function() {
        var html = this.getHtml();
        // 控制框是否可以拖拽
        if (this.draggable) {
          html.find(".c_dialogBox").draggable({
            "cursor":"move",
            "handle":".c_dialogTitle",
            "scroll":false,
            "containment":"html"
          });
        }
        // 设置上传控制
        if (this.upload) {
          this._initUpload();
        }
        //按钮绑定事件
        html.find("." + this.closeClass).on("click", {"name":"closebtn","type":"close"}, function(e) {
          this.close(e,this.closeCallback);
        });
        this._initUI();
        $("body").append(html);
        this._setDialogHeight(html);
        return this;
      },
      /** @method 初始化UI
       *  @private
       */
      "_initUI":function() {
        var html = this.getHtml();
        // 设置样式
        html.find(".c_bgColor").height($(document).height()).css({"background-color":this.bgColor});
        html.find("." + this.closeClass).css(this.closeStyle).addClass(this.headClass);
        if (this.dialogStyle) html.find(".c_dialogBox").css(this.dialogStyle);
        if (this.dialogClass) html.find(".c_dialogBox").addClass(this.dialogClass);
        html.find(".c_dialogTitle").css(this.headStyle).addClass(this.headClass);
        html.find(".c_contentWrap").css(this.contentStyle).addClass(this.contentClass);
        html.find(".c_btnWrap").css(this.btnsWrapStyle).addClass(this.btnsWrapClass);
      },
      /** @method 设置dialog高度
       *  @private
       */
      "_setDialogHeight":function(obj) {
        // 获取dialog宽度和高度
        var _width = $("body").width() / 5 + 150;
        var _height = obj.find(".c_contentWrap").outerHeight(true) + obj.find(".c_dialogTitle").outerHeight(true) + obj.find(".c_btnWrap").outerHeight(true);
        // 计算弹出层的大小和位置
        if (this.width > 0 && this.height > 0) {
          obj.find(".c_dialogBox").css({
            "width":this.width,
            "height":this.height,
            "top":this.top,
            "left":this.left
          });
        } else {
          obj.find(".c_dialogBox").css({
            "width":_width,
            "height":_height,
            "top":this.top,
            "left":this.left
          });
        }
        return this;
      }
    };
})(jQuery);