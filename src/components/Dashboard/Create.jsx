import React, { useState } from 'react'
import { useNavigate, useLoaderData } from 'react-router-dom';
export default function Elections() {
    const navigate = useNavigate()
    const election = useLoaderData()
    const [loading, setLoading] = useState(false)
    const [enterTitle, setEnterTitle] = useState(false)
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    // console.log(election);
    const createElection = () => {
        setLoading(true)
        setError('')
        setSuccess('')
        if (title) {
            fetch(`${process.env.REACT_APP_API_URL}/election/createElection/`, {
                method: "post",
                headers: {
                    'content-type': 'application/json',
                    'accept': 'applicaion/json',
                    'access-control-origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: title
                })
            })
                .then(res => res.json())
                .then(async (data) => {
                    // console.log(data)
                    if (data.status) {
                        setSuccess(data.message)
                        setEnterTitle(false)
                        navigate("/elections", { replace: true })
                    } else
                        setError(data.message)
                    setLoading(false)
                })
                .catch(e => {
                    // console.log(e)
                    setError('check you connection')
                    setLoading(false)
                })
        } else {
            setError('Enter a title')
            setLoading(false)
        }

    }
    const deleteElection = (id) => {
        setLoading(true)
        setError('')
        setSuccess('')
        fetch(`${process.env.REACT_APP_API_URL}/election/deleteElection/` + id, {
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
                // console.log(data)
                if (data.status) {
                    setSuccess(data.message)
                    navigate("/elections", { replace: true })
                } else
                    setError(data.message)
                setLoading(false)
            })
            .catch(e => {
                // console.log(e)
                setError('check you connection')
                setLoading(false)
            })
    }
    const startElection = (id) => {
        setLoading(true)
        setError('')
        setSuccess('')
        fetch(`${process.env.REACT_APP_API_URL}/election/startElection/` + id, {
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(async (data) => {
                // console.log(data)
                if (data.status) {
                    setSuccess(data.message)
                    navigate("/elections", { replace: true })
                } else
                    setError(data.message)
                setLoading(false)
            })
            .catch(e => {
                // console.log(e)
                setError('check you connection')
                setLoading(false)
            })
    }
    const endElection = (id) => {
        setLoading(true)
        setError('')
        setSuccess('')
        fetch(`${process.env.REACT_APP_API_URL}/election/closeElection/` + id, {
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(async (data) => {
                // console.log(data)
                if (data.status) {
                    setSuccess(data.message)
                    navigate("/elections", { replace: true })
                } else
                    setError(data.message)
                setLoading(false)
            })
            .catch(e => {
                // console.log(e)
                setError('check you connection')
                setLoading(false)
            })
    }

    let lists = election.election.map((item) =>
        <>
            <tr key={item._id}>
                <td style={{ padding: '5px' }}>{item.title}</td>
                <td style={{ color: item.status == 'END' ? 'red' : 'green', padding: '5px' }}>{item.status}</td>
            </tr>
            <tr>
                <td style={{ padding: '5px', cursor: "pointer" }}>
                    {loading ? (
                        <button
                            className='submit2' style={{ background: "green" }}>
                            .....
                        </button>
                    ) : (
                        <button
                            className='submit2'
                            style={{ background: "green" }}
                            onClick={() => { startElection(item._id) }}>
                            START
                        </button>
                    )}
                </td>
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
                            onClick={() => { endElection(item._id) }}>
                            END
                        </button>
                    )}
                </td>
            </tr>
            <tr>
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
                            onClick={() => { deleteElection(item._id) }}>
                            DELETE
                        </button>
                    )}
                </td>
                <td style={{ padding: '5px', cursor: "pointer" }}>
                    {loading ? (
                        <button
                            className='submit2' style={{ background: "green" }}>
                            .....
                        </button>
                    ) : (
                        <button
                            className='submit2'
                            style={{ background: "green" }}
                            onClick={() => { navigate(`/result/${item._id}`) }}>
                            RESULT
                        </button>
                    )}
                </td>
            </tr>
        </>
    );
    if (election.isAdmin) {
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
                                        <label>Enter an Election Title: </label>
                                        <input
                                            type="text"
                                            onChange={(e) => { setTitle(e.target.value) }}
                                        />
                                        <button
                                            className='submit2'
                                            style={{ cursor: "pointer", background: "green" }}
                                            onClick={createElection}>
                                            CREATE
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className='submit2'
                                        style={{ cursor: "pointer", background: "green" }}
                                        onClick={() => setEnterTitle(true)}>
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
                        <div style={{ overflow: "auto" }}>
                            <table border='1' style={{ borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '5px' }}>Name</th>
                                        <th style={{ padding: '5px' }}>status</th>
                                    </tr>
                                </thead>
                                <tbody style={{ overflow: "auto" }}>
                                    {lists}
                                </tbody>
                            </table>
                        </div>
                    </center>
                </div>
            </>
        )
    } else {
        window.location.pathname = '/home';
    }

}

export const electionsLoader = async () => {

    const res = await fetch(`${process.env.REACT_APP_API_URL}/election/getElections`, {
        headers: {
            'content-type': 'application/json',
            'accept': 'applicaion/json',
            'access-control-origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const res2 = await fetch(`${process.env.REACT_APP_API_URL}/isAdmin`, {
        headers: {
            'content-type': 'application/json',
            'accept': 'applicaion/json',
            'access-conteol-origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (!res2.ok) {
        throw Error('Access Diened')
    }
    // console.log(res);
    if (!res.ok) {
        throw Error('Could not find that getting Election.')
    }
    // console.log("res.json()",res.json());
    let response = await res.json();
    let response2 = await res2.json();
    return {
        election: response.election,
        isAdmin: response2.isAdmin,
    }
}

