# react-router4.0基本介绍
> react-router4.0 已经不再需要路由配置，一切都是组件
+ 1. react-router: 提供基础路由配置；包含基础api（Router、switch）
+ 2. react-router-dom：针对浏览器单页面开发定制的，包含`react-router`的功能，还提供其他功能（BrowserRouter、HashRouter、Router、Link、NavLink）
# 路由模块安装
+ `npm install react-router-dom --save`


# react-router-dom 核心用法
## 1. BrowserRouter和HashRouter
+ BrowserRouter和HashRouter: 相当于路由器，路由容器，并且只能包含一个组件
```js
// todo 两着区别
HashRouter：说明底层用的是hashchange的方式（url中会带）；而BrowserRouter用的是history的pushState的方式
```
## 2. Route
### 2.1 Route简介
+ 使用Route定义路由映射表，规定路由映射必须放在路由器中；
```js
// 示例1：
// path：表示要跳转的路径  component表示要渲染的页面或者组件
<Router path="/xx/xxx" component={App}/>
```
### 2.2 Route属性
+ path：表示要跳转的路径
+ component：表示要渲染的页面或者组件
+ render：是一个函数式组件，当前url和path匹配的时候，就会加载该函数式组件（注意跟component的区别）
```js
// 示例1：基本使用
<Router path="/xx/xxx" render={ ()=>{
    return (
      <div>要渲染的组件</div>
    );
} }/>

// 示例2：使用react-router时，无论是函数组件还是类组件，props里面都会包含一些东西，里面是当前地址的url信息
<Router path="/xx/xxx" render={ (props)=>{
    console.log(props);
    // 1. history主要做函数式导航跳转，比如在二级路由想跳转到首页
    // 2. location表示url地址信息
    // 3. match表示路由传参相关，路由url传递的参数，在match里面
    return (
      <div>要渲染的组件</div>
    );
} }/>


// 示例3：component和render的区别
<Route path="/login" component={Login} />
<Route path="/admin" render={() =>
    <Admin>
        <Switch>
            <Route path="/admin/ui/buttons" component={Buttons} />
            <Route path="/admin/ui/modals" component={Modals} />
            <Route component={NoMatch} />
        </Switch>
    </Admin>
} />
```
+ exact：精准匹配；Route的path必须和url完全匹配，一模一样（示例见switch）


## 3. Link和NavLink
+ link：相当于a标签的锚点超链接，用于路由跳转`<a href="#/home">首页</a>`
```js
// 示例1：
// 解析：此时需要手动在地址栏输入/home,才能跳转，如果想手动点击超链接然后自动跳转路由，可以使用link在页面做个超链接，点击之后直接跳转到路由
// to表示点击首页之后，跳转到/home路由
<Link to="/home">首页</Link>
<Link to="/news">新闻</Link>
<HashRouter>
    <Route path="/home" component={Home}/>
    <Route path="/news" component={News}/>
</HashRouter>
```
+ NavLink： 也是路由跳转, 有更多其他属性，比如被选中时显示颜色
## 4. Switch
+ switch: 从上到下只要匹配到就停止，不会再向下匹配了
+ react-router中的路由匹配规则是从上到下全部匹配一遍，如果能匹配上就渲染出来，不会终止；Route中的path只要能在url中找的到，就算匹配
```js
// 示例1：Route中的path只要能在url中找的到，就算匹配
// 解析：此时地址栏出现 /home 时，路由第一行的 / 被 /home 中的 / 完全匹配；/home也能匹配路由中的第二行/home，所以此时/路由和/home路由都会被渲染
<HashRouter>
    <Route path="/" component={Home}/>
    <Route path="/home" component={Home}/>
    <Route path="/news" component={News}/>
</HashRouter>

// 解决办法：利用exact属性精准匹配（注意但是如果Route很多，在所有的path前增加exact会很麻烦，所以采用switch的方式，匹配到就不再匹配了）
<HashRouter>
    // exact 属性设置的path精准匹配必须跟 url地址栏一模一样才会被匹配上
    <Route exact path="/" component={Home}/>
    <Route path="/home" component={Home}/>
    <Route path="/news" component={News}/>
</HashRouter>
```
```js
// 示例1：
// 说明：因为路由匹配规则默认会全部匹配一遍，匹配到了也不会停止，继续向下匹配，switch匹配到就停止，不会再向下匹配了
<HashRouter>
    // 此时url/news 则路由/:name和/news 会被匹配到 所以都会执行，此时可以使用switch，从上到下匹配到第一个满足条件的旧停止向下匹配
<switch>
    <Route exact path="/" component={Home}/>
    <Route path="/:name" component={(props)=>{
        return (
          <p>props.match.params.name<p>
        );
    }}/>
    <Route path="/news" component={News}/>
</switch>
</HashRouter>
```
+ 404-notfound
```js
// 示例1：switch中如果都匹配不到，我们需要给默认写个默认执行的路由，这个默认路由不需要写path
<switch>
    <Route exact path="/" component={Home}/>
    <Route path="/name" component={(props)=>{
        return (
          <p>hello<p>
        );
    }}/>
    <Route path="/news" component={News}/>
    <Route component={NotFound}/>
</switch>

// 示例2：
<switch>
    <Route exact path="/" component={Home}/>
    <Route path="/name" component={(props)=>{
        return (
          <p>hello<p>
        );
    }}/>
    <Route path="/news" component={News}/>
    <Route path='/notfound' component={NotFound}/>
    // 表示上面的路由都不满足条件时，跳转到to对应的url，这时候跳转到/notfound路由，执行渲染NotFound
    <Redirect from='*' to='/notfound' />
</switch>
```


## 5. redirect
+ <Redirect>组件用于路由的跳转，即用户访问一个路由，会自动跳转到另一个路由
- redirect跳转和link跳转的区别是link需要手动点击才进行跳转，而Redirect是自动跳转
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

# 嵌套路由&路由参数
```js
// 示例1：
// App.js

<ul>
    <li><Link to="/home">首页</Link></li>
    <li><Link to="/news">新闻</Link></li>
</ul>
<Router>
    <Route path="/home" component={Home}>
    <Route path="/news" component={News}>
</Router>

// New.js： 注意二级路由的path前需要加上一级路由的news
render(){
  return (
      <div>
          <ul>
              <li><Link to="/news/detail/1">新闻第一篇</Link></li>
              <li><Link to="/news/detail/2/4">新闻第2篇</Link></li>
          </ul>
          <Route path="/news/detail/:newId/:type" component={Detail}>
      </div>
  );
}

// Detail.js
render(){
  return (
      <div>
          newId: {this.props.match.params.newId}---type:{this.props.match.params.type}
      </div>
  );
}
```




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
// 示例2：子路由可以使用render方法  render方法中的箭头函数体不需要大括号; 不加大括号默认就会加return，加了大括号就必须加手动加return
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
