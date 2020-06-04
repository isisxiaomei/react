# 概览
+ 在 React.Component 的子类中有个必须定义的 render() 函数；其他方法均为可选
```js
// 示例1：
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
# 其他APIs
## setState()
+ `setState(updater[, callback])`
+ 背景：setState() 并不总是立即更新组件。它会批量推迟更新。这使得在调用 setState() 后立即读取 this.state 成为了隐患；为了消除隐患，请使用 componentDidUpdate 或者 setState 的回调函数（setState(updater, callback)），这两种方式都可以保证在应用更新后触发
+ 参数：
    - 1. updater：是回调函数；`(state, props) => stateChange`
        - updater 函数中接收的 state 和 props 都保证为最新。updater 的返回值会与 state 进行浅合并
    - 2. setState() 的第二个参数为可选的回调函数，它将在 setState 完成合并并重新渲染组件后执行。通常，我们建议使用 componentDidUpdate() 来代替此方式
```js
// 示例1：updater 函数中接收的 state 和 props 都保证为最新。updater 的返回值会与 state 进行浅合并
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```
+ `setState()`: 第一个参数除了接受函数外，还可以接受对象类型
```js
// 示例1：
this.setState({quantity: 2})
```
## forceUpdate()
+ 默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染
+ 语法：`component.forceUpdate(callback)`
+ 注意点：调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM

# Class 属性
## defaultProps属性
+ 概念：`defaultProps` 可以为 Class 组件添加**默认** props。这一般用于 props 未赋值，但又不能为 null 的情况
```js
// 示例1: defaultProps是类的属性
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};


// 示例2：如果未提供 props.color，则默认设置为 'blue'
render() {
    return <CustomButton /> ; // props.color 将设置为 'blue'
}


// 示例3：如果 props.color 被设置为 null，则它将保持为 null
 render() {
    return <CustomButton color={null} /> ; // props.color 将保持是 null
  }
```
## displayName属性
+ 一般用于调试相关

# 实例属性
## props属性
+ this.props 包括被该组件调用者定义的 props
+ 特别注意，this.props.children 是一个特殊的 prop，通常由 JSX 表达式中的子组件组成，而非组件本身定义
## state属性
+ 组件中的 state 包含了随时可能发生变化的数据。state 由用户自定义，它是一个普通 JavaScript 对象
