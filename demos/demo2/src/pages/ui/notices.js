import React, { Component } from 'react';
import { Card, Button, notification } from 'antd';
import './ui.less';

class Notices extends Component {

    handleNotification = (type, placement) => {
        if (placement) {
            notification.config({
                placement: placement,
                duration: 3,
              });
        }
        notification[type]({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    }
    render() {
        return (
            <div>
                <Card title="notification基本使用" className="card-wrap">
                    <Button onClick={() => this.handleNotification("success")}>success</Button>
                    <Button onClick={() => this.handleNotification("info")}>info</Button>
                    <Button onClick={() => this.handleNotification("error")}>error</Button>
                    <Button onClick={() => this.handleNotification("warning")}>warning</Button>
                </Card>
                <Card title="notification位置提示" className="card-wrap">
                <Button onClick={() => this.handleNotification("success", "topLeft")}>success</Button>
                    <Button onClick={() => this.handleNotification("info", "topRight")}>info</Button>
                    <Button onClick={() => this.handleNotification("error", "bottomLeft")}>error</Button>
                    <Button onClick={() => this.handleNotification("warning", "bottomRight")}>warning</Button>
                </Card>

            </div>
        );
    }
}
export default Notices;
