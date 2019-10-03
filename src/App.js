import React from 'react';
import {BrowserRouter,HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import './style.css';
import Accuil from './components/accuil';
import Controlcontainer from './components/control/controlContainer';
import ImportContainer from './components/importation/importContainer';
import { Provider } from "./store/context";

function App() {
  return (
  <Provider>
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/" component={Accuil} exact/>
          <Route path="/importation" component={ImportContainer}/>
          <Route path="/control" component={Controlcontainer}/>
        </Switch>
      </HashRouter>
    </div>
  </Provider>
  );
}

export default App;
