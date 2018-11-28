$(function () {

    var mmb = new Mmb();
    mmb.queryData();
    mmb.scroll();
    mmb.liclick();

});

var Mmb = function () {

};

Mmb.prototype = {
    queryData: function () {
        //发送ajax请求获取数据渲染页面
        $.ajax({
            url: "http://localhost:9090/api/getbrandtitle",
            dataType: "json",
            success: function (result) {
                console.log(result);
                //调用模板渲染页面
                var html = template("brandtitleTpl", result);
                $(".brand-list").html(html);
            }
        });
    },
    scroll: function () {
        //初始化scroll控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    liclick: function () {
        $(".brand-list").on("tap", "a", function () {
            var id = $(this).data('brandtitleid');
            console.log(id); 
            location = "brandcontent.html?brandtitleid=" + id;
        })
    },


}