
import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const classes = [
    {
        level: "One",
        list: ["ba1a", "ba1b", "ba1c", "l1a", "l1b", 'l1c', 'l1d', 'l1e', 'l1f', 'l1g', 'l1h', 'l1i', 'l1j', 'l1k',]
    },
    {
        level: "Two",
        list: ["B2A", "ba2b", 'l2a', 'l2b', 'l2c', 'l2d', 'l2e', 'l2f', 'l2g', 'l2h']
    },
    {
        level: "Three",
        list: ['se3', 'sr3', 'gl1', 'gl2', 'gl3']
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

