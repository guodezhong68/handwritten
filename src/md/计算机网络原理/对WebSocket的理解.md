

```js
let ws = new WebSocket('ws://localhost:8080')
//建立连接后触发
ws.onopen = function () {

}
//服务端给客户端发来消息后触发
ws.onmessage = function () {

}
//连接关闭后触发
ws.onclose = function () {
    
}
```

WebSocket是HTML5提供的一种浏览器与服务器进行全双工通讯的网络技术，属于应用层协议
它基于TCP传输协议，复用HTTP握手通道，浏览器与服务器只需要完成一次握手，
两者之间就可以直接创建持久性连接，并进行双向数据传输

最大的特点：
服务器可以向客户端主动推送消息，客户端也可以主动给服务端推送消息

原理：
客户端向WebSocket服务器通知一个带所有接收者ID的事件，
服务器接收后立即通知所有活跃的客户端，只有ID在接收者ID序列中的客户端才会处理这个事件
