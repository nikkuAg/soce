import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'semantic-ui-react'
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
    const [apiurl, setapiUrl] = useState(`http://localhost:8000/soce/${round}_${year}/`)
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
        console.log(x, btnActive)
        setapiUrl(`http://localhost:8000/soce/${x}_${btnActive}/`)
        setloading(true)
        setroundBtn(x)
    }


    return (
        <React.Fragment>
            {sessionStorage.getItem('result') === 'true' ? <>
                <MenuHeader active="prediction" />
                <div className="buttonRanks">
                    <div className="buttons">
                        <Button active={btnActive === "2015"} primary onClick={() => selectRound('2015')} className="btn">Year 2015</Button>
                        <Button active={btnActive === "2016"} primary onClick={() => selectRound('2016')} className="btn">Year 2016</Button>
                        <Button active={btnActive === "2017"} primary onClick={() => selectRound('2017')} className="btn">Year 2017</Button>
                        <Button active={btnActive === "2018"} primary onClick={() => selectRound('2018')} className="btn">Year 2018</Button>
                        <Button active={btnActive === "2019"} primary onClick={() => selectRound('2019')} className="btn">Year 2019</Button>
                        <Button active={btnActive === "2020"} primary onClick={() => selectRound('2020')} className="btn">Year 2020</Button>
                        <Button active={btnActive === "CSAB"} primary onClick={() => selectRound('csab_2020')} className="btn">CSAB 2020</Button>
                        <Button active={btnActive === "2021"} primary onClick={() => selectRound('2021')} disabled className="btn">Year 2021</Button>
                    </div>
                    <div className="buttons">
                        <Button disabled={!roundActive.includes('1')} primary active={roundBtn === "1"} onClick={() => getRequest('1')} className="btn round">Round 1</Button>
                        <Button disabled={!roundActive.includes('2')} primary active={roundBtn === "2"} onClick={() => getRequest('2')} className="btn round">Round 2</Button>
                        <Button disabled={!roundActive.includes('3')} primary active={roundBtn === "3"} onClick={() => getRequest('3')} className="btn round">Round 3</Button>
                        <Button disabled={!roundActive.includes('4')} primary active={roundBtn === "4"} onClick={() => getRequest('4')} className="btn round">Round 4</Button>
                        <Button disabled={!roundActive.includes('5')} primary active={roundBtn === "5"} onClick={() => getRequest('5')} className="btn round">Round 5</Button>
                        <Button disabled={!roundActive.includes('6')} primary active={roundBtn === "6"} onClick={() => getRequest('6')} className="btn round">Round 6</Button>
                        <Button disabled={!roundActive.includes('7')} primary active={roundBtn === "7"} onClick={() => getRequest('7')} className="btn round">Round 7</Button>
                    </div>
                </div>
                <Button primary onClick={() => predicit()} className="btn round">Predict</Button>
                <h2 className="pageHeading">{btnActive === 'csab_2020' ? 'CSAB' : btnActive} (Round-{roundBtn}) Opening and Closing Rank SOCE Prediction</h2>
                <div className="collegeDetails">
                    {
                        error ? <div className='message'>Error in loading the data</div> :
                            loading ? <Loader className="loading" type="BallTriangle" color="black" height={80} width={80} /> :
                                <Table celled structured id="myTable">
                                    <Table.Header >
                                        <Table.Row>
                                            <Table.HeaderCell rowSpan='2' colSpan='2'>
                                            </Table.HeaderCell>
                                            {institutes.map(institute => (
                                                institute.category === college ?
                                                    <Table.HeaderCell key={institute.id} id="institute">
                                                        {institute.code}
                                                    </Table.HeaderCell>
                                                    : <></>
                                            ))}
                                        </Table.Row>
                                        <Table.Row>
                                            {institutes.map(institute => (
                                                institute.category === college ?
                                                    <Table.HeaderCell id="institute" key={institute.id}>
                                                        {institute.name}
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
                                                            {branch.code}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {branch.branch_name}
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
                                                                {branch.code}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {branch.branch_name}
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
                                                                    {branch.code}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    {branch.branch_name}
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
                                                                        {branch.code}
                                                                    </Table.Cell>
                                                                    <Table.Cell>
                                                                        {branch.branch_name}
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
                    }

                </div>
                <br /><br /><br /><br />
                <Footer />
            </> : <Redirect to="/prediction" />
            }
        </React.Fragment >
    )
}


const predicit = () => {
    var tr = document.querySelectorAll("[id='data']");
    var rank = parseInt(sessionStorage.getItem('rank'))
    for (var x = 0; x < tr.length; x++) {
        var data = parseInt(tr[x].innerHTML);
        if (rank <= Math.round(0.9 * data)) {
            tr[x].style.backgroundColor = 'green'
        }
        else if (rank > Math.round(0.9 * data) && (rank <= Math.round(1.10 * data))) {
            tr[x].style.backgroundColor = 'yellow'
        }
        else if (rank > Math.round(1.1 * data)) {
            tr[x].style.backgroundColor = 'red'
        }
    }


}