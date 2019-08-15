import React, { useContext } from "react";
import { StoreContext } from "../../store";

// React.PureComponent只会更新一次
// 相关与自带个shouldCOmponentUpdata里进行了一次浅比较。不同则返回true
class NewCompo extends React.PureComponent {
  state = {
    count: 0
  };
  componentWillUpdate() {
    console.log("NewCompo componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("NewCompo componentDidUpdate");
  }
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: 1 })}>click</button>
      </div>
    );
  }
}

// React.component不会拦截更新，每次点击都会update。
// 相当与shouldComponentUpdate一直返回true
class OldCompo extends React.Component {
  state = {
    count: 0
  };

  componentWillUpdate() {
    console.log("OldCompo componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("OldCompo componentDidUpdate");
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: 1 })}>click</button>
      </div>
    );
  }
}

export default function() {
  const {
    state: { isNewVersion }
  } = useContext(StoreContext);
  return (
    <div>
      <h1>pureComponent page</h1>
      {isNewVersion ? <NewCompo /> : <OldCompo />}
    </div>
  );
}
