$(function () {
    var manmanmai = new Manmanmai();
    manmanmai.qureyCoupon();
})

var Manmanmai = function () {};

Manmanmai.prototype = {
    // 获取优惠券
    qureyCoupon: function () {
        $.ajax({
            url: 'http://localhost:9090/api/getcoupon',
            success: function (data) {
                console.log(data);
                var html = template('listTpl', data)
                $('ul').html(html);
            }
        })
    },
    // 获取地址栏指定参数
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}