import React, { useContext } from "react";
import { StoreContext } from "../../store";

// 这么用，效果和React.PureComponent一样。
// props改变的时候，浅对比一下props，如果又改动，则重新渲染，否则不渲染
// memo相当于 函数组件里的 PureComponent
const NewCompo = React.memo((props: { count: number }) => {
  console.count("NewCompo render");
  return <p>{props.count}</p>;
});

// 默认memo浅层比较,第二个参数也可以自定义比较
// const MemoWithComplex = React.memo(() => {
//     ...this.
// }, (preProps, nextProps) => true)

// 反之，原写法只要props更新，就会重新渲染
function OldCompo(props: { count: number }) {
  console.count("OldCompo render");
  return <p>{props.count}</p>;
}

export default function() {
  const {
    state: { isNewVersion }
  } = useContext(StoreContext);
  return <Memo isNewVersion={isNewVersion} />;
}

class Memo extends React.Component<{isNewVersion: boolean}> {
  state = {
    count: 0
  };
  render() {
    return (
      <div>
        <h1>React.memo page</h1>
        {this.props.isNewVersion ? (
          <NewCompo count={this.state.count} />
        ) : (
          <OldCompo count={this.state.count} />
        )}
        <button onClick={() => this.setState({ count: 1 })}>click</button>
      </div>
    );
  }
}
