import React, { useState, useEffect } from 'react'
import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode';


// Styling 
import '../assets/styles/global.css'

export default function Register() {
    const navigate = useNavigate()
    // const User = useLoaderData()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [respond, setRespond] = useState('')
    const [success, setSuccess] = useState('')
    async function submit() {
        if (email == '' || password == '') {
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
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(async (data) => {
                // console.log("data", data)
                if (data.token) {
                    setSuccess(data.message)
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
                // console.log(e)
                setError("Verify your internet connection")
                setLoading(false)
            })
    }
    return (
        <div >
            <div className='header'
                style={{
                    // padding: '5px 30px',
                    height: '50px',
                    // color: 'black',
                    // fontWeight: 'bold',
                    // letterSpacing: '1px',
                    // display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'space-between',
                }}>
            </div>
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">
                            <div className="px-5 ms-xl-3">
                                <i className="fas fa-crow" style={{ fontSize: "50px" }}></i>
                            </div>

                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-9 mt-xl-n5">

                                <form style={{ width: "23rem", backgroundColor: "" }}>

                                    <h3 className="fw-normal mb-3 pb-2" style={{ letterSpacing: "2px" }}>Sign up</h3>

                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="form-outline" data-mdb-input-init >
                                                <input type="text" id="form3Example1" className="form-control" />
                                                <label className="form-label" for="form3Example1">First name</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline" data-mdb-input-init >
                                                <input type="text" id="form3Example2" className="form-control" />
                                                <label className="form-label" for="form3Example2">Last name</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <input type="email" id="form3Example3" class="form-control" />
                                        <label class="form-label" for="form3Example3">Email address</label>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <input type="password" id="form3Example4" class="form-control" />
                                        <label class="form-label" for="form3Example4">Password</label>
                                    </div>

                                    <div class="form-check d-flex justify-content-center mb-4">
                                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                                        <label class="form-check-label" for="form2Example33">
                                            Subscribe to our newsletter
                                        </label>
                                    </div>


                                    <button type="submit" class="btn btn-primary btn-block mb-4">
                                        Sign up
                                    </button>

                                    <p className="small mb-3 pb-lg-2"><Link className="text-muted" to="/">Forgot password?</Link></p>
                                    <p>Don't have an account? <Link to="/" className="link-info">Log in</Link></p>
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
        </div>
    )


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

    if (!res.ok) {
        throw Error('Could not find that getting voter.')
    }
    // console.log("res.json()",res.json());
    let response = res.json()
    return response

}