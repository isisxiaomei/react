import React, { Component } from 'react';
import { Button, Card, message } from 'antd';
import './ui.less';



class Messages extends Component {
    showMessage = (type) => {
        message[type]('恭喜你！！！');
    }

    render() {
        return (
            <div>
                <Card title="message信息提示" className="card-wrap">
                    <Button type="primary" onClick={() => this.showMessage("success")}>success</Button>
                    <Button type="primary" onClick={() => this.showMessage("info")}>info</Button>
                    <Button type="primary" onClick={() => this.showMessage("error")}>error</Button>
                    <Button type="primary" onClick={() => this.showMessage("warn")}>warn</Button>
                </Card>


            </div>
        );
    }
}
export default Messages;
