import React, { useMemo, useState } from 'react'
import { useParams, useLoaderData, Link, useRouteError, useNavigate } from 'react-router-dom'

export default function ViewDetail() {
    const { classes } = useParams()
    const navigate = useNavigate()
    const votersByClass = useLoaderData()
    const [classe, setClasse] = useState('ba1a')
    const [students, setStudents] = useState(votersByClass.voters || [])
    const [filter, setFilter] = useState('')
    // console.log("votersByClass.voters", votersByClass)
    const toDashboard = () => {
        setTimeout(() => {
            navigate("/dashboard", { replace: true })
        }, 1000)
    }

    let lists = votersByClass.voters.map((item) =>
        <tr key={item.id}>
            <td style={{ padding: '5px' }}>{item.name}</td>
            <td style={{ color: item.status == 'VOTED' ? 'green' : 'red', padding: '5px' }}>{item.status}</td>
        </tr>
    );
    useMemo(() => {
        let newStudents = students.map(student => {
            if (student.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
                student.display = true
            } else {
                student.display = false
            }
            return student
        })
        setStudents(newStudents)
    }, [filter, classe])
    if (votersByClass.message === "Acess Denied") {
        toDashboard();
        return (
            <h1>{votersByClass.message}</h1>
        )
    } else {
        return (
            <div>
                <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder='Enter student name'
                    style={{ width: '200px', padding: '10px 20px', borderRadius: '5px', border: 'solid 1px rgba(0,0,0,0.2)' }}
                />
                <h2 style={{ marginLeft: ' 10px' }}>Lists of students in <b style={{ color: 'blue' }}>{classes}</b></h2>
                <center>
                    <table border='1' style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '5px' }}>Name</th>
                                <th style={{ padding: '5px' }}>Voted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lists}
                        </tbody>
                    </table>
                </center>
            </div>
        )
    }
}


export const viewDetailLoader = async ({ params }) => {
    const { classes } = params
    // console.log(`Bearer ${localStorage.getItem('token')}`)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/voter/getVoterByClass/` + classes, {
        headers: {
            'content-type': 'application/json',
            'accept': 'applicaion/json',
            'access-control-origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    // console.log(res);
    if (!res.ok) {
        throw Error('Access Diened')
    }
    // console.log("res.json()",res.json());
    return res.json()
}


export const ViewsDetialError = () => {
    const error = useRouteError()

    return (
        <div className="careers-error">
            <h2>Error</h2>
            <p>{error.message}</p>
            <Link to="/">Back to the Homepage</Link>
        </div>
    )
}
