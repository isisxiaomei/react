>JSX转换可以使用babel插件：https://www.babeljs.cn/repl
# 1. 创建 React 元素
+ 本质： 每个 JSX 元素都是调用 React.createElement() 的语法糖
+ 注意组件的`key`属性是不会传递的
+ 方法： `createElement()`
+ 语法如下：一般在不使用`JSX`语法时使用
```js
// 语法：type可以是html标签, 或者React组件类型（class 组件或函数组件），或是 React fragment 类型
React.createElement(
  type,
  [props],
  [...children]
)
```
+ 原生的dom标签会被React.createElement解析为字符串
+ 自定义组件的首字母必须大写，否则React.createElement会把自定义组件当做原生dom字符串处理，否则报错
```js
// 示例1：
<div></div>
React.createElement("div", null);

// 示例2：
<div>hello</div>
React.createElement("div", null, "hello");

<div>Hello {this.props.toWhat}</div>
React.createElement('div', null, `Hello ${this.props.toWhat}`);


// 示例3：
<div id="div" key="Key">hello</div>
React.createElement(
    "div",
    { id: "div", key: "Key" },
    "hello"
);


// 示例4：
<div id="div" key="Key">
  <span>1</span>
  <span>2</span>
</div>

React.createElement(
    "div",
    { id: "div", key: "Key"},
    React.createElement("span", null, "1"),
    React.createElement("span", null, "2")
);


// 示例5：自定义组件首字母必须大写
function Comp(){
	return <a>123</a>
}
<Comp id="div" key="Key">
  <span>1</span>
  <span>2</span>
</Comp>

// 转换后：Comp首字母大写时会被当做自定义组件而非原生dom标签
function Comp() {
  return React.createElement("a", null, "123");
}
React.createElement(
    Comp,
    { id: "div", key: "Key"},
    React.createElement("span", null, "1"),
    React.createElement("span", null, "2")
);

// 示例6：自定义的组件必须大写开头，否则JSX转换成React.createElement会将组件认为是原生dom标签，所以显示comp为字符串
function comp(){
	return <a>123</a>
}
<comp id="div" key="Key">
  <span>1</span>
  <span>2</span>
</comp>

// 转换后
function comp() {
  return React.createElement("a", null, "123");
}

React.createElement("comp", {
  id: "div",
  key: "Key"
}, React.createElement("span", null, "1"), React.createElement("span", null, "2"));
```
+ 快捷方式
```js
// 示例1：
const e = React.createElement;
ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```

# 2. JSX的本质

```html
<!-- 示例1：使用JSX的前提是必须借助babel； -->
<body>
  <script
    src="https://unpkg.com/react@17/umd/react.development.js"
    crossorigin
  ></script>
  <script
    src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
    crossorigin
  ></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

  <script type="text/babel">
    // JSX -> babel -> React.createElement()
    // 如果我们直接使用msg2，则不需要引入babel.min.js，更加不需要在 type="text/babel"
    const msg1 = <div>hello</div>
    const msg2 = React.createElement("div", null, "hello")
    ReactDOM.render(msg1, document.getElementById("root"))
  </script>
</body>
```

真正环境中不会使用以上方式，因为太慢了还要加载；会直接使用babel的JSX预处理器`npm install babel-cli@6 babel-preset-react-app@3`，就像css预处理器一样

`https://babeljs.io/`

![](./image/babel转jsx.png)

# 3. createElement部分源码
