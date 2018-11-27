$(function () {
    var MMB = new mmb();
    MMB.hide();
    MMB.getindexmenu();
    MMB.getmoneyctrl();
    MMB.close();
})
var mmb = function () {};
mmb.prototype = {
    /* 获取首页菜单栏信息 */
    getindexmenu: function () {
        $.ajax({
            url: 'http://localhost:9090/api/getindexmenu',
            success: function (obj) {
                var html = template('menuTpl', obj);
                $('.menu ul').append(html);
            }
        })
    },
    /* 获取优惠商品 */
    getmoneyctrl: function () {
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            success: function (obj) {
                var html = template('moneyctrlTpl', obj);
                $('.productBox').html(html);
            }
        })
    },
    close: function () {
        $('.close').on('tap', function () {
            localStorage.setItem('key', 'show');
            console.log(localStorage.getItem('key'));
            $('#iframe-wrap').remove();
            $(this).remove();
            $('.menu li').addClass('animated tada')
        })
    },
    hide: function () {
        if (localStorage.getItem('key')) {
            $('#iframe-wrap').remove();
            $('.close').remove();
        }
    }
}