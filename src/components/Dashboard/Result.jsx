import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { Outlet, useNavigate, useLoaderData } from 'react-router-dom'


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Result() {
    const { PieData, message } = useLoaderData();
    if (message === 'Election not yet end') {
        return(
            <h1>{message}</h1>
        )
    } else {
        return (
            <div>
                <center>
                    <>
                        <div style={{ height: "500px" }}>
                            <h1>{PieData.datasets.data}</h1>
                            <Pie data={PieData} />
                        </div>
                    </>
                </center>
            </div>
        )
    }
}

export const getElectionResult = async ({ params }) => {
    const { id } = params
    let response = await fetch('https://comel-back-end.vercel.app/api/election/result/'+id, {
        headers: {
            'content-type': 'application/json',
            'accept': 'applicaion/json',
            'access-control-origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
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
            console.log(err)

        })
    return response
}

