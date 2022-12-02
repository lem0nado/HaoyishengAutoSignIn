for (let i = 0; i < 10000; i++) {
    setTimeout(function () {
        if (document.getElementsByTagName('iframe').length > 0) {
            var iframe = document.getElementsByTagName('iframe')[0];
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc.getElementsByClassName('btn btn-info js-ajax-submit').length > 0) {
                iframeDoc.getElementsByClassName('btn btn-info js-ajax-submit')[0].click();
                console.log("成功点击签到!");
            }
            else {
                console.log("出错了");
            }
        }
        else {
            console.log("没找到签到按钮" + i);
        }
        // 禁止弹窗
        window.alert = function (s) {
            console.log(s);
            console.log("已捕获弹窗!");
            // 使浏览器标签在任务栏中闪烁
            var title = document.title;
            var timer = null;
            timer = setInterval(function () {
                    document.title = document.title == '【　　　】' ? '【新消息】' : '【　　　】';
                }, 1000);
            setTimeout(function () {
                    clearInterval(timer);
                    document.title = title;
                }, 5000);
        };
    }, i * 10000);
}