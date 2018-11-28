$(function () {
   
var mmb = new MMB();
mmb.initWrapScroll();
mmb.getCategoryTitle();
mmb.closeAd();
mmb.showProduct();
mmb.cancelTop();

});

var MMB = function() {

};

MMB.prototype = {
   
    http: "http://localhost:9090/",

    //获取所有分类标题 
    getCategoryTitle: function() {
        var that = this;
        var params = {
            url: that.http + "api/getcategorytitle",
        };
        that.getData(function(data) {
           console.log(data);
           
           var html = template("categoryTpl",data);
           $("#main .content").html(html);
        },params);
    },

    //点击分类标题,显示详情分类
    showProduct: function() {
        var that = this;
        $("#main .content").on("tap",".category_t a",function() {
           
            //获取当前点击的标题id
            var id = $(this).data("id");
            var $categoryAll = $(this).parent().parent().children("ul");
            var params = {
                url: that.http + "api/getcategory",
                data: {titleid: id}
            };
            that.getData(function(data) {
                //凑整数
                var totalLis = Math.ceil(data.result.length/3)*3;
                data.totalLis = totalLis;
                console.log(data);
                var html = template("categoryAllTpl",data);
                $categoryAll.html(html);
            },params);
            if($(this).data("status") === "show") {
                $categoryAll.show();
                 //记住状态
                $(this).data("status","hide");
                 //更换箭头
                $(this).css({
                    backgroundImage: "url(http://www.zuyushop.com/wap/images/arrow2.gif)"
                })
            } else if($(this).data("status") === "hide") {
                $categoryAll.hide();
                 //记住状态
                $(this).data("status","show");
                 //更换箭头
                $(this).css({
                    backgroundImage: "url(http://www.zuyushop.com/wap/images/arrow1.gif)"
                })
            }
        })
    },

    //关闭广告
    closeAd: function() {
        $("#fixed-ad .close").on("tap",function() {
            $(this).parent().hide();
        })
    },

     //回到顶部
     cancelTop: function() {
        $("#cancelTop").on("tap",function() {
            $(window).scrollTop(0);
        });
    },


    //请求数据
    getData: function(callback, params) {
        $.ajax({
            url: params.url,
            data: params.data || "",
            type: params.type || "get",
            dataType: params.dataType || "json",
            success: function (obj) {
                callback(obj);
            }
        })
    },

    //初始化区域滚动
    initWrapScroll: function() {
        mui('#main .mui-scroll-wrapper').scroll({
            indicators: true, //是否显示滚动条
            scrollY: true, //是否竖向滚动
        });
        mui('#header .mui-scroll-wrapper').scroll({
            scrollX: true,
        });
        
    }
}


