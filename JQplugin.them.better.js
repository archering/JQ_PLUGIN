;(function($){//start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var defaults = {
        title:"Welcome to jquery world!",
        list:["CHINA","USA","CANDA","RUSSIAN","EUROP"],
        buttonTxt:"choose",
        formClass:"form-class",
        buttonClass:"button-class",
        titleClass:"title-class",
        boxClass:"box-class"
    };
    //$.fn.greeting = "hello this is zhangdong";

    function DOMCreater(element,options){
        this.element = element;
        this.config = $.extend({},defaults,options);//{} 保持$默认配置，options允许用户选择,通常情况下不需要给用户输入的选择，但是当plugin比较大，比较复杂时，提供用户自定义是个不错的选择

    };

    DOMCreater.prototype.init = function(){
        $(this.element).attr({"class":this.config.boxClass});
       $("<h1>",{
           text:this.config.title,
            "class":this.config.titleClass
               }).appendTo(this.element);

        var form = $("<form>",{
            name:"test",
            "class":this.config.formClass
        }).appendTo(this.element);
        var cho = ["jQuery","china","america","canda","japanese"];
        for(var i=0;i<this.config.list.length;i++){
            $("<input />",{
                type: "radio",
                value:this.config.list[i],
                id:this.config.list[i]
            }).appendTo(form);
            var lb= $("<label />",{
                text:this.config.list[i],
                "for":this.config.list[i],
                id:this.config.list[i]
            }).appendTo(form);
        };
        $("<button>",{
            text:this.config.buttonTxt,
            "class":this.config.buttonClass
        }).appendTo(form);
    };



    /**
    * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
    * or you can call it jquery plugin shell  == fn
    *  类似于  Class.prototype.jqplugin = function(){};
    *  the   $.fn  same as Class.prototype
    *
    */
    $.fn.JQPnew = function(options){
        var newthing = new DOMCreater(this,options);
        newthing.init();
        return this;//keep the jquery chain $().a().b();
    };
}(jQuery));
