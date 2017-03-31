/**
 * Created by GONDON on 2016/12/13.
 */
function getEvent() //同时兼容ie和ff的写法
{
    if(document.all)   return window.event;
    func=getEvent.caller;
    while(func!=null){
        var arg0=func.arguments[0];
        if(arg0)
        {
            if((arg0.constructor==Event || arg0.constructor ==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
            {
                return arg0;
            }
        }
        func=func.caller;
    }
    return null;
}
function scroll(){
    var animateEle = $(".animate-box .outside-content");
    var top = new Array;

    for(var i=0;i<animateEle.length;i++){
        top.push(animateEle[i].offsetTop  -  $(window).scrollTop());
        if(top[i]<550){
            animate(".animate-box .outside-content",i);
        };
    };
};
function serveShow(){
    //顶部显示与隐藏
    if ($(this).scrollTop() >= 150) {
        $(".serve-hover").hide();
        $(".outside-hide-head").slideDown();
        $(".outside-hide-head").find(".arr-down").css("background-position","-11px -256px")
    }else if($(this).scrollTop() <= 150){
        $(".serve-hover").hide();
        $(".outside-hide-head").slideUp();
        $(".outside-hide-head").find(".arr-down").css("background-position","-11px -256px")
    }
}
function animate(ele,i){
    $(ele).eq(i).find(".out-left").animate({"left":"0","opacity":"1"},800);
    $(ele).eq(i).find(".out-right").animate({"right":"0","opacity":"1"},800);
}

function move(){
    var event = getEvent();
    if(sx==event.x){
//            鼠标X轴没有移动                //对鼠标X轴进行判断
    }else if(sx>event.x){
//            鼠标X轴左移
        moveD = "l";
    }else if(sx<event.x){
//            鼠标X轴右移
        moveD = "r";
    }
    if(sx==event_x){
//            鼠标X轴没有移动                //对鼠标X轴进行判断
    }else if(sx>event_x){
//            鼠标X轴左移
        moveD = "l";
    }else if(sx<event_x){
//            鼠标X轴右移
        moveD = "r";
    }

    if(sy==event.y){
//            鼠标Y轴没有移动
    }else if(sy>event.y){
//            鼠标Y轴上移                     //对鼠标Y轴进行判断
        moveD = "u";
    }else if(sy<event.y){
//            鼠标Y轴下移
        moveD = "d";
//            alert("xx")
    }
    if(sy==event_y){
//            鼠标Y轴没有移动
    }else if(sy>event_y){
//            鼠标Y轴上移                     //对鼠标Y轴进行判断
        moveD = "u";
    }else if(sy<event_y){
//            鼠标Y轴下移
        moveD = "d";
//            alert("xx")
    }
    if (navigator.userAgent.indexOf('Firefox') >= 0) {
        sx = event_x;
        sy = event_y;
    }else{
        sx=event.x;
        sy=event.y;
    }
    return moveD;//重新赋值
}


function getEvent() //同时兼容ie和ff的写法
{
    if(document.all)   return window.event;
    func=getEvent.caller;
    while(func!=null){
        var arg0=func.arguments[0];
        if(arg0)
        {
            if((arg0.constructor==Event || arg0.constructor ==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
            {
                return arg0;
            }
        }
        func=func.caller;
    }
    return null;
}