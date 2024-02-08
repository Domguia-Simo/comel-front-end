import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import CountDown from 'react-countdown';

// Styling
import '../assets/styles/global.css'
import logo from '../assets/images/logo.jpeg';

const EmailVerification = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState(null)
    const [error, setError] = useState('')
    const [userInfo, setUserInfo] = useState(useLocation().state)
    const [success, setSuccess] = useState('')
    const [respond, setRespond] = useState('')
    const [data, setData] = useState({
        code: '',
    })
    const [smallScreen, setSmallScreen] = useState(false)
    useMemo(() => {
        if (window.innerWidth < 1200) {
            setSmallScreen(true)
        } else {
            setSmallScreen(false)
        }
    }, [0])
    useMemo(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 1440) {
                setSmallScreen(true)
            } else {
                setSmallScreen(false)
            }
        })
    }, [])
    const [countdownTime, setCountdownTime] = useState(600); // 10 minutes in seconds
    function handleChange(e) {
        if (e.target.type == 'text' || e.target.type == 'password' || e.target.type == 'email') {
            setData({ ...data, [e.target.name]: e.target.value })
        } else {
            setData({ ...data, [e.target.name]: !data.confirm })
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdownTime((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000); // Update timer every second

        return () => clearInterval(interval);
    }, []);

    const handleOnComplete = () => {
        // Your callback function when the timer reaches zero
        setRespond('you code has expired')
        // setTimeout(() => {
        //     window.location.pathname = "/"
        // }, 2500)
    };

    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    async function sendConfirmation() {
        console.log(data)
        setError('')
        setRespond('')
        setSuccess('')
        // console.log(userInfo);
        if (data.code == null) {
            return
        }
        if (!parseInt(data.code)) {
            setRespond('the verification code is a number')
            return
        }

        setLoading(true)
        try {
            fetch(`${process.env.REACT_APP_API_URL}/admin/verfiyAdmin`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'access-control-origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    code: data.code
                })
            })
                .then(res => res.json())
                .then(respond => {
                    console.log(respond)
                    if (respond.isLogin) {
                        if (respond.statusAdmin) {
                            setSuccess(respond.message);
                            setTimeout(() => {
                                window.location.pathname = '/dashboard/home'
                                setLoading(false)
                            }, 2500);
                        } else {
                            setLoading(false)
                            setError(respond.message);
                        }
                    } else {
                        setError(respond.message);
                        setTimeout(() => {
                            setLoading(false)
                            window.location.pathname = '/'
                        }, 2500);
                    }
                })
                .catch(err => {
                    setError('Verify your internet connection')
                    setLoading(false)
                })
        }
        catch (e) {
            // console.log(e)
            setError('Verify your internet connection')
            setLoading(false)
        }
    }
    async function sendCode() {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/admin/sendCode`, {
                method: 'get',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'access-control-origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(respond => {
                    console.log(respond)
                    if (respond.isLogin) {
                        if (respond.statusAdmin) {
                            setSuccess(respond.message);
                        } else {
                            setRespond(respond.message);
                        }
                        setLoading(false)
                    } else {
                        setError(respond.message);
                        setTimeout(() => {
                            setLoading(false)
                            window.location.pathname = '/'
                        }, 2500);
                    }
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                    setError('internet problem')
                })
        } catch (e) {
            setError('Verify your internet connection')
            setLoading(false)
        }
    }
    return (
        <React.Fragment>
            <div style={{
                display: 'flex',
                // border:'solid 1px grey',
                justifyContent: 'space-between',

            }}>

                <section className="vh-100" style={{ border: 'solid 1px transparent', width: '100%', paddingTop: '50px' }}>
                    <div className="container-fluid" style={{ border: 'solid 1px transparent' }}>
                        <div className="row"
                            style={{
                                border: 'solid 1px transparent', display: 'flex',
                                flexDirection: smallScreen ? 'column' : 'row', alignItems: 'center', justifyContent: 'center'

                            }}
                        >

                            {/* Actual form */}
                            {
                                smallScreen ?
                                    <div style={{
                                        display: 'flex', border: 'solid 1px rgba(0,0,0,0.2)', backgroundColor: 'rgba(250,250,250,0.5)',
                                        borderRadius: '10px', flexDirection: 'column', margin: '30px 0px', width: 'fit-content'
                                    }}>
                                        {/* <div style={{}}> */}
                                        <img
                                            src={logo}
                                            alt="IAI logo"
                                            width={75}
                                            height={75}
                                            style={{ borderRadius: '10px', boxShadow: '5px 5px 10px grey', marginTop: '-50px' }}
                                        />
                                        {/* </div> */}
                                        <form style={{ width: "fit-content", backgroundColor: "" }}>
                                            {/* <form style={{ width: "23rem", backgroundColor: "" }}> */}

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

                                            <h3 className="fw-normal mb-3 pb-2" style={{ letterSpacing: "2px" }}>Verify your account</h3>
                                            <blockquote>
                                                - A code has been send to your email .<br />-<b> Enter the code to to verify your account </b>
                                            </blockquote>
                                            <center>
                                                <span style={{ color: 'darkred' }}>
                                                    <CountDown date={Date.now() + countdownTime * 1000} onComplete={handleOnComplete}>
                                                        <span style={{ color: 'darkred' }}>{minutes}:{seconds.toString().padStart(2, '0')}</span>
                                                    </CountDown>
                                                </span>
                                            </center>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="form2Example28"
                                                    className="form-control form-control-lg"
                                                    name="code"
                                                    onChange={(e) => {
                                                        setData({ ...data, code: e.target.value })
                                                    }} required
                                                    style={{ border: 'solid 1px rgba(0,0,0,0.2)', width: '100%', backgroundColor: 'rgb(250,250,250)' }}
                                                />

                                                <label className="form-label" for="form2Example28">
                                                    {
                                                        data.code == '' ?
                                                            ' Verification code' : ''
                                                    }
                                                </label>
                                            </div>


                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-info btn-lg btn-block"
                                                    type="button"
                                                    disabled={loading ? true : false}
                                                    onClick={() => {
                                                        sendConfirmation();
                                                    }}
                                                >Verify{' '}
                                                    {
                                                        loading ?
                                                            <img src={require('../assets/images/loader.gif')} width={'20px'} /> : ''
                                                    }
                                                </button>
                                            </div>

                                            {/* <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p> */}
                                            <p>
                                                {countdownTime < 590 ? (
                                                    <a
                                                        onClick={() => {
                                                            console.log("Send again abled");
                                                            sendCode();
                                                        }}
                                                        style={{ cursor: "pointer" }}
                                                        className="link-info">
                                                        Resend code
                                                    </a>
                                                ) : (
                                                    <a
                                                        disabled
                                                        style={{ cursor: "pointer" }}
                                                        className="link-info"
                                                    >
                                                        Resend code
                                                    </a>
                                                )}
                                            </p>
                                            {/* </form> */}
                                        </form>
                                    </div>
                                    :

                                    <div className="col-sm-6 text-black"
                                        style={{
                                            border: 'solid 0px red',
                                            display: 'flex', justifyContent: 'center', alignItems: 'center',
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
                                                            borderRadius: "10px", boxShadow: '2px 2px 7px grey',
                                                        }}
                                                    />
                                                </div>

                                                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-9 mt-xl-n5"
                                                    style={{
                                                        border: 'solid 1px rgba(0,0,0,0.2)', width: 'fit-content', backgroundColor: 'rgba(255,255,255,0.4)',
                                                        borderRadius: '10px', boxShadow: '0px 0px 20px grey'
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

                                                        <h3 className="fw-normal mb-3 pb-2" style={{ letterSpacing: "2px" }}>Verify your account</h3>
                                                        <blockquote>
                                                            - A code has been send to your email .<br />-<b> Enter the code to to verify your account </b>
                                                        </blockquote>
                                                        <center>
                                                            <span style={{ color: 'darkred' }}>
                                                                <CountDown date={Date.now() + countdownTime * 1000} onComplete={handleOnComplete}>
                                                                    <span style={{ color: 'darkred' }}>{minutes}:{seconds.toString().padStart(2, '0')}</span>
                                                                </CountDown>
                                                            </span>
                                                        </center>
                                                        <div className="form-outline mb-4">
                                                            <input
                                                                type="text"
                                                                id="form2Example28"
                                                                className="form-control form-control-lg"
                                                                name="code"
                                                                onChange={e => {
                                                                    setData({ ...data, [code]: e.target.value })
                                                                }} required
                                                                style={{ border: 'solid 1px rgba(0,0,0,0.2)', width: '100%', backgroundColor: 'rgb(250,250,250)' }}
                                                            />

                                                            <label className="form-label" for="form2Example28">
                                                                {
                                                                    data.code == '' ?
                                                                        ' Verification code' : ''
                                                                }
                                                            </label>
                                                        </div>


                                                        <div className="pt-1 mb-4">
                                                            <button
                                                                className="btn btn-info btn-lg btn-block"
                                                                type="button"
                                                                disabled={loading ? true : false}
                                                                onClick={() => {
                                                                    sendConfirmation();
                                                                }}
                                                            >Verify{' '}
                                                                {
                                                                    loading ?
                                                                        <img src={require('../assets/images/loader.gif')} width={'20px'} /> : ''
                                                                }
                                                            </button>
                                                        </div>

                                                        {/* <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p> */}
                                                        <p>
                                                            {countdownTime < 590 ? (
                                                                <a
                                                                    // disabled
                                                                    onClick={() => {
                                                                        sendCode();
                                                                    }} className="link-info">
                                                                    Resend code
                                                                </a>
                                                            ) : (
                                                                <a
                                                                    disabled
                                                                    onClick={() => {
                                                                        // sendCode();
                                                                        // console.log("Send again");
                                                                    }}
                                                                // className="link-info"
                                                                >
                                                                    Resend code
                                                                </a>
                                                            )}
                                                        </p>

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
                                    <div className="col-sm-6 px-0 d-none d-sm-block" style={{ border: 'solid 0px yellow', display: 'flex', textAlign: 'center' }}>
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                                            alt="Login image"
                                            width={500}
                                            height={500}
                                            style={{ borderRadius: '10px', boxShadow: '5px 5px 10px grey', backgroundColor: 'rgba(0,0,0,0.15)', width: '500px', height: '500px' }}
                                        />
                                    </div>
                            }

                        </div>
                    </div>
                </section>
            </div >
        </React.Fragment>
    )
}

export default EmailVerification