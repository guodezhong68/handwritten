Function.prototype.myCall = function (_this = window, ...val) {
    _this[_this] = this;
    const result = _this[_this](...val);
    delete _this[_this];
    return result;
}
Function.prototype.myApply = function (_this = window, val) {
    _this[_this] = this;
    const result = _this[_this](...val);
    delete _this[_this];
    return result;
}
Function.prototype.myBind = function (_this = window, ...val) {
    _this[_this] = this;
    return function () {
        const result = _this[_this](...val);
        delete _this[_this];
        return result;
    }
}