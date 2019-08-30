import React, { SFC, MouseEventHandler } from "react";
import { Route, Switch, HashRouter, Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";

function Topic() {
  return <h3>Topic Component.</h3>;
}
// RouteComponentProps是为了描述props里的history、location、match、staticContext对象
const RouteDemo = function(props: RouteComponentProps) {
  // props里包含history、location、match、staticContext对象
  function handleClick(e: any) {
    e.preventDefault();
    props.history.push("/route/home");
  }
  return (
    <div>
      <h1>route page</h1>
      <ul>
        <li>
          <Link to={`${props.match.url}/component`}>Component</Link>
        </li>
        <li>
          <a href="" onClick={e => handleClick(e)}>
            another
          </a>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path={`${props.match.path}/component`} component={Topic} />
        <Route
          path={`${props.match.path}/:id`}
          render={() => <p>render page</p>}
        />
      </Switch>
    </div>
  );
};

export default withRouter(RouteDemo);
