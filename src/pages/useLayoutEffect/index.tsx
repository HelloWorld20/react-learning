/*
 * @Author: jianghong.wei
 * @Date: 2019-08-12 17:19:50
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-08-12 18:19:27
 */

import React, {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useContext
} from "react";
import useClock from "../../hooks/clock";
import { StoreContext } from "../../store";
// import './style.css';

// 一个昂贵的操作， 返回操作时间
function expensive() {
  const start = new Date().getTime();
  Array(1000000)
    .fill(1)
    .forEach(v => {
      return Math.random();
    });
  return new Date().getTime() - start;
}

interface IProp {
  time: string;
}

const OldCompo: FunctionComponent<IProp> = function(props: IProp) {
  const { time } = props;
  useEffect(() => {
    expensive();
  }, [time]);
  return <p>{time}</p>;
};



// 失败，并没有阻塞渲染
const NewCompo: FunctionComponent<IProp> = function(props: IProp) {
  const { time } = props;
  useLayoutEffect(() => {
    expensive();
  }, [time]);
  return <p>{time}</p>;
};

export default function() {
  const [time] = useClock();
  const { state } = useContext(StoreContext);
  return (
    <div>
      <h1 className="drift">useLayoutEffect</h1>
      {state.isNewVersion ? <NewCompo time={time} /> : <OldCompo time={time} />}
    </div>
  );
}
