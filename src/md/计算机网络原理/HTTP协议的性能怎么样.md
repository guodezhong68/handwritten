
HTTP协议分为两种模式
一种是持续连接
服务器必须为每一个请求的对象建立和维护一个全新的连接

一种是非持续连接
持续连接下，tcp默认不关闭，多个请求复用
好处是可以避免每次建立tcp三次握手花费的时间



长连接
管道网络传输
队头阻塞