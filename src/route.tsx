import React from "react";
import {
  Route,
  Switch,
  HashRouter,
  Redirect,
  BrowserRouter,
  MemoryRouter,
} from "react-router-dom";

import App from "./App";
import UseState from "./pages/useState";
import Context from "./pages/useContext";
import Reducer from "./pages/useReducer";
import Usememo from "./pages/useMemo&Callback";
import Hoc from "./pages/hoc";
import Ref from "./pages/useRef";
import ForwardRef from "./pages/useRef/forwardref";
import LayoutEffect from "./pages/useLayoutEffect";
import Generic from "./pages/ts/generic";
import PureConponent from "./pages/pureConponent&memo/pure";
import Memo from "./pages/pureConponent&memo/memo";
import CreateElement from "./pages/element/createElement";
import Lazy from "./pages/lazy&suspense";
// import Test from "./pages/test/scroll";
import RoutePage from "./pages/route";
// import Popup from "./pages/hoc/popup";
import Playground from "./pages/playground";
import ApartRadar from "./pages/apart-radar";

export const routeList = {
  hook: UseState,
  context: Context,
  reducer: Reducer,
  usememo: Usememo,
  hoc: Hoc,
  ref: Ref,
  forwardref: ForwardRef,
  layouteffect: LayoutEffect,
  generic: Generic,
  pure: PureConponent,
  memo: Memo,
  createElement: CreateElement,
  lazy: Lazy,
  apratRadar: ApartRadar,
  playground: Playground,
  // test: Test,
  route: RoutePage,
};

function getRoutes(routeList: Record<string, any>) {
  return Object.keys(routeList).map((key) => {
    return <Route key={key} path={`/${key}`} component={routeList[key]} />;
  });
}
export default function () {
  return (
    //   HashRouter, 而不是 BrowserRouter. HashRouter利用hash切换路由.而BrowserRouter则直接跳转(且没用到history.pushState)
    <HashRouter>
      {/* 渲染第一个匹配到的Route */}
      <Switch>
        <Route path="/" exact component={App} />
        {getRoutes(routeList)}
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}
