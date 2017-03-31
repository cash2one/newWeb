/*
 * zcy 2015/5/3 11:00
 *
 * */

(function($){
    $.fn.hoverDelay = function(options){
        var defaults = {
            hoverDuring: 500,
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

    $(function() {

        $(".for-cwb").each(function () {
            var that = $(this);
            that.hoverDelay({
                hoverEvent: function () {
                    that.find('.column-detail').css("display", "block").animate({opacity: '1'}, 400);
                },
                outEvent: function () {
                    that.find('.column-detail').css("display", "none").animate({opacity: '0'}, 400);
                }
            });
        });

        $(".video-science-imgs ul li a").each(function(){
            var that = $(this);
            that.hoverDelay({
                hoverEvent: function () {
                    that.find("p").animate({
                        "top":"80px"
                    },500);
                },
                outEvent: function () {
                    that.find("p").animate({
                        "top":"150px"
                    },500);
                }
            });
        });

        $(".doc-team-1").each(function(){
           var that=$(this);
            that.hoverDelay({
                hoverEvent: function () {
                    that.css({
                     "border":"1px solid #2aacc6"
                    });
                },
                outEvent: function () {
                    that.css({
                        "border":"1px solid #ddd"
                    });
                }
            });
        });

        $(".column-narrow-block").each(function(){
            var that = $(this);
            that.hoverDelay({
                hoverEvent: function(){
                    that.find('.narrow-left').css('display','block').animate({opacity:'1',width:'100%'},300,function(){
                        that.find('.narrow-left').animate({width:"200%"},400)
                    });
                    that.find('.narrow-right').css('display','block').animate({opacity:'1',width:'100%'},300,function(){
                        that.find('.narrow-right').animate({width:"200%",left:'-99%'},400)
                    });
                },
                outEvent: function(){
                    that.find('.narrow-left').animate({opacity:'0',width:'100%'},400).css("display", "none");
                    that.find('.narrow-right').animate({opacity:'0',width:'100%',left:'0'},400).css("display", "none");
                }
            });
        });

        $(".ulll li").each(function () {
            var that = $(this);
            that.hoverDelay({
                hoverEvent: function () {
                    that.find('.update-disk').css("background-color", "#1FB0F2");
                },
                outEvent: function () {
                    that.find('.update-disk').css("background-color", "#F1F1F1");
                }
            });
        });


    });

    $(function() {
        var glass=$(".header-magnifying-glass");
        var header=$(".main-header");
        $(glass).stop();
        $(header).stop();

        $(glass).hoverDelay({
            hoverEvent: function () {
                $('.select-more').hide();
                $(".header-hide").animate({left:'-180px'});
                $(".search-box-show").show().animate({left:'-185px',width:"228px"},500);
                $(this).stop();
            }
        });

        $(header).hoverDelay({
            outEvent: function () {
                $(".header-hide").animate({left:'0px'});
                $(".search-box-show").hide().animate({left:'47px',width:"0px"},500);
                $(".hidden-menu").addClass("show");
                $('.select-more').hide();
                $(this).stop();
            }
        });

    });

    $(function(){
        $(".mm-menu-toggle").click(function(){
            if($(".mm-menu").is(":hidden")){
                $(".mm-menu").show(200);
                $(".wrapper").removeClass(".mm-menu-open");
                $(".wrapper").width("76%");
                $(".mm-menu-toggle").animate({"left":"20%"},200).css({"background-position":"-13px center"})

            }else{
                $(".mm-menu").hide();
                $(".wrapper").width("96%");
                $(".mm-menu-toggle").css({"left":"0","background-position":"0 center"});

            }
        });
    });

    $(function($){
        var txt1="<div  class='update-text'></div>";
        $(".ulll").find(".update-disk").after(txt1);
        $(".ulll li:last-child").find(".update-text").css("display","none");

    });



})(jQuery);
