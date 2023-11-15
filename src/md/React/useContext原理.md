
provider 作用：
value 属性传递 context，供给 Consumer 使用。
value 属性改变，ThemeProvider 会让消费 Provider value 的组件重新渲染。
Provider 特性总结：
Provider 作为提供者传递 context ，provider中value属性改变会使所有消费context的组件重新更新。
Provider可以逐层传递context，下一层Provider会覆盖上一层Provider。


类组件的静态属性上的 contextType 属性，指向需要获取的 context（ demo 中的 ThemeContext ），就可以方便获取到最近一层 Provider 提供的 contextValue 值
useContext 接受一个参数，就是 context 对象 ，返回一个 value 值，就是最近的 provider 提供 contextValue 值
Consumer 订阅者采取 render props 方式，接受最近一层 provider 中value 属性，作为 render props 函数的参数，可以将参数取出来，作为 props 混入 ConsumerDemo 组件，说白了就是 context 变成了 props。
总结：在 Provider 里 value 的改变，会使引用①contextType,②useContext 消费该 context 的组件重新 render ，同样会使 ③Consumer 的 children 函数重新执行，与前两种方式不同的是 Consumer 方式，当 context 内容改变的时候，不会让引用 Consumer 的父组件重新更新。


如何阻止 Provider value 改变造成的 children 不必要的渲染？
第一种就是利用 memo，pureComponent 对子组件 props 进行浅比较处理。
const Son = React.memo(()=> <ConsumerDemo />)
第二种就是 React 本身对 React element 对象的缓存。React 每次执行 render 都会调用 createElement 形成新的 React element 对象，如果把 React element 缓存下来，下一次调和更新时候，就会跳过该 React element 对应 fiber 的更新。
<ThemeProvider value={ contextValue } >
{ React.useMemo(()=>  <Son /> ,[]) }
</ThemeProvider>


context 与 props 和 react-redux 的对比？
context 相比较 props 解决了：
解决了 props 需要每一层都手动添加 props 的缺陷
解决了改变 value ，组件全部重新渲染的缺陷
react-redux 就是通过 Provider 模式把 redux 中的 store 注入到组件中的


Proider 通过什么手段传递 context value？
通过挂载 context 的 _currentValue 属性


Context 原理
Provider 传递流程：
Provider 的更新，会 深度遍历子代 fiber，消费 context 的 fiber 和父级链都会 提升更新优先级。 对于类组件的 fiber ，会 forceUpdate 处理。接下来所有消费的 fiber，都会 beginWork 。
Context 订阅流程： 
contextType ， useContext， Consumer 会内部调用 readContext ，readContext 会把 fiber 上的 dependencies 属性 和 context 对象 建立起关联。



```js
const ThemeContext = React.createContext(null) //创建context对象
const ThemeProvider = ThemeContext.Provider  //提供者
const ThemeConsumer = ThemeContext.Consumer // 订阅消费者
```

父组件
```js
const ThemeContext = React.createContext(null) //创建context对象
const ThemeProvider = ThemeContext.Provider  //提供者
export default function ProviderDemo(){
const [ contextValue , setContextValue ] = React.useState({  color:'#ccc', background:'pink' })
return <div>
<ThemeProvider value={ contextValue } >
<Son />
</ThemeProvider>
</div>
}
```

子组件
```js
const ThemeContext = React.createContext(null)
// 类组件 - contextType 方式
class ConsumerDemo extends React.Component{
   render(){
       const { color,background } = this.context
       return <div style={{ color,background } } >消费者</div> 
   }
}
ConsumerDemo.contextType = ThemeContext

const Son = ()=> <ConsumerDemo />
```
```js
const ThemeContext = React.createContext(null)
// 函数组件 - useContext方式
function ConsumerDemo(){
    const  contextValue = React.useContext(ThemeContext) 
    const { color,background } = contextValue
    return <div style={{ color,background } } >消费者</div> 
}
const Son = ()=> <ConsumerDemo />
```
```js
const ThemeContext = React.createContext(null)
const ThemeConsumer = ThemeContext.Consumer // 订阅消费者
function ConsumerDemo(props){
    const { color,background } = props
    return <div style={{ color,background } } >消费者</div> 
}
const Son = () => (
    <ThemeConsumer>
       { /* 将 context 内容转化成 props  */ }
       { (contextValue)=> <ConsumerDemo  {...contextValue}  /> }
    </ThemeConsumer>
)
```