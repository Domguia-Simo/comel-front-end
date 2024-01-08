import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from './Header'
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

// const rawMenu = ["View Students" , ""] 


const Dashboard = () => {
    const navigate = useNavigate()
    const [PieData, setPieData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Elections of Votes',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    })
    const [level, setLevel] = useState('One')
    const [classe, setClasse] = useState('ba1a')
    const [filter, setFilter] = useState('')
    const [students, setStudents] = useState(rawStudents)

    const [selectedMenu, setSelectedMenu] = useState('view')

    const [loadingResult, setLoadingResult] = useState(false)
    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        async function verify() {
            if (await localStorage.getItem('token') == null) {
                navigate('/login')
                window.location.pathname = 'login'
            }
        }
        verify()
    }, [0])

    useEffect(() => {
        fetchData()
    }, [filter, classe])
    async function fetchData() {
        setLoading(true)

        await fetch('http://localhost:5000/api/voter/getVoterByClass', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'access-control-origin': '*'
            },
            body: JSON.stringify({
                classes: classe
            })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setStudents(data.voters)
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

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

    useMemo(() => {
        let newStudents = students.map(student => {
            if (student.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
                student.display = true
            } else {
                student.display = false
            }
            return student
        })
        setStudents(newStudents)
    }, [filter, classe])

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

    let displayStudents = students.map((student, index) => {
        let state
        if (student.status == 'VOTED') {
            state = 'true'
        } else {
            state = 'false'
        }
        return (
            <tr key={index} style={{ display: student.display ? '' : 'none' }}>
                <td style={{ padding: '5px' }}>{student.name}</td>
                <td style={{ color: student.status == 'VOTED' ? 'green' : 'red', padding: '5px' }}>{state}</td>
            </tr>
        )
    })

    if (selectedMenu == 'view') {
        return (
            <React.Fragment>
                <div>
                    <Header />
                    <div style={{
                        border: 'solid 1px rgba(0,0,0,0.2)',
                        display: 'flex',
                        // justifyContent:'space-around',
                        backgroundColor: 'rgba(0,0,0,0.2)'
                    }}>
                        <span
                            onClick={() => setSelectedMenu('view')}
                            style={{
                                color: selectedMenu == 'view' ? 'green' : '',
                                padding: '10px', fontWeight: 'bold', border: 'solid 1px grey', flex: '1', textAlign: 'center'
                            }}> View Students </span>
                        <span
                            onClick={() => setSelectedMenu('create')}
                            style={{
                                color: selectedMenu == 'create' ? 'green' : '',
                                padding: '10px', fontWeight: 'bold', border: 'solid 1px grey', flex: '1', textAlign: 'center'
                            }}>Vote</span>
                        <span
                            onClick={() => {
                                setSelectedMenu('result')
                            }}
                            style={{
                                color: selectedMenu == 'result' ? 'green' : '',
                                padding: '10px', fontWeight: 'bold', border: 'solid 1px grey', flex: '1', textAlign: 'center'
                            }}>Results</span>
                    </div>
                    <br />

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
                                    <select value={classe} id="class" onChange={(e) => setClasse(e.target.value)} style={{ padding: '5px 10px' }}>
                                        {displayClasses}
                                    </select>
                                    <label htmlFor='class'> class</label>
                                </div>

                            </div>

                            <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder='Enter student name'
                                style={{ width: '200px', padding: '10px 20px', borderRadius: '5px', border: 'solid 1px rgba(0,0,0,0.2)' }}
                            />

                        </div>
                        <h2 style={{ marginLeft: ' 10px' }}>Lists of students in <b style={{ color: 'blue' }}>{classe}</b></h2>
                        <center>
                            {
                                loading ?
                                    <img src={require('../assets/images/loader.gif')} width='40px' alt="loader" />
                                    :
                                    <table border='1' style={{ borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ padding: '5px' }}>Name</th>
                                                <th style={{ padding: '5px' }}>Voted</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {displayStudents}
                                        </tbody>
                                    </table>

                            }
                        </center>
                    </div>

                </div>
            </React.Fragment>
        )
    }
    if (selectedMenu == 'create') {
        return (
            <React.Fragment>
                <div>
                    <Header />
                    <div style={{
                        border: 'solid 1px rgba(0,0,0,0.2)',
                        display: 'flex',
                        // justifyContent:'space-around',
                        backgroundColor: 'rgba(0,0,0,0.2)'
                    }}>
                        <span
                            onClick={() => setSelectedMenu('view')}
                            style={{
                                color: selectedMenu == 'view' ? 'green' : '',
                                padding: '10px', fontWeight: 'bold', border: 'solid 1px grey', flex: '1', textAlign: 'center'
                            }}> View Students </span>
                        <span
                            onClick={() => setSelectedMenu('create')}
                            style={{
                                color: selectedMenu == 'create' ? 'green' : '',
                                padding: '10px', fontWeight: 'bold', border: 'solid 1px grey', flex: '1', textAlign: 'center'
                            }}>Vote</span>
                        <span
                            onClick={() => {
                                setSelectedMenu('result')
                            }
                            }
                            style={{
                                color: selectedMenu == 'result' ? 'green' : '',
                                padding: '10px', fontWeight: 'bold', border: 'solid 1px grey', flex: '1', textAlign: 'center'
                            }}>Results</span>
                    </div>
                    <br />
                    Form for the admin to vote a student

                </div>
            </React.Fragment>
        )
    }
    const getElectionResult = async () => {
        // setLoadingResult(true)
        await fetch('http://localhost:5000/api/election/result/659b1e70d7a408d0cba7d535', {
            method: 'get',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'access-control-origin': '*'
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let labels = []
                let pieData = []
                let voted = 0
                let i = 0
                data.candidates.map((item, index) => {
                    labels.push(item.name)
                    pieData[index] = data.voters.filter(opt => opt.votes.candidate === item._id).length
                    voted += pieData[index]
                    i++
                })
                labels.push("not voted")
                pieData[i] = data.voters.length - voted
                console.log("labels", labels);
                console.log("voted", voted);
                console.log("pieData", pieData);

                PieData.labels = labels
                PieData.datasets.data = pieData
                setPieData(PieData);
                // setStudents(data.voters)
                setLoadingResult(false)
                // setLoading(false)

            })
            .catch(err => {
                console.log(err)
                // setLoading(false)
                setLoadingResult(false)
            })
    }
    if (selectedMenu == 'result') {
        getElectionResult()
        return (
            <React.Fragment>
                <div>
                    <Header />
                    <div style={{
                        border: 'solid 1px rgba(0,0,0,0.2)',
                        display: 'flex',
                        // justifyContent:'space-around',
                        backgroundColor: 'rgba(0,0,0,0.2)'
                    }}>
                        <span
                            onClick={() => setSelectedMenu('view')}
                            style={{
                                color: selectedMenu == 'view' ? 'green' : '',
                                padding: '10px', fontWeight: 'bold', border: 'solid 1px grey', flex: '1', textAlign: 'center'
                            }}> View Students </span>
                        <span
                            onClick={() => setSelectedMenu('create')}
                            style={{
                                color: selectedMenu == 'create' ? 'green' : '',
                                padding: '10px', fontWeight: 'bold', border: 'solid 1px grey', flex: '1', textAlign: 'center'
                            }}>Vote</span>
                        <span
                            onClick={() => {
                                console.log("PieData", PieData)
                                setSelectedMenu('result')
                            }}
                            style={{
                                color: selectedMenu == 'result' ? 'green' : '',
                                padding: '10px', fontWeight: 'bold', border: 'solid 1px grey', flex: '1', textAlign: 'center'
                            }}>Results</span>
                    </div>
                    <br />
                    <center>
                        <>
                            {/* {loadingResult ? (
                                <img src={require('../assets/images/loader.gif')} width='200px' alt="loader" />
                            ) : ( */}
                                <div style={{ height: "500px" }}>
                                    <Pie data={PieData} />;
                                </div>
                            {/* )} */}
                        </>
                    </center>
                </div>
            </React.Fragment>
        )
    }
}

export default Dashboard