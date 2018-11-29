$(function () {
    var MMB = new mmb();
    MMB.slide();
    MMB.TravelVedio();
    MMB.TravelSport();
})
var mmb = function () {};
mmb.prototype = {
    slide: function () {
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 3000,
        });
    },
    TravelVedio: function () {
        //找到range
        var range = document.querySelector('#range');
        //找到video标签
        var video = document.querySelector('video');
        //找到son
        var son = document.querySelector('.son');
        //找到进度条
        var progress = document.querySelector('.progress');
        //播放的点击事件
        document.getElementById('play').onclick = function () {
            // 如果当前按钮有播放按钮，证明点击要做的是播放
            if (this.classList.contains('fa-play')) {
                //让video播放
                video.play();
                // 播放以后要把图标改成暂停
                this.classList.replace('fa-play', 'fa-pause');
            } else {
                //当前是暂停的图标被点击
                //要让video暂停
                video.pause();
                //把图片换回播放
                this.classList.replace('fa-pause', 'fa-play');
            }
        }

        //全屏的点击事件
        document.getElementById('full').onclick = function () {

            // 这是一个实验室中的属性，意思就是还没加入到标准里
            // 但是已经筹划在下一个标准中要加入此功能，所以现在各大浏览器
            // 还仅仅只是处于测试这个功能的阶段，没有加入到正式使用，所以目前你没法使用
            // 现在还属于浏览器私有，我们程序员也可以用，只不过需要加入各大浏览器的内核前缀
            // 例如谷歌：webKit 
            // video.requestFullscreen();

            //要学会查阅文档，w3c mdn msdn
            // video.webkitRequestFullScreen();
            // video.webkitRequestFullscreen();
            // video.mozRequestFullScreen();
            // video.msRequestFullscreen();
            //能力检测
            if (video.webkitRequestFullScreen) {
                video.webkitRequestFullScreen();
            } else if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen();

            } else {
                video.msRequestFullscreen();
            }
        }
        //需要视频只要在播放，就不断的来调用的事件，在这个事件里计算进度条的值
        //视频播放时间改变的事件
        video.ontimeupdate = function () {
            //用当前时间 / 视频总时间 得到百分比， 再赋值给进度条
            son.style.width = video.currentTime / video.duration * 100 + "%";
        }


        //给进度条加点击事件
        progress.onclick = function (e) {

            e = e || window.event;

            // e.offsetX 这个案例里可以直接用
            //获得自身盒子相对于可视区域的x
            var rect = progress.getBoundingClientRect();

            var x = e.clientX - rect.x;

            //再用x除以自己的总宽度再乘以视频总时长就得到视频应该到的当前时间
            video.currentTime = x / progress.offsetWidth * video.duration;
        }

        range.onchange = function () {

            video.volume = this.value / 100;

        }
    },
    TravelSport: function () {

        $('.lock').prev().hide().prev().hide();
        $('.lock').on('tap', function () {
            $(this).next().show();
            setTimeout(function () {
                $('.lock').prev().show().prev().show().next().next().hide().next().hide();
            }, 2000)
        });
    }
}