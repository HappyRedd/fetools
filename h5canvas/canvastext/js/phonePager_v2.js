var TOUCHSTART,TOUCHEND,TOUCHMOVE;
var j=
{ "Data": [
    //{ "Scene": "1" },
]};

var canscroll=true;
var wH;
var wW;
var w_width = function () {
    var w_i = parseInt(window.innerWidth);
    var s_w = parseInt(screen.width);
    if (w_i < 960) {

        return w_i;
    }
    else {
        return s_w;
    }
}
var w_height = function () {
    var w_i = parseInt(window.innerHeight);
    var s_h = parseInt(screen.height);
    if (w_i > s_h)
        return s_h;
    if (w_i <= s_h)
        return w_i;
}

//浏览器版本
var browserVersion = function () {
    var version = "";
    var isIOS = false;
    var u = navigator.userAgent;
    var app = navigator.appVersion;
    var isSmartMobile = false;

    var language = (navigator.browserLanguage || navigator.language).toLowerCase();

    if (u.indexOf('Trident') > -1) //IE内核
        version += ",trident";
    if (u.indexOf('Presto') > -1)//opera内核
        version += ",presto";

    if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1)//火狐内核
        version += ",gecko";
    if (!!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/))//是否为移动终端
        version += ",mobile";
    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))//ios终端
        version += ",ios";
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1)//android终端或者uc浏览器
        version += ",android";
    if (u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1)//是否为iPhone或者QQHD浏览器
        version += ",iphone";
    if (u.indexOf('iPad') > -1)//是否iPad
        version += ",ipad";
    if (u.indexOf('Safari') == -1)//是否web应该程序，没有头部与底部
        version += ",webApp";
    if (u.indexOf('AppleWebKit') > -1)//苹果、谷歌内核
        version += ",webkit";

    // console.log(version);

    if (version == "ipad" || version == "ios" || version == "iphone") {
        isIOS = true;
    }
    if (version.indexOf(",ipad") != -1 || version.indexOf(",ios") != -1 || version.indexOf(",iphone") != -1 || version.indexOf(",android") != -1) {
        isSmartMobile = true;
    }

    return Array(version, isIOS, language, isSmartMobile);


}


var deltaX= 0, deltaY= 0,ANIMATESPEED=10;
//document.ready

$(document).ready(function() {

    TOUCHMOVE = 'ontouchmove' in window ? 'touchmove' : 'mousemove';
    TOUCHSTART = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
    TOUCHEND = 'ontouchend' in window ? 'touchend' : 'mouseup';

    wH = w_height();
    wW = w_width();


    resetSceneAction();

    $('.music').on(TOUCHEND, function () {
        if($(this).hasClass('mute')){
            document.getElementById('mp').play();
            $('.music').removeClass('mute');
        }else{
            document.getElementById('mp').pause();
            $('.music').addClass('mute');
        }
    });

    $(".scene").css({"height": wH, "width": wW});

    for(var i=0;i<sceneIDArray.length;i++)
    {
        j.Data[i]={"Scene": sceneIDArray[i]};
        j.Data[i].Action=sceneIDActions[i];
        //console.log(j.Data[i].Action)
      //  j.Data[i]={Action: sceneIDActions[i]};


        if(i==0){$("#"+sceneIDArray[i]).addClass("z_current");}
        else {$("#"+sceneIDArray[i]).addClass("z_default");}
    }




   // document.addEventListener(TOUCHSTART, handleTouch);
   // document.addEventListener(TOUCHMOVE, handleTouch);
  //  document.addEventListener(TOUCHEND, handleTouch);

    try {
        //$("body").append("<audio id=\"mp\" autoplay loop><source src=\"images/1.mp3\" type=\"audio/mpeg\"></audio>");
        document.getElementById('mp').play();
    }
    catch (e) {

    }

})

//currentScene is sceneid
function lastPage(nextSceneObj,currentSceneObj,currentScene,firstPageOrLastPage,action)
{
    var currentSceneIndex=getSceneIndex(currentScene);
    var nextStepSceneIndex=getNextStepSceneIndex(currentSceneIndex,-1);
    if(currentSceneIndex==-1||nextStepSceneIndex==-2)
        return;
    if(firstPageOrLastPage=="firstpage"){ nextStepSceneIndex=j.Data.length-1;}

    nextSceneObj=$("#"+ j.Data[nextStepSceneIndex].Scene);
    if(firstPageOrLastPage=="firstpage"){//第一页

        nextSceneObj ==$("#"+ j.Data[nextStepSceneIndex].Scene);
        resetYranslate2();

    }

    resetSceneAction(j.Data[nextStepSceneIndex].Scene);

    z_moveSceneAction(nextSceneObj);
    z_CurrentSceneAction(currentSceneObj);
    nextSceneObj.show();
    nextSceneObj.transition({y: 0}, ANIMATESPEED, 'linear', function () {
        z_defaultSceneAction(currentSceneObj);
        z_CurrentSceneAction(nextSceneObj);
        playNextScene(j.Data[nextStepSceneIndex].Scene);
        if(firstPageOrLastPage=="firstpage") {

            for(var i=0;i< j.Data.length;i++)
            {
                if(j.Data[i].Scene==j.Data[nextStepSceneIndex].Scene){ continue; }
                $("#"+j.Data[i].Scene).css("transform", "translate(0px, -"+wH+"px);");
            }


        }
    });
}

//nextSceneObj:null;currentScene is sceneid like scene01;firstPageOrLastPage:value like firstpage or  lastpage;action value like up or down
function nextPage(nextSceneObj,currentSceneObj,currentScene,firstPageOrLastPage,action)
{

    var currentSceneIndex=getSceneIndex(currentScene);
    var nextStepSceneIndex=getNextStepSceneIndex(currentSceneIndex,1);
    if(currentSceneIndex==-1||nextStepSceneIndex==-2)
        return;

    if(firstPageOrLastPage=="lastpage"){ nextStepSceneIndex=0;}

    nextSceneObj = $("#"+ j.Data[nextStepSceneIndex].Scene);
    if (firstPageOrLastPage == "lastpage") {//最后页
        //nextStepSceneIndex=0;
        nextSceneObj =$("#"+ j.Data[nextStepSceneIndex].Scene);
        resetYranslate();


    }

    resetSceneAction(j.Data[nextStepSceneIndex].Scene);
    z_moveSceneAction(currentSceneObj);
    z_CurrentSceneAction(nextSceneObj);
    nextSceneObj.show();
    currentSceneObj.transition({y: -1 * wH}, ANIMATESPEED, 'linear', function () {
        //resetCurrentSceneId(action);
        z_defaultSceneAction(currentSceneObj);
        playNextScene(j.Data[nextStepSceneIndex].Scene);
        if (firstPageOrLastPage == "lastpage") {
            resetYranslate();
        }

    });
}
function getSceneIndex(sceneid)
{
    for(var i=0;i< j.Data.length;i++)
    {
        if(j.Data[i].Scene==sceneid)
            return i;
    }
    return -1;
}
function getNextStepSceneIndex(currentSceneIndex,stepvalue)
{
    if(currentSceneIndex==-1) { return -1;}

    if(currentSceneIndex+stepvalue>=0&&currentSceneIndex+stepvalue<j.Data.length)
        return currentSceneIndex+stepvalue;
    else if (currentSceneIndex+stepvalue==j.Data.length)
        return 0;

    else if (currentSceneIndex+stepvalue==-1)
        return -1;
    return -2;
}

//step1:eventlistener bind
function handleTouch(e){



    var type1= getTouchType(e);


    switch (type1){//事件名称
        case 'start':

            deltaX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
            deltaY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
            break;
        case 'move':
            e.preventDefault();
            break;
        case 'end':


            var currentScene = $($(".scene.z_current")[0]).attr("id");
            var currentSceneObj = $("#"+currentScene);
            var nextSceneObj = null;
            var firstPageOrLastPage;
            var action;
            deltaX = deltaX - (e.changedTouches ? e.changedTouches[0].clientX : e.clientX); //水平距离
            deltaY = deltaY - (e.changedTouches ? e.changedTouches[0].clientY : e.clientY); //垂直距离，滑动向上为正值，滑动向下为负值

            if (deltaY > 40)
                action = "up";
            else if (deltaY < -40)
                action = "down";


            for (var i = 0; i < j.Data.length; i++) {
                if (j.Data[i].Scene == currentScene + "") {
                    if (i == 0)
                        firstPageOrLastPage = "firstpage";
                    else if (i == j.Data.length - 1)
                        firstPageOrLastPage = "lastpage";
                }
            }

            if (action == "up") {//下一页
                if(canscroll) {
                    canscroll = false;
                    nextPage(nextSceneObj, currentSceneObj, currentScene, firstPageOrLastPage, action);
                }
            }
            else if (action == "down") {//上一页
                //项目特定begin
                //if (currentScene == 1){ return; }
                //项目特定end

                if(canscroll) {
                    canscroll = false;
                    lastPage(nextSceneObj, currentSceneObj, currentScene, firstPageOrLastPage, action);
                }

            }

            break;
    }
}
function getTouchType(e)
{
    var type1="";
    if(e.type=="touchstart"||e.type=="mousedown")
        type1="start";
    if(e.type=="touchmove"||e.type=="mousemove")
        type1="move";
    if(e.type=="touchend"||e.type=="mouseup")
        type1="end";
    return type1;
}
function mytest(text)
{
    $("#theScene1").css("width",wW);
    $v= $("#theScene1").html();
    $("#theScene1").html($v+","+text);
}



function z_moveSceneAction(sceneObj)
{
    sceneObj.removeClass("z_default");
    sceneObj.removeClass("z_current");
    sceneObj.addClass("z_move");
}

function z_CurrentSceneAction(sceneObj)
{
    sceneObj.removeClass("z_default");
    sceneObj.removeClass("z_move");
    sceneObj.addClass("z_current");
}
function z_defaultSceneAction(sceneObj)
{
    sceneObj.removeClass("z_move");
    sceneObj.removeClass("z_current");
    sceneObj.addClass("z_default");
}
//Yranslate is 0
function resetYranslate(exceptSeceneId)
{

    for(var i=0;i< j.Data.length;i++)
    {


        $("#"+j.Data[i].Scene).css("transform", "translate(0px, 0px);");
    }
}
//Yranslate is -wH
function resetYranslate2()
{
    for(var i=0;i< j.Data.length;i++)
    {

        var id=j.Data[i].Scene;
        //if(exceptSeceneId!=null&&id==exceptSeceneId){
        //    continue;
       // }

        if(i==0)
        {
            continue;
        }

        $("#"+j.Data[i].Scene).css("transform", "translate(0px, -"+wH+"px);");
    }
}

function playNextScene(new_currentScene)
{
    var index= getSceneIndex(new_currentScene);
    j.Data[index].Action();
   // var fun=sceneIDActions[index];
   //j.Data[index].Action();


}
function getPagerData(lastOrNext) {

    var currentScene = $($(".scene.z_current")[0]).attr("id");
    var currentSceneObj = $("#"+currentScene);


    var nextSceneObj=null;
    var firstPageOrLastPage;
    var action;

    if(lastOrNext=="next")
        action='up';
    else
        action='down';

    for(var i=0;i< j.Data.length;i++) {
        if (j.Data[i].Scene == currentScene ) {
            if (i == 0)
                firstPageOrLastPage = "firstpage";
            else if (i == j.Data.length - 1)
                firstPageOrLastPage = "lastpage";
        }
    }
    return new Array(nextSceneObj,currentSceneObj,currentScene,firstPageOrLastPage,action);//$("#scene09"),1
}
/*
 var pagedata = getPagerData("next");
nextPage(pagedata[0], pagedata[1], pagedata[2], pagedata[3], pagedata[4]);
 */
