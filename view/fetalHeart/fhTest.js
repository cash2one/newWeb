/**
 * Created by dells on 2017/3/30.
 */
var fh={};
fh.server="/";
fh.tokenId="";//tokenId=118514
fh.DOM={};
fh.ajax={};
fh.fn={};
fh.page={};
fh.page.pageStart=0;
fh.page.pageLength=10;
fh.page.pageIndex=1;//翻到第几页
fh.page.pageCount="";
//fetalHeartInterface/gravidaMonitorCount.htm
//html%20V.201604/view/fetalHeart/pregnant.json
// fh.page.showContainer=$("tbody.zcf_container");
fh.dataClassification=function (index,_msg) {
    var _1,_2,_3,_4,_5,_6,_7,_8,
        arr=[];
    // _1=;
};


fh.DOM.makeFhTr=function (_result,index) {
    var data=_result,
        tr=$("<tr></tr>"),
        html="";
    html+="<td>"+index+"</td>";
    html+=""

};
fh.ajax.ajaxGetFirstShow=function () {
    var data={};
    data.tokenId=fh.tokenId;
    data.type="1";
    data.pageSize="6";
    data.direction="1";
    $.ajax({
        type:"POST",
        url:fh.server+"fetalHeartInterface/gravidaMonitorCount.htm",
        dataType: "json",
        data:data,
        async: true,
        success: function(msg) {
            var _msg = msg;
            console.log("_msg",_msg);
            // fh.fn.show(_msg,$("tbody.zcf_container2"));
        },
        complete:function(){

        }
    });
};
fh.fn.show=function (_msg,pageContainer) {
    var _msgR=_msg.resultMsg,
        _result1=_msgR.result,
        _result;
        pageContainer.children().remove();//移除所有页面数据

    for(var i=fh.page.pageStart;i<fh.page.pageStart+fh.page.pageLength;i++){
        // _result=fh.dataClassification(i,_result1[i]);
        fh.DOM.makeFhTr(_result1[i],i);
    }

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

