import React from 'react';
import { Form, Card, Button, Select, Table, Modal, Radio, message, DatePicker } from 'antd';
import Axios from '../../axios/index';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import BaseTable from '../../components/BaseTable';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class Order extends React.Component {
    state = {
        isShowVisible: false,
        selectedItem: {},
        selectedRows: [],
        selectedRowKeys: []
    };
    params = {
        page: 1
    };
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{id: '0', name: '全部'},{id: '1', name: '北京'},{id: '2', name: '天津'},{id: '3', name: '深圳'}]
        },
        {
            type: '时间查询',
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'orderStatus',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{id: '0', name: '全部'},{id: '1', name: '进行中'},{id: '2', name: '行程结束'}]
        }
    ];

    componentDidMount() {
        this.requestList();
    }
    requestList = () => {

        Axios.requestList(this, '/order/list', this.params);
        // Axios.ajax({
        //     url: '/order/list',
        //     data: {
        //         params: this.params
        //     }
        // }).then(res => {
        //     let list = res.result.itermList.map((item, index) => {
        //         item.key = index;
        //         return item;
        //     });
        //     this.setState({
        //         list,
        //         pagination: Utils.pagination(res, current => {
        //             _this.params.page = current;
        //             _this.requestList();
        //         })
        //     })
        // }).catch(error => {
        //     throw new Error(error);
        // });
    }

    // 结束订单确认
    handleConfirm = () => {
        if(!this.state.selectedRowKeys.length){
            Modal.info({
                title: "信息",
                content: "请选择一条订单进行结束"
            });
            return;
        }
        this.setState({
            isShowVisible: true
        })
    }

    // 结束订单
    handleFinishOrder = () => {
        Axios.ajax({
            url: '/order/finishOrder',
            data: {
                params: {
                    finishInfo: this.state.selectedItem
                }
            }
        }).then((res)=>{
            message.success(res.result);
            this.setState({
                isShowVisible: false,
                // 结束订单之后需要设置selectedRowKeys为[]，是因为这个表示已经被选择的选项，否则列表中选项一直是被选中的状态
                selectedRowKeys: [],
                selectedItem: {}
            })
            this.requestList();
        });
    }


    openOrderDetail = ()=>{
        let id;
        if(!this.state.selectedRowKeys.length){
            Modal.info({
                title: "信息",
                content: "请先选择一条订单"
            });
            return;
        }
        if(this.state.selectedItem){
            id = this.state.selectedItem.id;
        }
        window.open(`/#/common/order/detail/${id}`, '_blank');
    }


    // onRowClick = (record, index) => {
    //     let selectKeys = [index];
    //     this.setState({
    //         selectedRowKeys: selectKeys,
    //         selectedItem: record,
    //         selectedRow: record
    //     });
    // }

    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }

    render() {
        const columns = [
            {
                title: "订单编号",
                dataIndex: "orderSn",
            }, {
                title: "车辆编号",
                dataIndex: "bikeSn",
            }, {
                title: "用户民",
                dataIndex: "userName",
            }, {
                title: "手机号",
                dataIndex: "mobile",
            }, {
                title: "里程",
                dataIndex: "distance",
            }, {
                title: "行驶时长",
                dataIndex: "totalTime",
            }, {
                title: "状态",
                dataIndex: "status",
            }, {
                title: "开始时间",
                dataIndex: "startTime",
            }, {
                title: "结束时间",
                dataIndex: "endTime",
            }, {
                title: "订单金额",
                dataIndex: "totalFee",
            }, {
                title: "实际金额",
                dataIndex: "userPay",
            },
        ];
        // const rowSelection = {
        //     type: "radio",
        //     onChange: (selectedRowKeys, selectedRows) => {
        //         this.setState({
        //             selectedRow: selectedRows[0],
        //             selectedRowKeys
        //         });
        //     },
        //     selectedRowKeys: this.state.selectedRowKeys
        // }

        let formLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        }

        return (
            <div>
                <Card>
                    {/* <FilterForm /> */}
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" onClick={this.handleConfirm} style={{ marginLeft: 10 }}>结束订单</Button>
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
                        rowSelectionType="checkbox"
                    />
                    {/* <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={ (record, index) => {
                            return {
                              onClick: () => {
                                  this.onRowClick(record, index)
                              }
                            };
                        }}
                    /> */}
                </div>

                <Modal
                    title="结束订单"
                    visible={this.state.isShowVisible}
                    onOk={this.handleFinishOrder}
                    onCancel={() => {
                        this.setState({
                            isShowVisible: false
                        })
                    }}
                >
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formLayout}>
                            {this.state.selectedItem.userName}
                        </FormItem>
                        <FormItem label="车辆编号" {...formLayout}>
                            {this.state.selectedItem.bikeSn}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formLayout}>
                            {this.state.selectedItem.startTime}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

// class FilterForm extends React.Component {
//     render() {
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <Form layout="inline">
//                 <FormItem label="城市">
//                     {
//                         getFieldDecorator("city_id", {
//                             initialValue: ""
//                         })(
//                             <Select placeholder="全部" style={{ width: 80 }}>
//                                 <Option value="">全部</Option>
//                                 <Option value="1">北京市</Option>
//                                 <Option value="2">天津市</Option>
//                                 <Option value="3">深圳市</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="订单时间">
//                     {
//                         getFieldDecorator("start_time", {
//                             initialValue: ""
//                         })(
//                             <DatePicker placeholder="选择开始时间" showTime format="YYYY-MM-DD HH:mm:ss" />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="">
//                     {
//                         getFieldDecorator("end_time", {
//                             initialValue: ""
//                         })(
//                             <DatePicker placeholder="选择结束时间" showTime format="YYYY-MM-DD HH:mm:ss" />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="订单状态">
//                     {
//                         getFieldDecorator("status", {
//                             initialValue: ""
//                         })(
//                             <Select style={{ width: 100 }}>
//                                 <Option value="">全部</Option>
//                                 <Option value="1">进行中</Option>
//                                 <Option value="2">进行中(临时锁车)</Option>
//                                 <Option value="3">行程结束</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="">
//                     <Button type="primary" style={{ margin: "0 20px", width: 100 }}>查询</Button>
//                     <Button style={{ width: 100 }}>重置</Button>
//                 </FormItem>
//             </Form>
//         );
//     }
// }
// FilterForm = Form.create({})(FilterForm);
