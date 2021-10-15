import React, { useState, useEffect } from 'react'
import { MenuHeader } from './Menu'
import './form.css'
import { Form, Label } from 'semantic-ui-react'
import { Footer } from './Footer'
import { useHistory } from 'react-router';

const options = [
    { key: 'IIT', text: 'IIT', value: 'IIT' },
    { key: 'IIIT', text: 'IIIT', value: 'IIIT' },
    { key: 'NIT', text: 'NIT', value: 'NIT' },
    { key: 'GFTI', text: 'GFTI', value: 'GFTI' },
]
const category = [
    { key: 'General', text: 'General', value: 'General' },
    { key: 'General Pwd', text: 'General PwD', value: 'General Pwd' },
    { key: 'GEN-EWS', text: 'General EWS', value: 'GEN-EWS' },
    { key: 'GEN-EWS(PwD)', text: 'General EWS (PwD)', value: 'GEN-EWS(PwD)' },
    { key: 'OBC-NCL', text: 'OBC NCL', value: 'OBC-NCL' },
    { key: 'OBC_NCL(PwD)', text: 'OBC NCL(PwD)', value: 'OBC_NCL(PwD)' },
    { key: 'SC', text: 'SC', value: 'SC' },
    { key: 'SC PwD', text: 'SC PwD', value: 'SC PwD' },
    { key: 'ST', text: 'ST', value: 'ST' },
    { key: 'ST PwD', text: 'ST PwD', value: 'ST PwD' },
]
const pool = [
    { key: 'Gender-Neutral', text: 'Gender Neutral', value: 'Gender-Neutral' },
    { key: 'Female-Only', text: 'Female Only', value: 'Female-only' },

]
const type = [
    { key: 'closing_rank', text: 'Closing Rank', value: 'closing_rank' },
    { key: 'opening_rank', text: 'Opening Rank', value: 'opening_rank' },
]
const year = [
    { key: "2020", text: "JoSAA 2020", value: "2020" },
    { key: "2019", text: "JoSAA 2019", value: "2019" },
    { key: "2018", text: "JoSAA 2018", value: "2018" },
    { key: "2017", text: "JoSAA 2017", value: "2017" },
    { key: "2016", text: "JoSAA 2016", value: "2016" },
    { key: "2015", text: "JoSAA 2015", value: "2015" },
]

export const FormPrediction = () => {
    let insSave = String(sessionStorage.getItem('ins'))
    let poolSave = String(sessionStorage.getItem('pool'))
    let categorySave = String(sessionStorage.getItem('category'))
    let quotaSave = String(sessionStorage.getItem('quota'))
    let rankSave = String(sessionStorage.getItem('rank'))
    let yearSave = String(sessionStorage.getItem('year'))
    let roundSave = String(sessionStorage.getItem('round'))
    let optionSave = String(sessionStorage.getItem('option'))
    let cutOffSave = String(sessionStorage.getItem('cutOff'))

    const [ins, setins] = useState(insSave === "null" ? null : insSave)
    const [seat_pool, setpool] = useState(poolSave === "null" ? null : poolSave)
    const [categoryValue, setcat] = useState(categorySave === "null" ? null : categorySave)
    const [quotaValue, setq] = useState(quotaSave === "null" ? null : quotaSave)
    const [rank, setr] = useState(rankSave === "null" ? null : rankSave)
    const [yearValue, sety] = useState(yearSave === "null" ? null : yearSave)
    const [roundValue, setrv] = useState(roundSave === "null" ? null : roundSave)
    const [option, seto] = useState(optionSave === "null" ? null : optionSave)
    const [cutoff, setp] = useState(cutOffSave === "null" ? null : cutOffSave)

    const [change, setchange] = useState('')

    useEffect(() => {
        insSave = String(sessionStorage.getItem('ins'))
        poolSave = String(sessionStorage.getItem('pool'))
        categorySave = String(sessionStorage.getItem('category'))
        quotaSave = String(sessionStorage.getItem('quota'))
        rankSave = String(sessionStorage.getItem('rank'))
        yearSave = String(sessionStorage.getItem('year'))
        roundSave = String(sessionStorage.getItem('round'))
        optionSave = String(sessionStorage.getItem('option'))
        cutOffSave = String(sessionStorage.getItem('cutOff'))

        seto(optionSave === "null" ? null : optionSave)
        setrv(roundSave === "null" ? null : roundSave)
        sety(yearSave === "null" ? null : yearSave)
        setr(rankSave === "null" ? null : rankSave)
        setq(quotaSave === "null" ? null : quotaSave)
        setins(insSave === "null" ? null : insSave)
        setpool(poolSave === "null" ? null : poolSave)
        setcat(categorySave === "null" ? null : categorySave)
        setp(cutOffSave === "null" ? null : cutOffSave)


        var value = document.getElementById("cut").value
        sessionStorage.setItem('cutOff', value)

    }, [change])

    useEffect(() => {
        sessionStorage.setItem('result', false)
        sessionStorage.removeItem('ins')
        sessionStorage.removeItem('pool')
        sessionStorage.removeItem('category')
        sessionStorage.removeItem('quota')
        sessionStorage.removeItem('rank')
        sessionStorage.removeItem('year')
        sessionStorage.removeItem('round')
        sessionStorage.removeItem('option')
        sessionStorage.removeItem('cutOff')
    }, [])

    const history = useHistory()
    const [error, seterror] = useState('')
    const [quota, setquota] = useState([])
    const [placeHolder, setplaceHolder] = useState("")
    const [disable, setdisable] = useState(true)
    const [round, setround] = useState(true)
    const [roundArray, setroundArray] = useState([{ key: '1', text: 'Round 1', value: '1' }])


    const instituteChange = (e, { value }) => {
        if (value === "IIT" || value === "IIIT") {
            setquota([{ key: 'AI', text: 'AI', value: 'AI' }])
        }
        else if (value === "NIT") {
            setquota([{ key: 'HS', text: 'HS', value: 'HS' }, { key: 'OS', text: 'OS', value: 'OS' },
            { key: 'AP', text: 'AP', value: 'AP' }, { key: 'GO', text: 'GO', value: 'GO' }, { key: 'LA', text: 'LA', value: 'LA' }, { key: 'JK', text: 'JK', value: 'JK' }])
        }
        else if (value === "GFTI") {
            setquota([{ key: 'AI', text: 'AI', value: 'AI' }, { key: 'HS', text: 'HS', value: 'HS' },
            { key: 'OS', text: 'OS', value: 'OS' }])
        }
        if (value === "IIT") {
            setplaceHolder("JEE (ADVANCE) Rank")
        } else {
            setplaceHolder("JEE (MAINS) Rank")
        }
        setdisable(false)
        sessionStorage.setItem('ins', value)
        setchange('1')

    }
    const roundChange = (e, { value }) => {
        if (value === '2015') {
            setroundArray([{ key: '7', text: 'Round 7', value: '7' }])
        }
        else if (value === '2017' || value === '2018' || value === '2019') {
            setroundArray([{ key: '1', text: 'Round 1', value: '1' }, { key: '2', text: 'Round 2', value: '2' }, { key: '3', text: 'Round 3', value: '3' }, { key: '4', text: 'Round 4', value: '4' }, { key: '5', text: 'Round 5', value: '5' }, { key: '6', text: 'Round 6', value: '6' }, { key: '7', text: 'Round 7', value: '7' }])
        }
        else if (value === '2020' || value === '2016') {
            setroundArray([{ key: '1', text: 'Round 1', value: '1' }, { key: '2', text: 'Round 2', value: '2' }, { key: '3', text: 'Round 3', value: '3' }, { key: '4', text: 'Round 4', value: '4' }, { key: '5', text: 'Round 5', value: '5' }, { key: '6', text: 'Round 6', value: '6' }])
        }
        setround(false)
        sessionStorage.setItem('year', value)
        setchange('2')

    }

    const handelC = (e, { value }) => {
        sessionStorage.setItem('category', value)
        setchange('3')
    }
    const handelG = (e, { value }) => {
        sessionStorage.setItem('pool', value)
        setchange('4')
    }
    const handelR = (e, { value }) => {
        if (value.match(/^[0-9]+$/) != null) {
            sessionStorage.setItem('rank', value)
            setchange('5')
        }
    }
    const handelQ = (e, { value }) => {
        sessionStorage.setItem('quota', value)
        setchange('6')
    }
    const handelRou = (e, { value }) => {
        sessionStorage.setItem('round', value)
        setchange('7')
    }
    const handelO = (e, { value }) => {
        sessionStorage.setItem('option', value)
        setchange('8')
    }
    const handelP = (e, { value }) => {
        sessionStorage.setItem('cutOff', value)
        setchange('9')
    }

    const buttonClick = () => {
        if (ins && categoryValue && seat_pool && quotaValue && roundValue && yearValue && option) {
            if (rank && rank > '0') {
                if (cutoff && cutoff >= '0' && cutoff <= '100') {
                    sessionStorage.setItem("result", true)
                    history.push('/result')
                }
                else {
                    seterror("Please enter Correct Variation in Cutoff")
                }
            }
            else {
                seterror("Please enter Correct Rank")
            }
        }
        else {
            seterror("Please enter value in all the fields")
        }
    }

    return (
        <>
            <MenuHeader active="prediction" set={false} />
            <h2 className="pageHeading">SOCE Prediction</h2>
            <Form id="predictionForm">
                <Form.Group widths="equal">
                    <Form.Select
                        fluid
                        label='Institute'
                        options={options}
                        placeholder='Select Institute'
                        onChange={instituteChange}
                    />
                    <Form.Select
                        fluid
                        label='Category'
                        options={category}
                        placeholder='Select Category'
                        onChange={handelC}
                    />
                    <Form.Select
                        fluid
                        label='Gender'
                        options={pool}
                        placeholder='Select Gender'
                        onChange={handelG}
                    />
                    <Form.Select
                        fluid
                        label='Quota'
                        options={quota}
                        disabled={disable}
                        placeholder='Select Quota'
                        onChange={handelQ}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input type="number" fluid placeholder="Enter your Rank" label={placeHolder} disabled={disable} onChange={handelR} min='0' />
                    <Form.Select
                        fluid
                        label='Choose Option'
                        options={type}
                        placeholder='Choose Option'
                        disabled={disable}
                        onChange={handelO}
                    />
                    <Form.Select
                        fluid
                        label='Year'
                        options={year}
                        placeholder='Select Year'
                        disabled={disable}
                        onChange={roundChange}
                    />
                    <Form.Select
                        fluid
                        label='Round'
                        options={roundArray}
                        placeholder='Select Round'
                        disabled={round}
                        onChange={handelRou}
                    />
                </Form.Group>
                <Form.Group width="equal" id="cutOff">
                    <Form.Input type="number" id="cut" defaultValue={10} fluid label="Variation in CutOff Percentage(%)" disabled={disable} onChange={handelP} max="100" />
                    <Label tag>Helps you to predict if there is some variation in cut-offs.</Label>
                </Form.Group>
                <div id="formErrordiv">
                    {error ? <div className='message'>{error}</div> : <></>}
                    <Form.Button id="submitBtn" disabled={disable} onClick={buttonClick} primary >Submit</Form.Button>
                </div>
            </Form>
            <Footer />
        </>
    )
}
