

http1中默认每次请求、应答，客户端和服务端都要新建一个连接，完成之后立即断开连接
称为短连接，使用keep-alive时使客户端和服务端的连接长期有效，
避免了建立或者重新建立连接，称为长连接


http1默认没有使用keep-alive模式，
需要手动配置Connection:keep-alive
断开需要发送Connection:close
http1.1默认使用keep-alive模式

Connection
/kəˈnekʃ(ə)n/
