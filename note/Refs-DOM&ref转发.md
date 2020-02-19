<!-- TOC -->

- [Refs简介](#refs简介)
- [ref使用3大原则](#ref使用3大原则)
- [ref的创建](#ref的创建)
- [访问ref（两种方式）](#访问ref两种方式)
    - [方式1访问ref](#方式1访问ref)
        - [ref关联dom元素](#ref关联dom元素)
        - [ref关联类组件](#ref关联类组件)
        - [ref不能关联函数组件（可以关联函数组件的dom元素，也就是关联dom元素）](#ref不能关联函数组件可以关联函数组件的dom元素也就是关联dom元素)
    - [方式2回调访问ref](#方式2回调访问ref)
- [ref组件间传递](#ref组件间传递)
- [ref转发](#ref转发)

<!-- /TOC -->
# Refs简介
+ react通常操作子组件都是通过`props`属性传值进行操作；不使用props时，可以使用ref属性来操作子组件。简而言之`ref`就是组件自己的实例属性，然后将创建出来的ref实例属性跟想要操作的子元素（html元素）或者子组件（类组件）关联起来，这样就可以通过ref属性获取到关联的子元素或者子节点。

# ref使用3大原则
+ 1. 类组件可以使用
+ 2. dom元素可以使用
+ 3. 在函数组件上不可以使用（因为ref是实例属性，函数组件没有实例），但在函数组件内部可以使用（比如对函数组件内部的dom元素使用）

# ref的创建
+ 通过顶层api`React.createRef()`创建
```js
// 示例1：
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```
# 访问ref（两种方式）
+ 方式1： `const node = this.myRef.current;`
  - 解析：当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问
  - 注意点：ref的值根据节点的类型不同而不同
+ 方式2：`ref={ (element) => {} }`
  - 解析：通过回调函数的形式访问, 回调函数接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问
## 方式1访问ref
### ref关联dom元素
+ ref关联`html元素`时通过`this.myRef.current`获取到的是当前的`dom节点`
```js
// 示例1：
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "this.textInput.current" 获取到当前ref关联的dom节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input  type="text" ref={this.textInput} />
        <input type="button" onClick={this.focusTextInput} />
      </div>
    );
  }
}
```
### ref关联类组件
+ ref关联`类组件`时通过`this.myRef.current`获取到的是当前的`类的实例对象`
```js
// 示例1：
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    //   此时通过 this.textInput.current  获取到的是ref关联的类组件的实例，所以可以调CustomTextInput的方法
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

### ref不能关联函数组件（可以关联函数组件的dom元素，也就是关联dom元素）

```js
// 示例1：ref不能关联在函数组件上
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // This will *not* work!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}


// 示例2：关联函数组件内部dom元素
function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 才可以引用它
  let textInput = React.createRef();

  function handleClick() {
    textInput.current.focus();
  }
  return (
    <div>
      <input
        type="text"
        ref={textInput} />

      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```

## 方式2回调访问ref
> react16.2及以下一般用它
+ 语法：`ref={ (element) => {} }`
```js
// 示例1：
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    // 这里ref的回调函数参数是dom元素
    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }

  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```
# ref组件间传递
+ ref组件间传递说明： 使用回调函数在组件
```js
// 示例1：ref回调传递
// ref的传递可以使得父组件拿到子组件或者子组件的dom节点
// 解析： 注意这里将回调函数传给子组件时需要确保回调函数的内部this是指向父组件的；老规矩两种方式，一种直接使用箭头函数，另一种传递时进行bind动态绑定
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
        super(props);
        this.inputElement = null;
    }
    componentDidMount(){
      // 此时Parent的 this.inputElement 指向 CustomTextInput组件的input节点
        console.dir(this.inputElement);
    }
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}

// 示例2：
function CustomTextInput(props) {
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.inputElement = null;
        // 动态绑定ref的回调函数
        this.callbackfun = this.callbackfun.bind(this);
    }
    componentDidMount(){
      // 此时Parent的 this.inputElement 指向 CustomTextInput组件的input节点
        console.dir(this.inputElement);
    }
    callbackfun(ele){
        this.inputElement = ele;
    }
    render() {
        return (
            <CustomTextInput
                inputRef={this.callbackfun}
            />
        );
    }
}
export default Parent;
```
# ref转发
+ 区别：转发和
