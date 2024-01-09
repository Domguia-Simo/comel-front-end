import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);




const Dashboard = () => {
    return (
        <React.Fragment>
            <div>
                <header>
                    <nav>
                        <NavLink to="view/B1A">View</NavLink>
                        <NavLink to="/">Vote</NavLink>
                        <NavLink to="result">Result</NavLink>
                    </nav>
                </header>
                <br />
                <Outlet />
            </div>
        </React.Fragment>
    )
}

export default Dashboard