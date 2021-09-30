import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Table } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import { MenuHeader } from './Menu'
import './college.css'
import { Footer } from './Footer'


export const SeatMatrix = ({ institutes, branches }) => {
    const [seats, setinstitute] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const { college } = useParams()
    const apiurl = "http://localhost:8000/soce/seat_2020/"
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
            <MenuHeader active="colleges" />
            <div className="collegeDetails">
                {
                    error ? <div className='message'>Error in loading the data</div> :
                        loading ? <Loader className="loading" type="BallTriangle" color="black" height={80} width={80} /> :
                            // seats[0] ? console.log(institutes.find(o => o.id === seats[0].institute_code))
                            //     : console.log("")
                            <Table celled structured >
                                <Table.Header >
                                    <Table.Row>
                                        <Table.HeaderCell>Name of Institute</Table.HeaderCell>
                                        <Table.HeaderCell>Name of Branch</Table.HeaderCell>
                                        <Table.HeaderCell>Duration of Course</Table.HeaderCell>
                                        <Table.HeaderCell>Degree of Course</Table.HeaderCell>
                                        <Table.HeaderCell>Seat Pool</Table.HeaderCell>
                                        <Table.HeaderCell>Category</Table.HeaderCell>
                                        <Table.HeaderCell>Quota</Table.HeaderCell>
                                        <Table.HeaderCell>Total Seats</Table.HeaderCell>
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
                            </Table>
                }
            </div>
            <br /><br /><br /><br />
            <Footer />
        </React.Fragment >
    )
}