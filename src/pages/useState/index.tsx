/*
 * 一个useState的demo,用useState来控制模态框的显示或隐藏
 * @Author: jianghong.wei 
 * @Date: 2019-07-31 14:42:47 
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-08-16 17:17:53
 */

import React, { useState } from "react";

import { Model } from "../../components";

export default function() {
  const [modelState, setModel] = useState(false);
  function closeModel(e: React.MouseEvent) {
    setModel(false)
  }
  function showModel() {
    setModel(true);
  }
  function showPopup() {
    
  }
  return (
    // <React.Fragment>的简写
    <>
      <h1>Hook page</h1>
      <button onClick={showModel}>turn on Model</button>
      <button onClick={showPopup}>turn on popup</button>
      <Model show={modelState} onClose={closeModel}>
        Model children
      </Model>
    </>
  );
}
