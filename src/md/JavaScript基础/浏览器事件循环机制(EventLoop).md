
js是单线程任务
在执行同步代码时，如果碰到异步事件，js引擎不会一直等待事件结果，
而是会将事件挂起，继续执行其他任务。
当异步事件执行完毕后，再将异步事件回调加入到事件队列中等待执行。

任务队列分为宏任务和微任务，
宏任务、微任务循环执行


宏任务：
script、setTimeout、setInterval、
I/O操作、UI交互事件、setImmediate（nodejs环境）


微任务：
Promise回调、node中的process.nextTick、
对Dom变化监听的MutationObserver