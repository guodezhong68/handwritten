Function.prototype.myApply = function (_this = window, val)
Function.prototype.myCall = function (_this = window, ...val)
第一个参数都是改变this的指向
第二个参数apply传的是带下标的数组，call传入的参数不固定
call的性能好，因为传入的格式就是内部需要的格式
