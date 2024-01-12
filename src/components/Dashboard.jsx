import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'


const Dashboard = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(useLocation().state)
    // console.log("userInfo", userInfo);
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