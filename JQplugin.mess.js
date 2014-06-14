;(function($){
    var defaults = {
        title:"Welcome to jquery world!",
        list:["CHINA","USA","CANDA","RUSSIAN","EUROP"],
        buttonTxt:"choose"
    };
    alert(this);
    $.fn.greeting = "hello this is zhangdong";

    /**
    * jquery 提供了一个objct 即 fn，which is a shotcut of jquery prototype
    * or you can call it jquery plugin shell  == fn
    *
    */
    $.fn.JQPnew = function(options){
        var config = $.extend({},defaults,options);//{} 保持$默认配置，options允许用户选择,通常情况下不需要给用户输入的选择，但是当plugin比较大，比较复杂时，提供用户自定义是个不错的选择
       $("<h1>",{
           text:config.title
               }).appendTo(this);

        var form = $("<form>",{
            name:"test"
        }).appendTo(this);
        var cho = ["jQuery","china","america","canda","japanese"];
        for(var i=0;i<config.list.length;i++){
            $("<input />",{
                type: "radio",
                value:config.list[i],
                id:config.list[i]
            }).appendTo(form);
            $("<label />",{
                text:config.list[i],
                "for":config.list[i],
                id:config.list[i]
            }).appendTo(form);
        };
        form.attr({'width':"400px",height:"200px"});
        $("<button>",{
            text:config.buttonTxt
        }).appendTo(form);
        return this;//keep the jquery chain $().a().b();
    };
}(jQuery));
