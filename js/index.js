$(function () {
    var MMB = new mmb();
    MMB.hide().close();
    MMB.getindexmenu().getmoneyctrl().productList();
    MMB.search();
})
var mmb = function () {};
mmb.prototype = {
    /* 获取首页菜单栏信息 */
    baseURL: 'http://localhost:9090',
    getindexmenu: function () {
        var that = this;
        $.ajax({
            url: that.baseURL + '/api/getindexmenu',
            success: function (obj) {
                var html = template('menuTpl', obj);
                $('.menu ul').append(html);
                $('.li7 a').attr('href', 'javascript:;')
                $('.li4 a').attr('href', 'moneyctrl1.html')
                $('.li7 a').on('tap', function () {
                    console.log(111);
                })
            }
        })
        return this;
    },
    /* 获取优惠商品 */
    getmoneyctrl: function () {
        var that = this;
        $.ajax({
            url: that.baseURL + '/api/getmoneyctrl',
            success: function (obj) {
                var html = template('moneyctrlTpl', obj);
                $('.productBox').html(html);
            }
        });
        return this;
    },
    close: function () {
        $('.close').on('tap', function () {
            localStorage.setItem('key', 'show');
            console.log(localStorage.getItem('key'));
            $('#iframe-wrap').remove();
            $('.menu li').addClass('animated tada')
        })
        return this;
    },
    hide: function () {
        if (localStorage.getItem('key')) {
            $('#iframe-wrap').remove();
        }
        return this;
    },
    /* 跳转到商品详情页 */
    productList: function () {
        $('#main').on('tap', '.productList', function () {
            var id = $(this).data('id');
            location = 'productid.html?productid=' + id;
        })
        return this;
    },
    search:function(){
        $('.searchList').on('tap',function(){
             mui.alert("没有搜索到相关商品", "温馨提示", "确定");
        })
       
    },
    
}