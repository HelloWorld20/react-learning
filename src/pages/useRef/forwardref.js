/*
 * @Author: jianghong.wei 
 * @Date: 2019-08-12 15:46:41 
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-08-15 11:03:19
 */

import React, { useContext, useRef, useImperativeHandle } from 'react';
import { StoreContext } from '../../store'

// 默认情况下，ref是不能传递给子组件。如若需要传递ref，则需要通过React.forwardRef。
// 该方法会把父组件传入的props与ref分开，作为两个参数，注入给React.forwardRef的第一个参数中，使其拿到父组件的ref
// 可以把React.forwardRef当作一个 修饰器 。
const OldChild = React.forwardRef((props, ref) => {
    return <input ref={ref} {...props} />
})

const OldFather = function () {
    const inputEl = React.createRef();
    function inputFocus() {
        if (inputEl && inputEl.current) {
            inputEl.current.focus()
        }
    }
    return <div>
        <OldChild ref={inputEl} placeholder='placeholder' />
        <button onClick={inputFocus}>focus input</button>
    </div>
}

const NewChild = React.forwardRef((props, ref) => {
    const localRef = useRef();

    // 他的意义在于，可以自定义内部的逻辑，而不是直接由父组件来操作
    useImperativeHandle(ref, () => ({
        focus: () => {
            localRef.current.focus()
        },
        customFocus: () => {
            localRef.current.focus();
        }
    }))

    return <input ref={localRef} {...props} />
})

const NewFather = function () {
    const inputEl = useRef(null);
    function inputFocus() {
        if (inputEl && inputEl.current) {
            // inputEl.current.focus() 和 inputEl.current.customFocus()都可以让子组件focus
            // inputEl.current.focus()
            inputEl.current.customFocus();
        }
    }
    return <div>
        <NewChild ref={inputEl} placeholder="placeholder" />
        <button onClick={inputFocus}>focus input</button>
    </div>
}


export default function () {
    const { state } = useContext(StoreContext);
    return <div>
        <h1>forwardRef page</h1>
        {state.isNewVersion ? <NewFather /> : <OldFather />}
    </div>
};