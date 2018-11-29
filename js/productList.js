$(function () {
   
    var mmb = new MMB();
    mmb.initWrapScroll();
    mmb.getProductData();
    mmb.paging();
    mmb.closeAd();
    mmb.cancelTop();
});
    
var MMB = function() {

};

MMB.prototype = {
    http: "http://localhost:9090/",
    page: 1,
    totalPages: 10,
    pageSize: 10,

    //请求商品列表
    getProductData: function() {
        var that = this;
        //获取页面跳转传递url参数
        var categoryId = that.GetQueryString("categoryId");
        //获取分类名
        var categoryName = that.GetQueryString("categoryName");
        var params = {
            url: that.http + "api/getproductlist",
            data: {categoryid: categoryId,pageid:that.page,},
        }
        that.getData(function(data){
            data.categoryName = categoryName;
            console.log(data);
            
            that.totalPages = Math.ceil(data.totalCount/that.pageSize);
            var html = template("productListTpl",data);
            that.initWrapScroll();
            $("#main .product>ul").html(html);
            //总页数
            $("#main .paging .totals").html(that.totalPages);
            $("#main .paging .page").html(that.page);
        },params)
    },

    //关闭广告
    closeAd: function() {
        $("#fixed-ad .close").on("tap",function() {
            $(this).parent().hide();
        })
    },
    
    //回到顶部
    cancelTop: function() {
        $("#footer .cancelTop").on("tap",function() {
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
            indicators: true, //是否显示滚动条
            deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        });
    },
    //获取url参数值
    GetQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) return decodeURI(r[2]);
    return null;
  },
  //分页
  paging: function () {
    var that = this;
    //首页
    $("#main .paging .first").on("tap",function(){
        that.page = 1;
        that.getProductData();
    });
    //上一页
    $("#main .paging .prev").on("tap",function(){
       that.page == 1? that.page = 1 : that.page--;
       that.getProductData();
    });
    //下一页
    $("#main .paging .next").on("tap",function(){
        that.page == that.totalPages? that.page = that.totalPages : that.page++;
        that.getProductData();
    });
    //尾页
    $("#main .paging .last").on("tap",function(){
        that.page = that.totalPages;
        that.getProductData();
    });
   
  },
}


    