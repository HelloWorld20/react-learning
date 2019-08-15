/*
 * @Author: jianghong.wei 
 * @Date: 2019-08-14 18:47:25 
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-08-14 18:58:07
 */

import React, { useContext, useState, createElement } from "react";
import { StoreContext } from "../../store";

const h = createElement;

class CreateKey {
    count = 0;
    get = () => {
        return ++this.count;
    }
}

console.log(React.Fragment)

function NewCompo() {
  const [inputVal, setInputVal] = useState("input");
  const keyCreator = new CreateKey();
  const getKey = keyCreator.get;
  // 可以简单暂时这么理解
  // createElement签名为
  // createElement(tagName, props, innerText, [children]), 缺一不可
  return h(React.Fragment, {}, "", [
    h("p", { key: getKey() }, "this is createElement demo"),
    h("input", {
      key: getKey(),
      type: 'text',
      value: inputVal,
      onChange: e => setInputVal(e.target.value)
    })
  ]);
}

function OldCompo() {
  const [inputVal, setInputVal] = useState("input");
  return (
    <>
      <p>this is JSX demo</p>
      <input
        type="text"
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
      />
    </>
  );
}

export default function() {
  const { state } = useContext(StoreContext);
  return (
    <>
      <h1>createElement</h1>
      {state.isNewVersion ? <NewCompo /> : <OldCompo />}
    </>
  );
}
