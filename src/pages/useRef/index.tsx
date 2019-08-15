/*
 * @Author: jianghong.wei 
 * @Date: 2019-08-12 15:03:57 
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-08-14 14:42:56
 */

import React, { FunctionComponent, useState, useRef, useContext } from "react";
import { StoreContext } from "../../store";

const NewRef: FunctionComponent = function() {
  const [inputVal, setInputVal] = useState("0");
  // 必须加上<HTMLInputElement>，inputEl.current.focus();才能通过检查，同样的，inputEl只能绑到input上
  const inputEl = useRef<HTMLInputElement>(null); // useRef 几乎与 React.createRef一模一样
  function onBtnClick() {
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  }
  return (
    <div>
      <input
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        ref={inputEl}
      />
      <button onClick={onBtnClick}>focus</button>
    </div>
  );
};

const OldRef = function() {
  const [inputVal, setInputVal] = useState("0");
  const inputEl = React.createRef<HTMLInputElement>();
  function onBtnClick() {
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  }
  return (
    <div>
      <input
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        ref={inputEl}
      />
      <button onClick={onBtnClick}>focus</button>
    </div>
  );
};

export default function() {
  const { state } = useContext(StoreContext);
  return (
    <>
      <h1>useRef</h1>
      {state.isNewVersion ? <NewRef /> : <OldRef />}
    </>
  );
}
