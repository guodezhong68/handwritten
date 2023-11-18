Array.prototype.myReduce = function (callBack, initialVal) {
    let accumulator = initialVal === undefined ? undefined : initialVal;
    for (let i = 0; i < this.length; i++) {
        if (accumulator === undefined) {
            accumulator = this[i]
        } else {
            accumulator = callBack(accumulator, this[i], this)
        }
    }
    return accumulator;
}