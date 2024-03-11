import React, { useEffect, useState } from 'react'
import { useNavigate, useLoaderData } from 'react-router-dom'
import Header from './Header'

// Styling
import '../assets/styles/landingStyles.css'
// import { getElectionResult } from './Dashboard/Result'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const raw_candiidates = [
    {
        picture: require('../assets/images/damso.png'),
        name: 'Paul',
        description: 'I Paul, i promise that if i become the president i will respect all what i said'
    },
    {
        picture: require('../assets/images/jac.jfif'),
        name: 'John',
        description: 'I John, i promise that if i become the president i will respect all what i said'
    },
    // {
    //     picture:require('../assets/images/mali.jpg'),
    //     name:'Peter',
    //     description:'I Peter, i promise that if i become the president i will respect all what i said '
    // },
]
let pic = [require('../assets/images/test1.jpg'),
require('../assets/images/test2.jpg'),
require('../assets/images/mali.jpg')
]

export default function LandingPage() {
    const navigate = useNavigate()
    const candidatesData = useLoaderData()
    // console.log("candidatesData", candidatesData.candidates);
    const [candidates, setCandidates] = useState(candidatesData.candidates)
    const [elections, setElections] = useState(candidatesData.elections)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        PieData: {
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
        },
        message: 'Election not yet end'
    })

    function sendToForm(candidate) {
        navigate(`voting-form`, { state: candidate })
    }

    let displayCandidate
    displayCandidate = candidates.map((candidate, index) => {

        let description
        if (candidate.desc.length > 120) {
            description = candidate.desc.split(0, 130) + '...'
        } else { description = candidate.desc }

        return (
            <div key={candidate._id} className='candidate-container'>
                <img src={pic[index]} alt={candidate.name} title={candidate.name} className='candidate-picture' />

                <div className='candidate-content'>
                    <span className='candidate-name'> {candidate.name}</span>

                    <span className='candidate-description'>
                        {description}
                    </span>

                    <span
                        className='vote-button'
                        onClick={() => sendToForm(candidate)}
                    >
                        Vote <i className='fas fa-vote-yea'></i>
                    </span>

                </div>
            </div>
        )
    })
    useEffect(() => {
        getElectionResult(elections._id)
    }, [0])

    const getElectionResult = async (id) => {
        setLoading(true)
        let response = await fetch('https://comel-back-end.vercel.app/api/election/result/' + id, {
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                let labels = []
                let pieData = []
                let voted = {}
                let notVoted = 0
                let i = 0

                // pieData[index] = data.voters.filter(opt => opt.votes.candidate === item._id).length
                // voted += pieData[index]
                // i++
                data.voters.map((item) => {
                    if (item.status === "NOT VOTED") {
                        notVoted++;
                    } else {
                        if (item.votes.candidate) {
                            if (voted[item.votes.candidate]) {
                                voted[item.votes.candidate]++
                            } else {
                                voted[item.votes.candidate] = 1
                            }
                        }
                    }
                })
                data.candidates.map((item, index) => {
                    labels.push(item.name)
                    if (voted[item._id]) {
                        pieData[index] = voted[item._id];
                    }
                    i++
                })
                labels.push("not voted")
                pieData[i] = notVoted
                // console.log("labels", labels);
                // console.log("voted", voted);
                // console.log("pieData", pieData);

                return {
                    PieData: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Elections of Votes',
                                data: pieData,
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
                    },
                    message: data.message
                }
            })
            .catch(err => {
                // console.log(err)
                let labels = []
                let pieData = []
                return {
                    PieData: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Elections of Votes',
                                data: pieData,
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
                    },
                    message: 'Election not yet end'
                }

            })
        setData(response)
        setLoading(false)
    }
    if (elections) {
        if (elections.status === 'END') {
            return (
                <div>
                    <center>
                        <>
                            {loading ? (
                                <>
                                    <img src={require('../assets/images/loader.gif')} width={'100px'} alt="loader" />
                                </>
                            ) : (
                                <React.Fragment>
                                    <div className='body'>
                                        <div style={{ height: "500px", marginTop: "50px" }}>
                                            <Pie data={data.PieData} />
                                        </div>
                                    </div>

                                </React.Fragment>
                            )}
                        </>
                    </center>
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <div className='body'>
                        {/* <Header/> */}

                        <div className="main-container">
                            {displayCandidate}
                        </div>
                        <br />
                    </div>

                </React.Fragment>
            )
        }
    } else {
        return (
            <React.Fragment>
                <div className='body'>
                    {/* <Header/> */}

                    <div className="main-container">
                        {displayCandidate}
                    </div>
                    <br />
                </div>

            </React.Fragment>
        )
    }
}

export const landingPageLoader = async ({ params }) => {
    // const { classes } = params
    const res = await fetch(`${process.env.REACT_APP_API_URL}/candidate/getCandidates`)

    if (!res.ok) {
        throw Error('Could not find that getting voter.')
    }
    // console.log("res.json()",res.json());
    return res.json()
}