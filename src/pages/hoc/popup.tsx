import React, { Component, CElement } from "react";
import ReactDOM, { Renderer } from "react-dom";

type TPopUpComponent = Component & { id?: number };
const instances: Set<TPopUpComponent> = new Set([]);

interface IPopup {
  type: string;
}

// ReactDOM.render只只有参数是函数组件时，才返回实例
export class PopUpComponent extends React.Component {
  constructor(props: IPopup) {
    super(props);
  }
  id = 0;
  render() {
    return <div>div</div>;
  }
}

function factory(props: any) {
  const container = document.createElement("div");
  let instance: TPopUpComponent = ReactDOM.render(
    <PopUpComponent {...props} /> as CElement<any, Component>,  // CElement 应该代表着 类组件。所以
    container
  );
  instance.id = Math.random();

  instances.add(instance)

  document.body.append(container);
  return instance.id;
}

enum EType {
  success = "success",
  error = "error",
  confirm = "confirm"
}
const popup = {
  popup: ({ type = EType.success }: IPopup) => {
    factory(type);
  },
  error: () => {},
  success: () => {
    popup.popup({
      type: EType.success
    });
  }
};

export default popup;
