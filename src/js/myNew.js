function myNew(Constructor, ...args) {
   //创建一个空对象
   var obj = Object.create( Constructor.prototype )
   //将构造函数绑定的this绑定到该空对象上
   var result = Constructor.apply( obj, args )
   //构造函数有显式则返回该对象，否则返回空对象
   return ( typeof result === 'object' && result !== null ) ? result : obj;
}
// 该实现并不完整，它没有处理构造函数的原型链和arguments对象等细节
// 概念：创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例