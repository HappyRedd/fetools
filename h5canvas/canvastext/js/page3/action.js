var sharedata={
    TimelineTitle:"眼明手快大闯关，朗沐上市3周年庆典邀请函速get√",
    TimelineDesc:"看谁能火眼金，闯三关啦！不服来战！",
    TimelineLink: window.location.href.split('#').shift().replace(/page\d.html?/, 'index.aspx'),
    TimelineImgUrl: window.location.href.split('?').shift().split('#').shift().replace(/index.aspx|page\d.html/, '') + 'images/share.jpg',

    AppMessageTitle:"眼明手快大闯关，朗沐上市3周年庆典邀请函速get√",
    AppMessageDesc:"看谁能火眼金，闯三关啦！不服来战！",
    AppMessageLink: window.location.href.split('#').shift().replace(/page\d.html?/, 'index.aspx'),
    AppMessageImgUrl: window.location.href.split('?').shift().split('#').shift().replace(/index.aspx|page\d.html/, '') + 'images/share.jpg'
};
var query_Queue_timer=1300;


function resetSceneAction(currentPageid){
    var cal_h=parseInt(wH);
    var cal_w=parseInt(wW);
    //console.log(currentPageid);
    if(currentPageid=='scene01') {
        $(".p12_content").css('scale','0');

    }


}













var  p_01_action=function  p_01_action() {

    rainInit("page3");
    $(".p12_content").transition({scale:"1"},query_Queue_timer);
};


var sceneIDArray=['scene13'];
var sceneIDActions=[p_01_action];