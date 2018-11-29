window.onload = function () {
    var cube = function () {};
    cube.prototype = {
        clientWidth: document.documentElement.clientWidth,
        clientHeight: document.documentElement.clientHeight,
        listId: $('.list').data('id'),
        init: function () {
            var that = this;
            $('.circle').css({
                left: 22,
                top: 17,
                backgroundColor: '#b3b3b5',
                borderRadius: 20,
                width: 40,
                height: 40,
                position: 'fixed',
                transition: 'all .2s ease-out'
            });
            $('.dot').css({
                width: 20,
                height: 20,
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 0 5px #c1c1c1, 0 0 0 6px #c0c0c0'
            });
            $('.list').css({
                position: 'absolute',
                width: 200,
                height: 200,
                backgroundColor: 'rgba(0, 0, 0, .7)',
                borderRadius: 20,
                boxSizing: 'border-box',
                padding: '22px 10px'
            });
            that.touchstart();
            that.touchmove();
            that.touchend();
        },
        touchstart: function () {
            var that = this;
            
            $('.circle').on('tap', function (e) {
                $('body').css({
                    overflow:'hidden'
                })
                var pageX = e.pageX;
                var pageY = e.pageY;
                var left = parseInt($(this).css('left'));
                var top = parseInt($(this).css('top'));
                var bottom = parseInt($(this).css('bottom'));
                if (that.listId == 0) {
                    $('.list').show();
                    that.listId = 1;
                    $('.list').data('id', 1);
                } else {
                    $('.list').hide();
                    that.listId = 0;
                    $('.list').data('id', 0);
                }
                console.log(that.clientHeight);
                /* 屏幕左半边 */
                if (left < that.clientWidth / 2) {
                    if (top == 0) {
                        $('.list').css({
                            left: 100,
                            top: 56
                        });
                        return;
                    };
                    if (bottom == 0) {
                        $('.list').css({
                            left: 99,
                            top: 400
                        });
                        return;
                    }
                    if (top <= 90) {
                        $('.list').css({
                            left: left + 50,
                            top: 20
                        });
                        return;
                    };
                    if (top >= that.clientHeight - 120) {
                        $('.list').css({
                            left: left + 50,
                            top: that.clientHeight - 220,
                        });
                        return;
                    };
                    $('.list').css({
                        left: left + 50,
                        top: top - 90
                    });

                };
                /* 屏幕右半边 */
                if (left > that.clientWidth / 2) {
                    if (top == 0) {
                        $('.list').css({
                            left: 100,
                            top: 56
                        });
                        return;
                    }
                    if (top >= that.clientHeight - 120) {
                        $('.list').css({
                            left: left - 210,
                            top: that.clientHeight - 220,
                        });
                        return;
                    };
                    if (top <= 90) {
                        $('.list').css({
                            left: left - 210,
                            top: 20
                        });
                        return;
                    };
                    $('.list').css({
                        left: left - 210,
                        top: top - 90
                    })
                };
            })
            $('.circle').on('touchstart', function () {

            })
        },
        touchmove: function () {
            var that = this;
            /* 手指持续触摸 */
            $('.circle').on('touchmove', function (e) {
                $('body').css({
                    overflow:'hidden'
                })
                that.listId = 0;
                $('.list').hide();
                $('.list').data('id', 0);
                $(this).css({
                    backgroundColor: 'rgba(0,0,0,.5)'
                })
                var clientX = e.targetTouches[0].clientX;
                var clientY = e.targetTouches[0].clientY;
                clientX = clientX <= 20 ? 20 : clientX;
                clientY = clientY <= 20 ? 20 : clientY;
                if (clientX >= that.clientWidth - 20) {
                    clientX = that.clientWidth - 20;
                };
                if (clientY >= that.clientHeight - 20) {
                    clientY = that.clientHeight - 20;
                }
                $(this).css({
                    left: clientX - 20,
                    top: clientY - 20
                })

            });
        },
        touchend: function () {
            var that = this;
            /* 手指抬起 */
            $('.circle').on('touchend', function (e) {
                $('body').css({
                    overflow:'auto'
                })
                var left = $(this).css('left');
                var top = $(this).css('top');
                if (parseInt(top) <= 40) {
                    $(this).css('top', 0);
                    return;
                }
                if (parseInt(top) >= that.clientHeight - 80) {
                    $(this).css('top', that.clientHeight - 40);
                    return;
                }
                if (parseInt(left) <= that.clientWidth / 2) {
                    $(this).css('left', 0);
                }
                if (parseInt(left) > that.clientWidth / 2) {
                    $(this).css('left', that.clientWidth - 40);
                }
                $(this).css({
                    backgroundColor: '#b3b3b5'
                })
            })
        }
    };
    var Cube = new cube();
    Cube.init();
}