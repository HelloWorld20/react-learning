/*
 * 自定义hooks，其实就只要把本应该在业务当中的内置hooks抽离出来即可。
 * 内置hooks方法也可以在hooks方法里使用；hooks方法及useXXXX命名的方法。并且该自定义hooks也改遵守hooks规定
 * @Author: jianghong.wei 
 * @Date: 2019-07-31 15:34:13 
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-07-31 15:38:31
 */

import { useState, useEffect } from "react";
import moment from "moment";
moment.locale("zh-cn");

// 自定义hooks，提供当前⏲
export default function useClock() {
  const [time, setTime] = useState(moment().format("YYYY-MM-DD h:mm:ss"));
  useEffect(() => {
    let timer = setTimeout(() => {
      setTime(moment().format("YYYY-MM-DD h:mm:ss"));
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);

  return [time]
}
