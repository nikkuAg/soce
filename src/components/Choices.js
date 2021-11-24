import React, { useEffect, useState } from 'react'
import { Button, Form, Label, Table } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import Select from 'react-select'
import axios from 'axios'
import "./choice.css"
import { MenuHeader } from './Menu'

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
    { label: 'Gender Neutral', value: 'Gender-Neutral' },
    { label: 'Female Only', value: 'Female-only' },
]
const choices = [
    { key: "M", text: "Only for JEE Mains", value: "M" },
    { key: "A", text: "Only for JEE Advance", value: "A" },
    { key: "B", text: "Both", value: "B" }
]
const year = [
    { key: "2021", text: "JoSAA 2021", value: "2021" },
    { key: "2020", text: "JoSAA 2020", value: "2020" },
    { key: "2019", text: "JoSAA 2019", value: "2019" },
    { key: "2018", text: "JoSAA 2018", value: "2018" },
    { key: "2017", text: "JoSAA 2017", value: "2017" },
    { key: "2016", text: "JoSAA 2016", value: "2016" },
    { key: "2015", text: "JoSAA 2015", value: "2015" },
]


export const Choices = (props) => {
    const [rankBtn, setrankBtn] = useState("")
    const [disable1, setdisable1] = useState(true)
    const [categoryV, setcategoryV] = useState("")
    const [cutoff, setcutoff] = useState(10)
    const [submit1, setsubmit1] = useState(false)
    const [rankM, setrankM] = useState(0)
    const [rankA, setrankA] = useState(0)
    const [roundA, setroundA] = useState([])
    const [yearV, setyearV] = useState("")
    const [roundV, setroundV] = useState("")
    const [optionT, setoptionT] = useState([])
    const [insType, setinsType] = useState("")
    const [insOption, setinsOption] = useState([])
    const [brOption, setbrOption] = useState([])
    const [valueI, setvalueI] = useState(null)
    const [valueB, setvalueB] = useState(null)
    const [valueQ, setvalueQ] = useState(null)
    const [valueT, setvalueT] = useState(null)
    const [valueG, setvalueG] = useState(null)
    const [quota, setquota] = useState([])
    const [insValue, setinsValue] = useState(0)
    const [disable, setdisable] = useState(true)
    const [brValue, setbrValue] = useState(0)
    const [quotaV, setquotaV] = useState("")
    const [poolV, setpoolV] = useState("")
    const [error, seterror] = useState("")
    const [cb, setcb] = useState([])
    const [cc, setcc] = useState([])
    const [roundData, setroundData] = useState([])
    const [loading, setloading] = useState(true)
    const [tableData, settableData] = useState([{ "sno": 0, "type": "", "institute": "", "branch": "", "quota": "", "pool": "", "opening": "", "closing": "" }])
    const [show, setshow] = useState(false)

    const api = 'https://mysoce.pythonanywhere.com/soce/college_branch/'
    useEffect(() => {
        axios.get(api)
            .then(res => {
                setcb(res.data)
            })
    }, [])
    const api0 = 'https://mysoce.pythonanywhere.com/soce/college_category/'
    useEffect(() => {
        axios.get(api0)
            .then(res => {
                setcc(res.data)
            })
    }, [])



    const handelChoice = (e, { value }) => {
        setrankBtn(value)
        setdisable1(false)
        if (value === "M") {
            setoptionT([
                { label: 'IIIT', value: 'IIIT' },
                { label: 'NIT', value: 'NIT' },
                { label: 'GFTI', value: 'GFTI' },
            ])
        }
        else if (value === "A") {
            setoptionT([
                { label: 'IIT', value: 'IIT' },
            ])
        }
        else if (value === "B") {
            setoptionT([
                { label: 'IIT', value: 'IIT' },
                { label: 'IIIT', value: 'IIIT' },
                { label: 'NIT', value: 'NIT' },
                { label: 'GFTI', value: 'GFTI' },
            ])
        }
    }
    const handelVariation = (e, { value }) => {
        if (value >= 0 && value <= 100) {
            setcutoff(value)
        }
        else {
            seterror("Enter Correct Variation in CutOff")
        }
    }
    const instituteChange = (e) => {
        setinsType(e.value)
        setdisable(false)
        setinsOption([])
        setvalueI(null)
        setvalueB(null)
        setvalueQ(null)
        setvalueT(e)
        var data = []
        props.institutes.map(ins => {
            if (ins.category === e.value && ins.current === "Y") {
                data.push({ label: ins.display_code, value: ins.id })
            }
            return null
        })
        setinsOption(data)
        if (e.value === "IIT" || e.value === "IIIT") {
            setquota([{ label: 'AI', value: 'AI' }])
        }
        else if (e.value === "NIT") {
            setquota([{ label: 'HS', value: 'HS' }, { label: 'OS', value: 'OS' },
            { label: 'AP', value: 'AP' }, { label: 'GO', value: 'GO' }, { label: 'LA', value: 'LA' }, { label: 'JK', value: 'JK' }])
        }
        else if (e.value === "GFTI") {
            setquota([{ label: 'AI', value: 'AI' }, { label: 'HS', value: 'HS' },
            { label: 'OS', value: 'OS' }])
        }
    }
    const roundChange = (e, { value }) => {
        setyearV(value)
        if (value === '2015') {
            setroundA([{ key: '7', text: 'Round 7', value: '7' }])
        }
        else if (value === '2017' || value === '2018' || value === '2019') {
            setroundA([{ key: '1', text: 'Round 1', value: '1' }, { key: '2', text: 'Round 2', value: '2' }, { key: '3', text: 'Round 3', value: '3' }, { key: '4', text: 'Round 4', value: '4' }, { key: '5', text: 'Round 5', value: '5' }, { key: '6', text: 'Round 6', value: '6' }, { key: '7', text: 'Round 7', value: '7' }])
        }
        else if (value === '2020' || value === '2016' || value === '2021') {
            setroundA([{ key: '1', text: 'Round 1', value: '1' }, { key: '2', text: 'Round 2', value: '2' }, { key: '3', text: 'Round 3', value: '3' }, { key: '4', text: 'Round 4', value: '4' }, { key: '5', text: 'Round 5', value: '5' }, { key: '6', text: 'Round 6', value: '6' }])
        }

    }

    const insSelect = (e) => {
        setinsValue(e.value)
        setvalueI(e)
        setvalueB(null)
        var data = []
        for (var x = 0; x < cb.length; x++) {
            if (cb[x].institute_code === parseInt(e.value) && cb[x].current === "Y") {
                var a = props.branches.find(o => o.id === cb[x].branch_code)
                if (insType === "IIT") {
                    if (a.IIT === "Y")
                        data.push({ label: (a.branch_code), value: (a.id) })
                } else if (insType === "IIIT") {
                    if (a.IIIT === "Y")
                        data.push({ label: (a.branch_code), value: (a.id) })
                } else if (insType === "NIT") {
                    if (a.NIT === "Y")
                        data.push({ label: (a.branch_code), value: (a.id) })
                } else if (insType === "GFTI") {
                    if (a.GFTI === "Y")
                        data.push({ label: (a.branch_code), value: (a.id) })
                }
            }
        }
        setbrOption(data)
    }
    const brSelect = (e) => {
        setbrValue(e.value)
        setvalueB(e)
    }
    const poolSelect = (e) => {
        setpoolV(e.value)
        setvalueG(e)
    }
    const quotaSelect = (e) => {
        setquotaV(e.value)
        setvalueQ(e)
    }
    const add = () => {
        if (insValue !== 0) {
            if (brValue !== 0) {
                if (poolV !== "") {
                    if (quotaV !== "") {
                        seterror("")
                        setshow(true)
                        setvalueI(null)
                        setvalueB(null)
                        setvalueQ(null)
                        setvalueG(null)
                        setvalueT(null)
                        var x = parseInt(tableData[tableData.length - 1].sno) + 1
                        var row = roundData.find(o => ((o.institute_code === insValue) && (o.branch_code === brValue) && (o.quota === quotaV) && (o.seat_pool === poolV) && (o.category === categoryV)))
                        var insName = props.institutes.find(o => (o.id === insValue)).display_code
                        var brName = props.branches.find(o => (o.id === brValue)).branch_code
                        if (row !== undefined) {
                            settableData(tableData => [...tableData, {
                                "sno": x, "type": insType, "institute": insName, "branch": brName, "quota": quotaV, "pool": poolV, "opening": row.opening_rank, "closing": row.closing_rank
                            }])
                        }
                        else {
                            settableData(tableData => [...tableData, {
                                "sno": x, "type": insType, "institute": insName, "branch": brName, "quota": quotaV, "pool": poolV, "opening": "-", "closing": "-"
                            }])
                        }

                    } else {
                        seterror("Select Quota")
                    }
                } else {
                    seterror("Select Gender")
                }
            } else {
                seterror("Select Branch")
            }
        } else {
            seterror("Select Institute")
        }

    }
    const submit = () => {
        if (categoryV !== "") {
            if (yearV !== "") {
                if (roundV !== "") {
                    const api1 = `https://mysoce.pythonanywhere.com/soce/${roundV}_${yearV}/`
                    if (rankBtn === "M") {
                        if (rankM !== 0) {
                            seterror("")
                            setsubmit1(true)
                            document.getElementById("addToTable").style.display = "block"
                            document.getElementById("choiceButton1").style.display = "none"

                            axios.get(api1)
                                .then(res => {
                                    setroundData(res.data)
                                    setloading(false)
                                })

                        } else {
                            seterror("Enter your Mains Rank")
                        }
                    } else if (rankBtn === "A") {
                        if (rankA !== 0) {
                            seterror("")
                            setsubmit1(true)
                            document.getElementById("addToTable").style.display = "block"
                            document.getElementById("choiceButton1").style.display = "none"

                            axios.get(api1)
                                .then(res => {
                                    setroundData(res.data)
                                    setloading(false)
                                })

                        } else {
                            seterror("Enter your Advance Rank")
                        }
                    } else if (rankBtn === "B") {
                        if (rankM !== 0 && rankA !== 0) {
                            seterror("")
                            setsubmit1(true)
                            document.getElementById("addToTable").style.display = "block"
                            document.getElementById("choiceButton1").style.display = "none"

                            axios.get(api1)
                                .then(res => {
                                    setroundData(res.data)
                                    setloading(false)
                                })

                        } else {
                            seterror("Enter your Mains & Advance Rank")
                        }
                    }
                } else {
                    seterror("Select Round")
                }
            } else {
                seterror("Select Year")
            }
        } else {
            seterror("Select Category")
        }

    }

    return (
        <div>
            <MenuHeader active="choice" set={false} />
            <h2 className="pageHeading">Test Your JoSAA Choices for any Inconsistency </h2>
            <Form>
                <div id="completeForm">
                    <div id="choiceForm">
                        <div id="trendInput" className="choicesFields">
                            <Form.Group widths="equal">
                                <Form.Select
                                    id="choiceSelect"
                                    fluid
                                    disabled={submit1}
                                    label='You are filling Choices for'
                                    options={choices}
                                    placeholder='Select Choices'
                                    onChange={handelChoice}
                                />
                                <Form.Select
                                    id="choiceSelect"
                                    fluid
                                    disabled={submit1}
                                    label='Category'
                                    options={category}
                                    placeholder='Select Category'
                                    onChange={(e, { value }) => setcategoryV(value)}
                                />
                                {rankBtn === "M" || rankBtn === "B" ? <Form.Input disabled={submit1} label="Enter your JEE Mains Rank" id="choiceSelect" type="number" fluid placeholder="Enter your Rank" min='0' onChange={(e, { value }) => setrankM(value)} /> : <></>}
                                {rankBtn === "A" || rankBtn === "B" ? <Form.Input disabled={submit1} label="Enter your JEE Advance Ranks" id="choiceSelect" type="number" fluid placeholder="Enter your Rank" min='0' onChange={(e, { value }) => setrankA(value)} /> : <></>}
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input disabled={submit1} label="Variation in CutOff %" id="choiceSelect" type="number" defaultValue={10} fluid placeholder="Enter Variation in %" min={0} max={100} onChange={handelVariation} />
                                <Form.Select
                                    id="choiceSelect"
                                    fluid
                                    disabled={submit1}
                                    label='Year'
                                    options={year}
                                    placeholder='Select Year'
                                    onChange={roundChange}
                                />
                                <Form.Select
                                    id="choiceSelect"
                                    fluid
                                    disabled={submit1}
                                    label='Round'
                                    options={roundA}
                                    placeholder='Select Round'
                                    onChange={(e, { value }) => setroundV(value)}
                                />
                            </Form.Group>
                        </div>
                        <Button disabled={disable1} positive id="choiceButton1" onClick={submit}>Submit</Button>
                    </div>
                    <div id="addToTable">
                        <p>Add Your Choices One by One</p>
                        <div id="choiceForm">
                            <div id="choiceInput">
                                <label id="choiceLabel">Select Institute Type</label>
                                <Select
                                    id="choiceSelect"
                                    options={optionT}
                                    value={valueT}
                                    placeholder='Select or Type Institute Type'
                                    onChange={instituteChange}
                                />
                            </div>
                            <div id="choiceInput">
                                <label id="choiceLabel">Select Institute</label>
                                <Select
                                    isDisabled={disable}
                                    id="choiceSelect"
                                    name='Institute'
                                    value={valueI}
                                    options={insOption}
                                    placeholder='Select or Type Institute Name'
                                    onChange={insSelect}
                                />
                            </div>
                            <div id="choiceInput">
                                <label id="choiceLabel">Select Branch</label>
                                <Select
                                    isDisabled={disable}
                                    id="choiceSelect"
                                    name='Branch'
                                    value={valueB}
                                    options={brOption}
                                    placeholder='Select or Type Branch Name'
                                    onChange={brSelect}
                                />
                            </div>
                            <div id="choiceInput1">
                                <label id="choiceLabel">Select Gender</label>
                                <Select
                                    isDisabled={disable}
                                    id="choiceSelect"
                                    name='Branch'
                                    options={pool}
                                    value={valueG}
                                    placeholder='Select or Type Gender'
                                    onChange={poolSelect}
                                />
                            </div>
                            <div id="choiceInput1">
                                <label id="choiceLabel">Select Quota</label>
                                <Select
                                    isDisabled={disable}
                                    id="choiceSelect"
                                    name='Branch'
                                    options={quota}
                                    placeholder='Select or Type Quota'
                                    value={valueQ}
                                    onChange={quotaSelect}
                                />
                            </div>
                            <Button disabled={disable} positive id="choiceButton" onClick={add}>Add</Button>
                        </div>
                    </div>
                    {error !== "" ? <div className='message' id="choiceError">{error}</div> : <></>}
                </div>
            </Form>
            {show ?
                tableData.length === 1 || loading === true ? <Loader className="loading" type="BallTriangle" color="black" height={80} width={80} />
                    :
                    <>
                        <div id="choicePredcit">
                            <Button positive onClick={() => predicit(cutoff, rankM, rankA)} className="btn round" id="predict">Click to Get Prediction</Button>
                        </div>
                        <div id="choiceTable">
                            <div id="labelDiv">
                                <Label id="low" className={sessionStorage.getItem('cutOff') !== '0' ? "chnageWidth" : ""}>Very Low Probability for getting this branch</Label>
                                <Label id="probableO" className={sessionStorage.getItem('cutOff') === '0' ? "removeLable" : ""} >Probable to get this branch if cutoff rank increases by {sessionStorage.getItem('cutOff')}%</Label>
                                <Label id="probableY" className={sessionStorage.getItem('cutOff') === '0' ? "removeLable" : ""} >Probable to get this branch even if cutoff rank decreases by {sessionStorage.getItem('cutOff')}%</Label>
                                <Label id="high" className={sessionStorage.getItem('cutOff') !== '0' ? "chnageWidth" : ""}>Very High Probability for getting this branch</Label>
                            </div>
                            <Table celled structured id="myTable" className="unstackable">
                                <Table.Header >
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            S. No.
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Institute Type
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Institute Name
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Branch Name
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Quota
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Gender
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Opening Rank
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Closing Rank
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {tableData.map(data => (
                                        (data.sno === 0) ? <></> :
                                            <Table.Row key={data.sno} id="data">
                                                <Table.Cell>{data.sno}</Table.Cell>
                                                <Table.Cell>{data.type}</Table.Cell>
                                                <Table.Cell>{data.institute}</Table.Cell>
                                                <Table.Cell>{data.branch}</Table.Cell>
                                                <Table.Cell>{data.quota}</Table.Cell>
                                                <Table.Cell>{data.pool}</Table.Cell>
                                                <Table.Cell>{data.opening}</Table.Cell>
                                                <Table.Cell>{data.closing}</Table.Cell>
                                            </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                        <br /><br /><br />
                    </>
                :
                <></>
            }
        </div>
    )
}



const predicit = (cutoff, jm, ja) => {
    document.getElementById("labelDiv").style.display = 'flex'
    var tr = document.querySelectorAll("[id='data']");
    for (var x = 0; x < tr.length; x++) {
        var childs = tr[x].childNodes
        var type = childs[1].innerHTML
        var rank
        var data = parseInt(childs[7].innerHTML);
        if (type === "IIT") {
            rank = ja
        }
        else {
            rank = jm
        }
        if (rank <= Math.round((1 - (cutoff / 100)) * data)) {
            childs[7].style.backgroundColor = '#07d507'
        }
        else if ((rank > Math.round((1 - (cutoff / 100)) * data)) && (rank <= Math.round(data))) {
            childs[7].style.backgroundColor = 'yellow'
        }
        else if (rank > Math.round(data) && rank <= Math.round((1 + (cutoff / 100)) * data)) {
            childs[7].style.backgroundColor = 'orange'
        }
        else if (rank > Math.round((1 + (cutoff / 100)) * data)) {
            childs[7].style.backgroundColor = 'red'
        }
    }


}

