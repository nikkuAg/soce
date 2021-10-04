import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Table, Button } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import { MenuHeader } from './Menu'
import { Footer } from './Footer'
import './college.css'


export const SeatMatrix = ({ institutes, branches }) => {
    const [seats, setseats] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [btnActive, setbtnActive] = useState("2020")
    const [apiurl, setapiUrl] = useState('http://mysoce.pythonanywhere.com/soce/seat_2020/')
    const { college } = useParams()
    useEffect(() => {
        axios.get(apiurl)
            .then(res => {
                setloading(false)
                setseats(res.data)
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

    const getRequest = (url, name) => {
        setapiUrl(`http://mysoce.pythonanywhere.com/soce/${url}/`);
        setloading(true)
        setbtnActive(name)
    }

    return (
        <React.Fragment>
            <MenuHeader active="matrix" set={false} />
            <h2 className="pageHeading">{btnActive} Seat Matrix of {college}s</h2>
            <div className="buttons">
                <Button active={btnActive === "2019"} primary onClick={() => getRequest('seat_2019', "2019")} className="btn">JoSSA 2019</Button>
                <Button active={btnActive === "2020"} primary onClick={() => getRequest('seat_2020', "2020")} className="btn">JoSSA 2020</Button>
                <Button active={btnActive === "2021"} primary onClick={() => getRequest('seat_2021', "2021")} disabled className="btn">JoSSA 2021</Button>
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
                                                <input type="text" id="institute" placeholder="Search" onKeyUp={search} size={7} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Name of Branch
                                                <input type="text" id="branch" placeholder="Search" onKeyUp={search} size={7} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Duration of Course
                                                <input type="text" id="duration" placeholder="Search" onKeyUp={search} size={2} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Degree of Course
                                                <input type="text" id="degree" placeholder="Search" onKeyUp={search} size={7} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Seat Pool
                                                <input type="text" id="pool" placeholder="Search" onKeyUp={search} size={7} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Category
                                                <input type="text" id="category" placeholder="Search" onKeyUp={search} size={3} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Quota
                                                <input type="text" id="quota" placeholder="Search" onKeyUp={search} size={2} />
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <div className="searchField">
                                                Total Seats
                                                <input type="text" id="seats" placeholder="Search" onKeyUp={search} size={5} />
                                            </div>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {seats.map(seat => (institutes.find(o => o.id === seat.institute_code).category === college ?
                                        <Table.Row key={seat.id}>
                                            <Table.Cell>{institutes.find(o => o.id === seat.institute_code).name}</Table.Cell>
                                            <Table.Cell>{branches.find(o => o.id === seat.branch_code).branch_name}</Table.Cell>
                                            <Table.Cell>{branches.find(o => o.id === seat.branch_code).duration}</Table.Cell>
                                            <Table.Cell>{branches.find(o => o.id === seat.branch_code).degree}</Table.Cell>
                                            <Table.Cell>{seat.seat_pool}</Table.Cell>
                                            <Table.Cell>{seat.category}</Table.Cell>
                                            <Table.Cell>{seat.quota}</Table.Cell>
                                            <Table.Cell>{seat.seats}</Table.Cell>
                                        </Table.Row>
                                        : <React.Fragment key={seat.id}></React.Fragment>
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
                                            Duration of Course
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Degree of Course
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Seat Pool
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Category
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Quota
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Total Seats
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
    let duration = document.getElementById("duration").value.toUpperCase()
    let degree = document.getElementById("degree").value.toUpperCase()
    let pool = document.getElementById("pool").value.toUpperCase()
    let category = document.getElementById("category").value.toUpperCase()
    let quota = document.getElementById("quota").value.toUpperCase()
    let seats = document.getElementById("seats").value.toUpperCase()

    let table = document.getElementById('myTable');
    let tr = table.getElementsByTagName('tr');
    for (var i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td');
        if (td.length > 0) {
            if ((td[0].innerHTML.toUpperCase().indexOf(institute) > -1) && (td[1].innerHTML.toUpperCase().indexOf(branch) > -1) && (td[2].innerHTML.toUpperCase().indexOf(duration) > -1) && (td[3].innerHTML.toUpperCase().indexOf(degree) > -1) && (td[4].innerHTML.toUpperCase().indexOf(pool) > -1) && (td[5].innerHTML.toUpperCase().indexOf(category) > -1) && (td[6].innerHTML.toUpperCase().indexOf(quota) > -1) && (td[7].innerHTML.toUpperCase().indexOf(seats) > -1)) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}