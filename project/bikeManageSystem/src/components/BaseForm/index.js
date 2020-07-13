import React from 'react';
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd'
import Utils from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component {
    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, index) => {
                let type = item.type;
                let label = item.label;
                let field = item.field;
                let placeholder = item.placeholder;
                let initialValue = item.initialValue || '';
                let width = item.width;
                let list = item.list;
                if (type == 'SELECT') {
                    const SELECT = <FormItem label={label}>
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue
                            })(
                                <Select placeholder={placeholder} style={{ width: width }}>
                                    {Utils.getOptionsList(list)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT);
                } else if (type == 'INPUT') {
                    const INPUT = <FormItem label={label}>
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue
                            })(
                                <Input type='text' placeholder={placeholder} />
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT);
                } else if (type == '时间查询') {
                    const startTime = <FormItem label='订单时间'>
                        {
                            getFieldDecorator('startTime', {
                                initialValue: initialValue
                            })(
                                <DatePicker placeholder="选择开始时间" showTime format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    const endTime = <FormItem label="~" colon={false}>
                        {
                            getFieldDecorator('endTime', {
                                initialValue: initialValue
                            })(
                                <DatePicker placeholder="选择结束时间" showTime format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(startTime);
                    formItemList.push(endTime);
                } else if (type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label}>
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue,
                                valuePropName: 'checked'
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX);
                }else if (type == "DATEPICKER") {
                    const DATE = <FormItem label={label}>
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue
                            })(
                                <DatePicker placeholder={placeholder} showTime format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(DATE);
                }
            });
        }
        return formItemList;
    }

    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = ()=>{
        this.props.form.resetFields();
    }
    render() {
        return (
            <Form layout="inline">
                {this.initFormList()}
                <FormItem label="">
                    <Button type="primary" style={{ margin: "0 20px", width: 100 }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button style={{ width: 100 }} onClick={this.reset} >重置</Button>
                </FormItem>
            </Form>
        );

    }
}
export default Form.create({})(FilterForm);