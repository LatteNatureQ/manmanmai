// /*1.发送ajax请求并渲染页面
// */
// //调用
var shopid=1;

setShop($('.popsort'))
setArea($('.popcat'))
setProductList($('.gs-product-list'), { "shopid": 0, "areaid": 0 });
setFilter($('.filter'));

function setShop(mm, callback) {
    $.ajax({
        url: "http://localhost:9090/api/getgsshop",
        success: function(data) {
            var html = template('gsShop', data);
            mm.html(html);
        }
    })
}

//2. 用来获取凑单品的区域的信息 并渲染到区域的下拉列表
function setArea(mm, callback) {
    $.ajax({
        url: "http://localhost:9090/api/getgsshoparea",
        success: function(data) {
            var html = template('gsArea', data);
            mm.html(html);
        }
    })
}
// 3.根据店铺的id和区域的id获取该店铺该区域的商品列表信息
function setProductList(mm, data, callback) {
    $.ajax({
        url: "http://localhost:9090/api/getgsproduct",
        data: { 'shopid': data.shopid || 0, 'areaid': data.areaid || 0 },
        success: function(data) {
            var html = template('gsProductList', data);
            mm.html(html);
        }
    })
}
function setFilter(mm, data, callback) {
    var data = { "result": [{ "selected": "京东", "selectName": "shop" }, { "selected": "华北", "selectName": "area" }, { "selected": "全部价格", "selectName": "price" }] };
    var html = template('filter', data);
    mm.html(html);
}
function SelectShow(selectname) {
    $('#' + selectname).toggleClass('on');
}
// /*匹配对应商店选择的id和类名*/
function GetShopProduct(select, shopid, shopname) {
    $('.shop').html(shopname + "<i></i>");
    $('.shop').attr('data-id', shopid);
    $('[data-' + select + ']').parent().removeClass('on');
    $('[data-' + select + '=' + shopid + ']').parent().addClass('on');
    $('[data-' + select + '=' + shopid + ']').parent().parent().parent().removeClass('on');
    var areaid = $('.filter').find('.area').data('id');
    setProductList($('.gs-product-list'), { "shopid": shopid, "areaid": areaid });
}
// /*匹配对应地区的地名选择的地区id和地区类名*/
function GetAreaProduct(select, areaid, areaname) {
    $('.area').html(areaname + "<i></i>");
    $('.area').attr('data-id', areaid);
    $('[data-' + select + ']').parent().removeClass('on');
    $('[data-' + select + '=' + areaid + ']').parent().addClass('on');
    $('[data-' + select + '=' + areaid + ']').parent().parent().parent().removeClass('on');
    var shopid = $('.filter').find('.shop').data('id');
    setProductList($('.gs-product-list'), { "shopid": shopid, "areaid": areaid });
}
