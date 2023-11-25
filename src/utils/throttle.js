//时间戳版本
function throttle1(fn, delay) {
    var preTime = Date.now();
    return function () {
        var context = this,
            args = [...arguments],
            nowTime = Date.now();
        if (nowTime - preTime >= delay) {
            preTime = Date.now();
            return fn.apply(context, args);
        }
    }
}

//定时器版本
function throttle2(fn, delay) {
    let timeout = null;
    return function () {
        let context = this;
        let args = [...arguments];
        if (!timeout) {
            timeout = setTimeout(() => {
                fn.apply(context, args);
                timeout = null;
            }, delay)
        }
    }
}