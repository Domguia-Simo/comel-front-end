import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Link, useLoaderData } from "react-router-dom"

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Result() {
    const data = useLoaderData();
    console.log(data)
    return (
        <div>
            <center>
                <div style={{ height: "500px", marginTop: "50px" }}>
                    <Pie data={data.PieData} />
                </div>
            </center>
        </div>
    )
}
export const getElectionResult = async ({params}) => {
    let {id }=params 
    let response = await fetch(`${process.env.REACT_APP_API_URL}/election/result/${id}`, {
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

        });
    return response;
}