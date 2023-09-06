function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left),//获取对象的原型
        prototype = right.prototype;// 获取构造函数的原型

    // 判断构造函数的prototype对象是否在对象的原型链上
    while (true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}