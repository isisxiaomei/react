import React, { Component } from 'react';
import { Button, Card, Modal } from 'antd';
import './ui.less';


class Modals extends Component {
    state = {
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false
    };

    handleShowModal = (type) => {
        this.setState({
            // 计算属性名 动态赋值
            [type]: true
        });
    }

    handleConfirm = (type) => {
        // 通过Modal.confirm()  形式相当于  Modal['confirm']()
        Modal[type]({
            title: '标题',
            content: '内容',
            onOk() {
                console.log("ok")
              },
            onCancel() {
                console.log("cancel")
            }
        })
    }
    render() {
        return (
            <div>
                <Card title="基础弹框" className="card-wrap">
                    {/* 备注这里需要传参时必须写箭头函数；因为普通函数会在点击前多执行一次 */}
                    <Button onClick={ () => {this.handleShowModal("visible1")} }>正常弹框</Button>
                    <Button onClick={ () => {this.handleShowModal("visible2")} }>自定义页脚弹框</Button>
                    <Button onClick={ () => {this.handleShowModal("visible3")} }>顶部20px弹框</Button>
                    <Button onClick={ () => {this.handleShowModal("visible4")} }>水平垂直居中弹框</Button>
                </Card>
                <Card title="信息确认弹框" className="card-wrap">
                    {/* 备注这里需要传参时必须写箭头函数；因为普通函数会在点击前多执行一次 */}
                    <Button onClick={ () => {this.handleConfirm("confirm")} }>confirm</Button>
                    <Button onClick={ () => {this.handleConfirm("info")} }>info</Button>
                    <Button onClick={ () => {this.handleConfirm("success")} }>success</Button>
                    <Button onClick={ () => {this.handleConfirm("warning")} }>warning</Button>
                </Card>
                <Modal title="正常弹框"
                    visible={this.state.visible1}
                    onOk={ ()=> { this.setState({
                        visible1: false
                    })}}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Modal title="自定义页脚弹框"
                    visible={this.state.visible2}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Modal title="顶部20px弹框"
                    visible={this.state.visible3}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Modal title="水平垂直居中弹框"
                    visible={this.state.visible4}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

            </div>
        );
    }
}
export default Modals;
