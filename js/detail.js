$(function () {
   
    var mmb = new MMB();
    mmb.initWrapScroll();
    mmb.getProductDetail();
    mmb.getComment();
    mmb.getMoreComment();
    mmb.closeAd();
    mmb.cancelTop();

});
    
var MMB = function() {

};

MMB.prototype = {
    http: "http://localhost:9090/",
    productId: 1,
    //请求商品详情
    getProductDetail: function() {
        var that = this;
        //获取商品Id
        that.productId = that.GetQueryString("productId");
        //获取分类名
        var categoryName = that.GetQueryString("categoryName");
        var params = {
            url: that.http + "api/getproduct",
            data: {productid:that.productId},
        };
        that.getData(function(data) {
            console.log(data);
            //提取商品名型号
            var tempArr = data.result[0].productName.split(" ");
            var productName = tempArr[0] + tempArr[1].split("/")[0] ;
            //商品分了Id
            var categoryId = data.result[0].categoryId;
            //select快速导航
            $(".select .second").attr("href","productList.html?categoryId="+categoryId+"&categoryName=" + categoryName);
            $(".select .second").html(categoryName);
            $(".select .three").html(productName);
            //商品的图
            $(".detail .head .img>img").replaceWith(data.result[0].productImg);  //将商品的展示的图片替换
            $(".detail .head .title").html(data.result[0].productName);  //将商品的展示的商品名替换
        },params)
    },

    //获取评论页面
    getComment: function() {
        var that = this;
        var params = {
            url: that.http + "api/getproductcom",
            data: {productid: that.productId},
        };
        that.getData(function(data) {
            var html = template("commendTpl",data);
            $(".c-comment>ul").append(html);
        },params);
    },

    //获取更多页面
    getMoreComment: function() {
        var that = this;
        $(".c-comment .more>a ").on("tap",function(){
            that.getComment();
        });
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
        mui('.mui-scroll-wrapper').scroll({
            indicators: false //是否显示滚动条
            });
    },
    //获取url参数值
    GetQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) return decodeURI(r[2]);
    return null;
  },
}


    