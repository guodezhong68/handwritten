function mySetInterval(callback, userInterval) {
    const Time = Date.now;
    // 获取当前时间戳
    let startTime = Time()
    // 开始时间戳
    let currentTime;
    let myLoop = () => {
        currentTime = Time();
        let index = window.requestAnimationFrame(myLoop);
        // 判断当前时间
        if (currentTime - startTime >= userInterval) {
            startTime = currentTime = Time();
            //调用callback
            callback.call(null, index);
        }
    }
    return window.requestAnimationFrame(myLoop);
}