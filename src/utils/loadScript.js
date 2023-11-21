function loadScript(url, callback) {
    //url是按需加载的js文件
    //callback是按需加载的js文件中某个函数

    // 1. 创建一个script标签
    var script = document.createElement('script');
    // 处理ie的兼容
    if (script.readyState) {
        script.onreadystatechange = function () {
            // 如果script已经下载完成
            if (script.readyState == 'complete' || script.readyState == 'loaded') {
                callback();
            }
        }
    } else {
        // 监听script的下载的状态 当状态变为下载完成后 再执行callback
        script.onload = function () {
            callback();
        }
    }
    //在后面引入的目的是如果在IE上如果下载太快（比读程序还快）
    //IE的readystatechange 事件检测状态码的时候，它早已经从loading变成complete或者loaded（以极快的速度加载完了文件，你还没来得及检测）
    // 那你再检测它就不会变了，它一直都是complete或者loaded
    //这个时候就是马后炮了，检测也没用了。
    // 2. 给script标签添加src 引入一个js文件
    script.src = url;
    // 3. 追加到body
    document.body.appendChild(script);
}