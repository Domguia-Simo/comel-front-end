import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Result() {
    const navigate = useNavigate()
    const [PieData, setPieData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Elections of Votes',
                data: [1,1,1,1],
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
    // const [students, setStudents] = useState(rawStudents)

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
        // fetchData()
    }, [filter, classe])
    // async function fetchData() {
    //     setLoading(true)

    //     await fetch('http://comel-back-end.vercel.app/api/voter/getVoterByClass', {
    //         method: 'post',
    //         headers: {
    //             'content-type': 'application/json',
    //             'accept': 'application/json',
    //             'access-control-origin': '*'
    //         },
    //         body: JSON.stringify({
    //             classes: classe
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data)
    //             setStudents(data.voters)
    //             setLoading(false)

    //         })
    //         .catch(err => {
    //             console.log(err)
    //             setLoading(false)
    //         })
    // }

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

    // useMemo(() => {
    //     let newStudents = students.map(student => {
    //         if (student.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
    //             student.display = true
    //         } else {
    //             student.display = false
    //         }
    //         return student
    //     })
    //     setStudents(newStudents)
    // }, [filter, classe])

    // const getElectionResult = async () => {
        
    //     await fetch('http://comel-back-end.vercel.app/api/election/result/659b1e70d7a408d0cba7d535', {
    //         method: 'get',
    //         headers: {
    //             'content-type': 'application/json',
    //             'accept': 'application/json',
    //             'access-control-origin': '*'
    //         },
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             let labels = []
    //             let pieData = []
    //             let voted = 0
    //             let i = 0
    //             data.candidates.map((item, index) => {
    //                 labels.push(item.name)
    //                 pieData[index] = data.voters.filter(opt => opt.votes.candidate === item._id).length
    //                 voted += pieData[index]
    //                 i++
    //             })
    //             labels.push("not voted")
    //             pieData[i] = data.voters.length - voted
    //             console.log("labels", labels);
    //             console.log("voted", voted);
    //             console.log("pieData", pieData);

    //             PieData.datasets.data = pieData
    //             PieData.labels = labels
    //             setPieData({
    //                 labels: labels,
    //                 datasets: [
    //                     {
    //                         label: 'Elections of Votes',
    //                         data: pieData,
    //                         backgroundColor: [
    //                             'rgba(255, 99, 132, 0.2)',
    //                             'rgba(54, 162, 235, 0.2)',
    //                             'rgba(255, 206, 86, 0.2)',
    //                             'rgba(75, 192, 192, 0.2)',
    //                             'rgba(153, 102, 255, 0.2)',
    //                             'rgba(255, 159, 64, 0.2)',
    //                         ],
    //                         borderColor: [
    //                             'rgba(255, 99, 132, 1)',
    //                             'rgba(54, 162, 235, 1)',
    //                             'rgba(255, 206, 86, 1)',
    //                             'rgba(75, 192, 192, 1)',
    //                             'rgba(153, 102, 255, 1)',
    //                             'rgba(255, 159, 64, 1)',
    //                         ],
    //                         borderWidth: 1,
    //                     },
    //                 ],
    //             });
    //             // setStudents(data.voters)
    //             setTimeout(() => {
    //                 setLoadingResult(false);                    
    //             }, 1000);
    //             // setLoading(false)

    //         })
    //         .catch(err => {
    //             console.log(err)
    //             // setLoading(false)
    //             setLoadingResult(false)
    //         })
    // }
    return (
        <div>
            <center>
                <>
                    {loadingResult ? (
                        <></>
                        // <img src={require('../assets/images/loader.gif')} width='200px' alt="loader" />
                    ) : (
                        <div style={{ height: "500px" }}>
                            <h1>{PieData.datasets.data}</h1>
                            <Pie data={PieData} />;
                        </div>
                    )}
                </>
            </center>
        </div>
    )
}

export default Result
