import React, { Component } from 'react'
import { Card, Table, message, } from 'antd';
import axios from 'axios'
import Axios from '../../axios/index'
class BasicTable extends Component {
    state = {};

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
                dataIndex: 'sex'
            },
            {
                title: '状态',
                dataIndex: 'state'
            },
            {
                title: '爱好',
                dataIndex: 'interest'
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
                interest: '唱歌',
                birthday: '2000-00-00',
                address: '北京市海淀区',
                time: '09:00'
            },
            {
                id: "1",
                userName: 'john',
                sex: '1',
                state: '1',
                interest: '唱歌',
                birthday: '2000-00-00',
                address: '北京市海淀区',
                time: '09:00'
            },
            {
                id: "2",
                userName: 'Bob',
                sex: '1',
                state: '1',
                interest: '唱歌',
                birthday: '2000-00-00',
                address: '北京市海淀区',
                time: '09:00'
            }
        ];
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
        Axios.ajax({
            url: '/demo/mock/table/list',
            data: {
                param: {}
            }
        }).then(result => {
            this.setState({
                dataSource1: result
            })
        });
    }
    render() {
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.dataSource} />
                </Card>
                <Card title="动态数据渲染表格" style={{ margin: "10px 0" }}>
                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.dataSource1}
                    />
                </Card>
            </div>
        )
    }

}


export default BasicTable;