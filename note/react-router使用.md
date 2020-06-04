# react-router4.0基本介绍
> react-router4.0 已经不再需要路由配置，一切都是组件
+ 1. react-router: 提供基础路由配置；包含基础api（Router、switch）
+ 2. react-router-dom：针对浏览器单页面开发定制的，包含`react-router`的功能，还提供其他功能（BrowserRouter、HashRouter、Router、Link、NavLink）
# 路由模块安装
+ `npm install react-router-dom --save`


# react-router-dom 核心用法
## 1. BrowserRouter和HashRouter
## 2. Router
> 注意：Router中只能包含一个组件
+ path：匹配的路由属性
+ exact：精准匹配
+ component：匹配路由之后的组件加载
+ render：类似组件的周期
## 3. Link和NavLink

## 4. Switch

## 5. redirect
+ <Redirect>组件用于路由的跳转，即用户访问一个路由，会自动跳转到另一个路由
```js
// 示例1：访问/inbox/messages/5，会自动跳转到/messages/5
<Route path="inbox" component={Inbox}>
  ＜Redirect from="messages/:id" to="/messages/:id" />
</Route>
```
# 路由属性值
+ 1. `this.props.children属性`：表示子组件

# 获取动态路由值
+ 1. `:paramName`动态路由：这个动态路由值可以通过`this.props.match.params.paramName`取出
+ 2. 通过`useParams`
```js
// 示例1：
import { useParams } from "react-router-dom";
<Route path="/:id" children={<Child />} />
let { id } = useParams();
```
# 获取查询参数
+ 1. `this.props.location.query.bar`: 可以获取 /foo?bar=baz 查询字符串


# 嵌套路由
+ `this.props.children`: 当app组件中不确定接下来展示什么子组件，使用this.props.children代替
```js
// 示例1：用户访问/repos时，会先加载App组件，然后在它的内部再加载Repos组件
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>

// App组件： App组件的this.props.children属性就是子组件
export default React.createClass({
  render() {
    return <div>
      {this.props.children}
    </div>
  }
})

// 相当于
<App>
  <Repos/>
</App>
```

```js
// 示例2：子路由可以使用render方法  render方法中的箭头函数体不需要大括号
<Router>
    <Home>
        <Switch>
            <Route path="/main" render = { () =>
                <Main>
                    <Route path="/main/a" component={Main}>
                </Main>
            } >
            <Route path="/about" component={About}>
            <Route exact={true} path="/about/abc" component={About}>
            <Route path="/dashboard" component={Dashboard}>
            <Route component={NoMatch}>
        </Switch>
    </Home>
</Router>
```
# 两种使用路由方式
## 1 路由组件混合
```js
// 示例1：
export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// 下面这3个组件分别写个页面

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
```
## 2 路由单独配置
```js
// 示例1：
// IRouter.js
<Router>
    <Home>
        <Route exact={true} path="/" component={Main}>
        <Route path="/about" component={About}>
        <Route path="/dashboard" component={Dashboard}>
    </Home>
</Router>

// Home.js
<div>
    <ul>
        <li>
            <Link to="/">Main</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
        <li>
            <Link to="/dashboard">Dashboard</Link>
        </li>
    </ul>
    <hr />
    {this.props.children}
</div>
```

# 404路由
+ 不写path, 直接写component
```js
// 示例1：
<Router>
    <Home>
        <Switch>
            <Route path="/main" render = { () =>
                <Main>
                    <Route path="/main/a" component={Main}>
                </Main>
            } >
            <Route path="/about" component={About}>
            <Route exact={true} path="/about/abc" component={About}>
            <Route path="/dashboard" component={Dashboard}>
            <Route component={NoMatch}>
        </Switch>
    </Home>
</Router>
```