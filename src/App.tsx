import React from 'react';
import './App.css';
import StartPage from "./pages/StartPage/StartPage";
import { Switch, Route, Redirect } from 'react-router-dom';
import Game from "./pages/GamePage/Game";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route component={StartPage} path={'/start'}/>
          <Route component={Game} path={'/game'}/>
          <Route exact path="/">
              <Redirect to="/start" />
          </Route>
      </Switch>

    </div>
  );
}

export default App;
