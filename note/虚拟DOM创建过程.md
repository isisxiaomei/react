# 1. 虚拟dom创建过程

通过React.createElement方法创建返回出一个ReactElement的js对象；也就是React.createElement的返回值就是虚拟dom对象

```html
  <body>
    <div id="root"></div>
    <script
      src="https://unpkg.com/react@17/umd/react.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
      crossorigin
    ></script>

    <script>
      const msg2 = React.createElement("div", null, "hello");
    //   msg2就是虚拟dom对象树
      console.log(msg2);
      ReactDOM.render(msg2, document.getElementById("root"));
    </script>
  </body>
```

![](./image/简单虚拟dom对象.png)

虚拟dom如何和真实dom映射？

需要借助`render()`，将虚拟的dom对象，挂载到真实dom上。（ReactDOM.render(msg2, document.getElementById("root"));）

---

`jsx -> babel -> React.createElement()函数 -> ReactElement(本质是js对象树) -> ReactDOM.render -> 浏览器真实DOM`


***总结：先将`jsx`通过`babel`转成`React.createElement()`的方式，然后`React.createElement()`返回`ReactElement`类型的虚拟dom对象；再通过`ReactDOM.render`将虚拟dom对象挂载到真实dom上。***


# 2. 为什么使用虚拟dom？
> https://www.zhihu.com/question/29504639

为什么使用虚拟dom，而不是直接修改真实dom？

1. 从命令式操作真实dom的过程有手动变自动
2. 


不管玩的多花里胡哨，归根结底都要操作dom.
但是为什么在类似react的前端框架中出现了 virtual dom ?
数据变化的时候，页面也应该跟着变化，这是基本需求.
第一种方式是重建整个dom，重新渲染，这个方式是最简单直接的，编程简单，但是效率低下
第二种方式，遍历整个dom，查找用到已变化数据的节点，重新渲染该节点。编程困难，效率高。
第三种方式，当数据变化时，建立新的虚拟dom，比较旧的虚拟dom和新的虚拟dom的差异，将差异运用到dom上，编程简单，效率较高。
***通俗点说，你改变了一个数据，恰巧你也知道某个element 用到这个数据，你当然可以直接 调用dom api来操作他
但是如果页面展示和 数据逻辑不是一个人写的怎么办？***


用了MVVM框架，document.createElement()这个操作由框架去自动执行，每次状态发生改变，diff算法自动去createElement或removeElement等等；不用框架的话，你得自己写函数，去document.createElement()。自动与手动的区别