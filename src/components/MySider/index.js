import React, {Component} from 'react';
import { Menu } from 'antd';
import MyNavLink from "../MyNavLink";
import { navList } from "../../common/router";
import { Redirect } from "react-router-dom"
import { withRouter } from "react-router-dom"

const { SubMenu } = Menu;

class MySider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultSelectedKeys: ['home'],
            defaultOpenKeys: ['home']
        }
    }
    render() {
        const { defaultSelectedKeys, defaultOpenKeys } = this.state
        return (
            <div className='my-sider'>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={defaultSelectedKeys}
                    defaultOpenKeys={defaultOpenKeys}
                    style={{ height: '100%' }}
                >
                    {
                        navList().map(navItem => {
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
                <Redirect to='/home'/>
            </div>
        );
    }
}
export default withRouter(MySider)
