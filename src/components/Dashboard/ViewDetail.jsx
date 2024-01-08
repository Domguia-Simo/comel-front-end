import React from 'react'
import { useParams, useLoaderData, Link, useRouteError } from 'react-router-dom'

export default function ViewDetail() {
    const { classes } = useParams()
    const votersByClass = useLoaderData()
    console.log(votersByClass)
    return (
        <div>
            <h2 style={{ marginLeft: ' 10px' }}>Lists of students in <b style={{ color: 'blue' }}>{classes}</b></h2>
            <center>
               
            </center>
        </div>
    )
}


export const viewDetailLoader = async ({ params }) => {
    const { classes } = params
    const res = await fetch('http://localhost:5000/api/voter/getVoterByClass/B1A')

    if (!res.ok) {
        throw Error('Could not find that getting voter.')
    }
    // console.log("res.json()",res.json());
    return res.json()
}


export const CareersViewsDetial = () => {
    const error = useRouteError()

    return (
        <div className="careers-error">
            <h2>Error</h2>
            <p>{error.message}</p>
            <Link to="/">Back to the Homepage</Link>
        </div>
    )
}

{/* <table border='1' style={{ borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '5px' }}>Name</th>
                                    <th style={{ padding: '5px' }}>Voted</th>
                                </tr>
                            </thead>

                            <tbody>
                                {displayStudents} 
                            </tbody>
                        </table> */}