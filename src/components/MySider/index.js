import React, {Component} from 'react';
import { Menu } from 'antd';
import MyNavLink from "../MyNavLink";
import { navList } from "../../common/router";
import { withRouter } from "react-router-dom";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { Button } from "antd";
import "./index.less"

const { SubMenu } = Menu;
const navs = navList()
function getRouteFromHash() {
    const path = window.location.hash.slice(2)
    const pathArr = path.split('-')
    let to = ''
    let fatherName = ''
    if(pathArr.length>1) {
        to = pathArr.reduce((sum, item) => {
            return sum  + '-' + item
        },'')
        to = to.slice(1)
        fatherName = pathArr[0]
    } else {
        fatherName = pathArr[0]
        to = pathArr[0]
    }
    return { to, fatherName }
}


class MySider extends Component {
    constructor(props) {
        const { to, fatherName } = getRouteFromHash()
        super(props);
        this.state = {
            defaultSelectedKeys: [to],
            defaultOpenKeys: [fatherName],
            openKeys: [fatherName],
            collapsed: false
        }
    }

    onOpenChange = (keyArr) => {
        const openKey = keyArr[keyArr.length - 1]
        this.setState({openKeys: [openKey]})
    }

    toggleCollapsed = () => {
        this.setState(state => ({collapsed: !state.collapsed}))
    }


    render() {
        console.log('render sider')
        const { defaultSelectedKeys, defaultOpenKeys, openKeys, collapsed } = this.state
        return (
            <div className='my-sider' style={collapsed ? { width: 80 } : {}}>
                <div className='collapsed' style={{height: 40, lineHeight: 40 }}>
                    <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={defaultSelectedKeys}
                    defaultOpenKeys={defaultOpenKeys}
                    openKeys={openKeys}
                    onOpenChange={this.onOpenChange}
                    inlineCollapsed={collapsed}
                    key={Date.now()}
                >
                    {
                        navs.map(navItem => {
                            if(navItem.children) {
                                return(
                                    <SubMenu
                                        key={navItem.name}
                                        icon={navItem.icon}
                                        title={<span>{navItem.title}</span>}
                                    >
                                        {
                                            navItem.children.map(menuItem => {
                                                return(
                                                    <Menu.Item key={menuItem.name}>
                                                        <MyNavLink to={menuItem.to}>{menuItem.title}</MyNavLink>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            } else {
                                return (
                                    <Menu.Item key={navItem.name} icon={navItem.icon}>
                                        <MyNavLink to={navItem.to}>{navItem.title}</MyNavLink>
                                    </Menu.Item>
                                )
                            }
                        })
                    }
                </Menu>
            </div>
        );
    }
    componentDidMount() {

        this.props.history.listen(route => {
            const { to, fatherName } = getRouteFromHash()
            this.setState(state => ({ defaultSelectedKeys: to, defaultOpenKeys: fatherName}), ()  => {
                console.log('???????????????????????????????????????????????????????????????item?????????????????????????????????' +
                    '?????????????????????????????????????????????key?????????????????????????????????????????????Menu???key???????????????????????????????????????')
            })
        })
    }
}
export default withRouter(MySider)
