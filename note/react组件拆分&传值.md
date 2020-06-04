# react组件拆分
```js
// 示例1：
// 子组件负责Iterm展示
class XiaojiejieIterm extends Component {
    render() {
        return (
            <li>
                我是一个单独组件：Xiaojiejie2
            </li>
        );
    }
}
// 父组件负责添加服务
class Xiaojiejie extends Component {
    render() {
        return (
            <div >
                <XiaojiejieIterm />
            </div>
        );
    }
}
```
# 父子组件传值
## 父组件给子组件传值
+ 通过调用子组件时，给子组件属性传递值，子组件用`xxx`属性接收，那么在子组件中就通过`this.props.xxx`访问
```js
// 示例1：
// 子组件
class XiaojiejieIterm extends Component {
    render() {
        return (
            <li>
                {this.props.content}
            </li>
        );
    }
}
// 父组件
class Xiaojiejie extends Component {
    render() {
        return (
            <XiaojiejieIterm
                content={iterm}
                index={index}
            />
        );
    }
}
```
## 子组件给父组件传值
+ 子组件不能直接给父组件传值; 子组件可以通过操作父组件的方法从而操作父组件的数据【需要将父组件的方法传递给子组件，并且将父组件传递的方法的this也要绑定为父组件】
```js
// 示例1：
// 子组件
class XiaojiejieIterm extends Component {
    render() {
        return (
            <li onClick={this.handleClick.bind(this)}>
                {this.props.content}
            </li>
        );
    }
    handleClick(){
        this.props.deleteIterm(this.props.index);
    }
}
// 父组件
class Xiaojiejie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            list: ["小苹果", "小橘子"]

        }
    }
    deleteHandler(index) {
        let list = this.state.list;
        list.splice(index, 1);
        this.setState({
            list: list
        })
    }
    render() {
        return (
            <XiaojiejieIterm
                content={iterm}
                index={index}
                // 注意这句父组件传递deleteHandler时必须将自己的this绑定到deleteHandler；
                // 确保在子组件中调用deleteHandler时，this就可以操作父组件中的数据
                deleteIterm={this.deleteHandler.bind(this)}
            />
        );
    }
}
```
# PropTypes校验传值

# ref属性使用
