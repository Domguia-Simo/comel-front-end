import { MDBCol, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import React, { useState } from 'react'
import { useNavigate, useLoaderData } from 'react-router-dom';

const levels = ["One", "Two", "Three"]

export default function Candidates() {
    const navigate = useNavigate()
    const { candidate, election } = useLoaderData()
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const [enterTitle, setEnterTitle] = useState(false)
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [level, setLevel] = useState("One")

    const [data, setData] = useState({
        name: '',
        email: '',
        class: 'B1A',
        election: election[0]._id
        // confirm: false
    })
    console.log("candidate", candidate);
    console.log("election", election);
    const createCandidate = () => {
        setLoading(true)
        setError('')
        setSuccess('')
        fetch(`${process.env.REACT_APP_API_URL}/candidate/addCandidate`, {
            method: "post",
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                desc: data.desc,
                phone: data.phone,
                class: data.class,
                election: data.election,
            })
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log(data)
                if (data.status) {
                    setSuccess(data.message)
                    setEnterTitle(false)
                    navigate("/dashboard/candidates", { replace: true })
                } else
                    setError(data.message)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                setError('check you connection')
                setLoading(false)
            })


    }
    const deleteCandidate = (id) => {
        setLoading(true)
        setError('')
        setSuccess('')
        fetch(`${process.env.REACT_APP_API_URL}/candidate/deleteCandidate/` + id, {
            method: "delete",
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log(data)
                if (data.status) {
                    setSuccess(data.message)
                    navigate("/dashboard/candidates", { replace: true })
                } else
                    setError(data.message)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                setError('check you connection')
                setLoading(false)
            })
    }
    const editCandidate = () => {
        setLoading(true)
        setError('')
        setSuccess('')
        fetch(`${process.env.REACT_APP_API_URL}/candidate/editCandidate/` + data._id, {
            method: "put",
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                desc: data.desc,
                phone: data.phone,
                class: data.class,
                election: data.election,
            })
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log(data)
                if (data.status) {
                    setSuccess(data.message)
                    setEnterTitle(false)
                    navigate("/dashboard/candidates", { replace: true })
                } else
                    setError(data.message)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                setError('check you connection')
                setLoading(false)
            })


    }

    let lists = candidate.candidates.map((item) =>
        <tr key={item._id}>
            <td style={{ padding: '5px' }}>{item.name}</td>
            {/* <td style={{ padding: '5px' }}>{item.class}</td> */}
            <td style={{ padding: '5px', cursor: "pointer" }}>
                {loading ? (
                    <button className='submit2' style={{ background: "green" }}>
                        .....
                    </button>
                ) : (
                    <button
                        className='submit2'
                        style={{ background: "green" }}
                        onClick={() => {
                            setData(item)
                            setEditing(true)
                            setEnterTitle(true)
                        }}>
                        EDIT
                    </button>
                )}
            </td>
            {/* <td style={{ padding: '5px', cursor: "pointer" }}>
                {loading ? (
                    <button className='submit2' style={{ background: "green" }}>
                        .....
                    </button>
                ) : (
                    <button
                        className='submit2'
                        style={{ background: "green" }}
                        onClick={() => { }}>
                        ADD PHOTO
                    </button>
                )}
            </td> */}
            <td style={{ padding: '5px', cursor: "pointer" }}>
                {loading ? (
                    <button
                    className='submit2' style={{ background: "red" }}>
                        .....
                    </button>
                ) : (
                    <button
                        className='submit2'
                        style={{ background: "red" }}
                        onClick={() => { deleteCandidate(item._id) }}>
                        DELETE
                    </button>
                )}
            </td>
        </tr>
    );
    function handleChange(e) {
        // return
        if (e.target.type == 'text' || e.target.type == 'email') {
            setData({ ...data, [e.target.name]: e.target.value })
        } else {
            setData({ ...data, [e.target.name]: !data.confirm })
        }
    }
    let displayElection = election.map(ele => {

        return (
            <option key={ele._id} value={ele._id}>{ele.title}</option>
        )
    })
    return (
        <>
            <div>
                <center>
                    {loading ? (
                        <button
                        className='submit2' style={{ cursor: "pointer", background: "green" }}>
                            .....
                        </button>
                    ) : (
                        <>
                            {enterTitle ? (
                                <>
                                    <div>
                                        <form onSubmit={(e) => e.preventDefault()}>

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    rowGap: '5px',
                                                    fontWeight: 'bold',
                                                    letterSpacing: 1
                                                }}
                                            >

                                                Create a candidate
                                            </div>

                                            <div>
                                                {error ?
                                                    <center style={{ color: 'darkred' }}>
                                                        {error} &nbsp;
                                                        {/* <i className='fas fa-wifi' style={{textDecoration:'line-through' ,color:'darkred'}}></i> */}
                                                    </center>
                                                    : ''}
                                                {
                                                    success != '' ? <span style={{ color: 'green' }}>{success}</span> : ''
                                                }
                                            </div>


                                            <input type="text" placeholder='Name' value={data.name} name="name" onChange={e => handleChange(e)} required />
                                            <input type="email" placeholder='Email' value={data.email} name="email" onChange={e => handleChange(e)} required />
                                            <input type="text" placeholder='Phone' value={data.phone} name="phone" onChange={e => handleChange(e)} required />
                                            <input type="text" placeholder='Class' value={data.class} name="class" onChange={e => handleChange(e)} required />
                                            <input type="text" placeholder='Description' value={data.desc} name="desc" onChange={e => handleChange(e)} required />

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', columnGap: '20px' }}>
                                                <div>
                                                    <select id="level" value={data.election} onChange={(e) => setData({ ...data, election: e.target.value })}>
                                                        {displayElection}
                                                    </select>
                                                    <label htmlFor='level'> Election </label>
                                                </div>
                                            </div>
                                            {
                                                loading ? (
                                                    <>
                                                        {editing ? (
                                                            <button readOnly className='submit'>
                                                                EDIT
                                                                <img src={require('../../assets/images/loader.gif')} width={'30px'} alt="loader" />
                                                            </button>
                                                        ) : (
                                                            <button readOnly className='submit'>
                                                                CREATE
                                                                <img src={require('../../assets/images/loader.gif')} width={'30px'} alt="loader" />
                                                            </button>
                                                        )}

                                                        <button style={{ background: "red" }} readOnly className='submit'>
                                                            CANCEL
                                                            {/* <img src={require('../../assets/images/loader.gif')} width={'30px'} alt="loader" /> */}
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {editing ? (
                                                            <button onClick={() => { editCandidate() }} className='submit'>
                                                                EDIT
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => { createCandidate() }} className='submit'>
                                                                CREATE
                                                            </button>
                                                        )}
                                                        <button style={{ background: "red" }} onClick={() => { setEnterTitle(false) }} className='submit'>
                                                            CANCEL
                                                        </button>
                                                    </>
                                                )
                                            }

                                        </form>
                                    </div>
                                </>
                            ) : (
                                <button
                                className='submit2'
                                    style={{ cursor: "pointer", background: "green" }}
                                    onClick={() => {
                                        setData({
                                            "name": "",
                                            "email": "",
                                            "desc": "",
                                            "phone": "",
                                            "class": "",
                                            "election": "",
                                        })
                                        setEnterTitle(true);
                                        setEditing(false)
                                    }}
                                >
                                    CREATE
                                </button>
                            )}
                        </>
                    )}
                    <br />
                    <br />
                    {error ?
                        <center style={{ color: 'darkred' }}>
                            {error} &nbsp;
                            {/* <i className='fas fa-wifi' style={{textDecoration:'line-through' ,color:'darkred'}}></i> */}
                        </center>
                        : ''}
                    {
                        success != '' ? <span style={{ color: 'green' }}>{success}</span> : ''
                    }
                    <table border='1' style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '5px' }}>Name</th>
                                {/* <th style={{ padding: '5px' }}>Class</th> */}
                                <th style={{ padding: '5px' }}></th>
                                <th style={{ padding: '5px' }}></th>
                                {/* <th style={{ padding: '5px' }}></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {lists}
                        </tbody>
                    </table>
                </center>
            </div>
        </>
    )
}

export const candidatesLoader = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/candidate/getCandidates`, {
        headers: {
            'content-type': 'application/json',
            'accept': 'applicaion/json',
            'access-control-origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const res1 = await fetch(`${process.env.REACT_APP_API_URL}/election/getElections`, {
        headers: {
            'content-type': 'application/json',
            'accept': 'applicaion/json',
            'access-control-origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (!res1.ok) {
        throw Error('Access Diened')
    }
    if (!res.ok) {
        throw Error('Access Diened')
    }
    let candidate1
    let election1
    let candidate = await res.json().then(data => {
        candidate1 = data
        console.log(data);
        return data;
    })
    let election = await res1.json().then(data => {
        election1 = data
        console.log(data);
        return data;
    })
    console.log(candidate1);
    return {
        candidate: candidate1,
        election: election1.election
    }
}

