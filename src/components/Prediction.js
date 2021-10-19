import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button, Label, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner'
import { MenuHeader } from './Menu'
import { Footer } from './Footer'
import './college.css'


export const Prediction = ({ institutes, branches }) => {

    const yearO = [
        { key: "2015", text: "JoSAA 2015", value: "2015" },
        { key: "2016", text: "JoSAA 2016", value: "2016" },
        { key: "2017", text: "JoSAA 2017", value: "2017" },
        { key: "2018", text: "JoSAA 2018", value: "2018" },
        { key: "2019", text: "JoSAA 2019", value: "2019" },
        { key: "2020", text: "JoSAA 2020", value: "2020" },
    ]


    let insSave = String(sessionStorage.getItem('ins'))
    let poolSave = String(sessionStorage.getItem('pool'))
    let categorySave = String(sessionStorage.getItem('category'))
    let quotaSave = String(sessionStorage.getItem('quota'))
    let rankSave = String(sessionStorage.getItem('rank'))
    let yearSave = String(sessionStorage.getItem('year'))
    let roundSave = String(sessionStorage.getItem('round'))
    let optionSave = String(sessionStorage.getItem('option'))

    const [college, setc] = useState(insSave === "null" ? "" : insSave)
    const [pool, setp] = useState(poolSave === "null" ? "" : poolSave)
    const [category, setca] = useState(categorySave === "null" ? "" : categorySave)
    const [quota, setq] = useState(quotaSave === "null" ? "" : quotaSave)
    const [myRank, setr] = useState(rankSave === "null" ? "" : rankSave)
    const [year, sety] = useState(yearSave === "null" ? "" : yearSave)
    const [round, setrn] = useState(roundSave === "null" ? "" : roundSave)
    const [option, seto] = useState(optionSave === "null" ? "" : optionSave)
    const [yearA, setyearA] = useState(year)


    const [ranks, setranks] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [btnActive, setbtnActive] = useState(year)
    const [roundActive, setroundActive] = useState(['1', '2', '3', '4', '5', '6'])
    const [roundBtn, setroundBtn] = useState(round)
    const [apiurl, setapiUrl] = useState(`https://mysoce.pythonanywhere.com/soce/${round}_${year}/`)
    useEffect(() => {
        selectRound(String(year))
        axios.get(apiurl)
            .then(res => {
                setloading(false)
                setranks(res.data)
            })
            .catch(function (error) {
                seterror(true)
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
    }, [apiurl])

    const getData = () => {
        insSave = String(sessionStorage.getItem('ins'))
        poolSave = String(sessionStorage.getItem('pool'))
        categorySave = String(sessionStorage.getItem('category'))
        quotaSave = String(sessionStorage.getItem('quota'))
        rankSave = String(sessionStorage.getItem('rank'))
        yearSave = String(sessionStorage.getItem('year'))
        roundSave = String(sessionStorage.getItem('round'))
        optionSave = String(sessionStorage.getItem('option'))

        setc(insSave === "null" ? "" : insSave)
        setp(poolSave === "null" ? "" : poolSave)
        setca(categorySave === "null" ? "" : categorySave)
        setq(quotaSave === "null" ? "" : quotaSave)
        setr(rankSave === "null" ? "" : rankSave)
        sety(yearSave === "null" ? "" : yearSave)
        setrn(roundSave === "null" ? "" : roundSave)
        seto(optionSave === "null" ? "" : optionSave)
    }

    const selectRound = (x) => {
        sessionStorage.setItem('year', x)
        setyearA(x)
        getData()
        if (year === '2015') {
            setroundActive([{ key: '7', text: '7', value: '7' }])
        }
        else if (year === '2017' || year === '2018' || year === '2019') {
            setroundActive([{ key: '1', text: '1', value: '1' }, { key: '2', text: '2', value: '2' }, { key: '3', text: '3', value: '3' }, { key: '4', text: '4', value: '4' }, { key: '5', text: '5', value: '5' }, { key: '6', text: '6', value: '6' }, { key: '7', text: '7', value: '7' }])
        }
        else if (year === '2020' || year === '2016') {
            setroundActive([{ key: '1', text: '1', value: '1' }, { key: '2', text: '2', value: '2' }, { key: '3', text: '3', value: '3' }, { key: '4', text: '4', value: '4' }, { key: '5', text: '5', value: '5' }, { key: '6', text: '6', value: '6' }])
        }
        else if (year === 'csab_2020') {
            setroundActive([{ key: '1', text: '1', value: '1' }, { key: '2', text: '2', value: '2' }])
        }
    }

    const getRequest = (x) => {
        sessionStorage.setItem('round', x)
        getData()
        setapiUrl(`https://mysoce.pythonanywhere.com/soce/${x}_${yearA}/`)
        setloading(true)
        setbtnActive(yearA)
        setroundBtn(x)
    }
    useEffect(() => {
        if (!loading)
            document.getElementById("labelDiv").style.display = 'none'
    }, [loading])


    return (
        <React.Fragment>
            {sessionStorage.getItem('result') === 'true' ? <>
                <MenuHeader active="prediction" set={false} />
                <h2 className="pageHeading">SOCE Prediction for <span id="collegeId">{college}s</span> based on <span id="collegeId">{btnActive === 'csab_2020' ? 'CSAB' : btnActive} (Round-{roundBtn}) {option === "opening_rank" ? "Opening Rank" : "Closing Rank"}</span> (with +/- <span id="collegeId">{sessionStorage.getItem('cutOff')}%</span> variations)</h2>
                <h4 className="pageHeading2">(Quota: <span id="collegeId">{quota}</span>, Category: <span id="collegeId">{category}</span>, Gender: <span id="collegeId">{pool}</span>, Your Rank: <span id="collegeId">{myRank}</span>)</h4>
                <div id="allbuttons">
                    <Form>
                        <Form.Group className="buttonRanks">
                            <Label id="rankLabel">Change Year and Round</Label>
                            <Form.Select
                                fluid
                                id="rankButton"
                                options={yearO.reverse()}
                                placeholder='Change Year'
                                onChange={(e, { value }) => {
                                    selectRound(value)
                                }}
                            />
                            <Form.Select
                                fluid
                                id="rankButton"
                                options={roundActive}
                                placeholder='Change Round'
                                onChange={(e, { value }) => {
                                    setroundBtn(value)
                                    getRequest(value)
                                }}
                            />
                        </Form.Group>
                    </Form>
                    <Button disabled={loading} positive onClick={() => predicit()} className="btn round" id="predict">Click to Get Prediction</Button>

                </div>
                <div className="collegeDetails">
                    {
                        error ? <div className='message'>Error in loading the data</div> :
                            loading ? <Loader className="loading" type="BallTriangle" color="black" height={80} width={80} /> :
                                <>
                                    <div id="labelDiv">
                                        <Label id="low" className={sessionStorage.getItem('cutOff') !== '0' ? "chnageWidth" : ""}>Very Low Probability for getting this branch</Label>
                                        <Label id="probableO" className={sessionStorage.getItem('cutOff') === '0' ? "removeLable" : ""} >Probable to get this branch if cutoff rank increases by {sessionStorage.getItem('cutOff')}%</Label>
                                        <Label id="probableY" className={sessionStorage.getItem('cutOff') === '0' ? "removeLable" : ""} >Probable to get this branch even if cutoff rank decreases by {sessionStorage.getItem('cutOff')}%</Label>
                                        <Label id="high" className={sessionStorage.getItem('cutOff') !== '0' ? "chnageWidth" : ""}>Very High Probability for getting this branch</Label>
                                    </div>
                                    <Table celled structured id="myTable" className="unstackable">
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>
                                                    <div className="searchField">
                                                        <input type="text" className="mobileRemove" id="branch" placeholder="Search Branch" onKeyUp={search} size={10} />
                                                    </div>
                                                </Table.HeaderCell>
                                                {institutes.map(institute => (
                                                    institute.category === college && institute.current === "Y" ?
                                                        <Table.HeaderCell id="institute" key={institute.id}>
                                                            {institute.display_code}
                                                        </Table.HeaderCell>
                                                        : <React.Fragment key={institute.id}></React.Fragment>
                                                ))}
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {branches.map(branch => (
                                                college === 'IIT' ?
                                                    (branch.IIT === 'Y' || branch.IIT === 'O' ?
                                                        <Table.Row key={branch.id}>
                                                            <Table.Cell id="myCell2" className="predColumn">
                                                                {branch.branch_code}
                                                            </Table.Cell>
                                                            {institutes.map(institute => (
                                                                institute.category === college && institute.current === "Y" ?
                                                                    ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))) ?
                                                                        <Table.Cell key={institute.id} id="data">
                                                                            {option === 'opening_rank' ? ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))).opening_rank : ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))).closing_rank}
                                                                        </Table.Cell>
                                                                        : <Table.Cell key={institute.id} id="test">-</Table.Cell>
                                                                    : <React.Fragment key={institute.id}></React.Fragment>
                                                            ))}
                                                        </Table.Row>
                                                        : <React.Fragment key={branch.id}></React.Fragment>
                                                    ) : college === 'IIIT' ?
                                                        (branch.IIIT === 'Y' || branch.IIIT === 'O' ?
                                                            <Table.Row key={branch.id}>
                                                                <Table.Cell id="myCell2" className="predColumn">
                                                                    {branch.branch_code}
                                                                </Table.Cell>
                                                                {institutes.map(institute => (
                                                                    institute.category === college && institute.current === "Y" ?
                                                                        ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))) ?
                                                                            <Table.Cell key={institute.id} id="data">
                                                                                {option === 'opening_rank' ? ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))).opening_rank : ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))).closing_rank}
                                                                            </Table.Cell>
                                                                            : <Table.Cell key={institute.id} id="test">-</Table.Cell>
                                                                        : <React.Fragment key={institute.id}></React.Fragment>
                                                                ))}
                                                            </Table.Row>
                                                            : <React.Fragment key={branch.id}></React.Fragment>
                                                        ) : college === 'NIT' ?
                                                            (branch.NIT === 'Y' || branch.NIT === 'O' ?
                                                                <Table.Row key={branch.id}>
                                                                    <Table.Cell id="myCell2" className="predColumn">
                                                                        {branch.branch_code}
                                                                    </Table.Cell>
                                                                    {institutes.map(institute => (
                                                                        institute.category === college && institute.current === "Y" ?
                                                                            ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))) ?
                                                                                <Table.Cell key={institute.id} id="data">
                                                                                    {option === 'opening_rank' ? ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))).opening_rank : ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))).closing_rank}
                                                                                </Table.Cell>
                                                                                : <Table.Cell key={institute.id} id="test">-</Table.Cell>
                                                                            : <React.Fragment key={institute.id}></React.Fragment>
                                                                    ))}
                                                                </Table.Row>
                                                                : <React.Fragment key={branch.id}></React.Fragment>
                                                            ) : college === 'GFTI' ?
                                                                (branch.GFTI === 'Y' || branch.GFTI === 'O' ?
                                                                    <Table.Row key={branch.id}>
                                                                        <Table.Cell id="myCell2" className="predColumn">
                                                                            {branch.branch_code}
                                                                        </Table.Cell>
                                                                        {institutes.map(institute => (
                                                                            institute.category === college && institute.current === "Y" ?
                                                                                ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))) ?
                                                                                    <Table.Cell key={institute.id} id="data">
                                                                                        {option === 'opening_rank' ? ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))).opening_rank : ranks.find(o => ((o.branch_code === branch.id) && (o.institute_code === institute.id) && (o.category === category) && (o.seat_pool === pool) && (o.quota === quota))).closing_rank}
                                                                                    </Table.Cell>
                                                                                    : <Table.Cell key={institute.id} id="test">-</Table.Cell>
                                                                                : <React.Fragment key={institute.id}></React.Fragment>
                                                                        ))}
                                                                    </Table.Row>
                                                                    : <React.Fragment key={branch.id}></React.Fragment>
                                                                ) : <></>))}
                                        </Table.Body>

                                    </Table>
                                </>
                    }

                </div>
                {
                    error ? <></> :
                        loading ? <></> : <Footer />
                }
            </> : <Redirect to="/prediction" />
            }
        </React.Fragment >
    )
}


const predicit = () => {
    document.getElementById("labelDiv").style.display = 'flex'
    var cutoff = parseInt(sessionStorage.getItem('cutOff'))
    var tr = document.querySelectorAll("[id='data']");
    var rank = parseInt(sessionStorage.getItem('rank'))
    for (var x = 0; x < tr.length; x++) {
        var data = parseInt(tr[x].innerHTML);
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

    let table = document.getElementById('myTable');
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
