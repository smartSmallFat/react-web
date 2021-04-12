import Props from "../pages/Core/Props";
import State from "../pages/Core/State";
import LifeCycle from "../pages/Core/LifeCycle";
import Context from "../pages/Avanced/Context";
import ErrorBoundaries from "../pages/Avanced/ErrorBoundaries"
import Home from "../pages/Home";
import AxiosTest from "../pages/AxiosTest";

import {
    HomeOutlined,
    SettingFilled
} from '@ant-design/icons';

const routes = [
    {
        to: '/home',
        name: 'home',
        title: '首页',
        icon: <HomeOutlined />,
        component: Home
    },
    {
        to: '/axios',
        name: 'axios',
        title: 'axios',
        icon: <HomeOutlined />,
        component: AxiosTest
    },
    {
        to: '/core',
        name: 'core',
        title: '核心',
        icon: <HomeOutlined/>,
        component: null,
        children: [
            {
                to: '/core-props',
                name: 'core-props',
                title: 'props',
                icon: null,
                component: Props
            },
            {
                to: '/core-state',
                name: 'core-state',
                title: 'state',
                icon: null,
                component: State
            },
            {
                to: '/core-life-cycle',
                name: 'core-life-cycle',
                title: '生命周期',
                icon: null,
                component: LifeCycle
            },
        ]
    },
    {
        to: '/advanced',
        name: 'advanced',
        title: '高级指南',
        icon: <SettingFilled/>,
        component: null,
        children: [
            {
                to: '/advanced-context',
                name: 'advanced-context',
                title: 'context',
                icon: null,
                component: Context
            },
            {
                to: '/advanced-error-boundaries',
                name: 'advanced-error-boundaries',
                title: '错误边界',
                icon: null,
                component: ErrorBoundaries
            },
        ]
    },
]
export const navList = () => {
    return routes
}
