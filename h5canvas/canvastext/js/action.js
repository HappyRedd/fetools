var sharedata={
    TimelineTitle:"眼明手快大闯关，朗沐上市3周年庆典邀请函速get√",
    TimelineDesc:"看谁能火眼金，闯三关啦！不服来战！",
    TimelineLink:window.location.href.split('#').shift(),
    TimelineImgUrl:window.location.href.split('?').shift().split('#').shift().replace(/index.aspx?/,'')+'images/share.jpg',

    AppMessageTitle:"眼明手快大闯关，朗沐上市3周年庆典邀请函速get√",
    AppMessageDesc:"看谁能火眼金，闯三关啦！不服来战！",
    AppMessageLink:window.location.href.split('#').shift(),
    AppMessageImgUrl: window.location.href.split('?').shift().split('#').shift().replace(/index.aspx?/, '') + 'images/share.jpg'
};
var query_Queue_timer=800;
var query_Shou_timer=3000;
var adata1 = {
    leve:1,
    isSuccess:false,
    usedtime:null,
    data: ["10亿","融合蛋白"],
    adata:[],

};
var adata2 = {
    leve:2,
    isSuccess:false,
    usedtime:null,
    data: ["注射","视力","息肉"],
    adata:[],

};
var adata3 = {
    leve:3,
    isSuccess:false,
    usedtime:null,
    data: ["第一个","FDA","III期"],
    adata:[],

};


function resetSceneAction(currentPageid){
    var cal_h=parseInt(wH);
    var cal_w=parseInt(wW);
    //console.log(currentPageid);
    if(currentPageid=='scene01') {
        $('.p1_gobtn').removeClass('active');

    }
    if(currentPageid=='scene02') {
        $('.p2_gobtn').removeClass('active');
    }
    if(currentPageid=='scene03') {
        $(".p3_infotext").css('scale','0');
        $(".p03_mess").show();
        $('.p03_hint').hide();
        $('.p3_cirsor').removeClass('opacity_act');
    }
    if(currentPageid=='scene04') {
        $('.p4_sbtn,.p04_resetbtn,.p04_getbtn').removeClass('active');
        $(".p4_cheng").css('scale',0);
        $('.p04_fails').hide();
        $('.p04successes').hide();


    }
    if(currentPageid=='scene05') {
        $(".p05_infotext").css('scale','0');
        $(".p05_mess").show();
        $('.p05_hint').hide();
        $('.p05_cirsor').removeClass('opacity_act');
    }
    if(currentPageid=='scene06') {
        $('.p06_sbtn,.p06_resetbtn,.p06_getbtn').removeClass('active');
        $(".p06_stitle2").css('scale',0);
        $('.p06_fails').hide();
        $('.p06_success').hide();
    }

    if(currentPageid=='scene07') {
        $(".p07_infotext").css('scale','0');
        $(".p07_mess").show();
        $('.p07_hint').hide();
        $('.p07_cirsor').removeClass('opacity_act');
    }

    if(currentPageid=='scene08') {
        $('.p08_sbtn,.p08_resetbtn,.p08_getbtn').removeClass('active');
        $(".p08_stitle2").css('scale',0);
        $('.p08_success').hide();
        $('.p08_fails').hide();
    }
    if(currentPageid=='scene09') {
        $('.p09_getbtn,.p09_invbtn,.p09_frendbtn').removeClass('active');
        $('.p09_alert').hide();

    }
}
















var  p_01_action=function  p_01_action() {
    rainInit("starsR1")
    canscroll=true;
};

var  p_02_action=function  p_02_action() {

    rainInit("starsR2");
    canscroll=true;
};

var  p_03_action=function  p_03_action() {
    localStorage.removeItem('usertime');
    $(".p3_infotext").transition({scale:"1"},query_Queue_timer)
    var hide1 = setTimeout(function(){
        creatText("canvas3",data1,vWidth,vHeight,20,adata1);
        $('.p03_mess').hide();
        $('.p03_hint').show();
        $('.p3_cirsor').addClass('opacity_act')
    },query_Shou_timer);
    $(".p03_mess").on(TOUCHEND,function(){
        $('.p03_mess').hide();
        $('.p03_hint').show();
        $('.p3_cirsor').addClass('opacity_act')
        creatText("canvas3",data1,vWidth,vHeight,20,adata1);
        clearTimeout(hide1);
    });

    var vWidth = window.innerWidth;
    var vHeight = window.innerHeight;

    var data1 = [{ text: "中国梦", font: "27px Arial", h: 0, w: 0, x: .115, y: .54, tx: .104, ty: .31 }, { text: "大跨步", font: "17px Arial", h: 0, w: 0, x: .393, y: .547, tx: .104, ty: .31 }, { text: "融合蛋白", font: "26px Arial", h: 0, w: 0, x: .606, y: .558, tx: .475, ty: .35 }, { text: "中国制造", font: "19px Arial", h: 0, w: 0, x: .12, y: .59, tx: .104, ty: .31 }, { text: "朗沐", font: "27px Arial", h: 0, w: 0, x: .388, y: .604, tx: .104, ty: .31 }, { text: "FDAIII期临床", font: "14px Arial", h: 0, w: 0, x: .594, y: .619, tx: .417, ty: .325 }, { text: "10亿", font: "28px Arial", h: 0, w: 0, x: .126, y: .668, tx: .105, ty: .35 }, { text: "3周年", font: "30px Arial", h: 0, w: 0, x: .396, y: .678, tx: .104, ty: .31 }, { text: "纪念日", font: "28px Arial", h: 0, w: 0, x: .616, y: .68, tx: .104, ty: .31 }, { text: "沐沐", font: "32px Arial", h: 0, w: 0, x: .144, y: .718, tx: .104, ty: .31 }, { text: "创新", font: "40px Arial", h: 0, w: 0, x: .198, y: .778, tx: .104, ty: .31 }, { text: "引领", font: "32px Arial", h: 0, w: 0, x: .524, y: .767, tx: .104, ty: .31 }, { text: "朗朗", font: "25px Arial", h: 0, w: 0, x: .71, y: .77, tx: .104, ty: .31 }];

    canscroll=true;
};
var  p_04_action=function  p_04_action() {

    if(adata1.isSuccess==true){
        $('.p04successes').show();
        $('.p04_fails').hide();
    }else{
        $('.p04successes').hide();
        $('.p04_fails').show();
    }
    $(".p4_cheng").transition({scale:'1'},query_Queue_timer);

    canscroll=true;
};

var  p_05_action=function  p_05_action() {

    $(".p05_infotext").transition({scale:"1"},query_Queue_timer)
    var hide2 = setTimeout(function(){
        creatText("canvas5",data2,vWidth,vHeight,15,adata2);
        $('.p05_mess').hide();
        $('.p05_hint').show();
        $('.p05_cirsor').addClass('opacity_act')
    },query_Shou_timer);
    $(".p05_mess").on(TOUCHEND,function(){
        $('.p05_mess').hide();
        $('.p05_hint').show();
        creatText("canvas5",data2,vWidth,vHeight,15,adata2);
        clearTimeout(hide2);
    });
    var vWidth = window.innerWidth;
    var vHeight = window.innerHeight;
  
    var data2 = [{ text: "朗沐", font: "25px Arial", h: 0, w: 0, x: .147, y: .544, tx: .104, ty: .31 }, { text: "朗沐", font: "21px Arial", h: 0, w: 0, x: .393, y: .519, tx: .104, ty: .31 }, { text: "三周年", font: "19px Arial", h: 0, w: 0, x: .584, y: .521, tx: .104, ty: .31 }, { text: "息肉", font: "29px Arial", h: 0, w: 0, x: .618, y: .57, tx: .733, ty: .355 }, { text: "创新", font: "29px Arial", h: 0, w: 0, x: .613, y: .655, tx: .733, ty: .325 }, { text: "视力", font: "31px Arial", h: 0, w: 0, x: .613, y: .697, tx: .41, ty: .355 }, { text: "引领", font: "31px Arial", h: 0, w: 0, x: .5, y: .77, tx: .104, ty: .31 }, { text: "纪念日", font: "24px Arial", h: 0, w: 0, x: .169, y: .732, tx: .104, ty: .31 }, { text: "注射", font: "26px Arial", h: 0, w: 0, x: .08, y: .66, tx: .11, ty: .355 }, { text: "大跨步", font: "32px Arial", h: 0, w: 0, x: .152, y: .6, tx: .104, ty: .31 }, { text: "3周年", font: "15px Arial", h: 0, w: 0, x: .384, y: .682, tx: .104, ty: .31 }, { text: "国际化", font: "27px Arial", h: 0, w: 0, x: .328, y: .558, tx: .104, ty: .31 }];

    canscroll=true;
};
var  p_06_action=function  p_06_action() {

    if(adata2.isSuccess==true){
        $('.p06_success').show();
        $('.p06_fails').hide();
    }else{
        $('.p06_success').hide();
        $('.p06_fails').show();
    }
    $(".p06_stitle2").transition({scale:'1'},query_Queue_timer);
    canscroll=true;
};


var  p_07_action=function  p_07_action() {

    $(".p07_infotext").transition({scale:"1"},query_Queue_timer)
    var hide3 = setTimeout(function(){
        creatText("canvas7",data3,vWidth,vHeight,10,adata3);
        $('.p07_mess').hide();
        $('.p07_hint').show();
        $('.p07_cirsor').addClass('opacity_act')
    },query_Shou_timer);
    $(".p07_mess").on(TOUCHEND,function(){
        $('.p07_mess').hide();
        $('.p07_hint').show();
        creatText("canvas7",data3,vWidth,vHeight,10,adata3);
        clearTimeout(hide3);
    });
    var vWidth = window.innerWidth;
    var vHeight = window.innerHeight;
    var data3 = [
    { text: "三周年", font: "25px Arial", h: 0, w: 0, x: .416, y: .518, tx: .41, ty: .325 },
    { text: "中国制造", font: "24px Arial", h: 0, w: 0, x: .227, y: .565, tx: .104, ty: .31 },
    { text: "FDA", font: "32px Arial", h: 0, w: 0, x: .587, y: .567, tx: .419, ty: .345 },
    { text: "注射", font: "27px Arial", h: 0, w: 0, x: .12, y: .62, tx: .104, ty: .31 },
    { text: "创新", font: "26px Arial", h: 0, w: 0, x: .28, y: .673, tx: .104, ty: .31 },
    { text: "上市会", font: "19px Arial", h: 0, w: 0, x: .444, y: .675, tx: .104, ty: .31 },
    { text: "朗朗", font: "25px Arial", h: 0, w: 0, x: .647, y: .669, tx: .104, ty: .31 },
    { text: "沐沐 ", font: "32px Arial", h: 0, w: 0, x: .19, y: .724, tx: .104, ty: .31 },
    { text: "引领 ", font: "28px Arial", h: 0, w: 0, x: .417, y: .72, tx: .104, ty: .31 },
    { text: "视力", font: "28px Arial", h: 0, w: 0, x: .613, y: .721, tx: .104, ty: .31 },
    { text: "10亿", font: "33px Arial", h: 0, w: 0, x: .195, y: .781, tx: .104, ty: .31 },
    { text: "III期", font: "31px Arial", h: 0, w: 0, x: .538, y: .783, tx: .71, ty: .345 },
    { text: "第一个", font: "29px Arial", h: 0, w: 0, x: .417, y: .619, tx: .101, ty: .345 }];




    canscroll=true;
};



var  p_08_action=function  p_08_action() {

    if (adata3.isSuccess == true) {
        var usertime = 0;
        for (var ii = 0; ii < scror.length; ii++) {
            usertime = usertime + scror[ii].usedtime;
        }
        localStorage.setItem('usertime', usertime);
        $('.p08_success').show();
        $('.p08_fails').hide();

    }else{
        $('.p08_success').hide();
        $('.p08_fails').show();
    }
    $(".p08_stitle2").transition({scale:'1'},query_Queue_timer);
    canscroll=true;
};
var  p_09_action=function  p_09_action() {

    rainInit("starsR9");

    $('.p09_invbtn').on('click',function(){
       $('.p09_alert').show();
    });
    $('.p09_alert').on('click',function(){
        $('.p09_alert').hide();
    });


    canscroll=true;
};


var  p_10_action=function  p_10_action() {
$(".p10_backbtn").on('click',function(){
    var pagedata = getPagerData("last");
    lastPage(pagedata[0], pagedata[1], pagedata[2], pagedata[3], pagedata[4]);
});


var model_sample = '<div class="p10_group{n}">';
model_sample += '<div  class="p10_order{n}bg"></div>';
    /*  model_sample+='<div  class="p10_order{n}"></div>';*/
model_sample += '<div  class="p10_order{n}"></div>';
model_sample += '<div  class="p10_order{n}img">';
model_sample += '<img src="{src}" alt=""/>';
model_sample += '</div>';
model_sample += '<div  class="p10_order{n}text">';
/*model_sample += '<span >{name}</span>';*/
model_sample += '<span >{score}</span>';
model_sample += '</div>';
model_sample += '</div>';


$.ajax({
    type: "POST",
    url: "ajax.ashx",
    data: { act: "getlist" },
    success: function (data) {
        var rank_html = "";

        for (var l = 0; l < data.length; l++) {
            var model_sample_copy = model_sample;
            var id = l + 1;
            var img = data[l].headimgurl;
            var name = data[l].nickname;
            var score = data[l].gametime;
            model_sample_copy = model_sample_copy.replace(/{n}/g, id).replace("{src}", img).replace("{score}", score/1000+"秒");
            rank_html += model_sample_copy;

        }
        $(rank_html).appendTo($("#scene_frame"));
    }
});


    canscroll=true;
};
var sceneIDArray=['scene01','scene02','scene03','scene04','scene05','scene06','scene07','scene08','scene09','scene10'];
var sceneIDActions=[p_01_action,p_02_action,p_03_action,p_04_action,p_05_action,p_06_action,p_07_action,p_08_action,p_09_action,p_10_action];
