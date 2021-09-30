import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Table } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import { MenuHeader } from './Menu'
import './college.css'
import { Footer } from './Footer'


export const Colleges = () => {
    const [institutes, setinstitute] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const { college } = useParams()
    const apiurl = "http://localhost:8000/soce/institutes/"
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
                            <Table celled structured >
                                <Table.Header >
                                    <Table.Row>
                                        <Table.HeaderCell>Institute Code</Table.HeaderCell>
                                        <Table.HeaderCell>Name of Institute</Table.HeaderCell>
                                        <Table.HeaderCell>Institute Type</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {institutes.map(institute => (institute.category === college ?
                                        <Table.Row key={institute.id}>
                                            <Table.Cell>{institute.code}</Table.Cell>
                                            <Table.Cell>{institute.name}</Table.Cell>
                                            <Table.Cell>{institute.category}</Table.Cell>
                                        </Table.Row>
                                        : <React.Fragment key={institute.id}></React.Fragment>
                                    ))}
                                </Table.Body>
                            </Table>
                }
            </div>
            <Footer />
        </React.Fragment>
    )
}
