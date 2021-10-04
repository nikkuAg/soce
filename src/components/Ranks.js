import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Table, Button, Divider } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import { MenuHeader } from './Menu'
import { Footer } from './Footer'
import './college.css'


export const Ranks = ({ institutes, branches }) => {
    const [ranks, setranks] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [btnActive, setbtnActive] = useState("2020")
    const [roundActive, setroundActive] = useState(['1', '2', '3', '4', '5', '6'])
    const [roundBtn, setroundBtn] = useState("1")
    const [apiurl, setapiUrl] = useState('http://mysoce.pythonanywhere.com/soce/1_2020/')
    const { college } = useParams()
    useEffect(() => {
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

    const selectRound = (year) => {
        setbtnActive(year)
        setroundBtn("")
        if (year === '2015') {
            setroundActive(['7'])
        }
        else if (year === '2017' || year === '2018' || year === '2019') {
            setroundActive(['1', '7'])
        }
        else if (year === '2016') {
            setroundActive(['1', '6'])
        }
        else if (year === '2020') {
            setroundActive(['1', '2', '3', '4', '5', '6'])
        }
        else if (year === 'csab_2020') {
            setroundActive(['1', '2'])
        }
    }

    const getRequest = (round) => {
        setapiUrl(`http://mysoce.pythonanywhere.com/soce/${round}_${btnActive}/`)
        setloading(true)
        setroundBtn(round)
    }

    return (
        <React.Fragment>
            <MenuHeader active="ranks" set={false} />
            <h2 className="pageHeading">{btnActive === 'csab_2020' ? 'CSAB 2020' : `JoSAA ${btnActive}`} (Round-{roundBtn}) Opening and Closing Ranks of {college}s</h2>
            <div className="buttonRanks">
                <div className="buttons">
                    <Button active={btnActive === "2015"} primary onClick={() => selectRound('2015')} className="btn">JoSSA 2015</Button>
                    <Button active={btnActive === "2016"} primary onClick={() => selectRound('2016')} className="btn">JoSSA 2016</Button>
                    <Button active={btnActive === "2017"} primary onClick={() => selectRound('2017')} className="btn">JoSSA 2017</Button>
                    <Button active={btnActive === "2018"} primary onClick={() => selectRound('2018')} className="btn">JoSSA 2018</Button>
                    <Button active={btnActive === "2019"} primary onClick={() => selectRound('2019')} className="btn">JoSSA 2019</Button>
                    <Button active={btnActive === "2020"} primary onClick={() => selectRound('2020')} className="btn">JoSSA 2020</Button>
                    <Button active={btnActive === "2021"} primary onClick={() => selectRound('2021')} disabled className="btn">JoSSA 2021</Button>
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
            <div className="collegeDetails">
                {
                    error ? <div className='message'>Error in loading the data</div> :
                        loading ? <Loader className="loading" type="BallTriangle" color="black" height={80} width={80} /> :
                            <Table celled structured id="myTable">
                                <Table.Header >
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Name of Institute
                                                <input type="text" id="institute" placeholder="Search" onKeyUp={search} size={8} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Name of Branch
                                                <input type="text" id="branch" placeholder="Search" onKeyUp={search} size={8} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Category
                                                <input type="text" id="category" placeholder="Search" onKeyUp={search} size={4} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Quota
                                                <input type="text" id="quota" placeholder="Search" onKeyUp={search} size={3} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Seat Pool
                                                <input type="text" id="pool" placeholder="Search" onKeyUp={search} size={5} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Opening Rank
                                                <input type="text" id="opening" placeholder="Search" onKeyUp={search} size={4} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Closing Rank
                                                <input type="text" id="closing" placeholder="Search" onKeyUp={search} size={4} />
                                            </div>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {ranks.map(rank => (institutes.find(o => o.id === rank.institute_code).category === college ?
                                        <Table.Row key={rank.id}>
                                            <Table.Cell>{institutes.find(o => o.id === rank.institute_code).name}</Table.Cell>
                                            <Table.Cell>{branches.find(o => o.id === rank.branch_code).branch_code}</Table.Cell>
                                            <Table.Cell>{rank.category}</Table.Cell>
                                            <Table.Cell>{rank.quota}</Table.Cell>
                                            <Table.Cell>{rank.seat_pool}</Table.Cell>
                                            <Table.Cell>{rank.opening_rank}</Table.Cell>
                                            <Table.Cell>{rank.closing_rank}</Table.Cell>
                                        </Table.Row>
                                        : <React.Fragment key={rank.id}></React.Fragment>
                                    ))}
                                </Table.Body>
                                <Table.Header >
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Name of Institute
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Name of Branch
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Category
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Quota
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Seat Pool
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Opening Rank
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Closing Rank
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                            </Table>
                }

            </div>
            <br /><br /><br /><br />
            <Footer />
        </React.Fragment >
    )
}


const search = () => {
    let institute = document.getElementById("institute").value.toUpperCase()
    let branch = document.getElementById("branch").value.toUpperCase()
    let pool = document.getElementById("pool").value.toUpperCase()
    let category = document.getElementById("category").value.toUpperCase()
    let quota = document.getElementById("quota").value.toUpperCase()
    let opening = document.getElementById("opening").value.toUpperCase()
    let closing = document.getElementById("closing").value.toUpperCase()

    let table = document.getElementById('myTable');
    let tr = table.getElementsByTagName('tr');
    for (var i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td');
        if (td.length > 0) {
            if ((td[0].innerHTML.toUpperCase().indexOf(institute) > -1) && (td[1].innerHTML.toUpperCase().indexOf(branch) > -1) && (td[2].innerHTML.toUpperCase().indexOf(category) > -1) && (td[3].innerHTML.toUpperCase().indexOf(quota) > -1) && (td[4].innerHTML.toUpperCase().indexOf(pool) > -1) && (td[5].innerHTML.toUpperCase().indexOf(opening) > -1) && (td[6].innerHTML.toUpperCase().indexOf(closing) > -1)) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}
