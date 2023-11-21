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
//原理：用于检测构造函数prototype属性是否出现在某个实例对象的原型链上
//只能检查对象，不能用于检查基本类型（字符串、数字）
//缺点：层级比较深时，检查效率就会比较低下