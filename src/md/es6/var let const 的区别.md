var会变量提升，let const 不会变量提升，所以存在暂时性死区
var在全局命名的变量会挂载在window上，let const 不会
let和const有块级作用域，var没有
var可以重复声明，let const 不允许重复声明
let声明的变量可以改变， const 不行
var和let可以不用设置初始值，const不行
let可以改变指针的指向，const不可以