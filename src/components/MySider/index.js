import React, {Component} from 'react';
import { Menu } from 'antd';
import MyNavLink from "../MyNavLink";
import { navList } from "../../common/router";
// import { Redirect } from "react-router-dom"
import { withRouter } from "react-router-dom"
import qs from "querystring"

const { SubMenu } = Menu;
const navs = navList()
const rootKeys = getRootKeys()

function getRootKeys() {
    const arr = navs.filter(nav => {
        return nav.name
    })
    return arr
}

class MySider extends Component {
    constructor(props) {
        const path = qs.parse(localStorage.getItem('path'))
        /*const pathArr = path.split('-')
        console.log(pathArr)
        let defaultSelectedKey = ''
        let defaultOpenKey = ''
        if(pathArr.length>1) {
            defaultSelectedKey = pathArr.reduce((sum, item) => {
                return sum  + '-' + item
            },'')
            defaultSelectedKey = defaultSelectedKey.slice(1)
            defaultOpenKey = pathArr[0]
        } else {
            defaultOpenKey = pathArr[0]
            defaultSelectedKey = pathArr[0]
        }*/
        super(props);
        this.state = {
            defaultSelectedKeys: [path.defaultSelectedKey],
            defaultOpenKeys: [path.defaultOpenKey],
            openKeys: [path.defaultOpenKey]
        }
    }

    onOpenChange = (keyArr) => {
        /*const path = window.location.hash.slice(2).split('-')[0]
        console.log(keyArr)
        const keys = keyArr.filter(item => {
            return item === path
        })
        console.log(keys)
        this.setState({openKeys: keys})*/


        const { openKeys } = this.state
        const latestOpenKey = keyArr.find(key => openKeys.indexOf(key) === -1);
        if (rootKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys: [...keyArr]},() => {
                console.log(this.state.openKeys)
            })
        } else {
            this.setState({openKeys: latestOpenKey ? [latestOpenKey] : []},() => {
                console.log(this.state.openKeys)
            })
        }
    }


    render() {
        console.log('render')
        const { defaultSelectedKeys, defaultOpenKeys, openKeys } = this.state
        return (
            <div className='my-sider'>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={defaultSelectedKeys}
                    defaultOpenKeys={defaultOpenKeys}
                    openKeys={openKeys}
                    style={{ height: '100%' }}
                    onOpenChange={this.onOpenChange}
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
        // 浏览器刷新前记录path
        window.addEventListener("beforeunload", event => {
            const path = window.location.hash.slice(2)
            const pathArr = path.split('-')
            let defaultSelectedKey = ''
            let defaultOpenKey = ''
            if(pathArr.length>1) {
                defaultSelectedKey = pathArr.reduce((sum, item) => {
                    return sum  + '-' + item
                },'')
                defaultSelectedKey = defaultSelectedKey.slice(1)
                defaultOpenKey = pathArr[0]
            } else {
                defaultOpenKey = pathArr[0]
                defaultSelectedKey = pathArr[0]
            }
            const pathDetails = {
                defaultOpenKey,
                defaultSelectedKey
            }
            localStorage.setItem('path',qs.stringify(pathDetails))
        })
        console.log(this.state.defaultOpenKeys.toString())
    }
}
export default withRouter(MySider)
