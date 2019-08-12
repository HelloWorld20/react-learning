import React from "react";
// import classnames from 'classnames';

import "./style.css";

interface IProps {
  show?: boolean;
  title?: string;
  body?: string;
  onClose?: (event: React.MouseEvent) => void
}

// model 组件
const model: React.FunctionComponent<IProps> = props => {
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (props.onClose) {
            props.onClose(e)
        }
    }
  return (
    <div className="e-model" style={{display: props.show ? 'block' : 'none'}}>
      <div className="e-model-mask" />
      <div className="e-model-content">
        <h1 className="e-model-title">{ props.title }</h1>
        <div className="e-model-body">{ props.body || props.children}</div>
        <div className="e-model-footer">
          <button className="e-model-close" onClick={handleClick}>关闭</button>
        </div>
      </div>
    </div>
  );
}

model.defaultProps = {
    show: true,
    title: 'model title'
}

export default model;