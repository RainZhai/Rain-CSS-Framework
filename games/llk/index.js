//����ÿ��ͼ�����
var CanvasPicture =  function(){};
CanvasPicture.prototype = {
	_context:null,
	x	:  0, //canvas�����е�x����,�±���y����
	y	:  0,
	indexX:0,//���������±�
	indexY:0,
	width  : MyConstants.PicWidth,
	height : MyConstants.PicHeight,
	picType: 0,  //����ͼƬ���ͣ�������canvas��չʾ��ͬ���͵�ͼƬ���Ա�����ʧ���ܹ�15��ͼƬ,С��0������ʧ
	color  : "#a3610a",//Ĭ����ɫ
	strokeColor:"rgb(255, 204, 204)",
	isDynamic:function(){
		return mNoDynamicPicTypes.indexOf(","+this.picType+",")<0;
	},
	draw:function(_context,_stokeColor,_nNeedDrawPic){
		//�߿���ɫֵ
		this.strokeColor=_stokeColor||this.strokeColor;
		//��¼�����Ķ���
		this._context=_context;
		if(this.picType<0){
			this.color=this.strokeColor;
		}

		//����Ǳ�Ե���򻭰�ɫ
		if(this.indexX==0||(this.indexX==MyConstants.PicRows-1) || this.indexY==0 || (this.indexY==MyConstants.PicCols-1)){
			this.color=this.strokeColor="#FFF";
		}
		
		//�ػ�����
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
		//����������
		this._context.clearRect(this.x,this.y,this.width,this.height);
		this._context.fillStyle=this.color;
		this._context.shadowBlur = 0;
		this._context.fillRect(this.x,this.y,this.width,this.height);

		//���Ʊ߿����
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
		this.draw(this._context,this.strokeColor,1);//��Ҫ�ٴλ�ͼƬ
	},
	unSelected:function(){
		this.strokeColor="rgb(255, 204, 204)";
		if(this.isDynamic()){
			return;
		}
		this.draw(this._context,this.strokeColor,1);//��Ҫ�ٴλ�ͼƬ
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

//����ͼ�� begin ----------------------
//���ݲ�ͬͼƬ���ͻ��Ʋ�ͬͼ��
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
		//Fan����
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
		//Ц��
		drawSmile(_context,_canvasPic,"#c6c6c6");
	}else if(currPicType==6){
		//IE9
		drawIE(_context,_canvasPic);
	}else if(currPicType==7){
		//���򽥱�Բ
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
		//���Ű�ť
		drawPlayButton(_context,_canvasPic);
	}else if(currPicType==9){
		//����ͼ��
		drawDownLoad(_context,_canvasPic);
	}else if(currPicType==10){
		//����ͼ��
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
	_canvasPic.drawBG();//�ػ�����
	_context.translate(fPointArray[0],fPointArray[1]);
	_context.transform(1,0,0,Math.cos(_rotate),0,0);
	
	//������ɫ
	var circleGrad=_context.createLinearGradient(0,-30,0,30);
	circleGrad.addColorStop(0, '#4f9dec'); 
	circleGrad.addColorStop(0.3, '#5fb6f1'); 
	circleGrad.addColorStop(0.5, '#5bb0f0');
	circleGrad.addColorStop(0.7, '#4195ff');
	circleGrad.addColorStop(1, '#1a56d9');
	_context.save();
	_context.beginPath();
	_context.fillStyle=circleGrad;
	_context.moveTo(0,30);//�����ϻ�
	_context.arc(0,0,30,0,2*Math.PI,false); //��Բ
	_context.fill();
	_context.closePath();
	_context.restore();	
	
	//����
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
	_context.arc(8,0,32,110*Math.PI/180,250*Math.PI/180,false); //��Բ
	_context.stroke();
	_context.closePath();
	_context.restore();	

	//������
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
	_canvasPic.drawBG();//�ػ�����
	_context.translate(fPointArray[0],fPointArray[1]);
	var pic = new Image();
	pic.src=imgpath;
	_context.drawImage(pic,0,0);
};
function drawDownLoad(_context,_canvasPic){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	_context.save();
	_canvasPic.drawBG();//�ػ�����
	_context.translate(fPointArray[0],fPointArray[1]);
	//������ɫ
	var grayGrad=_context.createLinearGradient(-24,0,24,0);
	grayGrad.addColorStop(0, '#ecdfe4'); 
	grayGrad.addColorStop(0.2, '#d2d2d3'); 
	grayGrad.addColorStop(0.5, '#b5b5b5');
	grayGrad.addColorStop(0.6, '#ebebeb');
	grayGrad.addColorStop(0.7, '#eff0ed');
	grayGrad.addColorStop(1, '#fefffb');
	//��ͼ
	_context.beginPath();
	_context.fillStyle=grayGrad;
	_context.moveTo(10,0);//���ұ߿�ʼ��
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
	var nRadius=30;//�뾶
	_context.save();
	_canvasPic.drawBG();//�ػ�����
	_context.translate(fPointArray[0],fPointArray[1]);

	//�����߱�
	var yellowGrad=_context.createLinearGradient(30,0,0,30);
	yellowGrad.addColorStop(0, '#fccb02'); 
	yellowGrad.addColorStop(0.5, '#fbf14d'); 
	yellowGrad.addColorStop(1, '#ffcb02');
	var blueGrad=_context.createLinearGradient(30,0,0,30);
	blueGrad.addColorStop(0, '#2a459c'); 
	blueGrad.addColorStop(0.5, '#0e7adc'); 
	blueGrad.addColorStop(1, '#2a459e');
	var redGrad=_context.createLinearGradient(30,0,0,30);//ͨ��rotate����ת
	redGrad.addColorStop(0, '#d0372f'); 
	redGrad.addColorStop(0.5, '#e0675e'); 
	redGrad.addColorStop(1, '#ce392d');
	var greenGrad=_context.createLinearGradient(30,0,0,30);//ͨ��rotate����ת
	greenGrad.addColorStop(0, '#059700'); 
	greenGrad.addColorStop(0.5, '#02e003'); 
	greenGrad.addColorStop(1, '#019a02');
	

	//���������н�����
	drawCake(_context,0,yellowGrad,nRadius);
	drawCake(_context,Math.PI/2,blueGrad,nRadius);
	drawCake(_context,Math.PI,redGrad,nRadius);
	drawCake(_context,3*Math.PI/2,greenGrad,nRadius);
	//��Բ��ɫ
	var lingrad =_context.createLinearGradient(-30,-30,30,30);
	lingrad.addColorStop(0, '#4672df'); 
	lingrad.addColorStop(0.2, '#6188e5'); 
	lingrad.addColorStop(0.5, '#98b1ef');
	lingrad.addColorStop(0.8, '#b1c3f2');
	lingrad.addColorStop(1, '#eaedfc');
	_context.save();
	_context.beginPath();//��Բ
	_context.fillStyle=lingrad;
	_context.arc(0,0,nRadius-10,0,Math.PI*2,true); 
	_context.fill();
	_context.closePath();
	_context.restore();
	//��������
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
//�滭һ������
function drawCake(_context,_nRotateAngle,_fillColor,_nRadius){
	_context.save();
	_context.beginPath(); 
	_context.fillStyle=_fillColor;
	_context.rotate(_nRotateAngle);
	_context.moveTo(_nRadius-10,0);
	_context.lineTo(_nRadius,0);//���һ�һ����
	_context.arc(0,0,_nRadius,0,Math.PI/2,false); 
	_context.lineTo(0,_nRadius-10);//���ϻ�һ��
	_context.arc(0,0,_nRadius-10,Math.PI/2,0,true); //��ʱ�뻭�ڻ�
	_context.fill();
	_context.closePath();
	_context.restore();
}
//����Բ
function drawRadialCircle(_context,_canvasPic,_rotate){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	_context.save();
	_canvasPic.drawBG();//�ػ�����
	_context.translate(fPointArray[0],fPointArray[1]);
	_context.transform(Math.cos(_rotate),Math.sin(_rotate),-Math.sin(_rotate),Math.cos(_rotate),0,0);

	var radgrad =_context.createRadialGradient(10,10,8,0,0,30); //������
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
	_canvasPic.drawBG();//�ػ�����
	_context.fillStyle=aGradient;
	_context.font = "italic 34px sans-serif";
	_context.fillText("IE9",_canvasPic.x+10,_canvasPic.y+50);
	_context.restore();
}
//����Ц��
function drawSmile(_context,_canvasPic,_fillColor){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	_context.save();
	_canvasPic.drawBG();//�ػ�����
	_context.translate(fPointArray[0],fPointArray[1]);
	_context.beginPath();
	_context.lineWidth=2;
	_context.strokeStyle=_fillColor;
	_context.arc(0,0,30,0,Math.PI*2,false); //��Բ
	_context.moveTo(20,0);
	_context.arc(0,0,20,0,Math.PI,false); //�ڰ�Բ
	_context.moveTo(13,-10);
	_context.arc(10,-10,3,0,Math.PI*2,false); //����
	_context.moveTo(-7,-10);
	_context.arc(-10,-10,3,0,Math.PI*2,false); //����
	_context.stroke();
	_context.restore();
}
//���Ʒ���
function drawFan(_context,_canvasPic,_fillColor,_nFlag){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	var nStartAngle=0;
	var nEndAngle=(90*Math.PI/180);
	var nRadius=30;//�뾶
	var fanColorArray=["red","green","blue"];
	_context.save();
	_canvasPic.drawBG();//�ػ�����
	_context.translate(fPointArray[0],fPointArray[1]);

	//��������
	drawOneFan(_context,nStartAngle,nEndAngle,0,fanColorArray[_nFlag%3],nRadius);
	drawOneFan(_context,nStartAngle,nEndAngle,(120*Math.PI/180),fanColorArray[(_nFlag-1)%3],nRadius);
	drawOneFan(_context,nStartAngle,nEndAngle,(2*120*Math.PI/180),fanColorArray[(_nFlag-2)%3],nRadius);
	_context.restore();
}
//�滭һ������
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

//��������ʱ��
function drawLineClock(_context,_canvasPic,_fillColor){
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	var date = new Date();
	_context.save();
	_canvasPic.drawBG();//�ػ�����
	_context.translate(fPointArray[0],fPointArray[1]);
	_context.fillStyle=(_fillColor||"#0000FF");
	//����
	_context.fillRect(-2,-32,4,4);
	_context.fillRect(30,-2,4,4);
	_context.fillRect(-2,30,4,4);
	_context.fillRect(-34,-2,4,4);
	//��ʱ��
	_context.save();
	var hourAngle=(date.getHours() +(date.getMinutes()/60)-3)*30*Math.PI/180;//1Сʱ30��
	_context.rotate(hourAngle);
	_context.lineWidth=2;
	_context.fillRect(0,0,15,4);
	_context.restore();
	//������
	_context.save();
	var minuteAngle=(date.getMinutes()-15)*6*Math.PI/180;//1����6��
	_context.rotate(minuteAngle);
	_context.lineWidth=2;
	_context.fillRect(0,0,20,4);
	_context.restore();
	//������
	_context.rotate((date.getSeconds()-15)*6*Math.PI/180);//1��6��,Ĭ�ϴ�ˮƽ��ʼ��
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
//��������ʱ��
function drawTextClock(_context,_canvasPic,_fillColor){
	var date = new Date();
	var fPointArray=getCenterXY(_canvasPic.indexX,_canvasPic.indexY);
	_context.save();
	_canvasPic.drawBG();//�ػ�����
	_context.font="26px Arial";
	_context.fillStyle=(_fillColor||"#0000FF");
	_context.fillText(formatTime(date.getMinutes())+":"+formatTime(date.getSeconds()),_canvasPic.x+5,_canvasPic.y+45);
	_context.restore();
}

//������
function drawHeart(_context,_canvasPic,_dScaleFator,_fillColor){
	_context.save();
	
	//�ػ�����
	_canvasPic.drawBG();

	var dScaleFactor=0.4;
	var dTranslateFactor=(1/_dScaleFator);//�ƶ��ĵ㲻����
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


//����ͼ�� begin ----------------------
//�漴�����滭ͼƬ���������Ϣ
function randomPictures(){
	var nCurrX = MyConstants.BeginX;//��ʼ�滭������
	var nCurrY = MyConstants.BeginY;
	for(var i=0; i<MyConstants.PicRows; i++){
		for(var j=0; j<MyConstants.PicCols; j++){
		//alert("i=" + i + ",j=" + j + ",nCurrX=" + nCurrX + ",nCurrY=" + nCurrY);
			//���쵱ǰͼƬ����Ϣ
			var tempPic = new CanvasPicture();
			tempPic.x = nCurrX;
			tempPic.y = nCurrY;
			tempPic.indexX=i;
			tempPic.indexY=j;
			allPicsArray[i][j]=tempPic;
			
			//����X����
			nCurrX += (MyConstants.PicWidth + MyConstants.PicShadowBlur*2 + MyConstants.PicMargin);
		}// end for
			
		//����Y����
		nCurrY += (MyConstants.PicHeight + MyConstants.PicShadowBlur*2 + MyConstants.PicMargin);
		nCurrX = MyConstants.BeginX;//����X����
	}
}

//�����ʼ��ͼƬ���Ͳ�����AllPicTypes
function initRandomPicType(){
	//�ȳ�ʼ��30��ͼƬ����
	for(var i=1;i<11;i++){
		AllPicTypes.push(i);
		AllPicTypes.push(i);
	}

	//���漴����5*4��ͼƬ����
	var hasRandomPicTypes = [];
	var nSafety = 0;//��ֹ��ѭ��
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

	//�漴��������
	AllPicTypes = randomOrderArray(AllPicTypes);
}

//�ж�һ�������Ƿ����������Ѿ�����
function isInArray(_nValue,_array){
	for(var i=0;i<_array.length;i++){
		if(_array[i]==_nValue){
			return true;
		}
	}
	return false;
}

//�漴����һ��ͼƬ����
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
//����������漴����
function randomOrderArray(targetArray){
	 var arrayLength = targetArray.length
	 //�ȴ���һ������˳�������
	 var orderIndexArray = new Array();
	 for(var i = 0; i < arrayLength; i ++){
		orderIndexArray [i] = i
	 }
	 //�ٸ�����һ�����鴴��һ��������������
	 var unOrderArray = new Array();

	 for(var i=0;i<arrayLength;i++){
		//������˳��������������Ԫ��
		var nTemp = Math.floor(Math.random()*orderIndexArray.length);
		unOrderArray[i] = orderIndexArray.splice(nTemp,1)
	 }
	 //��󴴽�һ����ʱ����洢 ������һ������������targetArray��ȡ������
	 var resultArray = new Array();
	 for (var i=0;i<arrayLength;i++){
		resultArray[i]=targetArray[unOrderArray[i]];
	 }
	 //
	 //�������ó�������
	 return resultArray;
}

//�滭����Picͼ��
function drawAllPic(_context,_nNeedInitPicType,_nNeedDrawPic){
	_nNeedInitPicType=_nNeedInitPicType||0;//�Ƿ���Ҫ��ʼ��PicType����
	_context.save();
	var nRealPicCoun=0;
	for(var i=0;i<allPicsArray.length;i++){
		for(var j=0;j<allPicsArray[0].length;j++){
			var aCanvasPic = allPicsArray[i][j];
			if(!aCanvasPic){continue;}
			if(_nNeedInitPicType==1){
				if(i==0 || (i==allPicsArray.length-1) || j==0 || (j==allPicsArray[0].length-1)){
					aCanvasPic.picType=-2;//��Ե
				}else{
					aCanvasPic.picType = AllPicTypes[nRealPicCoun];
					nRealPicCoun++;
				}
			}
			allPicsArray[i][j] = aCanvasPic;
			//��ͼ
			allPicsArray[i][j].draw(_context,null,_nNeedDrawPic);
		}
	}
	_context.restore();
}

//��ʼ��ͼ��
function init(_context){
	var nCurrX = MyConstants.BeginX;//��ʼ�滭������
	var nCurrY = MyConstants.BeginY;
	//��ʼ������
	for(var i=0;i<allPicsArray.length;i++){
		var colArray= new Array(MyConstants.picCols);
		allPicsArray[i]=colArray;
	}

	//��ʼ�����ݣ���������н�����
	randomPictures();
	
	//��ʼ���漴ͼƬ��������
	initRandomPicType();

	//����canvasPicture����ͼ,��Ҫ��ʼ�����Ժͻ滭ͼƬ
	drawAllPic(_context,1,1);
}

//��������ֵ��ȡPic����
function getPicByPosition(_event){
	for(var i=0;i<allPicsArray.length;i++){
		for(var j=0;j<allPicsArray[0].length;j++){
			var aPic = allPicsArray[i][j];
			//����x��y��ʵ������
			var nPicMinX=aPic.x+nCurrCanvasLeft;
			var nPicMaxX=nPicMinX+aPic.width;
			var nPicMinY=aPic.y+nCurrCanvasTop;
			var nPicMaxY=nPicMinY+aPic.height;
			//x������
			if(_event.x<nPicMinX || _event.x>nPicMaxX){
				continue;
			}
			//y�Ƿ����
			if(_event.y<nPicMinY || _event.y>nPicMaxY){
				continue;
			}
			return aPic;
		}
	}
}

//����ָ��λ�õ�Pic
function clearPic(_nIndexX,_nIndexY){
	allPicsArray[_nIndexX][_nIndexY].clear();
	allPicsArray[_nIndexX][_nIndexY].picType=-1;
}

//����������
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

//�滭���·��
function drawRoad(_strokeStyle){
	drawLine(_strokeStyle);
}

//��ȡһ�������
function getCenterXY(_nIndexX,_nIndexY){
	var aPic=allPicsArray[_nIndexX][_nIndexY];
	var postionArray=new Array(2);
	postionArray[0]=aPic.x + parseInt(aPic.width/2);
	postionArray[1]=aPic.y + parseInt(aPic.height/2);
	return postionArray;
}

//����canvas�������¼�
function clickCanvas(_canvas,_event){
	//�����ʾʱѡ�ж���
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

	//��¼���ϴε���ͼƬ
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
			//�����·��
			drawRoad();
			window.setTimeout(function(){
				clearPic(oLastClickPic.indexX,oLastClickPic.indexY);
				clearPic(currPic.indexX,currPic.indexY);
				oLastClickPic=null;//����ϴε�������
				minRoadPoint=1000;
				drawRoad("#FFF");
				drawAllPic(gContext,0,0);
				//����Ƿ����
				if(isFinish()==true){
					alert("Congratulations!");
				}
			},300);
		}else{
			oLastClickPic.unSelected();
			//�����ϴε�������
			oLastClickPic=currPic;
		}
	}
}

//��������Ƿ����ֱ��
function checkLine(r1,c1,r2,c2){
	if(r1==r2&&c1==c2){//ͬһ��
		return true;
	}else if(c1==c2){//ͬһ��
		if(r1>r2){
			var swapTemp=r2;
			r2=r1;
			r1=swapTemp;
		}
		if(r1+1==r2){return true;}//����
		for(var i=r1+1;i<r2;i++){
			if(allPicsArray[i][c1].picType>0){//ͼ��δ����
				return false;
			}
		}
		return true;
	}else if(r1==r2){//ͬһ��
		if(c1>c2){
			var swapTemp=c2;
			c2=c1;
			c1=swapTemp;
		}
		if(c1+1==c2){
			return true;
		}
		for(var i=c1+1;i<c2;i++){
			if(allPicsArray[r1][i].picType>0){//ͼ��δ����
				return false;
			}
		}
		return true;
	}
	return false;//����ͬһֱ��
}

//��������
function hasShortRoad(r1,c1,r2,c2){
	if(r1==r2&&c1==c2){//ͬһ��
		return false;
	}
	var bResult=false;
	if(c1==c2){//ͬһ��
		if(checkLine(r1,c1,r2,c2)){//ֱ��ʽ��̵�
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

	}else if(r1==r2){//ͬһ��
		if(checkLine(r1,c1,r2,c2)){//ֱ��ʽ��̵�
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
	
	}else{//���㲻��ͬһֱ��
		//�Ȳ���ÿһ����ֱ��
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
		//�ٲ���ÿһ��ˮƽ��
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
//��¼·����
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
 
//ʼ�ռ�¼��̵�·�ߵ�·����
function roadPointCount(r1,c1,r2,c2,r3,c3,r4,c4){
	 var count=0;
	 count = Math.abs(c2-c1) + Math.abs(c3-c2) + Math.abs(c4-c3) + Math.abs(r2-r1) + Math.abs(r3-r2) + Math.abs(r4-r3);
	 if(count < minRoadPoint){
		addRoadPoint(r1,c1,r2,c2,r3,c3,r4,c4);
		minRoadPoint = count;
	 }
}
//�Ƿ�����������
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
					
					//ѡ��
					aCanvasPic.setSelected();
					anotherPic.setSelected();
					//��¼
					firstHelpPic=aCanvasPic;
					secondHelpPic=anotherPic;
					return;
				}
			}

		}
	}
}