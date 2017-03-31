/**
 * Created by dells on 2017/3/30.
 */
var fh={};
fh.server="";
fh.DOM={};
fh.DOM.makeFhTr=function () {

};
fh.ajax={};
fh.ajax.ajaxGetFirstShow=function () {
    $.ajax({
        type:"POST",
        url:fh.server+"",
        dataType: "json",
        async: true,
        success: function(msg) {
            var _msg = msg;

        },
        complete:function(){

        }
    });
};
fh.page={};

