/**
 * 利用useReducer的 redux 封装
 * 利用 useContext 和 useReducer 来替代react-redux
 */
import React, { useReducer } from "react";

import store, { initState } from "./reducers/app";

interface IContext {
    state: Record<string, any>
    dispatcher: React.Dispatch<any>
}
export const StoreContext = React.createContext<IContext>({
  state: {},
  dispatcher: () => {}
});

// (window as any).StoreContext = StoreContext;

const Root = (props: any) => {
  const [state, dispatcher] = useReducer(store, initState);
  const provide = {
    state,
    dispatcher
  };
  return (
    // 替换 react-redux 的Privider
    // 把state，和dispatcher注入路由组件内部
    <StoreContext.Provider value={provide}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default Root;
