

键的类型
Map的键是可以任何的数据类型
对象的键必须是字符串或者Symbol


键值对的顺序
Map是按照插入顺序的
Object是没有顺序的


大小的获取
Map提供了size属性
Object需要手动遍历
Object.keys()
Reflect.ownKeys

原型链
对象的键值可能存在原型链中
Map中的键值则不会受到原型链的影响


迭代器
Map提供了迭代器来遍历键值对
而对象需要手动遍历键值对