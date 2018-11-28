$(function () {
    var manmanmai = new Manmanmai();
    manmanmai.queryCouponList();
    manmanmai.qureyDetail();
})

var Manmanmai = function () {};

Manmanmai.prototype = {
    // 获取优惠券列表
    queryCouponList: function () {
        var that = this;
        var id = that.getQueryString('id');
        if (id == 0) {
            $('h4').html('肯德基优惠券')
        } else if (id == 1) {
            $('h4').html('必胜客优惠券')
        } else if (id == 2) {
            $('h4').html('棒约翰优惠券')
        } else if (id == 3) {
            $('h4').html('哈根达斯优惠券')
        }
        $.ajax({
            url: 'http://localhost:9090/api/getcouponproduct',
            data: {
                couponid: id
            },
            success: function (data) {
                console.log(data);
                var html = template('listTpl', data)
                $('ul').html(html);
                var html = template('slideTpl', data);
                $('.swiper-wrapper').html(html)
            }
        })
    },

    // 轮播图
    qureyDetail: function () {

        $('main ul').on('tap', '.product-list', function () {
            $('.mui-backdrop').show();

            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                effect: 'cube',
                cubeEffect: {
                    slideShadows: true,
                    shadow: true,
                    shadowOffset: 10,
                    shadowScale: 0.6
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        })
        // 关闭轮播图
        $('.btn-close').on('tap', function () {
            $('.mui-backdrop').hide();
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