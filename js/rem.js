setNowFontSize();
    function setNowFontSize() {
        var StandardWidth = 375;
        var StandardFontSize = 100;
        var nowWidth = document.documentElement.offsetWidth;
        var nowFontSize = nowWidth / StandardWidth * StandardFontSize;
        document.documentElement.style.fontSize = nowFontSize + 'px';
    }
    window.addEventListener('resize', setNowFontSize);