import React, { Component, Fragment } from 'react'
import XiaojiejieIterm from './XiaojiejieIterm';

class Xiaojiejie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            list: ["小苹果", "小橘子"]

        }
    }
    componentWillReceiveProps(){
        console.log("componentWillReceiveProps--存在于子组件中")
    }
    componentWillMount(){
        console.log("componentWillMount--组件将要挂载到页面时")
    }

    componentDidMount(){
        console.log("componentDidMount--组件挂载到页面完成时")
    }
    componentWillUnmount(){
        console.log("componentWillUnmount--当组件被删除之前执行【比如删除组件的dom元素等】")
    }
    componentWillUpdate(){
        console.log("componentWillUpdate--在shouldComponentUpdate之后，render之前执行)");
    }

    componentDidUpdate(){
        console.log("componentDidUpdate--在render之后执行,表示组件更新完成");
    }
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate--在组件更新之前执行(也就是render之前)");
        console.log("shouldComponentUpdate必须有boolean返回值，返回true后续函数继续执行，返回false后续函数不执行");
        return true
    }

    changeHandler(e) {
        this.setState({
            inputValue: e.target.value
        });
    }
    addHandler(e) {
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            // inputValue: ''
        });

    }

    deleteHandler(index) {
        let list = this.state.list;
        list.splice(index, 1);
        this.setState({
            list: list
        })
    }
    render() {
        console.log("render--组件挂载中");
        return (
            // 这里Fragment 没有节点含义，但是模板返回中要求只能一个大节点
            <Fragment>
                <div>
                    <label htmlFor="inputIterm" >增加项目</label>
                    <input id="inputIterm"
                        value={this.state.inputValue}
                        onChange={this.changeHandler.bind(this)}
                    />
                    <button
                        onClick={this.addHandler.bind(this)}
                    >
                        add
                    </button>
                </div>
                <ul>
                    {
                        this.state.list.map((iterm, index) => {
                            return (
                                <div key={iterm + index}>
                                    <XiaojiejieIterm
                                        content={iterm}
                                        index={index}
                                        inputValue={this.state.inputValue}
                                        list={this.state.list}
                                        deleteIterm={this.deleteHandler.bind(this)}
                                    />
                                </div>
                            )
                        })
                    }
                </ul>
            </Fragment>
        );
    }
}

export default Xiaojiejie;