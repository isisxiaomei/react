import React, { Component } from 'react'
import { Card, Table, message, Checkbox, Button, Modal, } from 'antd';
import axios from 'axios'
import Axios from '../../axios/index'
import Utils from '../../utils/utils'

class BasicTable extends Component {
    state = {};
    params = {
        page: 1
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
        let _this = this;
        Axios.ajax({
            url: '/demo/mock/table/list',
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
                selectedRowKeys: [],
                selectedRows: null,
                pagination: Utils.pagination(res, (current)=>{
                    _this.params.page = current;
                    this.request();
                })
            })
        });
    }

    onRowClick = (record, index) => {
        let selectKeys = [index];
        this.setState({
            selectedRowKeys: selectKeys,
            selectItem: record
        });
    }
    handleDelete = () => {
        let {selectedRows} = this.state;
        let ids = [];
        selectedRows.map((item)=>{
            ids.push(item.id);
        })
        Modal.confirm({
            title: "删除提示",
            content: `确定要删除${ids}`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        });
    }
    render() {
        // selectedRowKeys表示所选中行的key数组，这里是从onRow事件中获取然后存储到state中
        const {selectedRowKeys} = this.state;

        // 当onRow点击行选中时，只有给table设置了selectedRowKeys，按钮才会展示选中的行
        let rowSelection = {
            type: 'radio',
            selectedRowKeys,
        };
        let rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                });
            }

        };
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格-mock" style={{ margin: "10px 0" }}>
                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.dataSource1}
                        pagination={false}
                    />
                </Card>
                <Card title="mock-单选" style={{ margin: "10px 0" }}>
                    <Table
                        bordered
                        columns={this.state.columns}
                        dataSource={this.state.dataSource1}
                        rowSelection={rowSelection}
                        onRow={ (record, index) => {
                            return {
                              onClick: () => {
                                  this.onRowClick(record, index)
                              }
                            };
                        }}
                        pagination={false}
                    />
                </Card>
                <Card title="mock-复选" style={{ margin: "10px 0" }}>
                    <div style={{  marginBottom: 10 }}>
                        <Button type="primary"
                            onClick = {this.handleDelete}
                        >
                            删除
                        </Button>
                    </div>
                    <Table
                        bordered
                        columns={this.state.columns}
                        dataSource={this.state.dataSource1}
                        rowSelection={rowCheckSelection}
                        pagination={false}
                    />
                </Card>
                <Card title="mock-分页封装" style={{ margin: "10px 0" }}>
                    <Table
                        bordered
                        columns={this.state.columns}
                        dataSource={this.state.dataSource1}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }

}


export default BasicTable;

// rowSelection：  rowSelection 表格行是否可选择，配置项
// selectedRowKeys: 告诉table当前选中了哪些行，同时table展示勾选被选中的行
// onRow： 表示鼠标点击行的时候也可以选中当前行（默认情况下只能点击checkbox框才能选中）
// pagination封装：第二个参数是回调函数，好好体会下