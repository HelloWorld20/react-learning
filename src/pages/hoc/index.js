/*
 * 高阶组件以及Forwarding Refs的demo。因为HOC的type有点难写。暂时js
 * @Author: jianghong.wei 
 * @Date: 2019-08-01 11:06:01 
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-08-20 10:34:08
 */

import React from 'react';
import Popup from './popup';

// 高阶组件，接收任一组件作为参数，在高阶组件内向参数传入的组件 注入props
const getCoolCompo = WrappedComponent => {
    return props => {
        // 在这做些额外的操作
        let newProps = Object.assign({}, props) ;
        newProps.text = 'HOC button'
        // newProps.style = {backgroundColor: '#b8f1ed', border: 'none', borderRadius: '3px', padding: '10px 15px'}
        console.log('newProps', newProps)
        return <WrappedComponent {...newProps} />
    }
}

// 一个普通的按钮
const NormalButton = function (props) {
    return <button onClick={e => {Popup.success()}} style={props.style}>{props.children || props.text || 'default normal button'}</button>
}
// 一个普通的导航
const NormalAnchor = props => {
    return <a href={props.href} style={props.style}>{props.children}</a>
}

export default function HocDemo() {
    const inputRef = React.createRef();
    const ref = React.createRef();
    const CoolButton = getCoolCompo(NormalButton);
    const CoolAnchor = getCoolCompo(NormalAnchor);

    setTimeout(() => {
        console.log(inputRef, ref)
    }, 300)

    function onClick() {
        console.log('onClick')
    }

    return <>
        <h1>higher order component demo page</h1>
        {/* getCoolButton只能先赋值给变量，在以自定义组件的形式写道jsx里 */}
        <CoolButton onClick={onClick} style={{backgroundColor: '#b8f1ed', border: 'none', borderRadius: '3px', padding: '10px 15px'}}/>
        <hr />
        <NormalButton onClick={onClick}/>
        <hr />
        <NormalAnchor href="https://baidu.com">baidu.com</NormalAnchor>
        <hr />
        <CoolAnchor href="https://baidu.com">baidu.com</CoolAnchor>
        <hr />
    </>
}