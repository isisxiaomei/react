import React, { Component } from 'react'
import { Card, Table, message, Checkbox, Button, Modal, } from 'antd';
import axios from 'axios'
import Axios from '../../axios/index'
import Utils from '../../utils/utils'

class HighTable extends Component {
    state = {};
    params = {
        page: 1,
    };
    componentWillMount() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: (sex)=> {
                    return sex==1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: (state)=> {
                    let config = {
                        '1': '在线',
                        '2': '离开',
                        '3': '忙碌',
                    };
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render: (interest)=> {
                    let config = {
                        '1': '游泳',
                        '2': '篮球',
                        '3': '棒球',
                    };
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ];
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                fixed: 'left',
                width: 100,
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 100,
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: (sex)=> {
                    return sex==1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: (state)=> {
                    let config = {
                        '1': '在线',
                        '2': '离开',
                        '3': '忙碌',
                    };
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render: (interest)=> {
                    let config = {
                        '1': '游泳',
                        '2': '篮球',
                        '3': '棒球',
                    };
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                fixed: 'right',
                width: 100,
            }
        ];
        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: (sex)=> {
                    return sex==1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                sorter: (a, b) => a.age-b.age,
                defaultSortOrder: 'descend',
                // sortDirections: ['ascend', 'descend'],
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: (state)=> {
                    let config = {
                        '1': '在线',
                        '2': '离开',
                        '3': '忙碌',
                    };
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render: (interest)=> {
                    let config = {
                        '1': '游泳',
                        '2': '篮球',
                        '3': '棒球',
                    };
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ];
        const dataSource = [
            {
                id: "0",
                userName: 'jack',
                sex: '1',
                state: '1',
                interest: 1,
                birthday: '2000-00-00',
                address: '北京市海淀区',
                time: '09:00'
            },
            {
                id: "1",
                userName: 'john',
                sex: '1',
                state: '1',
                interest: 2,
                birthday: '2000-00-00',
                address: '北京市海淀区',
                time: '09:00'
            },
            {
                id: "2",
                userName: 'Bob',
                sex: '1',
                state: '1',
                interest: 3,
                birthday: '2000-00-00',
                address: '北京市海淀区',
                time: '09:00'
            }
        ];
        dataSource.map((item, index) => {
            item.key = index;
        });
        this.setState({
            columns,
            columns2,
            columns3,
            dataSource
        })

        this.request();
    }
    // 基本使用
    // request = () => {
    //     let baseUrl = `http://yapi.demo.qunar.com/mock/80318`
    //     axios.get(`${baseUrl}/demo/mock/table/list`)
    //     .then(response => {
    //         if (response.status == '200' && response.data.code == 0){
    //             this.setState({
    //                 dataSource1: response.data.result
    //             })
    //         }
    //     }).catch( (error) => {
    //         message.error(error.msg);
    //     })
    // }
    // axios包装
    request = ()=> {
        Axios.ajax({
            url: '/demo/mock/table/high/list',
            data: {
                params: {
                    page: this.params.page,
                }
            }
        }).then(res => {
            res.result.list.map((item, index) => {
                item.key = index;
            });
            this.setState({
                dataSource1: res.result.list,
            })
        });
    }

    render() {
        return (
            <div>
                <Card title="头部固定-mock" style={{ margin: "10px 0" }}>
                    <Table
                        bordered
                        columns={this.state.columns}
                        dataSource={this.state.dataSource1}
                        pagination={false}
                        scroll={{y: 240}}
                    />
                </Card>
                <Card title="左侧固定-mock" style={{ margin: "10px 0" }}>
                    <Table
                        bordered
                        columns={this.state.columns2}
                        dataSource={this.state.dataSource1}
                        pagination={false}
                        scroll={{x: 1300}}
                    />
                </Card>
                <Card title="字段排序-mock" style={{ margin: "10px 0" }}>
                    <Table
                        bordered
                        columns={this.state.columns3}
                        dataSource={this.state.dataSource1}
                        pagination={false}
                        scroll={{x: 1300}}
                    />
                </Card>
            </div>
        )
    }

}

export default HighTable;
