$(function () {
    var MMB = new mmb();
    MMB.hide();
    MMB.getindexmenu();
    MMB.getmoneyctrl();
    MMB.close();
    MMB.productList();
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
                $('.li7 a').on('tap', function () {
                    console.log(111);
                })
            }
        })
    },
    /* 获取优惠商品 */
    getmoneyctrl: function () {
        var that = this;
        $.ajax({
            url: that.baseURL + '/api/getmoneyctrl',
            success: function (obj) {
                console.log(obj);
                var html = template('moneyctrlTpl', obj);
                $('.productBox').html(html);
            }
        });
    },
    close: function () {
        $('.close').on('tap', function () {
            localStorage.setItem('key', 'show');
            console.log(localStorage.getItem('key'));
            $('#iframe-wrap').remove();
            $('.menu li').addClass('animated tada')
        })
    },
    hide: function () {
        if (localStorage.getItem('key')) {
            $('#iframe-wrap').remove();
        }
    },
    /* 跳转到商品详情页 */
    productList: function () {
        $('#main').on('tap', '.productList', function () {
            var id = $(this).data('id');
            location = 'productid.html?productid=' + id;
        })
    }
}