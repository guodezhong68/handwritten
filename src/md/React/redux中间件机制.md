redux中间件是在派发一个action和该action被redux处理之间执行的函数
中间件可以拦截、解释或更改这些actions，并在某些情况下在到达reducer之前对他们进行操作
使用Redux中间件可以实现诸如异步操作、日志记录、异常处理等功能

Redux中间件机制是通过对dispatch函数进行包装来实现的

```js
const middleware = store => next => action => {
    // 这里可以对action进行处理
    // 将action传递给下一个中间件或reducer
    return next(action)
}
```

在redux中，可以通过applyMiddleware函数将中间件添加到store中，
applyMiddleware接受一组中间件函数作为参数，并返回一个增强版的createStore函数
这个函数会对dispatch函数进行包装

```jsx
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const middleware = [thunk]
const store = createStore(
    reducer,
    applyMiddleware(...middleware)//应用中间件
)
```