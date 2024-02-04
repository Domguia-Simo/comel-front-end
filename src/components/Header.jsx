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
            <div style={{overflow:'hidden'}}>
                <div style={{
                    minHeight: "600px",
                    height:'100%',width:'100%',
                    position:'absolute',overflow:'hidden',
                    // background: "repeating-linear-gradient(-214deg,rgba(19, 13, 13, 0.284),rgba(19, 13, 13, 0.284) 1px, transparent 10px, transparent 13px)",
                    background : 'linear-gradient( 270deg, rgba(0,0,0,0.5)   ,rgba(255,160,0,0.5) )'
                }}>
                    <div
                        style={{
                            minHeight: "650px",
                            width: "95%",
                            margin: "0 auto",

                        }}>
                        <div>
                            <Outlet />
                        </div>
                    </div>

                    <div
                        style={{
                            background: "rgba(152, 145, 99,0.3)",
                            fontSize:'large',
                            width: "100%",
                            position:'absolute',bottom:'0',
                            display:'flex' ,justifyContent:'center',
                            padding:'5px',fontSize:'small'
                            // margin: "0 auto",
                        }}>
                        <div style={{display:'flex' ,columnGap:'10px' ,alignItems:'center'}}>
                            <span>Created by:</span>
                            <span  style={{fontWeight:'800'}}>Kamsong Anderson & D.S.U.</span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header