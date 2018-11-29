mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.4 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    scrollY: false, //是否竖向滚动
    scrollX: true, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true //是否显示滚动条
});