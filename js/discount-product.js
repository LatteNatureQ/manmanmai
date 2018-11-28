$(function () {
    $(document).ready(function(){
        $('#footer .top').on('tap',function(){
            console.log(111 )
            $('html,body').animate({scrollTop:0},'slow');
        });
    });

    
    var mmm = new Mmm();
    mmm.refresh();
    mmm.getdiscountproduct();
    mmm.publish();
  
})
var Mmm = function () {

}
Mmm.prototype = {
        //上拉刷新下拉加载初始化
        refresh: function () {
            var that = this;
            mui.init({
                pullRefresh: {
                    container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                    down: {
                        height: 50, //可选,默认50.触发下拉刷新拖动距离,
                        contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                        contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                        contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                        callback: function () {
                            setTimeout(function () {
                                mui("#refreshContainer").pullRefresh().endPulldownToRefresh();
                            }, 1000)
                        }
                    }
                }
            });
        },
        getdiscountproduct: function () {
            var that =this;
            var productid = that.GetQueryString('productid');
            // 获取参数
            $.ajax({
                url: 'http://localhost:9090/api/getdiscountproduct',
                data:{productid:productid},
                success:function(data){
                    var html = template('detailsTpl',data.result[0]);
                    $('#main .cont').html(html);

                }
            })
        },
        GetQueryString: function (name) {
            //获取url的参数
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
            if (r != null) return unescape(r[2]);
            return null;

        },
        publish:function(){
            var that = this;
            //发表评论按钮的点击事件
            $('#main .bottom div').on('tap',function(){
               var text = $($('textarea')[0]).val();
               if(!text.trim()){
                mui.toast('不允许为空');
                return false;
               }
               var li = '<li>'+text+'</li>'
               console.log($('#main .comment ul'))
               $($('#main .comment ul')[0]).prepend(li)
            })
        }
    }