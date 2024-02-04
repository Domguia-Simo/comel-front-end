import React, { useState, useEffect ,useMemo } from 'react'
import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import logo from '../assets/images/logo.jpeg'

// Styling 
import '../assets/styles/global.css'

export default function Login() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [respond, setRespond] = useState('')
    const [success, setSuccess] = useState('')
    const [smallScreen ,setSmallScreen] = useState(false)

    useMemo(()=>{
        if(window.innerWidth < 1200){
            setSmallScreen(true)
        }else{
            setSmallScreen(false)
        }
    },[0])
    useMemo(()=>{
        window.addEventListener('resize' ,()=>{
            if(window.innerWidth < 1440){
                setSmallScreen(true)
            }else{
                setSmallScreen(false)
            }
        })
    },[])

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

    return (
        <div style={{
            display:'flex',
            
            justifyContent:'space-between',

        }}>

            <section className="vh-100" style={{border:'solid 1px transparent' ,width:'100%' ,paddingTop:'50px'}}>
                <div className="container-fluid" style={{border:'solid 1px transparent'}}>
                    <div className="row" 
                    style={{
                        border:'solid 1px transparent',display:'flex',
                        flexDirection:smallScreen ? 'column':'row',alignItems:'center' ,justifyContent:'center'

                    }}
                    >

                        {/* Actual form */}
                        {
                            smallScreen ? 
                                <div style={{
                                    display:'flex' ,border:'solid 1px rgba(0,0,0,0.2)' ,backgroundColor:'rgba(250,250,250,0.5)',
                                    borderRadius:'10px',flexDirection:'column',margin:'30px 0px' ,width:'fit-content'
                                }}>
                                    {/* <div style={{}}> */}
                                        <img
                                            src={logo}
                                            alt="IAI logo"
                                            width={75}
                                            height={75}
                                            style={{borderRadius:'10px' ,boxShadow:'5px 5px 10px grey' ,marginTop:'-50px'}}
                                        />
                                    {/* </div> */}
                                        <form style={{ width: "fit-content", backgroundColor: "" }}>
                                                
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

                                                <h3  className='fw-normal mb-3 pb-2' style={{ letterSpacing: "2px"  ,textAlign:'left', padding:'7px'}}>Log in</h3>

                                                <div >
                                                    <input type="email"
                                                        id="form2Example18"
                                                        className="" placeholder='Email Address'
                                                        name="email" onChange={e => handleChange(e)} required
                                                        style={{border:'solid 1px rgba(0,0,0,0.2)' , outline:'none',width:'280px' ,backgroundColor:'rgb(250,250,250)'}}
                                                    />

                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example28"
                                                        className="" placeholder='Password'
                                                        name="password" onChange={e => handleChange(e)} required
                                                        style={{border:'solid 1px rgba(0,0,0,0.2)' , outline:'none',width:'280px' ,backgroundColor:'rgb(250,250,250)'}}
                                                    />

                                                </div>

                                                <div className="" style={{width:'280px' ,border:'solid 1px transparent' ,textAlign:'center'}}>
                                                    <button
                                                        className=""
                                                        style={{border:'solid 1px grey' ,padding:'5px 10px' ,width:'90%' ,borderRadius:'5px' ,color:'white' ,backgroundColor:'#54b4d3'}}
                                                        type="button"
                                                        onClick={() => {
                                                            submit();
                                                        }}
                                                    >Login</button>
                                                </div>

                                                <p className=""><a className="text-muted" href="#!">Forgot password?</a></p>
                                                <p>Don't have an account? <Link to="register" className="link-info">Register here</Link></p>
                                            </form>
                                </div>
                                :

                            <div className="col-sm-6 text-black" 
                            style={{
                                border:'solid 0px red' ,
                                display:'flex',justifyContent:'center',alignItems:'center',
                                // width:smallScreen ? '100%':'50%'
                            }}
                            >
                                {/* Form and logo image container */}
                                <div>
                                    
                                    <div>
                                        <div className="px-5 ms-xl-3">
                                            <img
                                                src={logo}
                                                width={"100px"}
                                                height={"100px"}
                                                style={{
                                                    borderRadius: "10px",boxShadow:'2px 2px 7px grey',
                                                    // display:smallScreen ? 'none':''
                                                }}
                                            />
                                        </div>

                                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-9 mt-xl-n5"
                                            style={{
                                                border:'solid 1px rgba(0,0,0,0.2)' ,width:'fit-content',backgroundColor:'rgba(255,255,255,0.4)',
                                                borderRadius:'10px',boxShadow:'0px 0px 20px grey'
                                            }}
                                        >

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
                                                        style={{border:'solid 1px rgba(0,0,0,0.2)' ,width:'100%' ,backgroundColor:'rgb(250,250,250)'}}
                                                    />
                                                    <label className="form-label" for="form2Example18"  >
                                                    {
                                                        data.email == '' ?
                                                            ' Email address':''
                                                    }
                                                    </label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example28"
                                                        className="form-control form-control-lg"
                                                        name="password" onChange={e => handleChange(e)} required
                                                        style={{border:'solid 1px rgba(0,0,0,0.2)' ,width:'100%' ,backgroundColor:'rgb(250,250,250)'}}
                                                    />
                                                    <label className="form-label" for="form2Example28">
                                                    {
                                                        data.password == '' ?
                                                        ' Password':''
                                                    }   
                                                    </label>
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

                                </div>

                            </div>
                        }

                        {/* Side Image */}
                        {
                            smallScreen ?
                            ''
                            :
                            <div className="col-sm-6 px-0 d-none d-sm-block" style={{border:'solid 0px yellow' ,display:'flex' ,textAlign:'center'}}>
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                                    alt="Login image"
                                    width={500}
                                    height={500}
                                    style={{borderRadius:'10px' ,boxShadow:'5px 5px 10px grey' ,backgroundColor:'rgba(0,0,0,0.15)' ,width:'500px' ,height:'500px'}}
                                />
                            </div>
                        }

                    </div>
                </div>
            </section>

        </div >
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