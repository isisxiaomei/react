import React, { Component } from 'react';
import { connect } from "react-redux";
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.less';
import menuList from '../../config/menuConfig';
import { switchMenu } from "../../redux/actions";
const { SubMenu } = Menu;

class NavLeft extends Component {

    state = {
        currentKey: ''
    }
    componentWillMount() {
        const menuTreeNode = this.renderMenu(menuList);
        this.setState({
            menuTreeNode: menuTreeNode
        });
    }


    handleClick = ({item}) => {
        let { dispatch } =  this.props;
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey: item.key
        })
    }

    // 菜单渲染
    renderMenu = (data) => {
        return data.map((iterm) => {
            if (iterm.children) {
                return (
                    <SubMenu key={iterm.key} title={iterm.title} >
                        {this.renderMenu(iterm.children)}
                    </SubMenu>
                );
            }
            return <Menu.Item key={iterm.key} title={iterm.title}>
                <NavLink to={iterm.key}> {iterm.title} </NavLink>
            </Menu.Item>;
        });
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <Icon type="appstore" theme="twoTone" />
                    <h1>Imooc MS</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="vertical"
                    selectedKeys={this.state.currentKey}
                    onClick={this.handleClick}
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>

        );
    }
}


export default connect()(NavLeft);