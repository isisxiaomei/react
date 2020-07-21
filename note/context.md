# 1. context
+ 定义：Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法
+ 使用场景：Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言
+ 在组件树中`很多不同层级`的组件需要访问同样的一批数据时，用context是比较好的选择；Context 能让你将这些数据向组件树下所有的组件进行“广播”，所有的组件都能访问到这些数据，也能访问到后续的数据更新；具体看context的使用注意点
# 2. 简单示例
```js
// 示例1：未使用context需要为每层组件传递theme
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

```js
// 示例2：使用context
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

# 3. API
## 3.1 React.createContext
```js
// 创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值
// 注意点: 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效
// 注意点：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效
const MyContext = React.createContext(defaultValue);
```

## 3.2 Context.Provider
+ 注意点：当传递对象给 value 时，检测变化的方式会导致一些问题
```js
// 0、每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
// 1、Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据
// 2、当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染（Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数）
// 3、value对应的可以是一个普通值、对象、还可以传递函数
<MyContext.Provider value={/* 某个值 */}>

```
## 3.3 Class.contextType
+ 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中
```js
// 示例1：
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;  // 也可以直接在类中 static contextType = MyContext;
```
## 3.4 Context.Consumer
+ 基本使用
```js
// value值就是provider的value值
//传递给函数的 value 值等等价于组件树上方离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue
<MyContext.Consumer>
  {value => /* 组件*/}
</MyContext.Consumer>
```
+ 示例：
```js
// 示例1：透过父组件传值到孙组件
import React, { Component, createContext } from 'react';

const BatteryContext = createContext();

//声明一个孙组件
class Leaf extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {
          battery => <h1>Battery : {battery}</h1>
        }
      </BatteryContext.Consumer>
    )
  }
}

//声明一个子组件
class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class App extends Component {
  render(){
    return (
      <BatteryContext.Provider value={60}>
        <Middle />
      </BatteryContext.Provider>
    );
  }
}
export default App;
```
# 4. contextType和consumer的区别
+ 如果一个组件中只使用一个Context的话，就可以使用contextType代替Consumer; 所以他们的作用基本一样
+ 静态的Class.Context仅允许您订阅单个上下文；也就是说如果是需要消费多个context时，就不能使用contextType，因为contextType的静态类属性只有一个。


# 5. 消费多个context
+ 建立多个context
+ 消费多个context时，就不能使用contextType，因为contextType的静态类属性只有一个
```js
// 示例1：
// Theme context，默认的 theme 是 “light” 值
const ThemeContext = React.createContext('light');

// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```
# 6. context使用注意点
+ 1. provider传递value值是对象时，尽量将对象放在state中，因为只要value对象变化，provider下的consumer组件都会重新渲染
+ 2. Context 主要应用场景在于`很多不同层级`的组件需要访问同样一些的数据; 如果只是最底层需要应用时，没必要层层传递，因为这样很繁琐；可以采用组件组合的形式（当然组合也不是最好的，因为需要最底层的组件和直接父组件进行解耦）

```js
// 示例1：Page 组件，它层层向下传递 user 和 avatarSize 属性，从而深度嵌套的 Link 和 Avatar 组件可以读取到这些属性
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>


// 分析：如果在最后只有 Avatar 组件真的需要 user 和 avatarSize，那么层层传递这两个 props 就显得非常冗余。而且一旦 Avatar 组件需要更多从来自顶层组件的 props，你还得在中间层级一个一个加上去，这将会变得非常麻烦
```

```js
// 示例2：将 Avatar 组件自身传递下去，因而中间组件无需知道 user 或者 avatarSize 等 props
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}
```
# 参考：
+ https://www.cnblogs.com/littleSpill/p/11221538.html