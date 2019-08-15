import React from "react";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";

import App from "./App";
import Hook from "./pages/useState";
import Context from "./pages/useContext";
import Reducer from "./pages/useReducer";
import Usememo from "./pages/useMemo&Callback";
import Hoc from "./pages/higherOrderComponent";
import Ref from "./pages/useRef";
import ForwardRef from "./pages/useRef/forwardref";
import LayoutEffect from "./pages/useLayoutEffect";
import Generic from "./pages/ts/generic";
import PureConponent from "./pages/pureConponent&memo/pure";
import Memo from "./pages/pureConponent&memo/memo";
import CreateElement from "./pages/element/createElement";

export default function() {
  return (
    //   HashRouter, 而不是 BrowserRouter. HashRouter利用hash切换路由.而BrowserRouter则直接跳转(且没用到history.pushState)
    <HashRouter>
      {/* 渲染第一个匹配到的Route */}
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/hook" component={Hook} />
        <Route path="/context" component={Context} />
        <Route path="/reducer" component={Reducer} />
        <Route path="/usememo" component={Usememo} />
        <Route path="/hoc" component={Hoc} />
        <Route path="/ref" component={Ref} />
        <Route path="/forwardref" component={ForwardRef} />
        <Route path="/layouteffect" component={LayoutEffect} />
        <Route path="/generic" component={Generic} />
        <Route path="/pure" component={PureConponent} />
        <Route path="/memo" component={Memo} />
        <Route path="/createElement" component={CreateElement} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}
