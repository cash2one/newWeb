jQuery.divselect=function(divselectclass,ulselected,spanid){
    var aselected=$(ulselected).find("a");
    var spanid=$(spanid);
    var width = $();
    $(divselectclass).on('click',function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on').find(ulselected).slideUp(200);
        }else{
            var i = $(this).index(divselectclass);
            $(divselectclass).find(ulselected).slideUp();
            $(divselectclass).removeClass('on').eq(i).addClass('on').find(ulselected).slideDown(200);
        }
    });

    aselected.on('click',function(e){
        var ul=$(this).parent().parent();
        if(ul.css("display")=="block"){
            var otext = $(this).text();
            var i = $(this).parents(divselectclass).index(divselectclass);
            // alert(i);
            ul.siblings().find(spanid).html(otext);
          
          $(divselectclass).eq(i).find(spanid).html(otext);
        }else{
            e.stopPropagation();
        }

    })
    $(divselectclass).on("click",function(event){
        event.stopPropagation();
    });
    $(document).on("click",function(){
        $(ulselected).hide();
    });
};