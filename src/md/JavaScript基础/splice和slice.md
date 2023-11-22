

都是数组的方法

splice方法可以在数组中添加、删除、替换
返回被删除的数组
会改变原数组

slice从原数组中返回指定开始和结束位置的元素组成新数组
不会改变原数组


删除数组的最后一个元素
```js
const a = [1,2,3]
const newArr1 = a.pop()
const newArr2 = a.splice(-1,1)
const newArr3 = [...a.splice(0,-1)]
```
