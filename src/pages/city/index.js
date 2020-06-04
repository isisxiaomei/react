import React from 'react';
import { Form, Card, Button, Select, Table, Modal, Radio, message } from 'antd';
import Axios from '../../axios/index';
import Utils from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowOpenCity: false,
        };
        this.params = {
            page: 1,
        };
        this.cityForm = null;
    }
    componentDidMount() {
        const columns = [
            {
                title: '城市id',
                dataIndex: 'id'
            },
            {
                title: '城市名称',
                dataIndex: 'name'
            },
            {
                title: '用车模式',
                dataIndex: 'mode',
                render: (mode) =>{
                    return mode == 1 ? "指定停车点" : "禁停区"
                }
            },
            {
                title: '营运模式',
                dataIndex: 'op_mode',
                render: (op_mode) =>{
                    return op_mode == 1 ? "自营" : "加盟";
                }
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            },
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render: (city_admins) => {
                    return city_admins.map(item => {
                        return item.user_name;
                    }).join('|');
                }
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time'
            },
            {
                title: '操作时间',
                dataIndex: 'update_time',
                render: (update_time) => {
                    return Utils.formatDate(update_time)
                }
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name'
            },
        ];
        this.setState({
            columns
        });
        this.requestList();
    }

    // 默认请求接口数据
    requestList = () => {
        Axios.ajax({
            url: '/demo/mock/open_city',
            data: {
                params: {
                    page: this.params.page,
                }
            }
        }).then((res) => {
            if (res && res.result.item_list) {
                this.setState({
                    list: res.result.item_list.map((item, index) => {
                        item.key = index;
                        return item;
                    }),
                    pagination: Utils.pagination(res, (current) => {
                        this.params.page = current;
                        this.requestList();
                    })
                })
            }
        }).catch(e => {
            throw new Error(e);
        });
    }
    // 开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true,
        });

    }

    // 提交开通城市
    handleSubmit = () => {
        let openCityInfo = this.cityForm.props.form.getFieldsValue();
        Axios.ajax({
            url: "/demo/mock/city/open",
            data: {
                params: openCityInfo,
            }
        }).then(data => {
            message.success(data.result);
            this.setState({
                isShowOpenCity: false
            });
        }).catch( error =>{
            throw new Error(error);
        });
    }

    render() {
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={this.state.columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false,
                        });
                    }}
                >
                    <OpenCityForm wrappedComponentRef={(element) => {
                        this.cityForm = element
                    }} />
                </Modal>
            </div>
        );
    }
}

class FilterForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator("city_id", {
                            initialValue: ""
                        })(
                            <Select placeholder="全部" style={{ width: 80 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式">
                    {
                        getFieldDecorator("mode", {
                            initialValue: ""
                        })(
                            <Select placeholder="全部" style={{ width: 130 }}>
                                <Option value="">全部</Option>
                                <Option value="1">指定停车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="运营模式">
                    {
                        getFieldDecorator("op_mode", {
                            initialValue: ""
                        })(
                            <Select style={{ width: 80 }}>
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {
                        getFieldDecorator("auth_status", {
                            initialValue: ""
                        })(
                            <Select placeholder="全部" style={{ width: 80 }}>
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="">
                    <Button type="primary" style={{ margin: "0 20px", width: 100 }}>查询</Button>
                    <Button style={{ width: 100 }}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);


class OpenCityForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', {
                            initialValue: ''
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">西安市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: 1
                        })(
                            <RadioGroup >
                                <Radio value={1}>自营</Radio>
                                <Radio value={2}>加盟</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: ''
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
OpenCityForm = Form.create({})(OpenCityForm);

// horizontal： label和组件都是各站一行
export default City;


// wrappedComponentRef： 当form表单导出组件，此时如果要获取此组件的实例，使用ref是不行的，需要使用wrappedComponentRef