$(function () {
    var Man = new Manmanbuy();
    Man.PageData();
    Man.vertrefresh();
    Man.clickTheJump();
})
var Manmanbuy = function () {

}

var pageid = 1;
Manmanbuy.prototype = {
    // 查询请求
    request: function (data) {
        $.ajax({
            url: "http://localhost:9090/api/getmoneyctrl",
            data: {
                pageid: pageid,
            },
            success: function (result) {

                data(result);
            }
        });
    },
    // 数据渲染
    PageData: function () {
        var taht = this;
        taht.request(function (result) {
            var html = template('commodityList', result);
            $('.commodity').html(html);
        })
    },
    // 上下拉刷新
    vertrefresh: function () {
        var taht = this;
        mui.init({
            pullRefresh: {
                container: "#refreshContainer",
                up: {
                    callback: function () {
                        pageid++;
                        setTimeout(function () {

                            taht.request(function (result) {
                                if (!result.result.length <= 0) {
                                    console.log(result);
                                    var html = template('commodityList', result);
                                    $('.commodity').append(html);
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                } else {
                                    // 没有数据
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                    return false;
                                }
                            })
                        }, 1000)
                    }
                }
            }
        });
    },
    // 点击跳转
    clickTheJump: function () {
        $('#main').on('tap', '.productList', function () {

            location = 'productid.html?productid=' + $(this).data('productid');
        });
    }
}