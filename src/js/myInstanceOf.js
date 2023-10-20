function myInstanceOf(obj, constructor) {
   //获取obj原型
   let proto = Object.getPrototypeOf( obj )
   while (proto) {
      if (proto === constructor.prototype) {
         return true;
      }
      //获取原型链上的下一个原型
      proto = Object.getPrototypeOf( proto )
   }
   return false;
}