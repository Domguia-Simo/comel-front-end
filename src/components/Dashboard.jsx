import { MDBRipple } from 'mdb-react-ui-kit'
import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation, Link } from 'react-router-dom'


const Dashboard = () => {
    const navigate = useNavigate()
    const [hideMenu, setHideMenu] = useState(false)
    const [userInfo, setUserInfo] = useState(useLocation().state)
    // console.log("userInfo", userInfo);
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
                                </span>
                                <span>
                                </span>
                            </>
                            {/* )} */}
                        </>
                    </div>
                    <div>
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
                        {/* <Outlet /> */}
                    </div>
                </div>
                <Outlet />
            </div>
        </React.Fragment>
    )
}

export default Dashboard