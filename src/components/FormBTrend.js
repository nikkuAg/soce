import React, { useState, useEffect } from 'react'
import { MenuHeader } from './Menu'
import Select from 'react-select'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Button, Form, Label, Table } from 'semantic-ui-react'
import { Footer } from './Footer'
import './form.css'
import './trend.css'

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
export const FormBTrend = (props) => {

    const [ins, setins] = useState('')
    const [seat_pool, setpool] = useState('')
    const [categoryValue, setcat] = useState('')
    const [quotaValue, setq] = useState('')
    const [rank, setr] = useState('')
    const [trendBr, settrendBr] = useState(0)
    const [instituteOption, setinstituteOption] = useState([])
    const [branchOption, setbranchOption] = useState([])
    const [btn, setbtn] = useState(false)
    const [error, seterror] = useState('')
    const [quota, setquota] = useState([])
    const [placeHolder, setplaceHolder] = useState("")
    const [disable, setdisable] = useState(true)
    const [errorA, seterrorA] = useState(false)
    const [loading1, setloading1] = useState(true)
    const [valueI, setvalueI] = useState("")
    const [cb, setcb] = useState([])


    const api = 'https://mysoce.pythonanywhere.com/soce/college_branch/'
    useEffect(() => {
        axios.get(api)
            .then(res => {
                setcb(res.data)
            })
    }, [])

    const instituteChange = (e, { value }) => {
        reset()
        setvalueI(null)
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
        props.branches.map(branch => {
            if (value === "IIT") {
                if (branch.IIT === "Y") {
                    data.push({ label: branch.branch_code, value: branch.id })
                }
            }
            if (value === "IIIT") {
                if (branch.IIIT === "Y") {
                    data.push({ label: branch.branch_code, value: branch.id })
                }
            }
            if (value === "NIT") {
                if (branch.NIT === "Y") {
                    data.push({ label: branch.branch_code, value: branch.id })
                }
            }
            if (value === "GFTI") {
                if (branch.GFTI === "Y") {
                    data.push({ label: branch.branch_code, value: branch.id })
                }
            }
            return null
        })

        setbranchOption(data)
    }
    const handelC = (e, { value }) => {
        setcat(value)
        reset()
    }
    const handelG = (e, { value }) => {
        setpool(value)
        reset()
    }
    const handelR = (e, { value }) => {
        reset()
        if (value.match(/^[0-9]+$/) != null) {
            setr(value)
        }
    }
    const handelQ = (e, { value }) => {
        setq(value)
        reset()
    }
    const trendBranch = (e) => {
        settrendBr(e.value)
        setvalueI(e)
        var data = []
        for (var x = 0; x < cb.length; x++) {
            if (cb[x].branch_code === parseInt(e.value)) {
                if (props.institutes.find(o => o.id === cb[x].institute_code).category === ins) {
                    data.push(cb[x].institute_code)
                }
            }
        }
        console.log(data)
        setinstituteOption(data)
        reset()
    }
    const buttonClick = () => {
        reset()
        if ((ins !== '') && (categoryValue !== '') && (seat_pool !== '') && (quotaValue !== '') && (trendBr !== 0)) {
            if ((rank !== '') && rank > '0') {
                setloading1(false)
                setbtn(true)
            } else {
                seterror("Please enter Correct Rank")
            }
        } else {
            seterror("Please enter value in all the fields")
        }
    }

    const [y620, sety620] = useState([])
    const [loading2, setloading2] = useState(true)
    const api2 = "https://mysoce.pythonanywhere.com/soce/6_2020/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api2)
                .then(res => {
                    sety620(res.data)
                    setloading2(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y719, sety719] = useState([])
    const [loading3, setloading3] = useState(true)
    const api3 = "https://mysoce.pythonanywhere.com/soce/7_2019/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api3)
                .then(res => {
                    sety719(res.data)
                    setloading3(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y718, sety718] = useState([])
    const [loading4, setloading4] = useState(true)
    const api4 = "https://mysoce.pythonanywhere.com/soce/7_2018/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api4)
                .then(res => {
                    sety718(res.data)
                    setloading4(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y717, sety717] = useState([])
    const [loading5, setloading5] = useState(true)
    const api5 = "https://mysoce.pythonanywhere.com/soce/7_2017/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api5)
                .then(res => {
                    sety717(res.data)
                    setloading5(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y616, sety616] = useState([])
    const [loading6, setloading6] = useState(true)
    const api6 = "https://mysoce.pythonanywhere.com/soce/6_2016/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api6)
                .then(res => {
                    sety616(res.data)
                    setloading6(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y715, sety715] = useState([])
    const [loading7, setloading7] = useState(true)
    const api7 = "https://mysoce.pythonanywhere.com/soce/7_2015/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api7)
                .then(res => {
                    sety715(res.data)
                    setloading7(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])

    const [y621, sety621] = useState([])
    const [loading8, setloading8] = useState(true)
    const api8 = "https://mysoce.pythonanywhere.com/soce/1_2021/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api8)
                .then(res => {
                    sety621(res.data)
                    setloading8(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])

    const ranks = {
        "2015": y715, "2016": y616, "2017": y717, "2018": y718, "2019": y719, "2020": y620, "2021": y621,
    }

    const yearArray = ["2021", "2020", '2019', '2018', '2017', '2016', '2015']

    return (
        <>
            <MenuHeader active="prediction" set={false} />
            <h2 className="pageHeading">Past Trend of Opening/Closing Ranks for <span id="collegeId">a Particular Branch</span> in <span id="collegeId">all Institutes</span></h2>
            <Form>
                <div id="trendForm">
                    <div id="trendInput">
                        <Form.Group widths="equal">
                            <Form.Select
                                id="mySelect"
                                fluid
                                label='Institute'
                                options={options}
                                placeholder='Select Institute Type'
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
                        <div id="trend1">
                            <label id="trendLabel1">Select Branch</label>
                            <Select
                                id="trendSelect"
                                name='Institute'
                                value={valueI}
                                options={branchOption}
                                placeholder='Select or Type Branch Name'
                                isDisabled={disable}
                                onChange={trendBranch}
                            />
                        </div>
                    </div>
                    <div id="Errordiv">
                        {error ? <div className='message'>{error}</div> : <></>}
                        {btn ? <></> : <Form.Button id="submitBtn" disabled={disable} onClick={buttonClick} primary >Submit</Form.Button>}
                    </div>
                </div>
            </Form>
            {btn ?
                <div id="afterForm">
                    {
                        errorA ? <div className='message'>Error in loading the data</div> :
                            <>
                                {(loading2 || loading3 || loading4 || loading5 || loading6 || loading7 || loading8) ?
                                    <><br /><br /><Loader className="loading" type="BallTriangle" color="black" height={80} width={80} /></>
                                    :
                                    <>
                                        <div id="cut">
                                            <Form.Input type="number" id="cutOffV" defaultValue={10} fluid label="Variation in CutOff Percentage(%)" disabled={disable} max="100" />
                                            <Button positive onClick={() => predicit(rank)} className="btn round" id="predict">Click to Get Prediction</Button>
                                        </div>
                                        <div id="trendPrediction">
                                            <Table celled structured id="myTable1" className="unstackable">
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell>
                                                            <div className="searchField">
                                                                Institute
                                                                <input type="text" className="mobileRemove" id="branch" placeholder="Search" onKeyUp={search} size={8} />
                                                            </div>
                                                        </Table.HeaderCell>
                                                        {yearArray.map(r => (
                                                            <Table.HeaderCell>
                                                                JoSAA {r} : Round {(r === "2020" || r === "2016") ? "6" : r === "2021" ? "1" : "7"}
                                                            </Table.HeaderCell>
                                                        ))}
                                                    </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                    {instituteOption.map(ins => (
                                                        <>
                                                            <Table.Row>
                                                                <Table.Cell id="trendColumn">
                                                                    {props.institutes.find(o => o.id === parseInt(ins)).display_code}
                                                                </Table.Cell>
                                                                {yearArray.map(y => (
                                                                    <Table.Cell id="data" key={y}>
                                                                        {ranks[y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(ins)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))) === undefined ? '-' : <><p>{ranks[y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(ins)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))).opening_rank}</p><p>to</p><p>{ranks[y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(ins)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))).closing_rank}</p></>}
                                                                    </Table.Cell>
                                                                ))}
                                                            </Table.Row>
                                                        </>
                                                    ))}
                                                </Table.Body>
                                            </Table>
                                            <div id="labelDiv1">
                                                <Label id="low">Very Low Probability for getting this branch</Label>
                                                <Label id="probableO" >Probable to get this branch if cutoff rank increases.</Label>
                                                <Label id="probableY" >Probable to get this branch even if cutoff rank decreases.</Label>
                                                <Label id="high">Very High Probability for getting this branch</Label>
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                    }
                </div>
                : <></>

            }
            {
                error ? <></> :
                    (loading2 || loading3 || loading4 || loading5 || loading6 || loading7) ? <></> : <Footer />
            }
        </>
    )
}

const reset = () => {
    var tr = document.querySelectorAll("[id='data']");
    for (var x = 0; x < tr.length; x++) {
        tr[x].style.backgroundColor = 'initial'
    }
}

const predicit = (r) => {
    reset()
    document.getElementById("labelDiv1").style.display = 'flex'
    var cutoff = parseInt(document.getElementById("cutOffV").value)
    var tr = document.querySelectorAll("[id='data']");
    var rank = parseInt(r)
    for (var x = 0; x < tr.length; x++) {
        var data = parseInt(tr[x].innerHTML.substr(tr[x].innerHTML.indexOf("to") + 9, tr[x].innerHTML.length - (tr[x].innerHTML.indexOf("to") + 13)));
        if (rank <= Math.round((1 - (cutoff / 100)) * data)) {
            tr[x].style.backgroundColor = '#07d507'
        }
        else if ((rank > Math.round((1 - (cutoff / 100)) * data)) && (rank <= Math.round(data))) {
            tr[x].style.backgroundColor = 'yellow'
        }
        else if (rank > Math.round(data) && rank <= Math.round((1 + (cutoff / 100)) * data)) {
            tr[x].style.backgroundColor = 'orange'
        }
        else if (rank > Math.round((1 + (cutoff / 100)) * data)) {
            tr[x].style.backgroundColor = 'red'
        }
    }
}



const search = () => {
    let branch = document.getElementById("branch").value.toUpperCase()
    let table = document.getElementById('myTable1');
    let tr = table.getElementsByTagName('tr');
    for (var i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td');
        if (td.length > 0) {
            if ((td[0].innerHTML.toUpperCase().indexOf(branch) > -1)) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}
