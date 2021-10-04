import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Message, Table } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import { MenuHeader } from './Menu'
import './college.css'
import { Footer } from './Footer'


export const Colleges = () => {
    const [institutes, setinstitute] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const { college } = useParams()
    const apiurl = "http://mysoce.pythonanywhere.com/soce/institutes/"
    useEffect(() => {
        axios.get(apiurl)
            .then(res => {
                setloading(false)
                setinstitute(res.data)
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
    }, [])

    return (
        <React.Fragment>
            <MenuHeader active="colleges" set={false} />
            <h2 className="pageHeading">List of Participating {college}s in JoSAA</h2>
            <div className="collegeDetails listColleges">
                {
                    error ? <div className='message'>Error in loading the data</div> :
                        loading ? <Loader className="loading" type="BallTriangle" color="black" height={80} width={80} /> :
                            <Table celled structured id="myTable">
                                <Table.Header >
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Institute Code
                                                <input type="text" id="code" placeholder="Search" onKeyUp={search} size={3} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Name of Institute
                                                <input type="text" id="institute" placeholder="Search" onKeyUp={search} size={8} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                State
                                                <input type="text" id="state" placeholder="Search" onKeyUp={search} size={8} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                NIRF Ranking (2019/2020/2021)
                                                <input type="text" id="nirf" placeholder="Search" onKeyUp={search} size={4} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Website
                                                <input type="text" id="website" placeholder="Search" onKeyUp={search} size={8} />
                                            </div>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {institutes.map(institute => ((institute.category === college) && (institute.current === 'Y') ?
                                        <Table.Row key={institute.id}>
                                            <Table.Cell>{institute.code}</Table.Cell>
                                            <Table.Cell>{institute.name}</Table.Cell>
                                            <Table.Cell>{institute.state}</Table.Cell>
                                            <Table.Cell>{institute.nirf_19 === '' ? '-' : institute.nirf_19}/{institute.nirf_20 === '' ? '-' : institute.nirf_20}/{institute.nirf_21 === '' ? '-' : institute.nirf_21}</Table.Cell>
                                            <Table.Cell><a target="_blank" href={institute.website === "" ? "#" : institute.website}>{institute.website === "" ? "-" : institute.website}</a></Table.Cell>
                                        </Table.Row>
                                        : <React.Fragment key={institute.id}></React.Fragment>
                                    ))}
                                </Table.Body>
                                <Table.Header >
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Institute Code
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Name of Institute
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            State
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            NIRF Ranking (2019/2020/2021)
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Website
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                            </Table>
                }
            </div>
            {college === "NIT" ?
                <Message style={{ margin: 'auto' }}>
                    <Message.Header>Note:</Message.Header>
                    <p>
                        College with code 232 (Indian Institute of Engineering Science and Technology) is not a NIT but has been included in NITs list for sake of simplicity
                    </p>
                </Message>
                : <></>}
            <br /><br /><br /><br />
            <Footer />
        </React.Fragment>
    )
}


const search = () => {
    let nirf = document.getElementById("nirf").value.toUpperCase()
    let institute = document.getElementById("institute").value.toUpperCase()
    let code = document.getElementById("code").value.toUpperCase()
    let state = document.getElementById("state").value.toUpperCase()
    let website = document.getElementById("website").value.toUpperCase()


    let table = document.getElementById('myTable');
    let tr = table.getElementsByTagName('tr');
    for (var i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td');
        if (td.length > 0) {
            if ((td[0].innerHTML.toUpperCase().indexOf(code) > -1) && (td[1].innerHTML.toUpperCase().indexOf(institute) > -1) && (td[2].innerHTML.toUpperCase().indexOf(state) > -1) && (td[3].innerHTML.toUpperCase().indexOf(nirf) > -1) && (td[4].innerHTML.toUpperCase().indexOf(website) > -1)) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}
