import React, {Component} from 'react';
import {Button} from "antd";
// import qs from "querystring"

// function string(obj) {
//     return qs.stringify(obj)
// }


class Child extends Component {
    constructor(props) {
        super(props);
        console.log('child---constructor')
    }

    static getDerivedStateFromProps() {
        console.log('child---getDerivedStateFromProps')
        return {}
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('child---shouldComponentUpdate')
        return true
    }

    render() {
        console.log('child---render')
        return (
            <h1>
                Child
            </h1>
        );
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('child---getSnapshotBeforeUpdate')
        return null
    }

    componentDidUpdate() {
        console.log('child---componentDidUpdate')
    }

    componentDidMount() {
        console.log('child---componentDidMount')
    }

    componentWillUnmount() {
        console.log('child---componentWillUnmount')
    }

    state = {}
}

class Middle extends Component {

    /*
    constructor
    getDerivedStateFromProps
    render
    child---constructor
    child---getDerivedStateFromProps
    child---render
    child---componentDidMount
    componentDidMount
    */

    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }

    static getDerivedStateFromProps(props, state) {
        /*
        从props中派生一个state
        接收的参数是props和state
        返回一个对象，这个对象会取代state，如果返回null就不会有任何负面影响
        这个回调函数的用法极为罕见，只用于state的值在任何时候都取决于props的时候
        使用这个钩子会造成代码冗余难以维护，不推荐使用
        */
        console.log('getDerivedStateFromProps')
        return null
    }

    shouldComponentUpdate(nextProps, nextState,nextContext) {
        console.log('shouldComponentUpdate')
        return true
    }

    render() {
        console.log('render')
        return (
            <div className='my-content'>
                <h3>{this.state.count}</h3>
                <Button onClick={this.clickBtn}>点击</Button>
                <Child></Child>
            </div>
        );
    }

    getSnapshotBeforeUpdate(preProps, preState) {
        /*
        此时dom还没有更新，所以能在之前的dom当中获取信息
        这个钩子返回的东西会被componentDidUpdate这个钩子接收
        一般用于记录数据更新前的东西，比如导航条的位置等等
        这个钩子也不常用
        */
        console.log('getSnapshotBeforeUpdate')
        return '来自getSnapshotBeforeUpdate的数据哦！'
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /*
        第三个参数是上一个钩子getSnapshotBeforeUpdate() return 的参数
        */
        console.log('componentDidUpdate')
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    static getDerivedStateFromError(error) {
        /*
            此生命周期会在后代组件抛出错误后被调用。
            返回一个错误在渲染子组件时没有错就渲染子组件，有错误就渲染错误提示
            {this,state.isError ? <h3>出现错误了。。。</h3>: <Child></Child>}
        */
        console.log(error)
        return {isError: true}
    }

    componentDidCatch(error, info) {
        /*
        此生命周期在后代组件抛出错误后被调用。 它接收两个参数(err, errInfo)
        可以在这里给服务器发请求，报错了，提醒技术人员赶紧修改bug
        */
    }

    static defaultProps = { /*定义默认属性、属性值*/
        color: 'red'
    }

    clickBtn = () => {
        /*
        getDerivedStateFromProps
        shouldComponentUpdate
        render
        child---getDerivedStateFromProps
        child---shouldComponentUpdate
        child---render
        child---getSnapshotBeforeUpdate
        getSnapshotBeforeUpdate
        child---componentDidUpdate
        componentDidUpdate
        */
        this.setState(state => ({count: state.count + 1}))
    }
}

export default class LifeCycle extends Component {
    state = {
        count: 100
    }
    clickBtn = () => {
        /*
        getDerivedStateFromProps
        shouldComponentUpdate
        render
        child---getDerivedStateFromProps
        child---shouldComponentUpdate
        child---render
        child---getSnapshotBeforeUpdate
        getSnapshotBeforeUpdate
        child---componentDidUpdate
        componentDidUpdate
        */
        this.setState(state => ({count: state.count + 1}))
    }
    clickUpdateComponent = () => {
        this.forceUpdate(() => {
            /*
                更新完调用这个回调
                不会执行shouldComponentUpdate钩子，直接调用render(),但会调用其他所有更新时会调用的钩子只是不调用shouldComponentUpdate
                会更新子组件
            */
            console.log('强制更新')
        })
    }

    static getDerivedStateFromProps (state, props) {
        console.log('执行了getDerivedStateFromProps')
        return null
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('执行了！')
        return true
    }

    render() {
        return (
            <div className='my-content'>
                <h3>{this.state.count}</h3>
                <Button onClick={this.clickBtn}>Parent</Button>
                <Button onClick={this.clickUpdateComponent}>forceUpdate</Button>
                <Middle style={{'margin-top': '20px'}} data={this.state.count}></Middle>
            </div>
        );
    }
}
