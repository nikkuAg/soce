import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Testing } from './components/testing';
import { Home } from './components/Home';
import { Colleges } from './components/Colleges';
import { SeatMatrix } from './components/SeatMatrix';
import { Prediction } from './components/Prediction';

function App() {

  const [institutes, setinstitute] = useState([])
  const [branches, setbranch] = useState([])
  const apiurl1 = "http://localhost:8000/soce/institutes/"
  const apiurl2 = "http://localhost:8000/soce/branches/"
  useEffect(() => {
    axios.get(apiurl1)
      .then(res => {
        setinstitute(res.data)
      })
    axios.get(apiurl2)
      .then(res => {
        setbranch(res.data)
      })
  }, [])
  // console.log(institutes)
  // console.log(branches)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/test/:colleges" component={Testing} />
        <Route path="/colleges/:college" component={Colleges} />
        <Route path="/seats/:college" component={() => (<SeatMatrix institutes={institutes} branches={branches} />)} />
        <Route path="/prediction/:college" component={() => (<Prediction institutes={institutes} branches={branches} />)} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
