import React, { Component } from 'react';
import { Card, Icon, Form, Input, Button, message, Checkbox } from 'antd';
const FormItem = Form.Item;
class FormLogin extends Component {


    handleSubmit = (e) => {
        e.preventDefault();

        // getFieldsValue可以获取表单所有的值返回一个对象
        let userInfo = this.props.form.getFieldsValue();

        // validateFields方法校验表单的设定的rules规则; 如果err!=null 说明rule校验不通过
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`恭喜你 ${values.username} & ${values.password} 正确`);
                message.success(`恭喜你 ${userInfo.username} & ${userInfo.password} 正确`)
            }
        });

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="登录行内表单" className="card-wrap">
                    <Form layout="" style={{ width: 400 }}>
                        <FormItem >
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
                        <FormItem >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your password!'
                                }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Password"
                                    type="password"
                                />,
                            )}
                        </FormItem>
                        <FormItem >
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="" style={{ float: "right" }}>
                                Forgot password
                            </a>

                        </FormItem>
                        <FormItem >
                            <Button type="primary" onClick={this.handleSubmit} style={{ width: 400 }}>login</Button>
                        </FormItem>

                    </Form>
                </Card>

            </div>
        );
    }
}
// 只有使用了Form.create({})(xxx)才可以在this.props.form中获取到表单的相关数据
export default Form.create({})(FormLogin);;


// 总结用法：
// getFieldDecorator：包装组件返回一个方法；用于设定初始值个制定校验规则还可以实现双向绑定;经过 getFieldDecorator 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性） onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管
