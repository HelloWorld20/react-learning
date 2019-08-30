import React, { createRef, RefObject } from "react";
import { RouteComponentProps } from "react-router-dom";
import BScroll from "better-scroll";
import "./style.css";
interface IProps {}
interface IState {
  wrapper: RefObject<HTMLDivElement> ;
  [key: string]: any
}
type Props = IProps & RouteComponentProps<any>;

class Scroll extends Component<IProps, IScrollState> {
  state = {
    wrapper: createRef(),
    beforePullDown: true,
    isPullingDown: false,
  };
  static instance: any;
  componentDidMount() {
    let wrapper: any = this.state.wrapper.current;

    Scroll.instance = new BScroll(wrapper, {
      pullDownRefresh: {
        threshold: 50,
        stop: 20,
      },
    });
    Scroll.instance.on('pullingDown', this.pullingDownHandler);
  }
  componentWillUnmount() {
    Scroll.instance.destroy();
  }

  pullingDownHandler = async () => {
    this.setState({
      beforePullDown: false,
      isPullingDown: true,
    });
    await this.requestData();

    this.setState({
      isPullingDown: false,
    });

    this.finishPullDown();
  };

  finishPullDown = async () => {
    await new Promise(resolve => {
      setTimeout(() => {
        Scroll.instance.finishPullDown();
        resolve();
      }, 100);
    });
    setTimeout(() => {
      this.setState({
        beforePullDown: true,
      });
      Scroll.instance.refresh();
    }, 200);
  };

  requestData = async () => {
    return new Promise(res => {
      setTimeout(() => {
        res();
      }, 2000);
    });
  };

  render() {
    return (
      <div className="pulldown" style={{ fontSize: '16px', height: '400px' }}>
        <div ref={this.state.wrapper} className="pulldown-bswrapper">
          <div className="pulldown-scroller">
            <div className="pulldown-wrapper">
              {this.state.beforePullDown ? (
                <div>
                  <span>pull down and refresh</span>
                </div>
              ) : (
                <div>
                  <span>
                    {this.state.isPullingDown
                      ? 'loading...'
                      : 'Refresh success'}
                  </span>
                </div>
              )}
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}