
es6新增的基础数据类型，主要作用就是创建一个唯一的标识符
用于对象属性名的命名，常量的定义等场景

独一无二的

值得注意
symbol不会出现在for in，for of，Object.keys()，
Object.getOwnPropertyNames()等遍历对象方法中，
因此可以用来定义一些不希望被遍历到的属性，
例如一些内部实现细节或隐藏属性

会出现在Reflect.ownKeys()中
返回所有键，包括symbol
