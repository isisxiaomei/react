# 1. 作用

- 将某个组件渲染在页面任意位置

- 场景：比如页面某个Home组件中点击按钮需要将Home组件中的一个子组件Modal渲染全局位置，而不是仅渲染在Home组件的区域，此时可以使用Portals,可以将组件渲染到指定位置，或者挂载到指定位置

```js
class Modal extends PureComponent{
  render(){
    // ReactDOM.createPortal：第一参数是需要渲染的组件（this.props.children这里指Modal所有的子组件），第二个参数是渲染组件要挂载的位置
    // 最终会将<span>title</span>渲染到<div id="modal"></div>中,如下：
    // <div id="modal">
    //   <span>title</span>
    // </div>
    ReactDOM.createPortal(this.props.children, document.getElementById('modal'))
  }
}

class Home extends PureComponent{
  render(){
    return <div>
      <Modal>
        <span>title</span>
      </Modal>
    </div>
  }
}


class App extends PureComponent{
  render(){
    return <Home />
  }
}

// 在根root的同层级创建一个modal的div
<div id="root"></div>
<div id="modal"></div>

```
