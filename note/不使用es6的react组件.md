# es6的class定义组件和createReactClass定义组件
```js
// es6的class定义组件
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// 如果还未使用过 ES6，我们可以使用 create-react-class 模块：
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```
# class定义组件和createReactClass定义组件区别
## 区别点1：声明默认属性(defaultProps)
+ 无论是函数组件还是 class 组件，都拥有 `defaultProps` 属性；（`defaultProps`是类的属性，不是实例的属性, 作用是：一般用于 props 未赋值并且不为 null时，defaultProps的值就是props的默认值）
```js
// class定义组件声明 defaultProps
class Greeting extends React.Component {
  // ...
}

Greeting.defaultProps = {
  name: 'Mary'
};

// 使用 createReactClass() 方法创建组件，那就需要在组件中定义 getDefaultProps() 函数
var Greeting = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  },
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```
## 区别点2：初始化State
```js
// class定义组件可以直接给state赋值
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
}

// createReactClass()创建的组件，需要提供一个单独的 getInitialState()，让其返回初始 state
var Counter = createReactClass({
  getInitialState: function() {
    // 这里返回的就是state对象的初始状态
    return {count: this.props.initialCount};
  },
  // ...
});
```
## 区别点3：自动绑定
```js
// class定义组件，组件中的回调方法需要在constructor 中显式地调用 .bind(this)


// 如果使用 createReactClass() 方法创建组件，组件中的方法会自动绑定至实例
var SayHello = createReactClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },

  handleClick: function() {
    alert(this.state.message);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
});
```