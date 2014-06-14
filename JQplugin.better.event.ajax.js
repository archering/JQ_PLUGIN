;
(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var defaults = {
        title: "Welcome to jquery world!",
        list: ["CHINA", "USA", "CANDA", "RUSSIAN", "EUROP"],
        buttonTxt: "choose",
        ajaxOptions: { //data 不能在这个里面。因为，用户选择之前，还不知道data
            type: "GET",
            url: "server.txt",
            contentType: "application/json;charset=utf-8",
            dataType: "text"//return data type
        },
        formClass: "form-class",
        buttonClass: "button-class",
        titleClass: "title-class",
        boxClass: "box-class"
        // created:function(){}//custom function //不使用预设的参数，但是传入时传入一个function
    };
    //$.fn.greeting = "hello this is zhangdong";
    function earlyBind(fixthis, func) {
        return function () {
            func.apply(fixthis, arguments);
        }
    }


    function DOMCreater(element, options) {
        this.element = element;
        //jQuery.extend( target [, object1 ] [, objectN ] )
        //Merge the contents of two or more objects together into the first object.
        //jQuery.extend( [deep ], target, object1 [, objectN ] )
        //If true, the merge becomes recursive (aka. deep copy).
        this.config = $.extend(true, {}, defaults, options); //{} 保持$默认配置，options允许用户选择,通常情况下不需要给用户输入的选择，但是当plugin比较大，比较复杂时，提供用户自定义是个不错的选择

        $.each(this.config, earlyBind(this, function (key, val) {
            if (typeof (val) == "function") { //通过一个非默认函数，用户自定义函数处理用户自定义事件问题。
                // 这个默认函数，通过用户配置传入，但是默认配置又没有这个设置。当然你也可以设置默认函数，把defaults里面的注释去掉
                this.element.on("custom_event", function (e) {
                    val(this);
                });
            }
        }));

        /**使用再下面这个函数代替这个注释掉的函数
        this.element.on("submit",function(e){
            e.preventDefault();
            //此时这个回调函数里面的this == 外面的this.element
            $.ajax({
                type:"POST",
                url:
            });
        });

    **/
        this.element.on("submit", earlyBind(this, function (e) {
            e.preventDefault();
            //console.log("this is :" + e.types);
            //console.log(this instanceof DOMCreater);//true
            //console.log(this.element.find("input:checked").val());

            var ajaxData = {
                    data: JSON.stringify({
                        selected: this.element.find("input:checked").val()
                    })
                },
                ajaxSetting = $.extend({}, this.config.ajaxOptions, ajaxData);
            $.ajax(ajaxSetting).done(function (data) {//success
                alert(data)
            }).fail(function(){//failed
                console.log("error");
            });

        }));


        this.element.one("change", function (e) { // 只执行一次，然后湮灭这个事件和handler
            //console.log($(this).get(0));//此时，这个内部的this 即是element
            $(this).find("button").removeProp("disabled");
        });

    };


    DOMCreater.prototype.init = function () {
        this.element.trigger("custom_event");
        $(this.element).attr({
            "class": this.config.boxClass
        });
        $("<h1>", {
            text: this.config.title,
            "class": this.config.titleClass
        }).appendTo(this.element);

        var form = $("<form>", {
            name: "test",
            "class": this.config.formClass
        }).appendTo(this.element);
        var cho = ["jQuery", "china", "america", "canda", "japanese"];
        for (var i = 0; i < this.config.list.length; i++) {
            $("<input />", {
                type: "radio",
                value: this.config.list[i],
                id: this.config.list[i]
            }).appendTo(form);
            var lb = $("<label />", {
                text: this.config.list[i],
                "for": this.config.list[i],
                id: this.config.list[i]
            }).appendTo(form);
        };
        $("<button>", {
            text: this.config.buttonTxt,
            "class": this.config.buttonClass,
            disabled: "disabled"
        }).appendTo(form);
        //this.config.created();


    };



    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};
     *  the   $.fn  [same as] Class.prototype
     *
     */
    $.fn.JQPnew = function (options) {
        var newthing = new DOMCreater(this, options);
        newthing.init();
        return this; //keep the jquery chain $().a().b();
    };
}(jQuery));
