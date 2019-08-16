/*
 * 展示react useContext的用法。以及对应的旧写法
 * @Author: jianghong.wei 
 * @Date: 2019-07-31 14:17:33 
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-07-31 15:38:58
 */

import React, { useState, useContext } from "react";
import { StoreContext } from "../../store";
import useClock from '../../hooks/clock';
import "./style.css";

// 创建context
const ClockContext = React.createContext("clock");
const TextColorContext = React.createContext("style");

// useContext用方法
const ContextComp = function() {
  // context hook替代旧context
  const time = useContext(ClockContext);
  const textColor = useContext(TextColorContext);
  return (
    <p style={{ color: textColor }}>
      <strong>hook</strong> style: {time}
    </p>
  );
};

// 旧式context用法
class ClassContext extends React.Component {
  render() {
    return (
      // 如果两个context嵌套，只能一个一个嵌套再回调里（麻烦）
      <ClockContext.Consumer>
        {time => (
          <TextColorContext.Consumer>
            {textColor => (
              <p style={{ color: textColor }}>
                <strong>class</strong> style: {time}
              </p>
            )}
          </TextColorContext.Consumer>
        )}
      </ClockContext.Consumer>
    );
  }
}


// 一个中间层，用来表达context可以穿透组件传至
function Middle() {
  // 利用useContext，可以在项目内部任何地方拿到state，和dispatcher
  const { state } = useContext(StoreContext);

  return <div>{state.isNewVersion ? <ContextComp /> : <ClassContext />}</div>;
}

// context提供者，最外层
const ContextProvider = function() {
  
  const [textColor, setTextColor] = useState("#000000");
  const [time] = useClock();

  // React.ChangeEvent<HTMLInputElement>比较重要。基本上是固定写法，然后html相关都是HTMLxxxElement
  function colorChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTextColor(event.target.value);
  }

  return (
    <ClockContext.Provider value={time}>
      <TextColorContext.Provider value={textColor}>
        <h1>useContext page. </h1>
        更换文字颜色：
        <input type="color" onChange={colorChange} />
        <Middle />
      </TextColorContext.Provider>
    </ClockContext.Provider>
  );
};

export default ContextProvider;
