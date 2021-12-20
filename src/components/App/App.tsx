import React, { FC, useCallback } from "react";

import './App.css';

import { Button } from  '../Button/Button';

const App: FC = () => {
  const handleClick = useCallback((e) => {
    // TODO implement game start
    console.log('start!', e)
  }, []);

  return (
    <React.Fragment>
      <Button onClick={handleClick}>start</Button>
    </React.Fragment>
  );
}

export default App;
