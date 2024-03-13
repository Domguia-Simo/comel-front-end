import { MDBRipple } from 'mdb-react-ui-kit'
import React, { useState, useMemo, useEffect } from 'react'
import { useLocation, useLoaderData, useNavigate, Link, Outlet, NavLink } from 'react-router-dom'

const Header = () => {

    let location = useLocation()
    // const navigate = useNavigate()
    // const User = useLoaderData()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleChange = () => {
        setScreenWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleChange);
        return () => {
            window.removeEventListener('resize', handleChange);
        };
    }, [])
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [hide, setHide] = useState(false)
    // console.log("Userheader", User);
    useMemo(() => {
        if (location.pathname === '/login' || location.pathname === '/dashboard') {
            setHide(true)
        }
    }, [useLocation()])
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
            .then(data => {
                localStorage.setItem("token", '')
                localStorage.clear()
                window.location.pathname = "/"
                // navigate("/");

            })
            .catch(err => {
            })
    }
    return (
        <React.Fragment>
            <div id='appContainer'>
                <div style={{
                    // minHeight: "600px",
                    minHeight: "97%",
                    width: '100%',
                    overflow: "",
                    background: 'linear-gradient( 270deg, rgba(0,0,0,0.6) ,rgba(17, 221, 20, 0.5 )'
                }}>
                    {/* <div
                        style={{
                            minHeight: "650px",
                            width: "95%",
                            margin: "0 auto",

                        }}>
                        <div> */}
                    <Outlet />
                    {/* </div>
                    </div> */}
                </div>
                <div
                    style={{
                        background: "rgba(152, 145, 99,0.3)",
                        fontSize: 'large',
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '5px',
                        fontSize: 'small'
                    }}>
                    <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                        <span>Created by:</span>
                        <span style={{ fontWeight: '800' }}>K.A & D.S.U.</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header