import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect
} from "react";
import { StoreContext } from "../../store";
import useClock from "../../hooks/clock";

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

const BadCompo = function() {
  let [time] = useClock(); // 该hooks会每秒触发一次渲染。
  const [count, setCount] = useState(0);
  const timeCost = expensive();

  useEffect(() => {
    setCount(count + 1);
  }, [time]); // 在time更新的时候，更新一次。否则会频繁渲染两次

  return (
    <p>
      bad component, time cost: {timeCost} ms, update times: {count}
    </p>
  );
};

const GoodCompo = function(props: any) {
//   return <MemoComp {...props} />;
return <CallBackComp />
};

const MemoComp = function(props: any) {
  const [time] = useClock();
  const [outerCount, setOuterCount] = useState(0);
  const [innerCount, setInnerCount] = useState(0);

  //   lalala是undefined， useEffect无法返回东西
  let lalala = useEffect(() => {
    setOuterCount(outerCount + 1);
  }, [time, props.go]);

  //   useMemo用法几乎和useEffect一样.不一样的是,useMemo可以返回值,官方推荐用useMemo来执行高消耗的方法
  const timeCost = useMemo(() => {
    setInnerCount(innerCount + 1);
    return expensive();
  }, [props.go]);

  return (
    <p>
      good component; render times: {outerCount}; render expensive times:{" "}
      {innerCount}, time cost is : {timeCost} ms
    </p>
  );
};

// 真的无法明白这个的使用场景
const CallBackComp = function(props: any) {
  const [time] = useClock();
//   尽管多次调用useCallback, 但是callback始终是一个值,可以用set数据接口测试
  const callback = useCallback(expensive, [time]);
  
  return <p>useCallback component. </p>;
};

export default function() {
  const { state } = useContext(StoreContext);
  const [temp, setTemp] = useState(0);

  return (
    <div>
      <h1>useMemo & useCallback page</h1>
      <hr />
      <button onClick={() => setTemp(temp + 1)}>fire</button>
      {state.isNewVersion ? <GoodCompo go={temp} /> : <BadCompo />}
    </div>
  );
}
