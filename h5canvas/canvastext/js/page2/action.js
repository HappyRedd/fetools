var sharedata={
    TimelineTitle:"眼明手快大闯关，朗沐上市3周年庆典邀请函速get√",
    TimelineDesc:"看谁能火眼金，闯三关啦！不服来战！",
    TimelineLink: window.location.href.split('#').shift().replace(/page\d.html?/, 'index.aspx'),
    TimelineImgUrl: window.location.href.split('?').shift().split('#').shift().replace(/page2.html?/, '') + 'images/share.jpg',

    AppMessageTitle:"眼明手快大闯关，朗沐上市3周年庆典邀请函速get√",
    AppMessageDesc:"看谁能火眼金，闯三关啦！不服来战！",
    AppMessageLink: window.location.href.split('#').shift().replace(/page\d.html?/, 'index.aspx'),
    AppMessageImgUrl: window.location.href.split('?').shift().split('#').shift().replace(/page2.html?/, '') + 'images/share.jpg'
};
var query_Queue_timer=800;


function resetSceneAction(currentPageid){
    var cal_h=parseInt(wH);
    var cal_w=parseInt(wW);
    //console.log(currentPageid);
    if(currentPageid=='scene12') {

        $('.p09_getbtn,.p09_invbtn,.p09_frendbtn').removeClass('active');
        $('.p09_alert').hide();

    }


}



var  p_12_action=function  p_12_action() {
    $(".p09_alert").hide();
    rainInit("starsR12");

    $('.p09_invbtn').on('click',function(){
        $('.p09_alert').show();
    });
    $('.p09_alert').on('click',function(){
        $('.p09_alert').hide();
    });


    canscroll=true;
};


var  p_14_action=function  p_14_action() {



    var model_sample = '<div class="rankItem">';
/*    model_sample += '<div  class="p10_order{n}bg"></div>';*/
    /*  model_sample+='<div  class="p10_order{n}"></div>';*/
    model_sample += '<div  class="rank r_{n}"></div>';
    model_sample += '<img src="{src}" alt="" class="userimg"/>';
    model_sample += '<div  class="gametime">';
    model_sample += '{score}';
    model_sample += '</div><br style="clear:both;"/>';
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
               // var name = data[l].nickname;
                var score = data[l].gametime;
                model_sample_copy = model_sample_copy.replace(/{n}/g, id).replace("{src}", img).replace("{score}", score/1000+"秒");
                rank_html += model_sample_copy;

            }
            $("#scroller1").html('');
            $(rank_html).appendTo($("#scroller1"));
        }
    });


    canscroll=true;
};













var sceneIDArray=['scene12','scene14'];
var sceneIDActions=[p_14_action,p_14_action];