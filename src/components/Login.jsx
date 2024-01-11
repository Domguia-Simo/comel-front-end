import React, { useState, useEffect } from 'react'
import { useNavigate, useLoaderData } from 'react-router-dom'
import jwtDecode from 'jwt-decode';


// Styling 
import '../assets/styles/global.css'

export default function Login() {
    const navigate = useNavigate()
    const User = useLoaderData()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [respond, setRespond] = useState('')
    async function submit() {
        if (email == '' || password == '') {
            return
        }
        setError('')
        setRespond('')
        setLoading(true)

        await fetch('http://comel-back-end.vercel.app/api/admin/login', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log("data",data)
                if (data.token) {
                    await localStorage.setItem('token', data.token)
                    // window.location.reload();
                    window.location.pathname = "/dashboard/view/B1A"
                    // navigate("/dashboard/view/B1A", { replace: true, state: { name: data.name } })
                } else {
                    setRespond(data.message)
                }
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                setError("Verify your internet connection")
                setLoading(false)
            })
    }
    const toDashboard = () => {
        setTimeout(() => {
            navigate("/dashboard", { replace: true, state: { name: User.name } })
        }, 200)
    }
    if (!User.isLogin) {
        return (
            <React.Fragment>
                <div className='body2'>
                    {/* <Header/> */}
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
                            <img src={require('../assets/images/logo.jpeg')} alt="logo" title='iai logo'
                                className='iai-logo'
                            />
                            <span>
                                IAI COMEL ADMIN <i className='far fa-user'></i>
                            </span>
                        </div>

                        <div>
                            {error != '' ?
                                <span style={{ color: 'darkred' }}>
                                    {error} &nbsp;
                                    <i className='fas fa-wifi' style={{ textDecoration: 'line-through', color: 'darkred' }}></i>
                                </span>
                                : ''}
                            {
                                respond != '' ? <span style={{ color: 'darkred' }}>{respond}</span> : ''
                            }
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
                            <i className='far fa-envelope' style={{ color: 'rgba(0,0,0,0.5)' }}></i>
                            <input type="email" placeholder='Email' value={email} name="password" onChange={e => setEmail(e.target.value)} required />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
                            <i className='fas fa-lock' style={{ color: 'rgba(0,0,0,0.5)' }}></i>
                            <input type="password" placeholder='Password' value={password} name="password" onChange={e => setPassword(e.target.value)} required />
                        </div>

                        <button onClick={() => submit()} className='submit'>
                            Login
                            {
                                loading ? <img src={require('../assets/images/loader.gif')} width={'30px'} alt="loader" /> : ''
                            }
                        </button>

                    </form>

                </div>
            </React.Fragment>
        )
    } else {
        toDashboard();
    }

}

export const loginLoader = async ({ params }) => {
    let token = localStorage.getItem('token')
    const res = await fetch('https://comel-back-end.vercel.app/api/isLogin', {
        headers: {
            'content-type': 'application/json',
            'accept': 'applicaion/json',
            'access-conteol-origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (!res.ok) {
        throw Error('Could not find that getting voter.')
    }
    // console.log("res.json()",res.json());
    let response = res.json()
    return response

}