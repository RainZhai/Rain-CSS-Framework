//需要加载的图像资源
var imageAddress=["bg.jpg","eff.png","test.jpg"];

//需要加载的XML对象池
var xmlAddress=["eff.xml"];

//已经加载好的图像资源池
var imageStart=[];

//XML已经加载好的对象池
var xmlStart=[];

//当前加载资源的ID
var imageId=0;

//XML加载ID
var xmlid=0;

//定义场景管理器
var stage2d;

//全局定义3个拖拽点
var mc_1;
var mc_2;
var mc_3;

//全局定义个三角形绘制对象
var drawMc;

//定义一个当前点击的对象
var targetMc;

//加载回调函数
this.loadImag=function()
{
    var imageObj=new Image();
    imageObj.src=imageAddress[imageId];
    imageObj.onload=function(){
        if(imageObj.complete==true){
            imageStart.push(imageObj);
            imageId++;
            if(imageId<imageAddress.length)
            {
                loadImag();
            }
            if(imageId==imageAddress.length)
            {
                loadXml();
            }

        }
    }
}

this.loadXml=function()
{
    var load=new AnimationXML();
    this.initer=function(e)
    {
        xmlStart.push(load);
        xmlid++;

        if(xmlid<xmlAddress.length)
        {
            loadXml();
        }
        if(xmlid==xmlAddress.length)
        {
            init();
        }
    }
    load.addEventListener(this.initer);
    load.createURL(xmlAddress[xmlid]);
}

window.onload=function(){
    this.loadImag();
}

//初始化函数
function init () {

    //创建场景管理器
	stage2d=new Stage2D();

    //启用场景逻辑
	stage2d.init();

    var bc=new MovieClip2D(imageStart[0]);
    bc.isPlay=1;
    bc.x=1024/2;
    bc.y=768/2;
    bc.frameWidth=imageStart[0].width;
    bc.frameHeight=imageStart[0].height;
    stage2d.addChild(bc);



    mc_1=new MovieClip2D(imageStart[1],xmlStart[0].quadDataList);
    mc_1.isPlay=2;
    mc_1.x=1024/2;
    mc_1.y=768/2-200;
    mc_1.scene("eff_5")
    mc_1.blend="lighter";
    stage2d.addChild(mc_1);

    mc_2=new MovieClip2D(imageStart[1],xmlStart[0].quadDataList);
    mc_2.isPlay=2;
    mc_2.x=1024/2+300;
    mc_2.y=768/2+300-200;
    mc_2.scene("eff_5")
    mc_2.blend="lighter";
    stage2d.addChild(mc_2);


    mc_3=new MovieClip2D(imageStart[1],xmlStart[0].quadDataList);
    mc_3.isPlay=2;
    mc_3.x=1024/2-300
    mc_3.y=768/2+300-200;
    mc_3.scene("eff_5")
    mc_3.blend="lighter";
    stage2d.addChild(mc_3);

    //创建一个绘制对象
    drawMc=new MovieClip2D(imageStart[2]);

    //绘制模式为3
    drawMc.isPlay=3;

    //初始化绘制点坐标
    drawMc.drawPoint1=new Point(300,0);
    drawMc.drawPoint2=new Point(300+300,300);
    drawMc.drawPoint3=new Point(0,300);

    //让三角形目标点等于3个代理的点,之后只要我们对这3个代理点进行移动就改变这个图形
    drawMc.movePoint1=mc_1;
    drawMc.movePoint2=mc_2;
    drawMc.movePoint3=mc_3;

    //显示它
    stage2d.addChild(drawMc);

    //注册鼠标按下侦听器
    stage2d.addEventListener(new Event2D(EVENT_MOUSE_DOWN,downFun));

    //注册鼠标移动侦听器
    stage2d.addEventListener(new Event2D(EVENT_MOUSE_MOVE,moveFun));

    //注册鼠标松开侦听器
    stage2d.addEventListener(new Event2D(EVENT_MOUSE_UP,upFun));
}

function upFun(e)
{
    targetMc=null
}

function moveFun(e)
{
    //如果移动鼠标时点击对象不为空,说明我们正在拖拽一个对象
    if(targetMc!=null)
    {
        //让这个对象的XY等于鼠标的XY
        targetMc.x=stage2d.mouseX;
        targetMc.y=stage2d.mouseY;
    }

    drawMc.movePoint2=mc_2;
    drawMc.movePoint3=mc_3;
}
function downFun(e)
{
    //获取当前点击的对象
    targetMc=e;

}









