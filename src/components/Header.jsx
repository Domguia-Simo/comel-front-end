import React, { useState, useMemo } from 'react'
import { useLocation, useLoaderData, useNavigate, Link, Outlet } from 'react-router-dom'

const Header = () => {

    let location = useLocation()
    const navigate = useNavigate()
    const User = useLoaderData()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [hide, setHide] = useState(false)
    console.log("Userheader", User);
    useMemo(() => {
        if (location.pathname === '/login' || location.pathname === '/dashboard') {
            setHide(true)
        }
    }, [useLocation()])
    const Logout = async () => {
        await fetch('https://comel-back-end.vercel.app/api/logout', {
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-conteol-origin': '*',
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
            <div style={{
                padding: '5px 30px',
                // backgroundColor:'rgb(180, 205, 107 ,1)' ,
                backgroundColor: 'rgb(50, 50, 50 ,0.7)',
                height: '50px',
                color: 'whitesmoke',
                fontWeight: 'bold',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/">
                        <img
                            style={{
                                borderRadius: '10px',
                                width: '50px',
                                height: '40px',
                                marginRight: '5px'
                            }}
                            src={require('../assets/images/logo.jpeg')} alt="logo"
                        />
                    </Link>
                    IAI COMEL
                </span>
                <>
                    {User.isLogin ? (
                        <>
                            <span 
                            // style={{ border: 'solid 1px ', borderRadius: '10px', cursor: 'pointer', padding: '5px 7px' }}
                            >
                                <span
                                    style={{ cursor: 'pointer', padding: '5px 7px' }}
                                    onClick={() => navigate("/dashboard/view/B1A")}
                                >
                                    {User.name}
                                    {/* <i className='far fa-user'></i> */}
                                    &nbsp;&nbsp;
                                    {/* <i className='far fa-user'></i> */}
                                </span>
                                <span
                                    style={{ border: 'solid 1px ', borderRadius: '10px', cursor: 'pointer', padding: '5px 7px' }}
                                    onClick={() => { Logout() }}
                                >
                                    logout
                                    <i className='fas fa-door-open'></i>
                                </span>
                            </span>
                        </>
                    ) : (
                        <>
                            {hide ? '' :
                                <span style={{ border: 'solid 1px ', borderRadius: '10px', cursor: 'pointer', padding: '5px 7px' }}
                                    onClick={() => navigate("/login")}
                                >
                                    Admin <i className='far fa-user'></i>
                                </span>
                            }
                        </>
                    )}
                </>
            </div>
            <Outlet />
        </React.Fragment>
    )
}

export default Header