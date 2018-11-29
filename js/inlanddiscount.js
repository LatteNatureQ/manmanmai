  $(function () {
      var mmm = new Mmm();
      mmm.getinlanddiscount();
      mmm.refresh();
      mmm.skip();
      mmm.top();

  });

  var Mmm = function () {

  };
  Mmm.prototype = {
      //获得商品数据并渲染到页面
      getinlanddiscount: function () {
          var that = this;
          //商品数据
          $.ajax({
              url: 'http://localhost:9090/api/getinlanddiscount',
              type: 'get',
              dataType: 'json',
              success: function (data) {
                  var html = template('commodity', data);
                  $('#main .mui-scroll .mui-row').html(html)
              }
          })
      },
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
                          setTimeout(function(){
                            that.getinlanddiscount();
                            mui("#refreshContainer").pullRefresh().endPulldownToRefresh();
                          },1000)
                      }
                  }
              }
          });
      },
      //商品的点击跳转
      skip:function(){
          var that = this;
          $('#main').on('tap','.show',function(){
              var id = $(this).data('id');
              location = 'discount-product.html?productid='+id;
          })

      },
      top:function(){
          //返回顶部的点击事件
        var that = this;
        $('#main #footer .top').on('tap',function(){
            mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
        })
    }
  }