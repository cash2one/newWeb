 //
 //*@Description: public main css
 //*@Author:     zcy
 //*@Update:     zcy(2016-5-9 13:20)
 //
$(function() {

    var sec4Viewed = false;
    var sec5Viewed = false;

    $(window).on('scroll',function (){
        if(sec4Viewed == false){
            if (inView("#sec4")){
                sec4Viewed = true;
                scro();
            }
        }
        if(sec5Viewed == false){
            if (inView("#sec5")){
                sec5Viewed = true;
                spanflow(0);
            }
        }
    })

    function inView(selector,t) {
        var scrolled = $(window).scrollTop();
        winHeight = $(window).height();
        offTop = $(selector).offset().top;
        if (scrolled + winHeight > offTop) {
            return true;
        }
        else {
            return false;
        }
    }



    function scro(){
        $('.hm-medical li').eq(1).delay(600).animate({"margin-top":"60px"},600);
        $('.hm-medical li').eq(2).delay(600).animate({"margin-top":"-30px"},600);
        $('.hm-medical li').eq(3).delay(600).animate({"margin-top":"20px"},600);
        $('.hm-medical li').eq(4).delay(600).animate({"margin-top":"-10px"},600);
    }
    //sec4载入动画

    function spanflow(index){
        $(".hm-pro-map li:eq("+index+")").children('span').animate({'left':'0','opacity':'1'},500,"",function(){spanflow(index+1)});
    }
    //sec5载入动画
    var currentLi =  $(".hm-medical ul li");

    $(currentLi.eq(0)).stop().animate({"width":"600px"},600);

    $(currentLi.eq(0)).children(".block").animate({"bottom":"60px"},600);

    $(currentLi).hover(function(){
        $(this).siblings("li").stop().animate({"width":"65px"},600);
        $(this).siblings("li").removeClass("current");
        $(this).siblings("li").children(".medical-title").removeClass("med-tit-current");
        $(this).addClass("current").children(".medical-title").addClass('med-tit-current');
        $(this).stop().animate({"width":"600px"},800);

    });
//sec4 风琴动画
    // $('.hm-pro-map li a').hover(function(){
    //     $(this).next().animate({'font-weight':'700'},100);
    //     },function(){
    //     $(this).next().animate({'font-weight':'100'},100);
    //     });
//sec5鼠标hover效果
})


 // @Description: public home js @Author:zcy    @Update:zcy(2016-5-9 13:20)


 $(function() {
     $.fn.hoverDelay = function(options){
         var defaults = {
             hoverDuring: 200,
             outDuring: 200,
             hoverEvent: function(){
                 $.noop();
             },
             outEvent: function(){
                 $.noop();
             }
         };
         var sets = $.extend(defaults,options || {});
         var hoverTimer, outTimer;
         return $(this).each(function(){
             $(this).hover(function(){
                 clearTimeout(outTimer);
                 hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
             },function(){
                 clearTimeout(hoverTimer);
                 outTimer = setTimeout(sets.outEvent, sets.outDuring);
             });
         });
     };

     var cc=$(".medical-image ul li");
     $(cc.eq(0)).stop().animate({"opacity":"1"});
     $(cc.eq(0)).children(".medical-disk-image-block").find("div.img-25-write").animate({"padding-left": "32px","opacity":"1"},500);
     $(cc.eq(0)).children(".medical-disk-image-block").find(".img-25").animate({"margin-right": "0px","opacity":"1"},500);
     $(cc.eq(0)).siblings("li").children(".medical-disk-image-block").css("display","none");

     $(".medical-image ul li").each(function () {
         var that = $(this);
         that.hoverDelay({
             hoverEvent: function () {

                 that.addClass("medical-cheack").children(".medical-disk-image-block").css("display","block")
                     .children(".imgs-25").animate({"right": "55px","opacity":"1"},"show");

                 that.addClass("medical-cheack").children(".medical-disk-image-block").css("display","block")
                     .find("div.img-25-write").animate({"padding-left": "42px","opacity":"1"},"show");
                 that.siblings("li").removeClass("medical-cheack");
                 that.siblings("li").children(".medical-disk-image-block").css("display","none").find("div.img-25-write").animate({"padding-left": "32px"});
                 that.siblings("li").children(".medical-disk-image-block").css("display","none").find(".imgs-25").animate({"right": "45px","opacity":".1"});


             },
             outEvent: function () {


             }
         });
     });

 });


 $(function(){
     var sec5Viewed=false;

     $(window).on('scroll',function () {
         if(sec5Viewed == false){
             if (inView("#sec5")){
                 sec5Viewed = true;
                 spanflow(0);
             }
         }
     })

     function inView(selector,t) {
         var scrolled = $(window).scrollTop();
         winHeight = $(window).height();
         offTop = $(selector).offset().top;
         if (scrolled + winHeight > offTop) {
             return spanflow();
         }
         else if(scrolled > winHeight + (offTop+300)){
             return outscro();
         }else if(3800 > scrolled > 2078 ){
             return $(".hot-hospital").css("display","none");
         }
     }

     function spanflow(index){
         $(".hm-pro-map li:eq("+index+")").children('span').animate({'left':'0','opacity':'1'},500,"",function(){spanflow(index+1)});
     }

     function outscro(){
         $(".hot-hospital").css("display","none");
     };

 });
 $(function(){

     var sec4Viewed=false;
     $(window).on('scroll',function () {
         if (sec4Viewed == false) {
             if (inView("#sec4")) {
             }
         }
     })

     function inView(selector,t) {
         var scrolled = $(window).scrollTop();//滚动条的垂直偏移高度

         if (scrolled + winHeight > offTop) {
             return scro();
         }
         else if(scrolled > winHeight + (offTop+300)){
             return outscro();
         }else if(winHeight + offTop>scrolled){
             return outscro();
         }else if(3800 > scrolled > 2078 ){
             return outscro();
         }
     }

     function scro(){
         $(".hot-hospital").css("display","block").css("position","fixed").css("top","0");
         $("#sec4").animate({"display": "block"},100).css("display","block");
     };

     function outscro(){
         $(".hot-hospital").css("display","none").css("position","");
         //$("#sec4").css("display","none");
     };
 });

 $(".header-hide ul li:eq(0)").click(function(){
     var ul=$(".hidden-menu").css("display")
     if(ul=="none"){
         $(".hidden-menu").removeClass("show");
     }else{
         $(".hidden-menu").addClass("show");
     }

 });