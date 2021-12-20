import React, { FC,Component, ButtonHTMLAttributes } from "react";

import './App.css';

const MyComponent: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { children, ...rest } =  props;
  return <button {...rest}>{children}</button>;
}

export default class App extends Component {
  state = {
    id: 0,
  };

  render() {
    const { id } = this.state;

    return (
      <React.Fragment>
        <MyComponent>{id}</MyComponent>
      </React.Fragment>
    );
  }
}
