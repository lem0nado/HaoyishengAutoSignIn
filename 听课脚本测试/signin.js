// 编写一个能在浏览器控制台上运行的脚本，需要实现的功能如下：
// 每三十秒检测一次，当页面出现layer弹窗时，将弹窗关闭
// 在layer检测的十秒后，点击内容为“签到”的按钮

for (let i = 0; i < 10000; i++) {
    setTimeout(function () {
        if (document.getElementsByClassName('layui-layer-btn0').length > 0) {
            document.getElementsByClassName('layui-layer-btn0')[0].click();
            console.log("成功关闭layer")
        }
        else {
            console.log("没找到弹窗" + i)
        }
    }, i * 30000);
    setTimeout(function () {
        if (document.getElementsByClassName('btn btn-info js-ajax-submit').length > 0) {
            document.getElementsByClassName('btn btn-info js-ajax-submit')[0].click();
        }
    }, i * 30000 + 10000);
}


for (let i = 0; i < 10000; i++) {
    setTimeout(function () {
        if (document.getElementsByClassName('btn btn-info js-ajax-submit').length > 0) {
            document.getElementsByClassName('btn btn-info js-ajax-submit')[0].click();
            console.log("成功点击签到")
        }
        else {
            console.log("没找到签到按钮" + i)
        }
        window.alert = function (s) { // 成功禁止弹窗
            console.log(s);
        };
    }, i * 3000);
}

for (let i = 0; i < 10000; i++) {
    setTimeout(function () {
        if (document.getElementsBy) {
            document.getElementsByClassName('layui-layer-btn0')[0].click();
            console.log("成功点击签到")
        }
        else {
            console.log("没找到签到按钮" + i)
        }
        window.alert = function (s) { // 成功禁止弹窗
            console.log(s);
        };
    }, i * 3000);
}

// 最终成果
for (let i = 0; i < 10000; i++) {
    // 实际应用时网页弹出了一个新html文档，签到button在新文档上，无法通过以下代码搜索到元素，进行修改
    setTimeout(function () {
        if (document.getElementsByClassName('btn btn-info js-ajax-submit').length > 0) {
            document.getElementsByClassName('btn btn-info js-ajax-submit')[0].click();
            console.log("成功点击签到1");
        }
        else if (document.getElementsByTagName('button').length > 0) {
            document.getElementsByTagName('button')[0].click();
            var btn = document.getElementsByTagName('button')[0];
            console.log(btn.innerText);
            console.log("成功点击签到2");
        }
        else if (document.getElementsByClassName('js-ajax-form').length > 0) {
            var form = document.getElementsByClassName('js-ajax-form')[0];
            form.submit();
            console.log("成功传送表单");
        }
        // 自动点击iframe中的签到按钮
        else if (document.getElementsByTagName('iframe').length > 0) {
            var iframe = document.getElementsByTagName('iframe')[0];
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc.getElementsByClassName('btn btn-info js-ajax-submit').length > 0) {
                iframeDoc.getElementsByClassName('btn btn-info js-ajax-submit')[0].click();
                console.log("成功点击签到3");
            }
            else if (iframeDoc.getElementsByTagName('button').length > 0) {
                iframeDoc.getElementsByTagName('button')[0].click();
                console.log("成功点击签到4");
            }
            else {
                console.log("没找到签到按钮" + i);
            }
        }
        else {
            console.log("没找到签到按钮" + i);
        }
        window.alert = function (s) { // 成功禁止弹窗
            console.log(s);
            console.log("已捕获弹窗!");
            // 使浏览器标签在任务栏中闪烁
            var title = document.title;
            var timer = null;
            timer = setInterval(function () {
                document.title = document.title == '【　　　】' ? '【新消息】' : '【　　　】';
            }
                , 1000);
            setTimeout(function () {
                clearInterval(timer);
                document.title = title;
            }
                , 5000);
        };
    }, i * 10000);
}