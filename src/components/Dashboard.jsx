import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBRipple, MDBRow } from 'mdb-react-ui-kit'
import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation, Link, useLoaderData } from 'react-router-dom'


const Dashboard = () => {
    const navigate = useNavigate();
    const user = useLoaderData();
    const [hideMenu, setHideMenu] = useState(false)
    const [userInfo, setUserInfo] = useState(useLocation().state)
    const [basicModal, setBasicModal] = React.useState(false)
    const toggleOpen = () => setBasicModal(!basicModal);

    console.log("userInfo", user);
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
    if (user.isLogin) {
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

                            <MDBRipple rippleTag='div' className='bg-image hover-overlay hover-zoom hover-shadow'>
                                <img
                                    // src={logo}
                                    width={"50px"}
                                    height={"50px"}
                                    style={{
                                        // borderRadius: "50%",
                                    }}
                                />
                                <a href='#!' onClick={() => {
                                    navigate('/')
                                }} >
                                    <div className='mask'
                                        style={{
                                            backgroundColor: 'rgba(32, 29, 1, 0.495)'
                                            // backgroundColor: 'rgba(236, 205, 29, 0.5)' 
                                        }}
                                    >
                                    </div>
                                </a>
                            </MDBRipple>
                            <>
                                <>
                                    <span>
                                        <NavLink to="/dashboard/home" >HOME</NavLink>
                                        &nbsp;&nbsp;
                                        <NavLink to="/dashboard/result">RESULT</NavLink>
                                        &nbsp;&nbsp;
                                        <a
                                            className='fas fa-sign-out'
                                            onClick={() => {
                                                setBasicModal(true)
                                            }}
                                        ></a>
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
                                    </span>
                                    <span>
                                    </span>
                                </>
                            </>
                        </div>
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
                                            <Link to="/dashboard/elections" className="btn text-white btn-floating btn-lg" style={{ margin: "30px 0", backgroundColor: "#f44336" }}>
                                                <i className="fas fa-star"></i>
                                            </Link>
                                            <Link to="/dashboard/candidates" className="btn text-white btn-floating btn-lg" data-mdb-ripple-init style={{ margin: "10px 0", backgroundColor: "#fdd835" }}>
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
    } else {
        window.location.pathname = '/'
    }
}

export default Dashboard