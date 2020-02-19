import React, { Component } from 'react';
import { Card, Icon, Form, Input, Button, message, Checkbox, Radio, InputNumber,
Select, Switch, DatePicker, TimePicker, Upload } from 'antd';

import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;


class Registor extends Component {
    state = {};
    handleSubmit = (e) => {
        e.preventDefault();
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo));

    }
    
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

    beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    handleUpload = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 20
            }
        };

        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 20,
                    offset: 4
                }
            }
        };

        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal"  style={{width: 800}}>
                        <FormItem label="用户名" {...formItemLayout}>
                            {getFieldDecorator('username', {
                                initialValue: 'xiaomei',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    }, {
                                        min: 5,
                                        max: 10,
                                        message: "长度不在范围内"
                                    }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your password!'
                                }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Password"
                                />,
                            )}
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {getFieldDecorator('sex', {
                                initialValue: 1,
                                rules: [{
                                    required: true,
                                    message: 'Please input your sex!'
                                }],
                            })(

                                <RadioGroup >
                                    {/* 默认值通过 getFieldDecorator 的 initialValue设置*/}
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            )}

                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {getFieldDecorator('age', {
                                initialValue: 18,
                                rules: [{
                                    required: true,
                                    message: 'Please input your age!'
                                }],
                            })(
                                <InputNumber />
                            )}

                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {getFieldDecorator('state', {
                                initialValue: '1',
                                rules: [{
                                    required: true,
                                    message: 'Please input your age!'
                                }],
                            })(
                                <Select>
                                    <Option value="1">岳不群</Option>
                                    <Option value="2">东方不败</Option>
                                    <Option value="3">鸠摩智</Option>
                                    <Option value="4">任我行</Option>
                                </Select>
                            )}

                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {getFieldDecorator('interest', {
                                initialValue: ['1', '2'],
                                rules: [{
                                    required: true,
                                    message: 'Please input your age!'
                                }],
                            })(
                                <Select mode="multiple">
                                    <Option value="1">游泳</Option>
                                    <Option value="2">跑步</Option>
                                    <Option value="3">唱歌</Option>
                                    <Option value="4">吉他</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem label="是否已婚" {...formItemLayout}>
                            {getFieldDecorator('isMarried', {
                                initialValue: true,
                                // valuePropName 设置Switch的 默认属性值后 initialValue: true才会生效
                                valuePropName: 'checked',
                                rules: [{
                                    required: true,
                                    message: 'Please input your age!'
                                }],
                            })(
                                <Switch />
                            )}
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {getFieldDecorator('birthday', {
                                initialValue: moment('2020-02-02', 'YYYY-MM-DD'),
                            })(
                                <DatePicker showTime/>
                            )}
                        </FormItem>

                        <FormItem label="早起时间" {...formItemLayout}>
                            {getFieldDecorator('time', {
                                initialValue: moment('00:00:00', 'HH:mm:ss'),
                            })(
                                <TimePicker />
                            )}
                        </FormItem>
                        <FormItem label="地址" {...formItemLayout}>
                            {getFieldDecorator('address', {
                                initialValue: "",
                            })(
                                <TextArea
                                    placeholder = "北京市海淀区"
                                    autoSize = {{ minRows: 2, maxRows: 6 }}
                                />
                            )}
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {getFieldDecorator('userImg', {
                                initialValue: '',
                            })(
                                <Upload
                                    className="avatar-upload"
                                    listType="picture-card"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleUpload}
                                >
                                    {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{width: 100, height: 100}}/> : <Icon type="plus"/>}
                                </Upload>
                            )}
                        </FormItem>
                        
                        <FormItem {...offsetLayout}>
                            {getFieldDecorator('remember', {
                            })(<Checkbox>我已阅读 <a className="login-form-forgot" href="">九阴真经</a></Checkbox>)}
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit} >login</Button>
                        </FormItem>

                    </Form>
                </Card>

            </div>
        );
    }
}
// 只有使用了Form.create({})(xxx)才可以在this.props.form中获取到表单的相关数据
export default Form.create({})(Registor);;


/* const formItemLayout = {
    labelCol: {
        xs: 24,
        sm: 4
    },
    wrapperCol: {
        xs: 24,
        sm: 20
    }
};

const offsetLayout = {
    wrapperCol: {
        xs: 24,
        sm: {
            span: 20,
            offset: 4
        }
    }
};
解析如下：
labelCol: { xs: 24, sm: 4 } ：表示左边的label在响应式布局中 当分辨率小于xs指定的值时，左边的label占24列即单独占一行，分辨率大于sm分辨率时，左边的label占4列
wrapperCol: { xs: 24, sm: 20 }：表示右边的表单控件



offsetLayout下的wrapperCol在上述代码中的表示将指定的控件从左向右偏移4
*/

