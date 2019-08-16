import React, { ComponentType } from "react";
import ReactDOM from "react-dom";

// ReactDOM.render只返回class组件的实例
export class PopUpComponent extends React.Component {
    id = 0;
    render() {
        return <div>div</div>
    }
}

function factory(props: any) {
    // const container = document.createElement('div');
    // let instance = ReactDOM.render(<PopUpComponent />, container) as PopUpComponent;
    // instance.id = Math.random();
    // document.body.append(container)
    // return instance.id;
}
interface IPopup {
  type: string;
}
enum EType {
  success = "success",
  error = "error",
  confirm = 'confirm'
}
const popup = {
  popup: ({ type = EType.success }: IPopup) => {},
  error: () => {},
  success: () => {
    popup.popup({
      type: EType.success
    });
  }
};

export default popup;
