import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.less';
import menuList from '../../config/menuConfig';
const { SubMenu } = Menu;

class NavLeft extends Component{

    componentWillMount(){
        const menuTreeNode = this.renderMenu(menuList);
        this.setState({
            menuTreeNode: menuTreeNode
        });
    }

    // 菜单渲染
    renderMenu = (data) => {
        return data.map( (iterm) => {
            if (iterm.children) {
                return (
                    <SubMenu key={iterm.key} title={iterm.title} >
                        { this.renderMenu(iterm.children) }
                    </SubMenu>
                );
            }
            return <Menu.Item key={iterm.key} >
                <NavLink to={iterm.key}> {iterm.title} </NavLink>
                </Menu.Item>;
        } );
    }
    render(){
        return(
            <div>
                <div className="logo">
                    <Icon type="appstore" theme="twoTone" />
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme="dark" mode="vertical">
                    {this.state.menuTreeNode}
                </Menu>
            </div>

        );
    }
}
export default NavLeft;