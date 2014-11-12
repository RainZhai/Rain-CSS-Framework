//定义每个图像对象
var CanvasPicture =  function(){};
CanvasPicture.prototype = {
	_context:null,
	x	:  0, //canvas画布中的x坐标,下边是y坐标
	y	:  0,
	indexX:0,//数组索引下标
	indexY:0,
	width  : MyConstants.PicWidth,
	height : MyConstants.PicHeight,
	picType: 0,  //定义图片类型，用于在canvas中展示不同类型的图片，以便点击消失，总共15中图片,小于0代表消失
	color  : "#a3610a",//默认颜色
	strokeColor:"rgb(255, 204, 204)",
	isDynamic:function(){
		return mNoDynamicPicTypes.indexOf(","+this.picType+",")<0;
	},
	draw:function(_context,_stokeColor,_nNeedDrawPic){
		//边框颜色值
		this.strokeColor=_stokeColor||this.strokeColor;
		//记录上下文对象
		this._context=_context;
		if(this.picType<0){
			this.color=this.strokeColor;
		}

		//如果是边缘，则画白色
		if(this.indexX==0||(this.indexX==MyConstants.PicRows-1) || this.indexY==0 || (this.indexY==MyConstants.PicCols-1)){
			this.color=this.strokeColor="#FFF";
		}
		
		//重画背景
		this.drawBG();
		_nNeedDrawPic=_nNeedDrawPic||0;
		if(this.picType<0 || (this.isDynamic()&&_nNeedDrawPic==0)){
			return;
		}
		if(this.picType>0){
			drawByPicType(_context,this);
		}
	},
	drawBG:function(){
		this._context.save();
		//绘制填充矩形
		this._context.clearRect(this.x,this.y,this.width,this.height);
		this._context.fillStyle=this.color;
		this._context.shadowBlur = 0;
		this._context.fillRect(this.x,this.y,this.width,this.height);

		//绘制边框矩形
		this._context.lineWidth = 2;
		this._context.strokeStyle = this.strokeColor;
		this._context.strokeRect(this.x-1,this.y-1,this.width+2,this.height+2);
		this._context.restore();
	},
	setSelected:function(){
		this.strokeColor="rgb(255,0,0)";
		if(this.isDynamic()){
			return;
		}
		this.draw(this._context,this.strokeColor,1);//需要再次画图片
	},
	unSelected:function(){
		this.strokeColor="rgb(255, 204, 204)";
		if(this.isDynamic()){
			return;
		}
		this.draw(this._context,this.strokeColor,1);//需要再次画图片
	},
	clear:function(){
		this._context.save();
		this._context.clearRect(this.x-1,this.y-1,this.width+2,this.height+2);
		this._context.fillStyle = "rgb(255, 204, 204)";
		this._context.fillRect(this.x-2,this.y-2,this.width+4,this.height+4);
		this._context.restore();
		this.color="rgb(255, 204, 204)";
		this.strokeColor="rgb(255, 204, 204)";
	}
};

//绘制图形 begin ----------------------
//根据不同图片类型绘制不同图形
function drawByPicType(_context,_canvasPic){
	var currPicType=_canvasPic.picType;
	if(currPicType==1){
		drawPic(_context,_canvasPic,'./images/h1.jpg');
	}else if(currPicType==2){
		//textClock
		var nReDrawCount=0;
		window.setInterval(function(){
			if(_canvasPic.picType>0){
				drawTextClock(_context,_canvasPic,"blue");
			}else{
				if(nReDrawCount<10){
					_canvasPic.drawBG();
					nReDrawCount++;
				}
			}
		},500);
	}else if(currPicType==3){
		//cloclSecond
		var nReDrawCount=0;
		window.setInterval(function(){
			if(_canvasPic.picType>0){
				drawLineClock(_context,_canvasPic,"blue");
			}else{
				if(nReDrawCount<10){
					_canvasPic.drawBG();
					nReDrawCount++;
				}
			}
		},500);
	}else if(currPicType==4){
		//Fan风扇
		var nReDrawCount=0;
		var nFlag=3;
		/*
		window.setInterval(function(){
			if(_canvasPic.picType>0){
				if(nFlag<3 || nFlag>=6){
					nFlag=3;
				}*/
				drawFan(_context,_canvasPic,"red",nFlag);
				/*
				nFlag++;
			}else{
				if(nReDrawCount<10){
					_canvasPic.drawBG();
					nReDrawCount++;
				}
			}
		},500);*/
	}else if(currPicType==5){
		//笑脸
		drawSmile(_context,_canvasPic,"#c6c6c6");
	}else if(currPicType==6){
		//IE9
		drawIE(_context,_canvasPic);
	}else if(currPicType==7){
		//径向渐变圆
		var nReDrawCount=0;
		var nFlag=3;
		var _rotate=2*Math.PI/180;
		window.setInterval(function(){
			if(_canvasPic.picType>0){
				if(nFlag<3 || nFlag>=6){
					nFlag=3;
				}
				drawRadialCircle(_context,_canvasPic,_rotate);
				nFlag++;
				_rotate = _rotate + 4*Math.PI/180;
			}else{
				if(nReDrawCount<10){
					_canvasPic.drawBG();
					nReDrawCount++;
				}
			}
		},100);
	}else if(currPicType==8){
		//播放按钮
		drawPlayButton(_context,_canvasPic);
	}else if(currPicType==9){
		//下载图标
		drawDownLoad(_context,_canvasPic);
	}else if(currPicType==10){
		//返回图标
		var nReDrawCount=0;
		var nFlag=3;
		var _rotate=2*Math.PI/180;
		window.setInterval(function(){
			if(_canvasPic.picType>0){
				if(nFlag<3 || nFlag>=6){
					nFlag=3;
				}
				drawBackward(_context,_canvasPic,_rotate);
				nFlag++;
				_rotate = _rotate + 2*Math.PI/180;
			}else{
				if(nReDrawCount<10){
					_canvasPic.drawBG();
					nReDrawCount++;
				}
			}
		},100);
	}
}//end function

function drawBackward(_context,_canvasPic,_rotate){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	_context.save();
	_canvasPic.drawBG();//重画背景
	_context.translate(fPointArray[0],fPointArray[1]);
	_context.transform(1,0,0,Math.cos(_rotate),0,0);
	
	//构造颜色
	var circleGrad=_context.createLinearGradient(0,-30,0,30);
	circleGrad.addColorStop(0, '#4f9dec'); 
	circleGrad.addColorStop(0.3, '#5fb6f1'); 
	circleGrad.addColorStop(0.5, '#5bb0f0');
	circleGrad.addColorStop(0.7, '#4195ff');
	circleGrad.addColorStop(1, '#1a56d9');
	_context.save();
	_context.beginPath();
	_context.fillStyle=circleGrad;
	_context.moveTo(0,30);//下向上画
	_context.arc(0,0,30,0,2*Math.PI,false); //内圆
	_context.fill();
	_context.closePath();
	_context.restore();	
	
	//弧线
	var arcGrad=_context.createLinearGradient(0,-30,0,30);
	arcGrad.addColorStop(0, '#1a56d9'); 
	arcGrad.addColorStop(0.2, '#a8dcfe');
	arcGrad.addColorStop(0.3, '#9ad3ff'); 
	arcGrad.addColorStop(0.5, '#9ed0ff');
	arcGrad.addColorStop(0.7, '#76b3ff');
	arcGrad.addColorStop(1, '#1a56d9');
	_context.save();
	_context.beginPath();
	_context.strokeStyle=arcGrad;
	_context.moveTo(0,30);
	_context.arc(8,0,32,110*Math.PI/180,250*Math.PI/180,false); //外圆
	_context.stroke();
	_context.closePath();
	_context.restore();	

	//画方向
	_context.save();
	_context.fillStyle="#FFF";
	_context.beginPath();
	_context.moveTo(19,0);
	_context.lineTo(19,6);
	_context.lineTo(5,6);
	_context.lineTo(5,16);
	_context.lineTo(-11,0);
	_context.lineTo(5,-16);
	_context.lineTo(5,-6);
	_context.lineTo(19,-6);
	_context.fill();
	_context.closePath();
	_context.restore();	
	
	_context.restore();			
}
function drawPic(_context,_canvasPic,imgpath){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	_context.save();
	_canvasPic.drawBG();//重画背景
	_context.translate(fPointArray[0],fPointArray[1]);
	var pic = new Image();
	pic.src=imgpath;
	_context.drawImage(pic,0,0);
};
function drawDownLoad(_context,_canvasPic){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	_context.save();
	_canvasPic.drawBG();//重画背景
	_context.translate(fPointArray[0],fPointArray[1]);
	//构造颜色
	var grayGrad=_context.createLinearGradient(-24,0,24,0);
	grayGrad.addColorStop(0, '#ecdfe4'); 
	grayGrad.addColorStop(0.2, '#d2d2d3'); 
	grayGrad.addColorStop(0.5, '#b5b5b5');
	grayGrad.addColorStop(0.6, '#ebebeb');
	grayGrad.addColorStop(0.7, '#eff0ed');
	grayGrad.addColorStop(1, '#fefffb');
	//画图
	_context.beginPath();
	_context.fillStyle=grayGrad;
	_context.moveTo(10,0);//从右边开始画
	_context.lineTo(24,0);
	_context.lineTo(0,30);
	_context.lineTo(-24,0);
	_context.lineTo(-10,0);
	_context.lineTo(-10,-20);
	_context.lineTo(10,-20);
	_context.fill();
	_context.restore();
}
//paly button
function drawPlayButton(_context,_canvasPic){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	var nRadius=30;//半径
	_context.save();
	_canvasPic.drawBG();//重画背景
	_context.translate(fPointArray[0],fPointArray[1]);

	//构造线变
	var yellowGrad=_context.createLinearGradient(30,0,0,30);
	yellowGrad.addColorStop(0, '#fccb02'); 
	yellowGrad.addColorStop(0.5, '#fbf14d'); 
	yellowGrad.addColorStop(1, '#ffcb02');
	var blueGrad=_context.createLinearGradient(30,0,0,30);
	blueGrad.addColorStop(0, '#2a459c'); 
	blueGrad.addColorStop(0.5, '#0e7adc'); 
	blueGrad.addColorStop(1, '#2a459e');
	var redGrad=_context.createLinearGradient(30,0,0,30);//通过rotate来旋转
	redGrad.addColorStop(0, '#d0372f'); 
	redGrad.addColorStop(0.5, '#e0675e'); 
	redGrad.addColorStop(1, '#ce392d');
	var greenGrad=_context.createLinearGradient(30,0,0,30);//通过rotate来旋转
	greenGrad.addColorStop(0, '#059700'); 
	greenGrad.addColorStop(0.5, '#02e003'); 
	greenGrad.addColorStop(1, '#019a02');
	

	//绘制两弧夹角内容
	drawCake(_context,0,yellowGrad,nRadius);
	drawCake(_context,Math.PI/2,blueGrad,nRadius);
	drawCake(_context,Math.PI,redGrad,nRadius);
	drawCake(_context,3*Math.PI/2,greenGrad,nRadius);
	//内圆颜色
	var lingrad =_context.createLinearGradient(-30,-30,30,30);
	lingrad.addColorStop(0, '#4672df'); 
	lingrad.addColorStop(0.2, '#6188e5'); 
	lingrad.addColorStop(0.5, '#98b1ef');
	lingrad.addColorStop(0.8, '#b1c3f2');
	lingrad.addColorStop(1, '#eaedfc');
	_context.save();
	_context.beginPath();//内圆
	_context.fillStyle=lingrad;
	_context.arc(0,0,nRadius-10,0,Math.PI*2,true); 
	_context.fill();
	_context.closePath();
	_context.restore();
	//绘制三角
	var trianglerad=_context.createLinearGradient(-6,-10,-6,10);
	trianglerad.addColorStop(0, '#99d4ea'); 
	trianglerad.addColorStop(0.2, '#5e8fdd'); 
	trianglerad.addColorStop(0.5, '#0f17a1');
	trianglerad.addColorStop(0.8, '#4c65cc');
	trianglerad.addColorStop(1, '#7299e5');
	_context.beginPath();
	_context.fillStyle=trianglerad;
	_context.moveTo(12,0);
	_context.lineTo(-6,10);
	_context.lineTo(-6,-10);
	_context.fill();
	_context.restore();
}
//绘画一个扇形
function drawCake(_context,_nRotateAngle,_fillColor,_nRadius){
	_context.save();
	_context.beginPath(); 
	_context.fillStyle=_fillColor;
	_context.rotate(_nRotateAngle);
	_context.moveTo(_nRadius-10,0);
	_context.lineTo(_nRadius,0);//向右画一根线
	_context.arc(0,0,_nRadius,0,Math.PI/2,false); 
	_context.lineTo(0,_nRadius-10);//向上画一个
	_context.arc(0,0,_nRadius-10,Math.PI/2,0,true); //逆时针画内弧
	_context.fill();
	_context.closePath();
	_context.restore();
}
//立体圆
function drawRadialCircle(_context,_canvasPic,_rotate){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	_context.save();
	_canvasPic.drawBG();//重画背景
	_context.translate(fPointArray[0],fPointArray[1]);
	_context.transform(Math.cos(_rotate),Math.sin(_rotate),-Math.sin(_rotate),Math.cos(_rotate),0,0);

	var radgrad =_context.createRadialGradient(10,10,8,0,0,30); //画渐变
	radgrad.addColorStop(0,'#fbe7e8'); 
	radgrad.addColorStop(0.9,'#f70403'); 
	radgrad.addColorStop(1,'rgba(1,159,98,0)'); 
	_context.beginPath();
	_context.arc(0,0,30,0,Math.PI*2,true);
	_context.fillStyle = radgrad;
	_context.fill();
	_context.restore();
}
function drawIE(_context,_canvasPic){
	//create gradient
	var aGradient=_context.createLinearGradient(_canvasPic.x,_canvasPic.y,_canvasPic.x,_canvasPic.y+75);//IE9
	aGradient.addColorStop(0.2,"#fbf1f5");
	aGradient.addColorStop(0.5,"#f5c6d7");
	aGradient.addColorStop(0.5,"#e972a7");
	aGradient.addColorStop(0.9,"#e9368e");
	_context.save();
	_canvasPic.drawBG();//重画背景
	_context.fillStyle=aGradient;
	_context.font = "italic 34px sans-serif";
	_context.fillText("IE9",_canvasPic.x+10,_canvasPic.y+50);
	_context.restore();
}
//绘制笑脸
function drawSmile(_context,_canvasPic,_fillColor){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	_context.save();
	_canvasPic.drawBG();//重画背景
	_context.translate(fPointArray[0],fPointArray[1]);
	_context.beginPath();
	_context.lineWidth=2;
	_context.strokeStyle=_fillColor;
	_context.arc(0,0,30,0,Math.PI*2,false); //外圆
	_context.moveTo(20,0);
	_context.arc(0,0,20,0,Math.PI,false); //内半圆
	_context.moveTo(13,-10);
	_context.arc(10,-10,3,0,Math.PI*2,false); //右眼
	_context.moveTo(-7,-10);
	_context.arc(-10,-10,3,0,Math.PI*2,false); //左眼
	_context.stroke();
	_context.restore();
}
//绘制风扇
function drawFan(_context,_canvasPic,_fillColor,_nFlag){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	var nStartAngle=0;
	var nEndAngle=(90*Math.PI/180);
	var nRadius=30;//半径
	var fanColorArray=["red","green","blue"];
	_context.save();
	_canvasPic.drawBG();//重画背景
	_context.translate(fPointArray[0],fPointArray[1]);

	//绘制扇形
	drawOneFan(_context,nStartAngle,nEndAngle,0,fanColorArray[_nFlag%3],nRadius);
	drawOneFan(_context,nStartAngle,nEndAngle,(120*Math.PI/180),fanColorArray[(_nFlag-1)%3],nRadius);
	drawOneFan(_context,nStartAngle,nEndAngle,(2*120*Math.PI/180),fanColorArray[(_nFlag-2)%3],nRadius);
	_context.restore();
}
//绘画一个扇形
function drawOneFan(_context,_nStartAngle,_nEndAngle,_nRotateAngle,_fillColor,_nRadius){
	_context.save();
	_context.beginPath(); 
	_context.fillStyle=_fillColor;
	_context.rotate(_nRotateAngle);
	_context.moveTo(0,0);
	_context.lineTo(_nRadius*Math.cos(_nStartAngle),_nRadius*Math.sin(_nStartAngle));
	_context.arc(0,0,_nRadius,0,Math.PI/2,false); 
	_context.lineTo(_nRadius*Math.cos(_nEndAngle),_nRadius*Math.sin(_nEndAngle));
	_context.fill();
	_context.closePath();
	_context.restore()
}

//绘制线条时钟
function drawLineClock(_context,_canvasPic,_fillColor){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	var date = new Date();
	_context.save();
	_canvasPic.drawBG();//重画背景
	_context.translate(fPointArray[0],fPointArray[1]);
	_context.fillStyle=(_fillColor||"#0000FF");
	//画点
	_context.fillRect(-2,-32,4,4);
	_context.fillRect(30,-2,4,4);
	_context.fillRect(-2,30,4,4);
	_context.fillRect(-34,-2,4,4);
	//画时针
	_context.save();
	var hourAngle=(date.getHours() +(date.getMinutes()/60)-3)*30*Math.PI/180;//1小时30度
	_context.rotate(hourAngle);
	_context.lineWidth=2;
	_context.fillRect(0,0,15,4);
	_context.restore();
	//画分针
	_context.save();
	var minuteAngle=(date.getMinutes()-15)*6*Math.PI/180;//1分钟6度
	_context.rotate(minuteAngle);
	_context.lineWidth=2;
	_context.fillRect(0,0,20,4);
	_context.restore();
	//画秒针
	_context.rotate((date.getSeconds()-15)*6*Math.PI/180);//1秒6度,默认从水平开始画
	_context.lineWidth=2;
	_context.fillRect(0,0,28,4);
	_context.restore();
}

function formatTime(_time){
	if(_time<10){
		return "0"+_time;
	}else{
		return _time;
	}
}
//绘制文字时钟
function drawTextClock(_context,_canvasPic,_fillColor){
	var date = new Date();
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	_context.save();
	_canvasPic.drawBG();//重画背景
	_context.font="26px Arial";
	_context.fillStyle=(_fillColor||"#0000FF");
	_context.fillText(formatTime(date.getMinutes())+":"+formatTime(date.getSeconds()),_canvasPic.x+5,_canvasPic.y+45);
	_context.restore();
}

//绘制心
function drawHeart(_context,_canvasPic,_dScaleFator,_fillColor){
	_context.save();
	
	//重画背景
	_canvasPic.drawBG();

	var dScaleFactor=0.4;
	var dTranslateFactor=(1/_dScaleFator);//移动的点不缩放
	_fillColor=_fillColor||"red";
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	_context.beginPath();
	_context.fillStyle=_fillColor;
	_context.scale(_dScaleFator,_dScaleFator);
	//alert("x:"+ _canvasPic.x + ",y:" + _canvasPic.y);
	_context.translate(_canvasPic.x*dTranslateFactor,_canvasPic.y*dTranslateFactor);
	_context.moveTo(75,40);
	_context.bezierCurveTo(75,37,70,25,50,25);
	_context.bezierCurveTo(20,25,20,62.5,20,62.5);
	_context.bezierCurveTo(20,80,40,102,75,120);
	_context.bezierCurveTo(110,102,130,80,130,62.5);
	_context.bezierCurveTo(130,62.5,130,25,100,25);
	_context.bezierCurveTo(85,25,75,37,75,40);
	_context.fill();
	_context.restore();
}


//绘制图形 begin ----------------------
//随即产生绘画图片的坐标等信息
function randomPictures(){
	var nCurrX = MyConstants.BeginX;//开始绘画的坐标
	var nCurrY = MyConstants.BeginY;
	for(var i=0; i<MyConstants.PicRows; i++){
		for(var j=0; j<MyConstants.PicCols; j++){
		//alert("i=" + i + ",j=" + j + ",nCurrX=" + nCurrX + ",nCurrY=" + nCurrY);
			//构造当前图片的信息
			var tempPic = new CanvasPicture();
			tempPic.x = nCurrX;
			tempPic.y = nCurrY;
			tempPic.indexX=i;
			tempPic.indexY=j;
			allPicsArray[i][j]=tempPic;
			
			//计算X坐标
			nCurrX += (MyConstants.PicWidth + MyConstants.PicShadowBlur*2 + MyConstants.PicMargin);
		}// end for
			
		//计算Y坐标
		nCurrY += (MyConstants.PicHeight + MyConstants.PicShadowBlur*2 + MyConstants.PicMargin);
		nCurrX = MyConstants.BeginX;//重置X坐标
	}
}

//随机初始化图片类型参数，AllPicTypes
function initRandomPicType(){
	//先初始化30个图片属性
	for(var i=1;i<11;i++){
		AllPicTypes.push(i);
		AllPicTypes.push(i);
	}

	//再随即产生5*4个图片属性
	var hasRandomPicTypes = [];
	var nSafety = 0;//防止死循环
	for(var i=0;i<5;i++){
		var tempRandom = randomOnePicType();
		while(nSafety<1000 && isInArray(tempRandom,hasRandomPicTypes)){
			tempRandom = randomOnePicType();
			nSafety ++;
		}
		
		AllPicTypes.push(tempRandom);
		AllPicTypes.push(tempRandom);
		AllPicTypes.push(tempRandom);
		AllPicTypes.push(tempRandom);

		//store
		hasRandomPicTypes.push(tempRandom);
	}

	//随即排序数据
	AllPicTypes = randomOrderArray(AllPicTypes);
}

//判断一个数字是否在数组中已经出现
function isInArray(_nValue,_array){
	for(var i=0;i<_array.length;i++){
		if(_array[i]==_nValue){
			return true;
		}
	}
	return false;
}

//随即产生一个图片属性
function randomOnePicType(){
	var aRandom = Math.random();
	aRandom = aRandom * 10;
	if(aRandom<=1){
		aRandom=1;
	}else if(aRandom>=9){
		aRandom = 9;
	}else{
		aRandom = Math.floor(aRandom);
	}
	return aRandom;
}
//对数组进行随即排序
function randomOrderArray(targetArray){
	 var arrayLength = targetArray.length
	 //先创建一个正常顺序的数组
	 var orderIndexArray = new Array();
	 for(var i = 0; i < arrayLength; i ++){
		orderIndexArray [i] = i
	 }
	 //再根据上一个数组创建一个随机乱序的数组
	 var unOrderArray = new Array();

	 for(var i=0;i<arrayLength;i++){
		//从正常顺序数组中随机抽出元素
		var nTemp = Math.floor(Math.random()*orderIndexArray.length);
		unOrderArray[i] = orderIndexArray.splice(nTemp,1)
	 }
	 //最后创建一个临时数组存储 根据上一个乱序的数组从targetArray中取得数据
	 var resultArray = new Array();
	 for (var i=0;i<arrayLength;i++){
		resultArray[i]=targetArray[unOrderArray[i]];
	 }
	 //
	 //返回最后得出的数组
	 return resultArray;
}

//绘画所有Pic图像
function drawAllPic(_context,_nNeedInitPicType,_nNeedDrawPic){
	_nNeedInitPicType=_nNeedInitPicType||0;//是否需要初始化PicType属性
	_context.save();
	var nRealPicCoun=0;
	for(var i=0;i<allPicsArray.length;i++){
		for(var j=0;j<allPicsArray[0].length;j++){
			var aCanvasPic = allPicsArray[i][j];
			if(!aCanvasPic){continue;}
			if(_nNeedInitPicType==1){
				if(i==0 || (i==allPicsArray.length-1) || j==0 || (j==allPicsArray[0].length-1)){
					aCanvasPic.picType=-2;//边缘
				}else{
					aCanvasPic.picType = AllPicTypes[nRealPicCoun];
					nRealPicCoun++;
				}
			}
			allPicsArray[i][j] = aCanvasPic;
			//画图
			allPicsArray[i][j].draw(_context,null,_nNeedDrawPic);
		}
	}
	_context.restore();
}

//初始化图像
function init(_context){
	var nCurrX = MyConstants.BeginX;//开始绘画的坐标
	var nCurrY = MyConstants.BeginY;
	//初始化数组
	for(var i=0;i<allPicsArray.length;i++){
		var colArray= new Array(MyConstants.picCols);
		allPicsArray[i]=colArray;
	}

	//初始化数据，这里可以有进度条
	randomPictures();
	
	//初始化随即图片对象数组
	initRandomPicType();

	//根据canvasPicture对象画图,需要初始化属性和绘画图片
	drawAllPic(_context,1,1);
}

//根据坐标值获取Pic对象
function getPicByPosition(_event){
	for(var i=0;i<allPicsArray.length;i++){
		for(var j=0;j<allPicsArray[0].length;j++){
			var aPic = allPicsArray[i][j];
			//计算x和y的实际坐标
			var nPicMinX=aPic.x+nCurrCanvasLeft;
			var nPicMaxX=nPicMinX+aPic.width;
			var nPicMinY=aPic.y+nCurrCanvasTop;
			var nPicMaxY=nPicMinY+aPic.height;
			//x不符合
			if(_event.x<nPicMinX || _event.x>nPicMaxX){
				continue;
			}
			//y是否符合
			if(_event.y<nPicMinY || _event.y>nPicMaxY){
				continue;
			}
			return aPic;
		}
	}
}

//消除指定位置的Pic
function clearPic(_nIndexX,_nIndexY){
	allPicsArray[_nIndexX][_nIndexY].clear();
	allPicsArray[_nIndexX][_nIndexY].picType=-1;
}

//绘制连接线
function drawLine(_strokeStyle){
	_strokeStyle = _strokeStyle ||"#00f";
	var context = document.getElementById('myCanvas').getContext('2d');
	context.save();
	context.strokeStyle = _strokeStyle;
	context.lineWidth   = 2;
	context.beginPath();
	
	for(var i=0;i<roadPoint.length;i+=2){
		context.save();
		var fPointArray=getCenterXY(roadPoint[i],roadPoint[i+1]);
		if(i==0){
			context.moveTo(fPointArray[0],fPointArray[1]);
			continue;
		}
		context.lineTo(fPointArray[0],fPointArray[1]);
		context.restore();
	}
	context.stroke();
	context.closePath();
	context.restore();
}

//绘画最短路径
function drawRoad(_strokeStyle){
	drawLine(_strokeStyle);
}

//获取一个对象的
function getCenterXY(_nIndexX,_nIndexY){
	var aPic=allPicsArray[_nIndexX][_nIndexY];
	var postionArray=new Array(2);
	postionArray[0]=aPic.x + parseInt(aPic.width/2);
	postionArray[1]=aPic.y + parseInt(aPic.height/2);
	return postionArray;
}

//单击canvas画布的事件
function clickCanvas(_canvas,_event){
	//清除提示时选中对象
	if(firstHelpPic!=null){
		firstHelpPic.unSelected();
		firstHelpPic=null;
	}
	if(secondHelpPic!=null){
		secondHelpPic.unSelected();
		secondHelpPic=null;
	}
	var event = _event || window.event;
	var currPic=getPicByPosition(_event);
	if(currPic==null || currPic.picType<0){
		return false;
	}
	currPic.setSelected();

	//记录下上次单击图片
	if(oLastClickPic==null){
		oLastClickPic=currPic;
	}else{
		var bHasShortRoad=false;
		if(oLastClickPic.indexX==currPic.indexX && oLastClickPic.indexY==currPic.indexY){
			return;
		}
		if(oLastClickPic.picType==currPic.picType){
			bHasShortRoad = hasShortRoad(oLastClickPic.indexX,oLastClickPic.indexY,currPic.indexX,currPic.indexY);
		}
		if(bHasShortRoad==true){
			//有最短路径
			drawRoad();
			window.setTimeout(function(){
				clearPic(oLastClickPic.indexX,oLastClickPic.indexY);
				clearPic(currPic.indexX,currPic.indexY);
				oLastClickPic=null;//清除上次单击对象
				minRoadPoint=1000;
				drawRoad("#FFF");
				drawAllPic(gContext,0,0);
				//检查是否完成
				if(isFinish()==true){
					alert("Congratulations!");
				}
			},300);
		}else{
			oLastClickPic.unSelected();
			//重置上次单击对象
			oLastClickPic=currPic;
		}
	}
}

//检查两点是否可以直连
function checkLine(r1,c1,r2,c2){
	if(r1==r2&&c1==c2){//同一点
		return true;
	}else if(c1==c2){//同一列
		if(r1>r2){
			var swapTemp=r2;
			r2=r1;
			r1=swapTemp;
		}
		if(r1+1==r2){return true;}//相邻
		for(var i=r1+1;i<r2;i++){
			if(allPicsArray[i][c1].picType>0){//图像未消除
				return false;
			}
		}
		return true;
	}else if(r1==r2){//同一行
		if(c1>c2){
			var swapTemp=c2;
			c2=c1;
			c1=swapTemp;
		}
		if(c1+1==c2){
			return true;
		}
		for(var i=c1+1;i<c2;i++){
			if(allPicsArray[r1][i].picType>0){//图像未消除
				return false;
			}
		}
		return true;
	}
	return false;//不在同一直线
}

//查找两点
function hasShortRoad(r1,c1,r2,c2){
	if(r1==r2&&c1==c2){//同一点
		return false;
	}
	var bResult=false;
	if(c1==c2){//同一列
		if(checkLine(r1,c1,r2,c2)){//直连式最短的
			addRoadPoint(r1,c1,r1,c1,r1,c1,r2,c2);
			return true;
		}
		for(var i=0;i<allPicsArray[0].length;i++){
			if(allPicsArray[r1][i].picType<0 && allPicsArray[r2][i].picType<0){
				if(checkLine(r1,c1,r1,i)&&checkLine(r1,i,r2,i)&&checkLine(r2,i,r2,c2)){
					bResult=true;
					roadPointCount(r1,c1,r1,i,r2,i,r2,c2);
				}
			}
		}

	}else if(r1==r2){//同一行
		if(checkLine(r1,c1,r2,c2)){//直连式最短的
			addRoadPoint(r1,c1,r1,c1,r2,c2,r2,c2);
			return true;
		}
		for(var i=0;i<allPicsArray.length;i++){
			if(allPicsArray[i][c1].picType<0 && allPicsArray[i][c2].picType<0){
				if(checkLine(r1,c1,i,c1)&&checkLine(i,c1,i,c2)&&checkLine(i,c2,r2,c2)){
					bResult=true;
					roadPointCount(r1,c1,i,c1,i,c2,r2,c2);
				}
			}
		}
	
	}else{//两点不在同一直线
		//先测试每一条垂直线
		for(var i=0;i<allPicsArray[0].length;i++){
			if(i==c1&&allPicsArray[r2][i].picType<0){//Only one Corner
				if(checkLine(r1,c1,r2,c1)&&checkLine(r2,c1,r2,c2)){
					bResult=true;
					roadPointCount(r1,c1,r1,c1,r2,c1,r2,c2);
				}

			}else if(i==c2&&allPicsArray[r1][i].picType<0){//Only one Corner
				if(checkLine(r2,c2,r1,c2)&&checkLine(r1,c2,r1,c1)){
					bResult=true;
					roadPointCount(r2,c2,r2,c2,r1,c2,r1,c1);
				}
			}else if(allPicsArray[r1][i].picType<0 && allPicsArray[r2][i].picType<0){//Two Corners
				if(checkLine(r1,c1,r1,i)&&checkLine(r1,i,r2,i) && checkLine(r2,i,r2,c2)){
					bResult=true;
					roadPointCount(r1,c1,r1,i,r2,i,r2,c2);
				}
			}
		}
		//再测试每一条水平线
		for(var i=0;i<allPicsArray.length;i++){
			if(allPicsArray[i][c1].picType<0 && allPicsArray[i][c2].picType<0){
				if(i==r1 && allPicsArray[r1][c2].picType<0){
					if(checkLine(r1,c1,r1,c2)&&checkLine(r1,c2,r2,c2)){
						bResult=true;
						roadPointCount(r1,c1,r1,c1,r1,c2,r2,c2);
					}
				}else if(i==r2&&allPicsArray[r2][c1].picType<0){//Only one Corner
					if(checkLine(r1,c1,r2,c1)&&checkLine(r2,c1,r2,c2)){
						bResult=true;
						roadPointCount(r1,c1,r1,c1,r2,c1,r2,c2);
					}
				}if(checkLine(r1,c1,i,c1)&&checkLine(i,c1,i,c2)&&checkLine(i,c2,r2,c2)){
						bResult=true;
						roadPointCount(r1,c1,i,c1,i,c2,r2,c2);
				}
			
			
			}

		}//end for
	}//end else
	return bResult;
}
//记录路径点
function addRoadPoint(r1,c1,r2,c2,r3,c3,r4,c4){
	 roadPoint[0] = r1;
	 roadPoint[1] = c1;
	 roadPoint[2] = r2;
	 roadPoint[3] = c2;
	 roadPoint[4] = r3;
	 roadPoint[5] = c3;
	 roadPoint[6] = r4;
	 roadPoint[7] = c4; 
}
 
//始终记录最短的路线的路径点
function roadPointCount(r1,c1,r2,c2,r3,c3,r4,c4){
	 var count=0;
	 count = Math.abs(c2-c1) + Math.abs(c3-c2) + Math.abs(c4-c3) + Math.abs(r2-r1) + Math.abs(r3-r2) + Math.abs(r4-r3);
	 if(count < minRoadPoint){
		addRoadPoint(r1,c1,r2,c2,r3,c3,r4,c4);
		minRoadPoint = count;
	 }
}
//是否消除了所有
function isFinish(){
	for(var i=1;i<allPicsArray.length-1;i++){
		for(var j=1;j<allPicsArray[0].length-1;j++){
			if(allPicsArray[i][j].picType>0){
				return false;
			}	
		}
	}
	return true;
}
function refreshMe(){
	window.location.href=window.location.href;
}
function doHelp(){
	if(oLastClickPic!=null){
		oLastClickPic.unSelected();
		oLastClickPic=null;
	}
	for(var i=1;i<allPicsArray.length-1;i++){
		for(var j=1;j<allPicsArray[0].length-1;j++){
			var aCanvasPic=allPicsArray[i][j];
			if(aCanvasPic.picType<0){continue;}
			//another
			for(var k=1;k<allPicsArray.length-1;k++){
				for(var m=1;m<allPicsArray[0].length-1;m++){
					if(i==k&&j==m){
						continue;//same
					}
					var anotherPic=allPicsArray[k][m];
					if(anotherPic.picType<0){continue;}
					if(aCanvasPic.picType!=anotherPic.picType){
						continue;
					}

					var bHasShortRoad = hasShortRoad(i,j,k,m);
					if(!bHasShortRoad){continue;}
					
					//选中
					aCanvasPic.setSelected();
					anotherPic.setSelected();
					//记录
					firstHelpPic=aCanvasPic;
					secondHelpPic=anotherPic;
					return;
				}
			}

		}
	}
}