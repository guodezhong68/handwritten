##常见的垃圾回收算法
三大算法
1标记清除法
容易产生大量的内存碎片

2复制算法
复制需要时间
内存空间二等分，直接减少一半

3引用计数法
效率很高
高性能、实时回收
循环引用时不会被回收，造成内存泄漏

4标记压缩法
结合标记清除和复制算法的优点
但需要对整个堆做多次搜索，堆越大，耗时越多

5代际假设和分代收集
代际假说：对象的生存时间有两级分化的情况
分代收集：对不同分代实施不同的垃圾回收算法，以达到更高的效率


##javascript垃圾回收
1栈中垃圾回收
ESP：扩展栈指针寄存器
js在执行函数时，会将其上下文压入栈中，ESP上移，而当函数执行完成后，其执行上下文可以销毁了，此时仅需将ESP下移到下一个函数执行上下文即可，
当下一个函数入栈时，会将ESP以上的空间直接覆盖
js是通过下移ESP来完成栈的垃圾回收的

2堆中垃圾回收
需要用到js的垃圾回收器，使用到了分代收集的思想，分为新生代和老生代思想
新生代（复制算法）：用于存放生存时间短的对象，大多数新创建的小的对象都会被分配到该区域，该区域的垃圾回收会比较频繁。
老生代（标记压缩算法）：大的对象，新生代中经过两次垃圾回收后依然存活的对象


