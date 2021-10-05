import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button, Label } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner'
import { MenuHeader } from './Menu'
import { Footer } from './Footer'
import './college.css'


export const Prediction = ({ institutes, branches }) => {


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


    const [ranks, setranks] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [btnActive, setbtnActive] = useState(year)
    const [roundActive, setroundActive] = useState(['1', '2', '3', '4', '5', '6'])
    const [roundBtn, setroundBtn] = useState(round)
    const [apiurl, setapiUrl] = useState(`http://mysoce.pythonanywhere.com/soce/${round}_${year}/`)
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
        setbtnActive(x)
        setloading(true)
        getData()
        if (x === '2015') {
            setroundActive(['7'])
        }
        else if (x === '2017' || x === '2018' || x === '2019') {
            setroundActive(['1', '7'])
        }
        else if (x === '2016') {
            setroundActive(['1', '6'])
        }
        else if (x === '2020') {
            setroundActive(['1', '2', '3', '4', '5', '6'])
        }
        else if (x === 'csab_2020') {
            setroundActive(['1', '2'])
        }
    }

    const getRequest = (x) => {
        sessionStorage.setItem('round', x)
        getData()
        setapiUrl(`http://mysoce.pythonanywhere.com/soce/${x}_${btnActive}/`)
        setloading(true)
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
                <h2 className="pageHeading">SOCE Prediction for {college}s based on {btnActive === 'csab_2020' ? 'CSAB' : btnActive} (Round-{roundBtn}) {option === "opening_rank" ? "Opening Rank" : "Closing Rank"} with (+/- {sessionStorage.getItem('cutOff')}% variations)</h2>
                <div id="allbuttons">
                    <div className="buttonRanks" id="prediction">
                        <div className="buttons">
                            <Button active={btnActive === "2015"} primary onClick={() => selectRound('2015')} className="btn">JoSAA 2015</Button>
                            <Button active={btnActive === "2016"} primary onClick={() => selectRound('2016')} className="btn">JoSAA 2016</Button>
                            <Button active={btnActive === "2017"} primary onClick={() => selectRound('2017')} className="btn">JoSAA 2017</Button>
                            <Button active={btnActive === "2018"} primary onClick={() => selectRound('2018')} className="btn">JoSAA 2018</Button>
                            <Button active={btnActive === "2019"} primary onClick={() => selectRound('2019')} className="btn">JoSAA 2019</Button>
                            <Button active={btnActive === "2020"} primary onClick={() => selectRound('2020')} className="btn">JoSAA 2020</Button>
                            <Button active={btnActive === "2021"} primary onClick={() => selectRound('2021')} disabled className="btn">JoSAA 2021</Button>
                        </div>
                        <div className="buttons">
                            <Button disabled={!roundActive.includes('1')} primary id="round" active={roundBtn === "1"} onClick={() => getRequest('1')} className="btn round">Round 1</Button>
                            <Button disabled={!roundActive.includes('2')} primary id="round" active={roundBtn === "2"} onClick={() => getRequest('2')} className="btn round">Round 2</Button>
                            <Button disabled={!roundActive.includes('3')} primary id="round" active={roundBtn === "3"} onClick={() => getRequest('3')} className="btn round">Round 3</Button>
                            <Button disabled={!roundActive.includes('4')} primary id="round" active={roundBtn === "4"} onClick={() => getRequest('4')} className="btn round">Round 4</Button>
                            <Button disabled={!roundActive.includes('5')} primary id="round" active={roundBtn === "5"} onClick={() => getRequest('5')} className="btn round">Round 5</Button>
                            <Button disabled={!roundActive.includes('6')} primary id="round" active={roundBtn === "6"} onClick={() => getRequest('6')} className="btn round">Round 6</Button>
                            <Button disabled={!roundActive.includes('7')} primary id="round" active={roundBtn === "7"} onClick={() => getRequest('7')} className="btn round">Round 7</Button>
                        </div>
                    </div>
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
                                    <Table celled structured id="myTable">
                                        <Table.Header >
                                            <Table.Row>
                                                <Table.HeaderCell>
                                                    <div className="searchField">
                                                        <input type="text" id="branch" placeholder="Search Branch" onKeyUp={search} size={10} />
                                                    </div>
                                                </Table.HeaderCell>
                                                {institutes.map(institute => (
                                                    institute.category === college ?
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
                                                    (branch.IIT === 'Y' ?
                                                        <Table.Row key={branch.id}>
                                                            <Table.Cell>
                                                                {branch.branch_code}
                                                            </Table.Cell>
                                                            {institutes.map(institute => (
                                                                institute.category === college ?
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
                                                        (branch.IIIT === 'Y' ?
                                                            <Table.Row key={branch.id}>
                                                                <Table.Cell>
                                                                    {branch.branch_code}
                                                                </Table.Cell>
                                                                {institutes.map(institute => (
                                                                    institute.category === college ?
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
                                                            (branch.NIT === 'Y' ?
                                                                <Table.Row key={branch.id}>
                                                                    <Table.Cell>
                                                                        {branch.branch_code}
                                                                    </Table.Cell>
                                                                    {institutes.map(institute => (
                                                                        institute.category === college ?
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
                                                                (branch.GFTI === 'Y' ?
                                                                    <Table.Row key={branch.id}>
                                                                        <Table.Cell>
                                                                            {branch.branch_code}
                                                                        </Table.Cell>
                                                                        {institutes.map(institute => (
                                                                            institute.category === college ?
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
                <Footer />
            </> : <Redirect to="/prediction" />
            }
        </React.Fragment >
    )
}


const predicit = () => {
    document.getElementById("labelDiv").style.display = 'block'
    var cutoff = parseInt(sessionStorage.getItem('cutOff'))
    var tr = document.querySelectorAll("[id='data']");
    var rank = parseInt(sessionStorage.getItem('rank'))
    for (var x = 0; x < tr.length; x++) {
        var data = parseInt(tr[x].innerHTML);
        if (rank <= Math.round((1 - (cutoff / 100)) * data)) {
            tr[x].style.backgroundColor = 'green'
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
