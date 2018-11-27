$(function () {
    var pageid = 1;
    $.ajax({
        url: "http://localhost:9090/api/getmoneyctrl",
        data: {
            pageid: pageid,
        },
        success: function (result) {
            console.log(result);
            var html = template('commodityList', result);
            $('.commodity').html(html);
        }
    });
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            down: {
                callback: function () {

                    setTimeout(function () {
                        $.ajax({
                            url: "http://localhost:9090/api/getmoneyctrl",
                            data: {
                                pageid: pageid,
                            },
                            success: function (result) {
                                console.log(result);
                                var html = template('commodityList', result);
                                $('.commodity').html(html);
                            }
                        });
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        // 注意要等结束了下拉刷新了后再重置
                        // 7. 把上拉加载的效果也要 不然拉不了了 有时候会自动触发 不是bug希望帮你加载一些
                        mui('#refreshContainer').pullRefresh().refresh(true);
                        $('#order span').html(0);
                    }, 2000)
                }
            },
            up: {
                callback: function () {

                    pageid++;
                    setTimeout(function () {

                        $.ajax({
                            url: "http://localhost:9090/api/getmoneyctrl",
                            data: {
                                pageid: pageid,
                            },
                            success: function (result) {

                                if (!Array.isArray(result)) {
                                    console.log(result);
                                    var html = template('commodityList', result);
                                    $('.commodity').append(html);
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                } else {
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                    return false;
                                }

                            }
                        });

                    }, 1000)
                }
            }
        }
    });
})