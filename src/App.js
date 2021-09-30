import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Testing } from './components/testing';
import { Home } from './components/Home';
import { Colleges } from './components/Colleges';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/test/:colleges" component={Testing} />
        <Route path="/colleges/:college" component={Colleges} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
