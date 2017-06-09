/**
 * Created by caiju on 2015/11/17.
 */
var sharedesc = '';

$(document).ready(function(){
    $.ajax({
        type: "POST",
        url: "/wx.ashx",
        data: { ac: 'js', url: window.location.href },
        success: function (data) {
            var obj = JSON.parse(data);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: obj.appId, // 必填，公众号的唯一标识
                timestamp: obj.timestamp, // 必填，生成签名的时间戳
                nonceStr: obj.noncestr, // 必填，生成签名的随机串
                signature: obj.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.error(function (res) {
                console.log(res);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

            });
        }

    });

    wx.ready(function () {
        if (localStorage.getItem('usertime') != undefined) {
            var ut = localStorage.getItem('usertime');
            sharedata.AppMessageDesc = "我用" + ut / 1000 + "秒就连闯三关啦！不服你也来战！";
            sharedata.TimelineTitle = "眼明手快如我，用了" + ut / 1000 + "秒连闯三关！速速get√朗沐上市3周年庆典邀请函！不服来战！";
        }
        wxRegister(wx, sharedata);
        if (document.getElementById('mp') != null) document.getElementById('mp').play();

    });
});

function wxRegister(wxobj,shareData) {
    wxobj.onMenuShareTimeline({
        desc: shareData.TimelineDesc, // 分享描述
        title: shareData.TimelineTitle, // 分享标题
        link: shareData.TimelineLink, // 分享链接
        imgUrl: shareData.TimelineImgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wxobj.onMenuShareAppMessage({
        desc: shareData.AppMessageDesc, // 分享描述
        title: shareData.AppMessageTitle, // 分享标题
        link: shareData.AppMessageLink, // 分享链接
        imgUrl: shareData.AppMessageImgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}