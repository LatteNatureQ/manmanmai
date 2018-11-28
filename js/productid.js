$(function () {
    var url = location.search
    url = url.substr(11);

    function requestAJAX() {
        $.ajax({
            url: "http://localhost:9090/api/getmoneyctrlproduct",
            data: {
                productid: url
            },
            success: function (result) {
                console.log(result);
                var html = template('commodityTxt', result.result[0]);
                $('#main').html(html);
            }
        });
    }
    requestAJAX();
})