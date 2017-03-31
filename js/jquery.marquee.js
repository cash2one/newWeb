   (function (jQuery) {  
        jQuery.fn.extend({  
            /**  
             *@description �޷���� ֧�������������Һʹ�ֱ��������  
             *@param {  
              *      direction:string,//�������� ֵ��top|left|bottom|right|up|down  
             *      speed:string//�����ٶȣ���ֱ����ʱΪͣ��ʱ�䣩  
             * } o  
             *@example  
             *HTML�ṹ  
             *<div id="mar">  
             *    <ul>  
             *        <li>����1</li>  
             *        <li>����2</li>  
             *        <li>����3</li>  
             *    </ul>  
             *</div>  
             *���ã�  
             *jQuery("#mar").marquee({  
             *    direction:"top",  
             *    speed:30  
             *})  
             *  
             */  
            marquee:function (o) {  
                var it = this,  
                        d = o.direction || 'left', 
                        s = o.speed || 30,  
                        mar = jQuery(it),  
                        mp1 = jQuery(it).children(0).attr({id:"mp1"}),  
                        marqueeFunc = getMarquee(d),  
                        marRun = marqueeFunc ? setInterval(marqueeFunc, s) : function () {  
                            return false;  
                        };//��ʼ����  
                //�����ͣ�¼�  
                jQuery(it).hover(function () {  
                    clearInterval(marRun);  
                }, function () {  
                    marRun = setInterval(marqueeFunc, s);  
                })  
                function getMarquee(d) {  
                    var marqueeFunc;  
                    switch (d) {  
                        //ˮƽ����  
                        case "left":  
                            mar.addClass("plus-mar-left");  
                            var liHeight = mar[0].offsetHeight;  
                            mar.css({"line-height":liHeight + "px"});  
                            if (mp1[0].offsetWidth < mar[0].offsetWidth) return false;  
                            mp1.clone().attr({id:"mp2"}).appendTo(mar);  
                            marqueeFunc = function () {  
                                if (mar[0].scrollLeft >= mp1[0].scrollWidth) {  
                                    mar[0].scrollLeft = 0;  
                                } else {  
                                    mar[0].scrollLeft++;  
                                }  
                            }  
                            break;  
                        //ˮƽ����  
                        case "top":  
                            mar.addClass("plus-mar-top");  
                            if (mp1.outerHeight() <= mar.outerHeight()) return false;  
                            var mp2 = mp1.clone().attr({id:"mp2"}).appendTo(mar);  
                            marqueeFunc = function () {  
                                var scrollTop = mar[0].scrollTop;  
                                if (mp1[0].offsetHeight > scrollTop) {  
                                    mar[0].scrollTop = scrollTop + 1;  
                                } else {  
                                    mar[0].scrollTop = 0;  
                                }  
                            }  
                            break;  
                        //ˮƽ����  
                        case "right":  
                            mar.addClass("plus-mar-left");  
                            var liHeight = mar[0].offsetHeight;  
                            mar.css({"line-height":liHeight + "px"});  
                            if (mp1[0].offsetWidth <= mar[0].offsetWidth) return false;  
                            var mp2 = mp1.clone().attr({id:"mp2"}).appendTo(mar);  
                            marqueeFunc = function () {  
                                if (mar[0].scrollLeft <= 0) {  
                                    mar[0].scrollLeft += mp2[0].offsetWidth;  
                                } else {  
                                    mar[0].scrollLeft--;  
                                }  
                            }  
                            break;  
                        //ˮƽ����  
                        case "bottom":  
                            mar.addClass("plus-mar-bottom");  
                            if (mp1[0].offsetHeight <= mar[0].offsetHeight) return false;  
                            var mp2 = mp1.clone().attr({id:"mp2"}).appendTo(mar);  
                            mar[0].scrollTop = mar[0].scrollHeight;  
                            marqueeFunc = function () {  
                                if (mp1[0].offsetTop >= mar[0].scrollTop) {  
                                    mar[0].scrollTop += mp1[0].offsetHeight;  
                                } else {  
                                    mar[0].scrollTop--;  
  
                                }  
                            }  
                            break;  
                        //��ֱ���� ����  
                        case "up":  
                            mar.addClass("plus-mar-up");  
                            var liHeight = mp1.children("li").height();  
                            // mp1.css({"line-height":liHeight + "px"});  
                            marqueeFunc = function () {  
                                var currLi = it.eq(0).find("ul:first");  
                                currLi.animate({  
                                    marginTop:-liHeight  
                                }, 1000, function () {  
                                    currLi.find("li:first").appendTo(currLi);  
                                    currLi.css({marginTop:0});  
                                })  
                            }  
                            break;  
                        //��ֱ���� ����  
                        case "down":  
                            mar.addClass("plus-mar-down");  
                            var liHeight = mar[0].offsetHeight,  
                                    liLength = mp1.children().length,  
                                    topInit = -(liLength - 1) * liHeight + "px";  
                            mp1.css({"top":topInit, "line-height":liHeight + "px"});  
                            marqueeFunc = function () {  
                                var currLi = it.eq(0).find("ul:last");  
                                currLi.animate({  
                                    marginTop:liHeight  
                                }, 500, function () {  
                                    currLi.find("li:last").prependTo(currLi);  
                                    currLi.css({marginTop:0});  
                                })  
                            }  
                            break;  
                        default:  
                        {  
                            marqueeFunc = null;  
                            alert("�������������Ĳ���{direction}����");  
                        }  
                    }  
                    return marqueeFunc;  
                }  
            }  
        })  
    })(jQuery);  
  