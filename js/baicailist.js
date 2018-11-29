$(function () {
    var baicailist = new Baicailist();
    baicailist.navRender();
    baicailist.titleName();
    baicailist.showNavList();
    baicailist.hideNavList();
    baicailist.discountsRender();
    baicailist.pullDownUpRefresh();
    baicailist.toTop();
    baicailist.navActive();

    // mui('body').on('tap','a',function(){
    //     window.location.href = this.href;
    // });
    
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    mui(document).on('tap', 'a', function() {
        var a = document.createElement('a');
        a = this.cloneNode(true);
        a.click();
    })
})

var Baicailist = function () {

}
Baicailist.prototype = {
    titleid: 1,
    titleName: function () {
        //别人使用正则写的获取url地址栏参数的方法
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
                // return unescape(r[2]);
                return decodeURI(r[2]);
            }
            return null;
        }

        console.log(getQueryString('title'));

        $('#titleName').html(getQueryString('title'));
    },

    // 点击 .nav-list 后显示导航栏和遮罩层
    showNavList: function () {
        $('#navList').on('tap', function () {
            if ($('#nav').css('display') == 'none') {
                $('#nav').show();
                $('#main .mui-backdrop').show();
            } else {
                $('#nav').hide();
                $('#main .mui-backdrop').hide();
            }
        })
    },
    // 点击‘收起分类’按钮，隐藏导航栏和遮罩层
    hideNavList: function () {
        $('#hideNavList').on('tap', function () {
            $('#nav').hide();
            $('#main .mui-backdrop').hide();
        })
    },
    // 导航栏的渲染
    navRender: function () {
        $.ajax({
            url: 'http://localhost:9090/api/getbaicaijiatitle',
            dataType: 'json',
            success: function (data) {
                // console.log(data.result);
                var html = template('navTpl', {
                    res: data.result
                });
                $('#nav .nav-list').html(html);
            }
        })
    },
    queryBaicaiProd: function (callback, titleid) {
        $.ajax({
            url: 'http://localhost:9090/api/getbaicaijiaproduct',
            data: {
                titleid: titleid || 1
            },
            dataType: 'json',
            success: function (data) {
                callback(data);
            }
        })
    },
    discountsRender: function () {
        this.queryBaicaiProd(function (data) {
            // console.log(data.result);
            var html = template('productTpl', {
                res: data.result
            });
            $('#productList .mui-row').html(html);
        })
    },
    pullDownUpRefresh: function () {
        var that = this;
        mui.init({
            pullRefresh: {
                container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        setTimeout(function () {
                            // 上拉刷新页面
                            window.locaiton = './baicaijia.html';
                            // that.titleid = 1;
                            // that.render(function(){})
                            // // 结束下拉刷新
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        }, 2000)
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
                up: {
                    contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        setTimeout(function () {
                            that.titleid++;
                            that.queryBaicaiProd(function (data) {
                                var html = template('productTpl', {
                                    res: data.result
                                });
                                $('#productList .mui-row').append(html);
                                //  只是结束上拉加载
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            }, that.titleid)
                        }, 2000)
                    }
                }
            }
        });
    },
    toTop: function () {
        $('#toTop').on('tap', function () {
            // window.location = './baicailist.html';
            location.reload();
        })
    },
    navActive: function(){
        $('#contentNav li a').on('tap',function(){
            console.log($(this));
            $(this).addClass('active').parents().siblings().children().removeClass('active');
        })
    }
}