# 组件
+ 概念: 可以通过子类 React.Component 或 React.PureComponent 来定义 React 组件
## React.Component
+ 作用：React.Component 是使用 ES6 classes 方式定义 React 组件的基类；获取与基类 React.Component 相关方法和属性
```js
// 示例1：
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
## React.PureComponent
+ 作用：`React.PureComponent 与 React.Component` 很相似。两者的区别在于 `React.Component` 并未实现 `shouldComponentUpdate()`, 而`React.PureComponent` 中`以浅层对比prop 和 state` 的方式来实现了该函数。（注意浅层对比是prop和state结构相对简单时可以对比，复杂时对比结果可能不准确，需要采用`forceUpdate()`）
+ 优点：如果 React 组件有相同的 props 和 state，render() 函数会渲染相同的内容，那么在某些情况下使用 React.PureComponent 可提高性能

## React.memo
+ React 组件也可以被定义为可被包装的函数

# 创建 React 元素
+ 本质： 每个 JSX 元素都是调用 React.createElement() 的语法糖
+ 方法： `createElement() & createFactory()`
## createElement()
+ 语法如下：一般在不使用`JSX`语法时使用
```js
// 语法：type可以是html标签, 或者React组件类型（class 组件或函数组件），或是 React fragment 类型
React.createElement(
  type,
  [props],
  [...children]
)
```
```js
// 示例1：使用JSX
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}
ReactDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
);

// 不使用JSX
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}
ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```
## createFactory()
+ 基本已经废弃，建议使用createElement

# 转换元素
+ React 提供了几个用于操作元素的 API
## cloneElement()
```js
```
## isValidElement()
+ 作用： 验证对象是否为 React 元素，返回值为 true 或 false
+ 语法： `React.isValidElement(object)`

## React.Children
+ 作用： React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法
+ 1. `React.Children.map(children, function[(thisArg)])`
    - 注意点：如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数；如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组
    - 注意点：如果 children 是一个 Fragment 对象，它将被视为单一子节点的情况处理，而不会被遍历
```js
// 示例1：React.Children.map
React.Children.map(this.props.children, function (child) {
    return <li>{child}</li>;
})
```
+ 2. `React.Children.forEach(children, function[(thisArg)])`
    - 与 React.Children.map() 类似，但它不会返回一个数组

+ 3. `React.Children.count(children)`
    - 返回 children 中的组件总数量，等同于通过 map 或 forEach 调用回调函数的次数
+ 4. `React.Children.only(children)`
    - 验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误
    - React.Children.only() 不接受 React.Children.map() 的返回值, 因为它是一个数组而并不是 React 元素。

+ 5. `React.Children.toArray(children)`
    - 将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key

# React.Fragment
+ 概念： React.Fragment 组件能够在不额外创建 DOM 元素的情况下，让 render() 方法中返回多个元素
+ 组件： `React.Fragment`
+ 简写语法：`<></>`

```js
// 示例1：
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```
# Refs
+ 方法：`React.createRef & React.forwardRef`
+ 概念：Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素
## React.createRef
+ React.createRef 创建一个能够通过 ref 属性附加到 React 元素的 ref。
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```
## React.forwardRef
```js
```


# Suspense
+ 概念： Suspense 使得组件可以“等待”某些操作结束后，再进行渲染。目前，Suspense 仅支持的使用场景是：通过 React.lazy 动态加载组件。它将在未来支持其它使用场景，如数据获取等。
+ 方法： `React.lazy & React.Suspense`
## React.lazy
```js
```
## React.Suspense
```js
```
# Hook
+ 见react-hook文章