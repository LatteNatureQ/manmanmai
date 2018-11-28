$(function () {

    var mmb = new Mmb();
    var brandtitleid = mmb.getQueryString("brandtitleid");
    mmb.scroll();
    mmb.querybrand(brandtitleid);
    mmb.tapcutclass();
    mmb.queryvolume(brandtitleid);
    mmb.querycomment();
    mmb.brandclick();
    mmb.volumeclick();
});

var Mmb = function () {

};

Mmb.prototype = {
    //区域滚动
    scroll: function () {
        //初始化scroll控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    //查询品牌
    querybrand: function (brandtitleid) {
        $.ajax({
            url: "http://localhost:9090/api/getbrand",
            dataType: "json",
            data: {
                brandtitleid: brandtitleid
            },
            success: function (result) {
                console.log(result);
                var html = template("brandtpl", result);
                $(".brandlist").html(html);
            }
        });
    },
    //查询销量
    queryvolume: function (brandtitleid) {
        $.ajax({
            url: "http://localhost:9090/api/getbrandproductlist",
            dataType: "json",
            data: {
                brandtitleid: brandtitleid,
                page: 4
            },
            success: function (result) {
                console.log(result);

                if (Array.isArray(result)) {
                    result = {
                        result: []
                    }
                };
                var html = template("volumeTpl", result);
                $(".sales-volume").html(html);
            }
        });
    },
    //查询评论
    querycomment: function () {
        var productid = Math.floor(Math.random() * 20);
        $.ajax({
            url: "http://localhost:9090/api/getproductcom",
            data: {
                productid: productid
            },
            dataType: "json",
            success: function (result) {
                if (Array.isArray(result)) {
                    result = {
                        result: []
                    }
                };
                var html = template("commentTpl", result);
                $(".comment").html(html);
            }
        });
    },
    //封装好的截取地址栏的参数
    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
            // return unescape(r[2]);
            return decodeURI(r[2]);
        }
        return null;
    },
    //点击teb栏切换
    tapcutclass: function () {
        $(".ul1 li").on("tap", function () {
            $(this).addClass("active").siblings("li").removeClass("active");
            var text = $(this).children().text();
            if (text == "商品品牌排行") {
                $(".brandlist").show().siblings("ul").hide();
            } else if (text == "销量排行") {
                $(".sales-volume").show().siblings("ul").hide();
            } else {
                $(".comment").show().siblings("ul").hide();
            }

        })
    },
    //商品品牌的点击事件
    brandclick: function () {
        $(".brandlist").on("tap", "li", function () {
            var categoryName = $(this).data("brandname");
            var categoryId = $(this).data("categoryid");
            // console.log(categoryId);
            categoryName = categoryName.substr(categoryName.length - 1 - 1, categoryName.length - 1);
            // console.log(categoryName);
            location = "productList.html?categoryId=" + categoryId + "&categoryName=" + categoryName;
        });
    },
    //销量商品的点击事件
    volumeclick: function () {
        $(".sales-volume").on("tap", "li", function () {
            var productId = $(this).data("productid");
            // console.log(productId);
            //页面跳转
            location = "detail.html?productId=" + productId;
        });
    }

}