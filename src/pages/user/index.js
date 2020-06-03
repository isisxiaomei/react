import React from 'react';
import { Form, Card, Button, Select, Table, Modal, Radio, message, DatePicker, Icon, Input } from 'antd';
import Axios from '../../axios/index';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import BaseTable from '../../components/BaseTable';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


export default class User extends React.Component {
    state = {
        isVisible: false,
        selectedItem: null,
        selectedRows: [],
        selectedRowKeys: []
    };
    params = {};
    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'userName',
            placeholder: '请输入用户名',
            width: 80
        },
        {
            type: 'INPUT',
            label: '手机号',
            field: 'userMobile',
            placeholder: '请输入手机号',
            width: 80
        },
        {
            type: 'DATEPICKER',
            label: '请选择入职日期',
            field: 'userDate',
            placeholder: '请选择日期',
            width: 80
        }
    ];

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        Axios.requestList(this, '/user/list', this.params);
    }
    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }
    handleOperate = (type) => {
        let item = this.state.selectedItem;
        console.log(item);
        if (type == 'create'){
            this.setState({
                type,
                isVisible: true,
                title: '创建员工'
            });
        } else if (type == 'edit'){
            if (item == null){
                Modal.info({
                    title: "信息",
                    content: "请先选择一名员工"
                });
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑员工',
                userInfo: item

            });
        } else if (type == 'detail'){
            if (item == null){
                Modal.info({
                    title: "提示",
                    content: "请先选择一名员工"
                });
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo: item
            });
        } else {
            if (item == null){
                Modal.info({
                    title: "提示",
                    content: "请先选择一名员工"
                });
                return;
            }
            this.setState({
                type,
            });
            Modal.confirm({
                title: "确认删除",
                content: `是否删除当前id：${item.id}  的员工`,
                onOk: ()=>{
                    Axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: item.id
                        }
                    }).then((res)=>{
                        message.success(res.message);
                        this.setState({
                            selectedRowKeys: []
                        });
                        this.requestList();
                    });
                }
            });
        }
    }

    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        Axios.ajax({
            url: type=='create' ? '/user/add' : '/user/edit',
            data: {
                params: data,
            }
        }).then(res => {
            this.setState({
                isVisible: false
            });
            this.requestList();
        })
    }

    render() {
        const columns = [
            {
                title: "id",
                dataIndex: "id",
            }, {
                title: "用户名",
                dataIndex: "userName",
            }, {
                title: "性别",
                dataIndex: "sex",
                render: (sex) => {
                    return sex == 1 ? '男' : '女';
                }
            }, {
                title: "状态",
                dataIndex: "state",
                render: (state) => {
                    return {
                        '1': '咸鱼一条',
                        '2': '北大才子',
                        '3': '令狐冲',
                        '4': '东方不败',
                        '5': '白眉道长',
                    }[state]
                }
            }, {
                title: "爱好",
                dataIndex: "interest",
                render: (interest) => {
                    return {
                        '1': '游泳',
                        '2': '跑步',
                        '3': '羽毛球',
                        '4': '太极拳',
                        '5': '跳舞',
                    }[interest]
                }

            }, {
                title: "婚姻",
                dataIndex: "isMarried",
                render: (item) => {
                    return item == 1 ? '已婚' : '未婚';
                }
            }, {
                title: "生日",
                dataIndex: "birthday",
            }, {
                title: "联系地址",
                dataIndex: "address",
            },
            {
                title: "早起时间",
                dataIndex: "time",
            }
        ];

        let footer = {};
        if (this.state.type=='detail'){
            footer = {
                footer: null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')} style={{ marginLeft: 10 }}>编辑员工</Button>
                    <Button type="primary" onClick={() => this.handleOperate('detail')} style={{ marginLeft: 10 }}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')} style={{ marginLeft: 10 }}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <BaseTable
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        selectedRows={this.state.selectedRows}
                        updateSelectItem={Utils.updateSelectItem.bind(this)}
                        rowSelectionType="radio"
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    }}
                    onOk={this.handleSubmit}
                    width={600}
                    {...footer}
                >
                    {/* 注意wrappedComponentRef的回调函数参数是UserForm被包装之前的组件实例*/}
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={ inst => this.userForm=inst } />
                </Modal>
            </div>
        );
    }
}


class UserForm extends React.Component {

    getState = (state) => {
        return {
            '1': '咸鱼一条',
            '2': '北大才子',
            '3': '令狐冲',
            '4': '东方不败',
            '5': '白眉道长',
        }[state];
    }

    getSex = sex =>{
        return sex == 1 ? '男' : '女';
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.userName :
                        getFieldDecorator('userName', {
                            initialValue: userInfo.userName
                        })(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type == 'detail' ? this.getSex(userInfo.sex) :
                        getFieldDecorator('sex', {
                            initialValue: userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type == 'detail' ? this.getState(userInfo.state) :
                        getFieldDecorator('state', {
                            initialValue: userInfo.state
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>北大才子</Option>
                                <Option value={3}>令狐冲</Option>
                                <Option value={4}>东方不败</Option>
                                <Option value={5}>白眉道长</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.birthday :
                        getFieldDecorator('birthday',{
                            initialValue: moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.address :
                        getFieldDecorator('address', {
                            initialValue: userInfo.address
                        })(
                            <TextArea rows={3} placeholder="请输入联系地址" />
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

UserForm = Form.create({})(UserForm);