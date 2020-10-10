import React from 'react';
import './App.css';
import StartPage from "./pages/StartPage/StartPage";
import { Switch, Route } from 'react-router-dom';
import Game from "./pages/GamePage/Game";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route component={StartPage} path={'/'} exact/>
          <Route component={Game} path={'/game'}/>
      </Switch>

    </div>
  );
}

export default App;
