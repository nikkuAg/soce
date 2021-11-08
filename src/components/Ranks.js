import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Table, Form, Label } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import { MenuHeader } from './Menu'
import { Footer } from './Footer'
import './college.css'


export const Ranks = ({ institutes, branches }) => {

    const year = [
        { key: "2015", text: "JoSAA 2015", value: "2015" },
        { key: "2016", text: "JoSAA 2016", value: "2016" },
        { key: "2017", text: "JoSAA 2017", value: "2017" },
        { key: "2018", text: "JoSAA 2018", value: "2018" },
        { key: "2019", text: "JoSAA 2019", value: "2019" },
        { key: "2020", text: "JoSAA 2020", value: "2020" },
        { key: "2021", text: "JoSAA 2021", value: "2021" },
    ]


    const [ranks, setranks] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [btnActive, setbtnActive] = useState("2021")
    const [yearA, setyearA] = useState("2021")
    const [roundActive, setroundActive] = useState(['1', '2', '3', '4', '5', '6'])
    const [roundBtn, setroundBtn] = useState("1")
    const [apiurl, setapiUrl] = useState('https://mysoce.pythonanywhere.com/soce/1_2021/')
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
        setyearA(year)
        if (year === '2015') {
            setroundActive([{ key: '7', text: '7', value: '7' }])
        }
        else if (year === '2017' || year === '2018' || year === '2019') {
            setroundActive([{ key: '1', text: '1', value: '1' }, { key: '2', text: '2', value: '2' }, { key: '3', text: '3', value: '3' }, { key: '4', text: '4', value: '4' }, { key: '5', text: '5', value: '5' }, { key: '6', text: '6', value: '6' }, { key: '7', text: '7', value: '7' }])
        }
        else if (year === '2020' || year === '2016') {
            setroundActive([{ key: '1', text: '1', value: '1' }, { key: '2', text: '2', value: '2' }, { key: '3', text: '3', value: '3' }, { key: '4', text: '4', value: '4' }, { key: '5', text: '5', value: '5' }, { key: '6', text: '6', value: '6' }])
        }
        else if (year === '2021') {
            setroundActive([{ key: '1', text: '1', value: '1' }, { key: '2', text: '2', value: '2' }])
        }
        // else if (year === '2020' || year === '2016' || year === '2021) {
        //     setroundActive([{ key: '1', text: '1', value: '1' }, { key: '2', text: '2', value: '2' }, { key: '3', text: '3', value: '3' }, { key: '4', text: '4', value: '4' }, { key: '5', text: '5', value: '5' }, { key: '6', text: '6', value: '6' }])
        // }
        else if (year === 'csab_2020') {
            setroundActive([{ key: '1', text: '1', value: '1' }, { key: '2', text: '2', value: '2' }])
        }
    }

    const getRequest = (round) => {
        setapiUrl(`https://mysoce.pythonanywhere.com/soce/${round}_${yearA}/`)
        setloading(true)
        setroundBtn(round)
        setbtnActive(yearA)
    }

    return (
        <React.Fragment>
            <MenuHeader active="ranks" set={false} />
            <h2 className="pageHeading">Opening and Closing Ranks of <span id="collegeId">{college}s</span> for <span id="collegeId">{btnActive === 'csab_2020' ? 'CSAB 2020' : `JoSAA ${btnActive}`} (Round-{roundBtn})</span></h2>
            <Form>
                <Form.Group className="buttonRanks">
                    <Label id="rankLabel">Change Year and Round</Label>
                    <Form.Select
                        fluid
                        id="rankButton"
                        options={year.reverse()}
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
                            getRequest(value)
                        }}
                    />
                </Form.Group>
            </Form>
            <div className="collegeDetails">
                {
                    error ? <div className='message'>Error in loading the data</div> :
                        loading ? <Loader className="loading" type="BallTriangle" color="black" height={80} width={80} /> :
                            <Table celled structured id="myTable" className="unstackable">
                                <Table.Header >
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Name of Institute
                                                <input type="text" className="mobileRemove" id="institute" placeholder="Search" onKeyUp={search} size={8} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Name of Branch
                                                <input type="text" className="mobileRemove" id="branch" placeholder="Search" onKeyUp={search} size={8} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Category
                                                <input type="text" className="mobileRemove" id="category" placeholder="Search" onKeyUp={search} size={4} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Quota
                                                <input type="text" className="mobileRemove" id="quota" placeholder="Search" onKeyUp={search} size={3} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Seat Pool
                                                <input type="text" className="mobileRemove" id="pool" placeholder="Search" onKeyUp={search} size={5} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Opening Rank
                                                <input type="text" className="mobileRemove" id="opening" placeholder="Search" onKeyUp={search} size={4} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Closing Rank
                                                <input type="text" className="mobileRemove" id="closing" placeholder="Search" onKeyUp={search} size={4} />
                                            </div>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {ranks.map(rank => (institutes.find(o => o.id === rank.institute_code).category === college ?
                                        <Table.Row key={rank.id}>
                                            <Table.Cell id="myCell1">{institutes.find(o => o.id === rank.institute_code).name}</Table.Cell>
                                            <Table.Cell id="myCell2">{branches.find(o => o.id === rank.branch_code).branch_code}</Table.Cell>
                                            <Table.Cell>{rank.category}</Table.Cell>
                                            <Table.Cell>{rank.quota}</Table.Cell>
                                            <Table.Cell id="myCell3">{rank.seat_pool}</Table.Cell>
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
            {
                error ? <></> :
                    loading ? <></> : <Footer />
            }
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
