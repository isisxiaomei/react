import React, { Component } from 'react'
import { Card, Tabs, message, Icon } from 'antd'

const { TabPane } = Tabs;
export default class Tab extends Component {


    constructor(props) {
        super(props);
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' }
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
            newTabIndex: panes.length
        }
    }

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${++this.state.newTabIndex}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    };
    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };

    handleCallback = (key) => {
        message.info(key);
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
      };

    render() {
        return (
            <div>
                <Card title="tabs基本使用" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>
                            Content of Tab Pane 2
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="tabs图标使用" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type="plus-circle" />Tab 1</span>} key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab={<span><Icon type="bg-colors" />Tab 2</span>} key="2">
                            Content of Tab Pane 2
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="tabs动态" className="card-wrap">
                    <Tabs defaultActiveKey={this.state.activeKey}
                        onChange={this.handleCallback}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map(pane => {
                                return <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );
    }
};
