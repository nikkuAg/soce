import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, HashRouter, Redirect } from 'react-router-dom';
import { Home } from './components/Home';
import { Colleges } from './components/Colleges';
import { SeatMatrix } from './components/SeatMatrix';
import { Ranks } from './components/Ranks';
import { FormPrediction } from './components/FormPrediction';
import { Prediction } from './components/Prediction';
import { Contact } from './components/Contact';
import { Use } from './components/Use';
import { FormTrend } from './components/FormTrend';



function App() {
  let insSave = String(sessionStorage.getItem('ins'))
  let poolSave = String(sessionStorage.getItem('pool'))
  let categorySave = String(sessionStorage.getItem('category'))
  let quotaSave = String(sessionStorage.getItem('quota'))
  let rankSave = String(sessionStorage.getItem('rank'))
  let yearSave = String(sessionStorage.getItem('year'))
  let roundSave = String(sessionStorage.getItem('round'))
  let optionSave = String(sessionStorage.getItem('option'))

  const [ins] = useState(insSave === "null" ? "" : insSave)
  const [seat_pool] = useState(poolSave === "null" ? "" : poolSave)
  const [categoryValue] = useState(categorySave === "null" ? "" : categorySave)
  const [quotaValue] = useState(quotaSave === "null" ? "" : quotaSave)
  const [rank] = useState(rankSave === "null" ? "" : rankSave)
  const [yearValue] = useState(yearSave === "null" ? "" : yearSave)
  const [roundValue] = useState(roundSave === "null" ? "" : roundSave)
  const [option] = useState(optionSave === "null" ? "" : optionSave)

  const [institutes, setinstitute] = useState([])
  const [branches, setbranch] = useState([])
  const apiurl1 = "https://mysoce.pythonanywhere.com/soce/institutes/"
  const apiurl2 = "https://mysoce.pythonanywhere.com/soce/branches/"
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
  return (
    <BrowserRouter>
      <HashRouter>
        <Route path="/home" component={Home} />
        <Route path="/colleges/:college" component={Colleges} />
        <Route path="/seats/:college" component={() => (<SeatMatrix institutes={institutes} branches={branches} />)} />
        <Route path="/ranks/:college" component={() => (<Ranks institutes={institutes} branches={branches} />)} />
        <Route path="/prediction" component={() => (<FormPrediction />)} />
        {/* <Route path="/trend" component={() => (<FormTrend institutes={institutes} branches={branches} />)} /> */}
        <Route path="/result" component={() => (<Prediction institutes={institutes} branches={branches} college={ins} pool={seat_pool} category={categoryValue} myRank={rank} quota={quotaValue} year={yearValue} round={roundValue} option={option} />)} />
        <Route path="/contact_us" component={Contact} />
        <Route path="/how_to_use" component={Use} />
        <Redirect to="/home" />
      </HashRouter>
    </BrowserRouter>
  )
}

export default App
