/**
 * Created by dells on 2017/3/30.
 */
var fh={};
fh.server="/";
fh.tokenId="";//tokenId=118514
fh.DOM={};
fh.DOM.makeFhTr=function () {

};
fh.ajax={};
fh.ajax.ajaxGetFirstShow=function () {
    var data={};
    data.tokenId=fh.tokenId;
    data.Type="1";
    data.pageSize="6";
    $.ajax({
        type:"POST",
        url:fh.server+"interface/gravidaMonitorCount.htm",
        dataType: "json",
        data:data,
        async: true,
        success: function(msg) {
            var _msg = msg;
            console.log("_msg",_msg);
        },
        complete:function(){

        }
    });
};
fh.ajax.login=function () {
    var data={};
    data.loginName="13575796887";
    // data.channelType="bkzg";
    data.userType="2";
    data.channelType="00";
    data.terminalType="1";
    data.loginPwd=CryptoJS.MD5("Gan123").toString();
    data.version="1.0";
    $.ajax({
        type:"POST",
        url:fh.server+"interface/logIn.htm",
        dataType: "json",
        data:data,
        async: false,
        success: function(msg) {
            var _msg = msg,
                userInfo=_msg.userInfo;
                console.log(_msg);
                fh.tokenId=userInfo.tokenId;
            console.log("tokenId=118514",fh.tokenId)
        },
        complete:function(){

        }
    })
};
fh.ajax.login();
// function test() {
//     var pwd =  CryptoJS.MD5("Gan123").toString();
//     console.log(pwd);
// }
// test();
// fh.page={};
fh.ajax.ajaxGetFirstShow();

