import React from "react";
import { PullToRefresh, ListView, Button } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import "./style.css";

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

export default function Test() {
  function fetchData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }
  return (
    <div className="refresh-wrapper">
      <Refrash refresh={fetchData}>
        {Array(60)
          .fill("1")
          .map((v, i) => (
            <div key={i}>item</div>
          ))}
      </Refrash>
    </div>
  );
}

interface IProps {
  refresh: () => void;
}

class Refrash extends React.Component<IProps> {
  state = {
    refreshing: false,
    // height: document.documentElement.clientHeight
    height: 400
  };

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          data: genData()
        }),
      0
    );
  }
  render() {
    return (
      <div>
        <PullToRefresh
          damping={60} // 拉动距离限制
          style={{
            height: this.state.height,
            overflow: "auto"
          }}
          getScrollContainer={() => document.body}
          distanceToRefresh={25}
          indicator={{
            deactivate: "未激活",
            activate: "已激活，松开刷新",
            release: "刷新中",
            finish: "刷新结束"
          }}
          direction="down"
          refreshing={this.state.refreshing}
          onRefresh={async () => {
            this.setState({ refreshing: true });
            await this.props.refresh();
            this.setState({ refreshing: false });
          }}
        >
          {this.props.children}
        </PullToRefresh>
      </div>
    );
  }
}
