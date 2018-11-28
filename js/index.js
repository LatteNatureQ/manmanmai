$(function () {
    var MMB = new mmb();
    MMB.getindexmenu();
    MMB.getmoneyctrl();
})
var mmb = function () {};
mmb.prototype = {
    /* 获取首页菜单栏信息 */
    getindexmenu: function () {
        $.ajax({
            url: 'http://localhost:9090/api/getindexmenu',
            success: function (obj) {
                var html = template('menuTpl', obj);
                $('.menu ul').html(html);
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
    }
}