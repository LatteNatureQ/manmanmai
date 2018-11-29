$(function () {
    var moneyctrlProduct = new MoneyctrlProduct();
    moneyctrlProduct.getMoneyctrlProduct();
    moneyctrlProduct.getRecommend();
    moneyctrlProduct.toMoneyctrlProduct();
});

var MoneyctrlProduct = function () {};
MoneyctrlProduct.prototype = {
    url: 'http://localhost:9090/api/',
    //请求数据 渲染页面
    getMoneyctrlProduct: function () {
        var that = this;
        //console.log(that.getQueryString('productid'));
        var productid = that.getQueryString('productid');
        $.ajax({
            url: that.url+'getmoneyctrlproduct',
            data: {productid: productid},
            success: function (data) {
                //console.log(data.result[0]);
                if (!data.result[0].productCity) {
                    data.result[0].productCity = '<ul id="disstorck">'+
                                                '<li>'+
                                                '<a href="#">没有库存数据</a>'+
                                                '</li>'+
                                               ' </ul>'
                }
                var html = template('moneyctrlProductTpl',data.result[0]);
                $('#main').html(html);
            }
        })
    },

    //动态渲染热门推荐
    getRecommend: function () {
        var that = this;
        var id = Math.ceil(Math.random()*13);
        $.ajax({
			url: that.url + 'getmoneyctrl',
			data: {pageid:id},
			success: function (data) {
                //console.log(data);
                var html = template('recommendTpl',data);
                //console.log(html);
				$('.product-list').html(html);
			}
		})
    },

    //跳转到商品详情的点击事件
	toMoneyctrlProduct: function () {
		$('.product-list').on('tap','.product-content',function () {
			location = 'moneyctrlProduct1.html?productid='+$(this).data('id');
		})
	},

    //获取url里传过来的参数
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
}