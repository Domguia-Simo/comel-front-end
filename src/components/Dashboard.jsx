import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBRipple, MDBRow } from 'mdb-react-ui-kit'
import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation, Link, useLoaderData } from 'react-router-dom'
import logo from '../assets/images/logo.jpeg';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const user = useLoaderData();
    const [hideMenu, setHideMenu] = useState(false)
    const [userInfo, setUserInfo] = useState(useLocation().state)
    const [basicModal, setBasicModal] = React.useState(false)
    const toggleOpen = () => setBasicModal(!basicModal);
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

    // console.log(location.pathname.split('/')[2])

    // console.log("userInfo", user);
    const Logout = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(async data => {
                await localStorage.setItem("token", '')
                await localStorage.clear()
                window.location.reload()
                window.location.pathname = "/"
                // navigate("/");

            })
            .catch(err => {
            })
    }

    // if (user.isLogin) {
    return (
        <React.Fragment>
            <div>
                <div
                    style={{
                        width: "95%",
                        margin: "0 auto",

                    }}>

                    <div className='header'
                        style={{
                            padding: '5px 30px',
                            height: '50px',
                            color: 'black',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <span></span>
                        <MDBRipple rippleTag='div' className='bg-image hover-overlay hover-zoom hover-shadow' style={{ display: 'none' }}>
                            <img
                                src={logo}
                                width={"60px"}
                                height={"60px"}
                                style={{
                                    // borderRadius: "50%",
                                }}
                            />
                            {/* <a href='' onClick={() => {
                                    navigate('/dashboard/home')
                                }} > */}
                            <div className='mask'
                                style={{
                                    backgroundColor: 'rgba(32, 29, 1, 0.495)'
                                    // backgroundColor: 'rgba(236, 205, 29, 0.5)' 
                                }}
                            >
                            </div>
                            {/* </a> */}
                        </MDBRipple>
                        <>
                            <div style={{ display: 'flex', columnGap: '25px', alignItems: 'center' }}>
                                <NavLink to="/home" style={{ color: location.pathname.split('/')[2] == 'home' ? 'blue' : 'black', border: 'solid 1px grey', padding: '5px 10px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.2)' }}>HOME</NavLink>
                                <NavLink to="/result" style={{ color: location.pathname.split('/')[2] == 'result' ? 'blue' : 'black', border: 'solid 1px grey', padding: '5px 10px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.2)' }}>RESULT</NavLink>
                                {user.isLogin ? (<>
                                    <a
                                        style={{ border: 'solid 1px grey', padding: '5px 10px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.2)' }}
                                        onClick={() => {
                                            setBasicModal(true)
                                        }}
                                    ><i className='fas fa-sign-out'></i></a>
                                </>) : (<></>)}
                                <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
                                    <MDBModalDialog>
                                        <MDBModalContent>
                                            <MDBModalBody>
                                                <MDBRow>
                                                    <MDBRow>
                                                        <h3>Do you want to logout?</h3>
                                                    </MDBRow>
                                                </MDBRow>
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <MDBBtn color='secondary' onClick={toggleOpen}>
                                                    No
                                                </MDBBtn>
                                                <MDBBtn
                                                    color='warning'
                                                    onClick={() => {
                                                        Logout()
                                                    }}>Yes</MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModalContent>
                                    </MDBModalDialog>
                                </MDBModal>
                            </div>
                            <span>
                            </span>
                        </>
                    </div>

                    {/* Admin Options */}
                    <div>
                        {user.isAdmin ? (
                            <div
                                onMouseEnter={() => { setHideMenu(true) }}
                                onMouseLeave={() => { setHideMenu(false) }}
                                className="fixed-action-btn"
                                data-mdb-button-init data-mdb-ripple-init
                            >
                                <a
                                    className="btn btn-floating text-white btn-lg-4"
                                    data-mdb-ripple-init

                                    style={{ backgroundColor: "#f44336" }}
                                >
                                    <i className="fas fa-pencil-alt"></i>
                                </a>
                                {hideMenu ? (
                                    <>
                                        <Link to="/elections" className="btn text-white btn-floating btn-lg" style={{ margin: "30px 0", backgroundColor: "#f44336" }}>
                                            <i className="fas fa-star"></i>
                                        </Link>
                                        <Link to="/candidates" className="btn text-white btn-floating btn-lg" data-mdb-ripple-init style={{ margin: "10px 0", backgroundColor: "#fdd835" }}>
                                            <i className="fas fa-user"></i>
                                        </Link>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>

                </div>
                <Outlet />
            </div>
        </React.Fragment>
    )
    // } else {
    //     window.location.pathname = '/'
    // }
}

export default Dashboard