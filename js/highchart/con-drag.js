/**
 * Created by GONDON on 2016/11/7.
 */


$(function () {
    var flag =true;
    $(document).mousemove(function (e) {
        if(flag){
            var top = $("#coor").offset().top;
            if (!!this.move) {
                var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
                    callback = document.call_down || function () {
                            $(this.move_target).css({
//										'top': e.pageY - posix.y,
//										'left': e.pageX - posix.x
                            });

                        };

                callback.call(this, e, posix);
                if(e.pageY > $(window).height()){
                    flag = false;
                    $("#coor").css("top","0");
                    $(".room-center-top").height($(window).height()-130);
                };
                if(e.pageY>top+60){
                    flag = false;
                }
            }
        }

    }).mouseup(function (e) {
        flag = true;
        if (!!this.move) {
            var callback = document.call_up || function () {
                };
            callback.call(this, e);
            jQuery.extend(this, {
                'move': false,
                'move_target': null,
                'call_down': false,
                'call_up': false
            });
        }
    });

    var jQuerybox = $('#box').mousedown(function (e) {
        var offset = $(this).offset();

        this.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
        jQuery.extend(document, {'move': true, 'move_target': this});
    }).on('mousedown', '#coor', function (e) {
        var posix = {
            'w': jQuerybox.prev(".room-center-top").width(),
            'h': jQuerybox.prev(".room-center-top").height(),
            'x': e.pageX,
            'y': e.pageY
        };


        jQuery.extend(document, {
            'move': true, 'call_down': function (e) {
                jQuerybox.prev(".room-center-top").css({
                    'height': Math.max(30, e.pageY - posix.y + posix.h) - 15

                })

                $(".report-main-content").height($(".room-center-bottom").height()*0.9-30);
                $(".report-main-content").mCustomScrollbar();


                jQuerybox.css({
                    'height': $(".con-room-center").height() - Math.max(30, e.pageY - posix.y + posix.h)
                });

            }

        })
        return false;
    });
});

//资料区的拖拽


