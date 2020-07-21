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

# 高阶组件中ref不会被传递
+ 背景：虽然高阶组件的约定是将所有 props 传递给被包装组件，但这对于 refs 并不适用。那是因为 ref 实际上并不是一个 prop - 就像 key 一样，它是由 React 专门处理的。如果将 ref 添加到 HOC 的返回组件中，则 ref 引用指向容器组件，而不是被包装组件
+ 解决办法：通过`React.forwardRef`方式转发ref就行

# ref转发
+ Refs 转发：将父组件创建的 ref 传递给子组件的某个dom元素（或组件）。让父组件可以直接操作该dom元素（或组件）
+ ref转发和不转发的区别和联系：
  - 区别：`ref转发父子组件之间从头到尾是一个ref`；ref不转发时，父组件直接操作子组件dom可以通过在子组件内创建新的ref并绑定到dom元素上，此时父组件通过自己的ref获取到子组件的实例，再通过子组件的实例的自己的ref操作到子组件的dom元素；
+ 当存在高阶组件时，使用`React.forwardRef`转发
+ ref转发和ref传递基本一样，为什么还需要`React.forwardRef`转发；不使用ref转发的时候父子组件通信采用props传递的方式绑定ref；但是这种方式在高阶组件中就不行了，因为高阶组件不传递ref属性（ref属性被react单独管理）；所以需要用到`React.forwardRef`转发
```js
// 示例0：
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


// 示例1：
class InputChild extends React.Component{
  constructor(){
    super()
    this.inputRef = React.createRef()
  }
  render(){
    return (
      <input ref={this.inputRef}></input>
    )
  }
}
class App extends React.Component {
  constructor() {
    super()
    this.icRef = React.createRef();
  }
  render () {
    <InputChild ref={this.icRef}>Click me!</InputChild>;
  }
}
this.icRef.current.inputRef.current.focus() // input 获取焦点


// 示例2：ref转发
const InputChild = React.forwardRef((props, ref) => (
  <input ref={ref}>
  </input>
));
class App extends React.Component {
  constructor() {
    super()
    this.icRef = React.createRef();
  }
  handleClick = () => {
    this.icRef.current.focus()
  }
  render () {
     <>
      <button onClick={this.handleClick}>Learn React</button>
      <InputChild ref={this.icRef}>Click me!</InputChild>;
     </>
  }
}
```

# ref转发解析
+ 逐步解析：
  1. 我们通过调用 `React.createRef` 创建了一个 `React ref` 并将其赋值给 `ref` 变量。
  2. 我们通过指定 `ref `为 JSX 属性，将其向下传递给 `<FancyButton ref={ref}>`。
  3. React 传递 `ref` 给 `forwardRef` 内函数 `(props, ref) => ...，`作为其第二个参数。
  4. 我们向下转发该 `ref` 参数到 `<button ref={ref}>`，将其指定为 JSX 属性。
  5. 当 `ref` 挂载完成，`ref.current` 将指向 <button> DOM 节点。
+ 注意点：
```js
`forwardRef` 内函数 `(props, ref) => ...，`第二个参数 ref 只在使用 React.forwardRef `定义组件`时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。
Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。
```
```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;

// 这样，使用 FancyButton 的组件可以获取底层 DOM 节点 button 的 ref
```

# 高阶组件转发ref
```js
// logProps高阶组件
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return LogProps;
}

// 被包装组件
class FancyButton extends React.Component {
  focus() {
    // ...
  }

  // ...
}
// 我们导出 LogProps，而不是 FancyButton。
// 虽然它也会渲染一个 FancyButton。
export default logProps(FancyButton);


// ref转发过程
import FancyButton from './FancyButton';
const ref = React.createRef();
// 我们导入的 FancyButton 组件是高阶组件（HOC）LogProps。
// 尽管渲染结果将是一样的，
// 但我们的 ref 将指向 LogProps 而不是内部的 FancyButton 组件！
// 这意味着我们不能调用例如 ref.current.focus() 这样的方法
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;

// ref转发过程
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }
  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```

