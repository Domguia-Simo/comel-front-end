
import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const classes = [
    {
        level: "One",
        list: ["B1A", "B1B", "B1C", "L1A", "L1B", 'L1C',
            'L1D', 'L1E', 'L1F', 'L1G', 'L1H', 'L1I', 'L1J', 'L1K',]
    },
    {
        level: "Two",
        list: ["B2A", "B2B", 'L2A', 'L2B', 'L2C', 'L2D', 'L2E', 'L2F', 'L2G', 'L2H']
    },
    {
        level: "Three",
        list: ['SE3', 'SR3', 'GL1', 'GL2', 'GL3']
    }
]
const levels = ["One", "Two", "Three"]

const rawStudents = [
    {
        name: 'Rashford',
        voted: false,
    },
    {
        name: 'Cristiano Rolnaldo',
        voted: true,
    },
    {
        name: 'Harry Kane',
        voted: true,
    },

    {
        name: 'Garnacho',
        voted: false,
    },
    {
        name: 'Mbappe',
        voted: true,
    },
    {
        name: 'Halland',
        voted: true,
    }
]

export default function Views() {
    const navigate = useNavigate()
    const [level, setLevel] = useState('One')
    const [classe, setClasse] = useState('ba1a')
    const [filter, setFilter] = useState('')
    const [students, setStudents] = useState(rawStudents)
    const [loading, setLoading] = useState(false)

    // useLayoutEffect(() => {
    //     async function verify() {
    //         if (await localStorage.getItem('token') == null) {
    //             navigate('/login')
    //             window.location.pathname = 'login'
    //         }
    //     }
    //     verify()
    // }, [0])
    let currentLevel
    switch (level) {
        case "One":
            currentLevel = 1
            break;
        case "Two":
            currentLevel = 2
            break;
        case "Three":
            currentLevel = 3
            break;
    }

    
    function handleLevelChange(e) {

        setLevel(e.target.value)
        switch (e.target.value) {
            case "One":
                setClasse('ba1a')
                break;
            case "Two":
                setClasse('ba2a')
                break;
            case "Three":
                setClasse('se3')
                break;
        }
    }

    let displayClasses = classes[currentLevel - 1].list.map(classe => {
        return (
            <option key={classe}>{classe}</option>
        )
    })

    let displayLevel = levels.map(level => {
        return (
            <option key={level}>{level}</option>
        )
    })

    // let displayStudents = students.map((student, index) => {
    //     let state
    //     if (student.status == 'VOTED') {
    //         state = 'true'
    //     } else {
    //         state = 'false'
    //     }
    //     return (
    //         <tr key={index} style={{ display: student.display ? '' : 'none' }}>
    //             <td style={{ padding: '5px' }}>{student.name}</td>
    //             <td style={{ color: student.status == 'VOTED' ? 'green' : 'red', padding: '5px' }}>{state}</td>
    //         </tr>
    //     )
    // })

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px', marginLeft: '10px' }}>
                <div style={{ display: 'flex', columnGap: '20px' }}>
                    <div>
                        <select value={level} id="level" onChange={(e) => handleLevelChange(e)} style={{ padding: '5px 10px' }}>
                            {displayLevel}
                        </select>
                        <label htmlFor='level'> level</label>
                    </div>

                    <div>
                        <select value={classe} id="class"
                            onChange={(e) => {
                                setClasse(e.target.value)
                                let url = '/dashboard/view/'+ e.target.value 
                                navigate(url);
                            }
                            } style={{ padding: '5px 10px' }}>
                            {displayClasses}
                        </select>
                        <label htmlFor='class'> class</label>
                    </div>

                </div>

                

            </div>
            <Outlet />

        </div>
    )
}

