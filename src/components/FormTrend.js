import React, { useState, useEffect } from 'react'
import { MenuHeader } from './Menu'
import './form.css'
import './trend.css'
import { Form, Label } from 'semantic-ui-react'
import { Footer } from './Footer'
import { useHistory } from 'react-router';
import Select from 'react-select'
import axios from 'axios'

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
    { key: 'Female-Only', text: 'Female Only', value: 'Female-Only' },
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

export const FormTrend = (props) => {

    const [ins, setins] = useState('')
    const [seat_pool, setpool] = useState('')
    const [categoryValue, setcat] = useState('')
    const [quotaValue, setq] = useState('')
    const [rank, setr] = useState('')
    const [trendIns, settrendIns] = useState(0)
    const [trendBr, settrendBr] = useState(0)
    const [cutoff, setp] = useState('')
    const [instituteOption, setinstituteOption] = useState([])
    const [branchOption, setbranchOption] = useState([])

    const [error, seterror] = useState('')
    const [quota, setquota] = useState([])
    const [placeHolder, setplaceHolder] = useState("")
    const [disable, setdisable] = useState(true)

    const [loading1, setloading1] = useState(true)
    const [y2016, sety2016] = useState([])

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
        setins(value)

        var data = []
        props.institutes.map(institute => {
            if (institute.category === value) {
                data.push({ label: institute.display_code, value: institute.id })
            }
            return null
        })
        setinstituteOption(data)

        var data2 = []
        if (value === "IIT") {
            props.branches.map(branch => {
                if (branch.IIT === "Y") {
                    data2.push({ label: branch.branch_code, value: branch.id })
                }
                return null
            })
        } else if (value === "IIIT") {
            props.branches.map(branch => {
                if (branch.IIIT === "Y") {
                    data2.push({ label: branch.branch_code, value: branch.id })
                }
                return null
            })
        } else if (value === "NIT") {
            props.branches.map(branch => {
                if (branch.NIT === "Y") {
                    data2.push({ label: branch.branch_code, value: branch.id })
                }
                return null
            })
        } else if (value === "GFTI") {
            props.branches.map(branch => {
                if (branch.GFTI === "Y") {
                    data2.push({ label: branch.branch_code, value: branch.id })
                }
                return null
            })
        }
        setbranchOption(data2)

    }
    const handelC = (e, { value }) => {
        setcat(value)
    }
    const handelG = (e, { value }) => {
        setpool(value)
    }
    const handelR = (e, { value }) => {
        if (value.match(/^[0-9]+$/) != null) {
            setr(value)
        }
    }
    const handelQ = (e, { value }) => {
        setq(value)
    }
    const trendInstitute = (e) => {
        settrendIns(e.value)
    }

    const trendBranch = (e) => {
        settrendBr(e.value)
    }
    const buttonClick = () => {
        if ((ins !== '') && (categoryValue !== '') && (seat_pool !== '') && (quotaValue !== '') && (trendIns !== 0) && (trendBr !== 0)) {
            if ((rank !== '') && rank > '0') {
                setloading1(false)
            } else {
                seterror("Please enter Correct Rank")
            }
        } else {
            seterror("Please enter value in all the fields")
        }
    }
    const api = "https://mysoce.pythonanywhere.com/soce/1_2016/"
    const round = ["1", "2", "3", "4", "5", "6", "7"]
    useEffect(() => {
        if (!loading1) {
            axios.get(api)
                .then(res => {
                    sety2016([{ round: res.data }])
                })
            console.log(ins, categoryValue, seat_pool, quotaValue, trendIns, trendBr, rank)
        }
    }, [loading1])
    return (
        <>
            <MenuHeader active="prediction" set={false} />
            <h2 className="pageHeading">SOCE Trend</h2>
            <Form>
                <div id="trendForm">
                    <div id="trendInput">
                        <Form.Group widths="equal">
                            <Form.Select
                                id="mySelect"
                                fluid
                                label='Institute'
                                options={options}
                                placeholder='Select Institute'
                                onChange={instituteChange}
                            />
                            <Form.Select
                                id="mySelect"
                                fluid
                                label='Category'
                                options={category}
                                placeholder='Select Category'
                                onChange={handelC}
                            />
                            <Form.Select
                                id="mySelect"
                                fluid
                                label='Gender'
                                options={pool}
                                placeholder='Select Gender'
                                onChange={handelG}
                            />
                            <Form.Select
                                id="mySelect"
                                fluid
                                label='Quota'
                                options={quota}
                                disabled={disable}
                                placeholder='Select Quota'
                                onChange={handelQ}
                            />
                            <Form.Input id="mySelect" type="number" fluid placeholder="Enter your Rank" label={placeHolder} disabled={disable} onChange={handelR} min='0' />
                        </Form.Group>
                        <div id="trend">
                            <Select
                                id="trendSelect"
                                name='Institute'
                                options={instituteOption}
                                placeholder='Choose Institute'
                                isDisabled={disable}
                                onChange={trendInstitute}
                            />
                            <Select
                                id="trendSelect"
                                name='Branch'
                                options={branchOption}
                                placeholder='Select Branch'
                                isDisabled={disable}
                                onChange={trendBranch}
                            />
                        </div>
                    </div>
                    <div id="Errordiv">
                        {error ? <div className='message'>{error}</div> : <></>}
                        <Form.Button id="submitBtn" disabled={disable} onClick={buttonClick} primary >Submit</Form.Button>
                    </div>
                </div>
            </Form>
            <Footer />
        </>
    )
}
