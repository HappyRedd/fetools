/**
 * Created by hure on 2017/5/4.
 */
/**
 * Created by hure on 2017/4/28.
 */

window.utils = {};
//��������
window.utils.captureMouse = function(element){
    var mouse = {x:0,y:0};

    element.addEventListener('mousemove',function(event){
        var x,y;
        if(event.pageX||event.pageY){
            x = event.pageX;
            y = event.pageY;
        }else{
            x = event.clientX + document.body.scrollLeft +document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop +document.documentElement.scrollTop;
        }

        x -= element.offsetLeft;
        y -= element.offsetTop;

        mouse.x = x;
        mouse.y = y;
    },false);

    return mouse;
}

//��ȡ�����¼�����
window.utils.captureTouch = function (element) {
    var touch = {x: null, y: null, isPressed: false, event: null},
        body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;

    element.addEventListener('touchstart', function (event) {
        touch.isPressed = true;
        touch.event = event;
    }, false);

    element.addEventListener('touchend', function (event) {
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
        touch.event = event;
    }, false);

    element.addEventListener('touchmove', function (event) {
        var x, y,
            touch_event = event.touches[0];

        if (touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY;
        } else {
            x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
            y = touch_event.clientY + body_scrollTop + element_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
    }, false);

    return touch;
};
/****
 *
 * retrun bloole
 * */
window.utils.containsPoint = function(rect, x, y){
    return !(x<rect.x || x>rect.x + rect.width ||
    y<rect.y || y>rect.y + rect.height);
};

//intersects

window.utils.intersects = function(rectA, rectB){
    return !(rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y);

};
function getInt(num,n){
    return parseInt(num*Math.pow(10,n)+0.5,10)/Math.pow(10,n);
}



function getRects(ctx,txt,font){
    ctx.save();
    ctx.font =  font
    var getedW= ctx.measureText('四').width;
    var getedH = getedW;
    var getedTextWith = ctx.measureText( txt).width;
    /*  ctx.textAlign = 'left';
     ctx.textBaseline = 'top';
     ctx.fillStyle = this.fillStyle;
     ctx.fillText(txt, 1000,1000);*/
    ctx.restore();
    return{
        h:getedH,
        w:getedTextWith
    }
}
function Text(txt,fillStyle,sx,sy,size,tx,ty,x,y){
    this.x = x||0;
    this.y = y||0;
    this.txt = txt||'请输入数据';
    this.fillStyle= fillStyle;

    this.font =size;
    this.tx = tx||0;
    this.ty = ty||0;
    this.w = 0;
    this.sw =0;
    this.h = 0;
    this.sx = sx;
    this.sy = sy;
    this.isCurrent=false;
    this.isFlying = false;

}
Text.prototype.draw = function(ctx){

    ctx.save();
    //  ctx.translate(this.tx,this.ty);
    ctx.font =  this.font;
    this.w= ctx.measureText('四').width;
    this.h =  ctx.measureText('四').width;
    this.sw = ctx.measureText(  this.txt).width;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    ctx.fillStyle = this.fillStyle;

        if(!this.isFlying){
            if(  this.isCurrent==false){
                this.x =   this.sx;
                this.y =   this.sy;

            }
            else{
                this.x =   this.tx;
                this.y =   this.ty;
            }
        }
        ctx.fillText(this.txt, this.x,this.y);

        if(  this.isCurrent==false){
            //drawFillRect2(ctx,this.x, this.y,this.sw + 5, this.h + 7)
        }




   // ctx.restore();
};
Text.prototype.getBounds = function(){


    if( this.isCurrent==false) {
        return {
            x: this.x,
            y: this.y,
            width: this.sw,
            height: this.h,

        };

    }
    else{


        return {
            x: this.tx,
            y: this.ty ,
            width: this.sw,
            height: this.h,
        };

    }

};

//rect
function roundedRect(ctx,cornerX, cornerY, width, height, cornerRadius) {
    ctx.save();
    if (width> 0) ctx.moveTo(cornerX + cornerRadius, cornerY);
    else  ctx.moveTo(cornerX - cornerRadius, cornerY);
    ctx.arcTo(cornerX+width,cornerY,cornerX + width,cornerY+height,cornerRadius);
    ctx.arcTo(cornerX+width,cornerY + height,cornerX,cornerY+height,cornerRadius);
    ctx.arcTo(cornerX,cornerY+height,cornerX,cornerY,cornerRadius);
    if(width> 0) {
        ctx.arcTo(cornerX,cornerY,cornerX+cornerRadius,cornerY,cornerRadius);
    }
    else{
        ctx.arcTo(cornerX,cornerY,cornerX-cornerRadius,cornerY,cornerRadius);
    }
}

function drawRoundedRect(ctx,strokeStyle,fillStyle,cornerX,cornerY,width,height,cornerRadius) {
    ctx.save();
    ctx.beginPath();
    roundedRect(ctx,cornerX, cornerY, width, height, cornerRadius);
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;

    ctx.fill();
   ctx.stroke();

}
//绘制长方形
function drawFillRect(cxt,x, y, a, b) {
    cxt.save();
    cxt.fillStyle = "rgba(0,0 ,0, 0.4)";
    cxt.fillRect(x, y, a, b);
    cxt.stroke();
    cxt.restore();
}
function drawFillRect2(cxt,x, y, a, b) {
    cxt.save();
    cxt.fillStyle = "rgba(255,255 ,255, 0.4)";
    cxt.fillRect(x, y, a, b);
    cxt.stroke();
    cxt.restore();
}
//anime
if(!window.requestAnimationFrame){
    window.requestAnimationFrame =(window.webkitRequestAnimationFrame||
    window.mozRequestAnimationFrame||
    window.oRequestAnimationFrame||
    window.msRequestAnimationFrame||
    function(callback){
        return window.setTimeout(callback,1000/60);
    });

}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
    window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
    window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
    window.clearTimeout);
}

//流星

var context;

var arr = new Array();
var starCount = 16;

var rains = new Array();
var rainCount =8;

//初始化画布及context
function init(canvasId){
    //获取canvas
    var stars = document.getElementById(canvasId);
    windowWidth = window.innerWidth; //当前的窗口的高度
    stars.width=windowWidth;
    stars.height=window.innerHeight;
    //获取context
    context = stars.getContext("2d");
}

//创建一个星星对象
var Star = function (){
    this.x = windowWidth * Math.random();//横坐标
    this.y = windowWidth*2 * Math.random();//纵坐标
    this.text=".";//文本
    this.color = "white";//颜色

    //产生随机颜色
    this.getColor=function(){

        var _r = Math.random();

        if(_r<0.5){
            this.color = "#333";
        }else{
            this.color = "white";
        }

    }

    //初始化
    this.init=function(){
        this.getColor();
    }
    //绘制
    this.draw=function(){
        context.fillStyle=this.color;
        context.fillText(this.text,this.x,this.y);
    }

}

//星星闪起来
function playStars(){
    for (var n = 0; n < starCount; n++){
        arr[n].getColor();
        arr[n].draw();
    }

    setTimeout("playStars()",100);
}


/*流星雨开始*/

var MeteorRain = function(){
    this.x = -1;
    this.y = -1;
    this.length = -1;//长度
    this.angle = 30; //倾斜角度
    this.width = -1;//宽度
    this.height = -1;//高度
    this.speed = 1;//速度
    this.offset_x = -1;//横轴移动偏移量
    this.offset_y = -1;//纵轴移动偏移量
    this.alpha = 1; //透明度
    this.color1 = "";//流星的色彩
    this.color2 = "";  //流星的色彩
    /****************初始化函数********************/
    this.init = function () //初始化
    {
        this.getPos();
        this.alpha = 1;//透明度
        this.getRandomColor();
        //最小长度，最大长度
        var x = Math.random() * 80 + 150;
        this.length = Math.ceil(x);
//                  x = Math.random()*10+30;
        this.angle = 30; //流星倾斜角
        x = Math.random()+0.5;
        this.speed = Math.ceil(x); //流星的速度
        var cos = Math.cos(this.angle*3.14/180);
        var sin = Math.sin(this.angle*3.14/180) ;
        this.width = this.length*cos ;  //流星所占宽度
        this.height = this.length*sin ;//流星所占高度
        this.offset_x = this.speed*cos ;
        this.offset_y = this.speed*sin;
    }

    /**************获取随机颜色函数*****************/
    this.getRandomColor = function (){
        var a = Math.ceil(255-240* Math.random());
        //中段颜色
        this.color1 = "rgba("+a+","+a+","+a+",1)";
        //结束颜色
        this.color2 = "#0b2035";
    }


    /***************重新计算流星坐标的函数******************/
    this.countPos = function ()//
    {
        //往左下移动,x减少，y增加
        this.x = this.x - this.offset_x;
        this.y = this.y + this.offset_y;
    }

    /*****************获取随机坐标的函数*****************/
    this.getPos = function () //
    {
        //横坐标200--1200

        this.x = Math.random() * window.innerWidth; //窗口高度
        //纵坐标小于600
        this.y = Math.random() * window.innerHeight;  //窗口宽度
    }
    /****绘制流星***************************/
    this.draw = function () //绘制一个流星的函数
    {
        context.save();
        context.beginPath();
        context.lineWidth = 1; //宽度
        context.globalAlpha = this.alpha; //设置透明度
        //创建横向渐变颜色,起点坐标至终点坐标
        var line = context.createLinearGradient(this.x, this.y,
            this.x + this.width,
            this.y - this.height);



        //分段设置颜色
        line.addColorStop(0, "white");
        line.addColorStop(0.3, this.color1);
        line.addColorStop(0.6, this.color2);
        context.strokeStyle = line;
        //起点
        context.moveTo(this.x, this.y);
        //终点
        context.lineTo(this.x + this.width, this.y - this.height);
        context.closePath();
        context.stroke();
        context.restore();
    };
    this.move = function(){
        //清空流星像素
        var x = this.x+this.width-this.offset_x;
        var y = this.y-this.height;
        context.clearRect(x-3,y-3,this.offset_x+5,this.offset_y+5);
//                  context.strokeStyle="red";
//                  context.strokeRect(x,y-1,this.offset_x+1,this.offset_y+1);
        //重新计算位置，往左下移动
        this.countPos();
        //透明度增加
        this.alpha -= 0.002;
        //重绘
        this.draw();
    }

};

//绘制流星
function playRains(){

    for (var n = 0; n < rainCount; n++){
        var rain = rains[n];
        rain.move();//移动
        if(rain.y>window.innerHeight){//超出界限后重来
            context.clearRect(rain.x,rain.y-rain.height,rain.width,rain.height);
            rains[n] = new MeteorRain();
            rains[n].init();
        }
    }
    setTimeout("playRains()",1000/30);
}


/*流星雨结束*/


function rainInit(canvas){

    arr.splice(0,arr.length);
    rains.splice(0,rains.length);
    init(canvas);
    //画星星
    for (var i=0;i<starCount;i++) {
        var star = new Star();
        star.init();
        star.draw();
        arr.push(star);
    }

    //画流星
    for (var i=0;i<rainCount;i++) {
        var rain = new MeteorRain();
        rain.init();
        rain.draw();
        rains.push(rain);
    }


    playStars();//绘制闪动的星星
    playRains();//绘制流星

}

//creat text

var scror =[];
var starttime;

var goid ;

function creatText(canvasId, odata, vW, vH, overtime, adata) {
    var loopDraw;
    var data = odata;
    var answer = adata;
    var vWidth = vW;
    var vHeight = vH;
    //获取canvas id
    var canvas = document.getElementById(canvasId);
    //对canvas默认大小重置
    canvas.width =vW;
    canvas.height = vH;
    //get Context
    var ctx = canvas.getContext("2d");


    for(var j=0;j<data.length;j++){
        data[j].w = parseInt(getRects(ctx,data[j].text, data[j].font).w);
        data[j].h = parseInt( getRects(ctx,data[j].text,data[j].font).h);

        data[j].sx = parseInt(data[j].x * vWidth);
        data[j].sy = parseInt(data[j].y * vHeight);

        data[j].x = 0;
        data[j].y = 0;

        data[j].tx=parseInt( data[j].tx*vWidth);
        data[j].ty=parseInt( data[j].ty*vHeight*0.9);
    }


    var textList = [];

    for(var n=0;n<data.length;n++){
        textList.push(new Text(data[n].text, '#FFFFFF', data[n].sx, data[n].sy, data[n].font, data[n].tx, data[n].ty, data[n].x, data[n].y));
        if ($('#' + canvasId).data('init') == undefined) { textList[n].isFlying = true; }
        textList[n].draw(ctx);
    }

    if ($('#' + canvasId).data('init') == undefined) {
        //第一次初始化，播放动画
        $('#' + canvasId).data('init', true);
        var loopDraw2 = setInterval(function () {
            //var canvas = document.getElementById(canvasId);
            //var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, vWidth, vHeight * 88 / 100);
            objList = textList;
            for (var n = 0; n < objList.length; n++) {
                objList[n].x += ((objList[n].sx - objList[n].x) / 10)<0.5?((objList[n].sx - objList[n].x)):((objList[n].sx - objList[n].x) / 10);
                objList[n].y += ((objList[n].sy - objList[n].y) / 10)<0.5?((objList[n].sy - objList[n].y)):((objList[n].sy - objList[n].y) / 10);
                objList[n].draw(ctx);
            }
            if (objList[0].sx - objList[0].x < 1) {
                clearInterval(loopDraw2);
                $('#' + canvasId).data('init', false);
                ctx.clearRect(0, 0, vWidth, vHeight * 88 / 100);
                for (var nn = 0; nn < objList.length; nn++) {
                    objList[nn].isFlying = false;
                    objList[nn].x = objList[nn].sx;
                    objList[nn].y = objList[nn].sy;
                    objList[nn].isCurrent = false;
                    objList[nn].draw(ctx);
                }
            }
        }, 1000 / 30);
    }


     var endtime=overtime;
    var nowTime= new Date();
     starttime =nowTime.getTime();
    nowTime.setSeconds(nowTime.getSeconds()+endtime);
    countTime = setInterval(function () {
        if($('#' + canvasId).data('init') == false)
            setCountTime(ctx,nowTime,vWidth,vHeight,answer,endtime,textList);
    },60);


    $('#' + canvasId).on("click", function (event) {
        if ($('#' + canvasId).data('init') == true) return;
        for (var i = 0; i < textList.length; i++) {
            //console.log(textList[i].getBounds());

            if (utils.containsPoint(textList[i].getBounds(), event.clientX, event.clientY)) {
                if (goid != null && goid.isFlying) return;
                var targetQuestion = null;
                if ($('.z_current').attr('id') == "scene03") {
                    targetQuestion = adata1;
                } else if ($('.z_current').attr('id') == "scene05") {
                    targetQuestion = adata2;
                } else if ($('.z_current').attr('id') == "scene07") {
                    targetQuestion = adata3;
                }
                goid = textList[i];

                if (targetQuestion.data.indexOf(goid.txt) >= 0 && goid.isCurrent) {
                    //是正确答案，不允许再取消选择
                    return;
                }

                goid.isCurrent = !goid.isCurrent;
                goid.isFlying = true;



                var TargetPosition = (function () {

                    var correctAnswerObj = [];

                    for (var ii = 0; ii < textList.length; ii++) {
                        if (targetQuestion.data.indexOf(textList[ii].txt) >= 0 && answer.adata.indexOf(textList[ii].txt) < 0) {
                            correctAnswerObj.push(textList[ii]);

                        }
                    }
                    if (correctAnswerObj == null || correctAnswerObj.length == 0) return null;
                    correctAnswerObj.sort(function (a, b) { return a.tx - b.tx });

                    return { x: correctAnswerObj[0].tx, y: correctAnswerObj[0].ty }
                })();
                if (targetQuestion.data.indexOf(goid.txt) >= 0) {
                    //是正确答案，不需要调整tx,ty
                } else {
                    goid.tx = TargetPosition.x;
                    goid.ty = TargetPosition.y;
                }
                loopDraw = setInterval(function () {
                    var deltaY = 0;
                    var deltaX = 0;
                    var step = 15;
                    var targetY = goid.isCurrent ? goid.ty : goid.sy;
                    var targetX = goid.isCurrent ? goid.tx : goid.sx;
                    if (goid.y < targetY) {
                        deltaY = Math.min(targetY - goid.y, step);
                    } else if (targetY < goid.y) {
                        deltaY = -1 * Math.min(goid.y - targetY, step);
                    }
                    if (goid.x < targetX) {
                        deltaX = Math.min(targetX - goid.x, step);
                    } else if (targetX < goid.x) {
                        deltaX = -1 * Math.min(goid.x - targetX, step);
                    }
                    goid.y = goid.y + deltaY;
                    goid.x = goid.x + deltaX;


                    if (deltaY == 0 && deltaX == 0) {
                        //不是正确答案，自动返回
                        // var targetQuestion = null;
                        // if($('.z_current').attr('id') == "scene03"){
                        //     targetQuestion = adata1;
                        // }else if($('.z_current').attr('id') == "scene05"){
                        //     targetQuestion = adata2;
                        // }else if($('.z_current').attr('id') == "scene07"){
                        //     targetQuestion = adata3;
                        // }
                        if (goid.isCurrent && (targetQuestion.data.indexOf(goid.txt) < 0)) {
                            goid.isCurrent = false;
                        } else {
                            clearInterval(loopDraw);
                            goid.isFlying = false;
                            if (!($.inArray(goid.txt, answer.data) == -1)) {

                                answer.adata.push(goid.txt);
                                answer.adata.distinct();
                                if (isAllEqual(answer.adata, answer.data)) {
                                    answer.isSuccess = true;
                                    // console.log( answer.isSuccess)
                                }
                            }


                        }
                    }

                    ctx.clearRect(0, 0, vWidth, vHeight * 88 / 100);
                    for (var l = 0; l < textList.length; l++) {
                        textList[l].draw(ctx);
                    }
                }, 60);

            }
        }
        });


    //倒计时
    function setCountTime(ctx, time, w, h, leve, endtime, textarr) {
        var overTime = new Date(time);
        var goTime = new Date();

        var leves = leve;

        var distanceTime = overTime.getTime() - goTime.getTime();


        if (distanceTime >= 0) {
            /*   var day = Math.floor(distanceTime/1000/60/60/24);
               var hour= Math.floor(distanceTime/1000/60/60%24);*/

            /*   var ms = Math.floor(distanceTime/1000/60%60/1000);
               if(minute<10){
                   minute='0'+minute;
               }*/
            var minute = Math.floor(distanceTime / 1000 / 60 % 60);
            var second = Math.floor(distanceTime / 1000 % 60);
            if (second < 10) {
                second = '0' + second;
            }


            if (second == 00 && minute == 00 && leves.isSuccess == false) {
                $('#' + canvasId).off('click');
                clearInterval(countTime);
                clearInterval(loopDraw);
                //goid.isFlying = false;
                var shouTime = minute + ":" + second;
                leves.adata = [];
                //console.log(   leves.adata);
                console.log('clearData');
                for (var ss = 0; ss < textList.length; ss++) {
                    if (textList[ss].isCurrent) {
                        console.log(textList[ss].txt);
                    }
                    textList[ss].isCurrent = false;
                    textList[ss].x = textList[ss].sx;
                    textList[ss].y = textList[ss].sy;
                    textList[ss].isFlying = false;

                }
               // ctx.clearRect(0,0,w,h);
                // console.log( textarr[ss]);
                var pagedata = getPagerData("next");
                nextPage(pagedata[0], pagedata[1], pagedata[2], pagedata[3], pagedata[4]);
                // leves.isSuccess=true;

            } else {
                var shouTime = minute + ":" + second;
                ctx.clearRect(0, h - h / 9, h - h / 9, h - h / 9);
                drawFillRect(ctx, 0, h - h / 9, w, h - h / 9);
                ctx.save();
                ctx.font = "60px Arial";
                ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
                ctx.fillText(shouTime, w / 3, h - h / 10);
                ctx.restore();
                //console.log(leves.isSuccess)
                if (leves.isSuccess == true) {

                    clearInterval(countTime);
                    /*  if(minute>0){
                          second=minute*60+second;
                      }*/

                    var now = new Date();
                    var usedtime = (now.getTime() - starttime);
                    leves.usedtime = usedtime;
                    scror.push(leves);
                    setTimeout(function () {
                       // ctx.clearRect(0,0,w,h);
                        var pagedata = getPagerData("next");
                        nextPage(pagedata[0], pagedata[1], pagedata[2], pagedata[3], pagedata[4]);
                    }, 200);

                }

            }
        }


    }

}


//比较两个数组相等
function isAllEqual(a1,a2){
    if(!($.isArray(a1) && $.isArray(a2))){
        return false;
    }
    if(a1.length != a2.length){
        return false;
    }

    a1.sort();
    a2.sort();
    for(var i=0;i<a1.length;i++){
        if(typeof a1[i] != typeof a2[i]){
            return false;
        }
        if($.isPlainObject(a1[i]) && $.isPlainObject(a2[i])){
            var retVal = o2o(a1[i],a2[i]);
            if(!retVal){
                return false;
            }
        }else if($.isArray(a1[i]) && $.isArray(a2[i]) ){//recursion
            if(!a2a(a1[i],a2[i])){
                return false;
            }
        }else if(a1[i] !== a2[i]){
            return false;
        }
    }
    return true;
}
if(typeof Array.prototype.distinct != "function"){
    Array.prototype.distinct = function(){
        this.sort();
        for(var i=0;i<this.length-1;i++){
            if($.isPlainObject(this[i]) && $.isPlainObject(this[i+1])){
                if(o2o(this[i],this[i+1])){
                    this.splice(i,1);
                }
            }else if($.isArray(this[i]) && $.isArray(this[i+1])){
                if(isAllEqual(this[i],this[i+1])){
                    this.splice(i,1);
                }
            }else if(this[i]===this[i+1]){
                this.splice(i,1);
            }
        }
    }
}
function o2o(o1,o2){
    if(!($.isPlainObject(o1) && $.isPlainObject(o2))){
        return false;
    }

    var k1k2=[],k1 =[],k2=[];
    $.each(o1,function(k,v){
        k1.push(k);
    });

    $.each(o2,function(k,v){
        k2.push(k);
    });
    if(k1.length != k2.length){
        return false;
    }
    k1k2 = k1;
    k1k2 = k1k2.concat(k2);
    k1k2.distinct();
    if(k1.length != k1k2.length || k2.length != k1k2.length){
        return false;
    }

    var flag=true;
    $.each(k1k2,function(i,v){
        var v1= o1[v];
        var v2 =o2[v];
        if(typeof v1 != typeof v2){
            flag= false;
        }else{
            if($.isPlainObject(v1) && $.isPlainObject(v2)){//recursion
                flag = o2o(v1,v2);
                if(!flag){
                    return false;
                }
            }else if($.isArray(v1) && $.isArray(v2)){
                flag = isAllEqual(v1,v2);
                if(!flag){
                    return false;
                }
            }else{
                if(v1 !== v2){
                    flag= false;
                }
            }
        }
    });
    return flag;
}
/**
 * js图片预加载函数 loadimg
 * arr：可以是存放图片路径的一个数组，也可以是选取到的img的jquery对象；
 *funLoading：每一个单独的图片加载完成后执行的操作；
 *funOnLoad：全部图片都加载完成后的操作；
 *funOnError：单个图片加载出错时的操作。
 */
function loadimg(arr,funLoading,funOnLoad,funOnError){
    var numLoaded=0,
        numError=0
    
    for (var a = 0; a < arr.length;a++){
        var src = arr[a];
        preload(src,arr[a]);
    }

    function preload(src,obj){
        var img=new Image();
        img.onload=function(){
            numLoaded++;
            funLoading && funLoading(numLoaded,arr.length,src,obj);
            funOnLoad && numLoaded==arr.length && funOnLoad(numError);
        };
        img.onerror=function(){
            numLoaded++;
            numError++;
            funOnError && funOnError(numLoaded,arr.length,src,obj);
        };
        img.src=src;
    }

}
function funOnError(numLoaded,arrl,src,obj){
    //console.log(numLoaded);
    //console.log(arrl);
    //console.log(src);
   // console.log(obj);
}
function funLoading(numLoaded,arrl,src,obj){
    //console.log(numLoaded);
    //console.log(arrl);
    //console.log(src);
    // console.log(obj);
}