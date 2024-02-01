import React, { useState, useEffect } from 'react'
import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import logo from '../assets/images/logo.jpeg'

// Styling 
import '../assets/styles/global.css'

export default function Login() {
    const navigate = useNavigate()
    // const User = useLoaderData()
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [respond, setRespond] = useState('')
    const [success, setSuccess] = useState('')
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    async function submit() {
        console.log(data)
        if (data.email == '' || data.password == '') {
            setError("Enter all value")
            return
        }
        setError('')
        setRespond('')
        setSuccess('')
        setLoading(true)

        await fetch(`${process.env.REACT_APP_API_URL}/admin/login`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
            .then(res => res.json())
            .then(async (data) => {
                // console.log("data", data)
                if (data.token) {
                    setSuccess(data.message)
                    await localStorage.setItem('token', data.token)
                    window.location.pathname = "/dashboard/home"
                } else {
                    setRespond(data.message)
                }
                setLoading(false)
            })
            .catch(e => {
                // console.log(e)
                setError("Verify your internet connection")
                setLoading(false)
            })

    }
    function handleChange(e) {
        if (e.target.type == 'text' || e.target.type == 'password' || e.target.type == 'email') {
            setData({ ...data, [e.target.name]: e.target.value })
        } else {
            setData({ ...data, [e.target.name]: !data.confirm })
        }
    }
    // const toDashboard = () => {
    //     setTimeout(() => {
    //         navigate("/dashboard", { replace: true, state: { name: User.name } })
    //     }, 200)
    // }
    // if (!User.isLogin) {
    return (
        <div >
            <div
                style={{
                    height: '50px',
                }}>
            </div>
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">
                            <div className="px-5 ms-xl-3">
                                {/* <i className="fas fa-crow" style={{ fontSize: "50px" }}></i> */}
                                <img
                                    src={logo}
                                    width={"100px"}
                                    height={"100px"}
                                    style={{
                                        // borderRadius: "50%",
                                    }}
                                />
                            </div>

                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-9 mt-xl-n5">

                                <form style={{ width: "23rem", backgroundColor: "" }}>
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
                                    <h3 className="fw-normal mb-3 pb-2" style={{ letterSpacing: "2px" }}>Log in</h3>

                                    <div className="form-outline mb-4">
                                        <input type="email"
                                            id="form2Example18"
                                            className="form-control form-control-lg"
                                            name="email" onChange={e => handleChange(e)} required
                                        />
                                        <label className="form-label" for="form2Example18">Email address</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="form2Example28"
                                            className="form-control form-control-lg"
                                            name="password" onChange={e => handleChange(e)} required
                                        />
                                        <label className="form-label" for="form2Example28">Password</label>
                                    </div>

                                    <div className="pt-1 mb-4">
                                        <button
                                            className="btn btn-info btn-lg btn-block"
                                            type="button"
                                            onClick={() => {
                                                submit();
                                            }}
                                        >Login</button>
                                    </div>

                                    <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
                                    <p>Don't have an account? <Link to="register" className="link-info">Register here</Link></p>
                                </form>
                            </div>

                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                                alt="Login image"
                                // className="w-100 vh-100"
                                width={500}
                                height={500}
                            // style={{ objectFit: "cover", objectPosition: "left" }} 
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
    // } else {
    //     toDashboard();
    // }

}

export const loginLoader = async ({ params }) => {
    let token = localStorage.getItem('token')
    const res = await fetch(`${process.env.REACT_APP_API_URL}/isLogin`, {
        headers: {
            'content-type': 'application/json',
            'accept': 'applicaion/json',
            'access-conteol-origin': '*',
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
    if (!res.ok) {
        throw Error('Could not find that getting voter.')
    }
    if (!res2.ok) {
        throw Error('Could not find that getting voter.')
    }
    // console.log("res.json()",res.json());
    let response = await res.json()
    let response2 = await res2.json()
    let data = {
        isLogin: response.isLogin,
        name: response.name,
        isAdmin: response2.isAdmin,
    }
    return data

}