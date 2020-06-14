import React, { Children } from 'react'
import { Card, Button, Modal, Form, Input, Select, message, Tree } from 'antd'
import BaseTable from '../../components/BaseTable/index'
import Utils from '../../utils/utils'
import Axios from '../../axios/index'
import menuConfig from '../../config/menuConfig'


const FormItem = Form.Item;
const Option = Select.Option;
const { TreeNode } = Tree;

export default class PermissionUser extends React.Component {

    state = {
        isRoleVisible: false,
        isPermVisible: false
    }

    componentWillMount() {
        Axios.requestList(this, '/role/list');
    }

    // 获取treeNode的全部默认展示
    renderTreeNodes = menuConfig => {
        return menuConfig.map((item) => {
            if ("children" in item) {
                return <TreeNode key={item.key} title={item.title}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            }
            return <TreeNode key={item.key} {...item} />
        })
    }

    // 获取treeNode已选中项
    getCheckedKeys = () => {

    }
    // 展示创建角色框
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }

    // 提交创建角色表单
    handleRoleSubmit = () => {
        Axios.ajax({
            url: '/role/create',
            data: {
                params: ''
            }
        }).then(res => {
            this.setState({
                isRoleVisible: false
            })
            message.success(res.message);
        });
        Axios.requestList(this, '/role/list');
    }

    // 权限设置
    handlePermission = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "请先选择一个角色"
            });
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: item,
            menuInfo: item.menus,
        })
    }


    // 权限编辑提交
    handlePerEditSubmit = ()=>{
        let permEditInfo = this.permForm.props.form.getFieldsValue();
        permEditInfo.id = this.state.selectedItem.id;
        permEditInfo.menus = this.state.menuInfo;
        Axios.ajax({
            url: '/permission/edit',
            data:{
                params: permEditInfo
            }
        }).then((res)=>{
            this.setState({
                isPermVisible: false
            })
            message.success(res.result);
            Axios.requestList(this, '/role/list');
        })
    }
    render() {
        const columns = [
            {
                title: "角色id",
                dataIndex: 'id'
            },
            {
                title: "角色名称",
                dataIndex: 'roleName'
            },
            {
                title: "创建时间",
                dataIndex: 'createTime'
            },
            {
                title: "使用状态",
                dataIndex: 'status',
                render: (status) => {
                    return status == 1 ? '启用' : '禁用'
                }
            },
            {
                title: "授权时间",
                dataIndex: 'authorizeTime',
            }, {
                title: "授权人",
                dataIndex: 'authorizeUserName'
            }
        ];
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole} style={{ marginRight: 10 }}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission} style={{ marginRight: 10 }}>设置权限</Button>
                    <Button type="primary" onClick={this.handl} style={{ marginRight: 10 }}>用户授权</Button>
                </Card>
                <BaseTable
                    rowSelectionType='radio'
                    selectedRowKeys={this.state.selectedRowKeys}
                    dataSource={this.state.list}
                    columns={columns}
                    updateSelectItem={Utils.updateSelectItem.bind(this)}
                >
                </BaseTable>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onCancel={() => {
                        this.roleform.props.form.resetFields();
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                    onOk={this.handleRoleSubmit}
                >
                    <RoleForm wrappedComponentRef={(roleform) => { this.roleform = roleform }} />
                </Modal>
                <Modal
                    title="设置权限"
                    visible={this.state.isPermVisible}
                    width={600}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                    onOk={this.handlePerEditSubmit}
                >
                    <PermForm
                        wrappedComponentRef={(permForm) => { this.permForm = permForm }}
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo}
                        treeData={this.renderTreeNodes(menuConfig)}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    />
                </Modal>
            </div>
        );
    }
}

class RoleForm extends React.Component {

    getState = (state) => {
        return {
            '1': '咸鱼一条',
            '2': '北大才子',
            '3': '令狐冲',
            '4': '东方不败',
            '5': '白眉道长',
        }[state];
    }

    getSex = sex => {
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
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('roleName', {
                        })(
                            <Input type="text" placeholder="请输入角色名称" />
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state')(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>

                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

RoleForm = Form.create({})(RoleForm);

class PermForm extends React.Component {

    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }

    render() {
        let detailInfo = this.props.detailInfo
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        let { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator("roleName", {})(
                            <Input placeholder={detailInfo.roleName} disabled />
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator("status", {
                            initialValue: detailInfo.status
                        })(
                            <Select>
                                <Option value={0}>禁用</Option>
                                <Option value={1}>启用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={this.props.menuInfo}
                    onCheck={(checkedKeys) => {
                        this.onCheck(checkedKeys)
                    }}
                >
                    <TreeNode title="平台权限" key="platForm">
                        {this.props.treeData}
                    </TreeNode>

                </Tree>

            </Form>
        );
    }
}
PermForm = Form.create({})(PermForm);