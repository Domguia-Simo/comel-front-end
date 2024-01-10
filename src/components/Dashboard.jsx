import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);




const Dashboard = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(useLocation().state)
    console.log("userInfo", userInfo);
    const logOut = () => {
        const token = localStorage.getItem("token");
        localStorage.setItem("token", '')
        
        fetch('https://comel-back-end.vercel.app/logout', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-conteol-origin': '*'
            },
            body: JSON.stringify({
                token: token
            })
        })
            .then(res => res.json())
            .then(data => {
            })
            .catch(err => {
            })
        navigate("/");
    }
    return (
        <React.Fragment>
            <div>
                <header>
                    <nav>
                        {/* <h1>{userInfo ? userInfo.name : ''}</h1> */}
                        <NavLink to="view/B1A">View</NavLink>
                        <NavLink to="/">Vote</NavLink>
                        <NavLink to="elections">Election</NavLink>
                        <NavLink to="candidates">Candidate</NavLink>
                    </nav>
                </header>
                <br />
                <Outlet />
            </div>
        </React.Fragment>
    )
}

export default Dashboard