import { MDBRipple } from 'mdb-react-ui-kit'
import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'


const Dashboard = () => {
    const navigate = useNavigate()
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
                                    <NavLink to="/" >HOME</NavLink>
                                    &nbsp;&nbsp;
                                    <NavLink to="design">DESIGNS</NavLink>
                                    &nbsp;&nbsp;
                                </span>
                                <span>
                                </span>
                            </>
                            {/* )} */}
                        </>
                    </div>
                    <div>
                        <div>
                            <select id="design"
                                // onChange={(e) => {
                                //     if (e.target.value.toLocaleLowerCase() === 'all') {
                                //         setDesign(item)
                                //     } else {
                                //         let val = item.filter(opt => opt.catagory.toLocaleLowerCase() === e.target.value.toLocaleLowerCase())
                                //         setDesign(val)
                                //     }
                                // }}
                            >
                                <option key="all">ALL</option>
                                <option key="women">Women</option>
                                <option key="men">Men</option>
                            </select>
                            <label htmlFor='design'> category </label>
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