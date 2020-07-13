import React, { Component } from 'react';
import { Card, Spin, Alert, Icon } from 'antd';
import './ui.less';


class Loadings extends Component {
    render() {
        return (
            <div>
                <Card title="spin基本使用" className="card-wrap">
                    <Spin size="small"></Spin>
                    <Spin size="default"></Spin>
                    <Spin size="large"></Spin>
                </Card>
                <Card title="spin嵌套容器" className="card-wrap">
                    <Spin>
                        <Alert message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                        />
                    </Spin>
                </Card>
                <Card title="spin指定icon" className="card-wrap">
                    <Spin size="large" tip="加载中" indicator={<Icon type="loading" style={{fontSize: 20}}/>}></Spin>
                </Card>
            </div>
        );
    }
}
export default Loadings;
