function debounce(fn, wait) {
    var timer = null;
    return function () {
        var context = this,
            args = [...arguments]
        if (timer) {
            clearTimeout(timer)
            timer = null;
        }
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
}