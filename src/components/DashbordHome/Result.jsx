import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { MDBBtn } from 'mdb-react-ui-kit';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Result() {
    const navigate = useNavigate()
    const data = useLoaderData();
    // console.log(data)
    return (
        <div
            id="detailasjkadjgasdhas"
            style={{ marginTop: "20px" }}>
            <div style={{
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <MDBBtn color="warning"
                    onClick={() => {
                        navigate("/result/")
                    }}
                >
                    Less..<i className='fas fa-long-arrow-up'></i>
                </MDBBtn>
            </div>
            <center>
                <center style={{ border: 'solid 1px green', width: '100%', height: '400px' }}>
                    <div style={{ height: "400px", marginTop: "0px" }}>
                        <Pie data={data.PieData} />
                    </div>
                </center>
            </center>
        </div>
    )
}
export const getElectionResult = async ({ params }) => {
    let { id } = params
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
                if (item.candidate) {
                    if (voted[item.candidate]) {
                        voted[item.candidate]++
                    } else {
                        voted[item.candidate] = 1
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
            // labels.push("not voted")
            // pieData[i] = notVoted
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
                                'rgba(234, 13, 13, 0.2)',
                                'rgba(23, 113, 13, 0.2)',
                                'rgba(234, 213, 13, 0.2)',
                                'rgba(234, 103, 113, 0.2)',
                                'rgba(234, 83, 13, 0.2)',
                                'rgba(34, 13, 213, 0.2)',
                                'rgba(78, 93, 13, 0.2)',
                                'rgba(34, 123, 113, 0.2)',
                                'rgba(134, 145, 103, 0.2)',
                                'rgba(22, 245, 3, 0.2)',
                                'rgba(64, 49, 193, 0.2)',
                                'rgba(156, 3, 153, 0.2)',
                                'rgba(187, 113, 213, 0.2)',
                                'rgba(214, 213, 313, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(234, 13, 13, 1)',
                                'rgba(23, 113, 13, 1)',
                                'rgba(234, 213, 13, 1)',
                                'rgba(234, 103, 113, 1)',
                                'rgba(234, 83, 13, 1)',
                                'rgba(34, 13, 213, 1)',
                                'rgba(78, 93, 13, 1)',
                                'rgba(34, 123, 113, 1)',
                                'rgba(134, 145, 103, 1)',
                                'rgba(22, 245, 3, 1)',
                                'rgba(64, 49, 193, 1)',
                                'rgba(156, 3, 153, 1)',
                                'rgba(187, 113, 213, 1)',
                                'rgba(214, 213, 313, 1)',
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
                                'rgba(234, 13, 13, 0.2)',
                                'rgba(23, 113, 13, 0.2)',
                                'rgba(234, 213, 13, 0.2)',
                                'rgba(234, 103, 113, 0.2)',
                                'rgba(234, 83, 13, 0.2)',
                                'rgba(34, 13, 213, 0.2)',
                                'rgba(78, 93, 13, 0.2)',
                                'rgba(34, 123, 113, 0.2)',
                                'rgba(134, 145, 103, 0.2)',
                                'rgba(22, 245, 3, 0.2)',
                                'rgba(64, 49, 193, 0.2)',
                                'rgba(156, 3, 153, 0.2)',
                                'rgba(187, 113, 213, 0.2)',
                                'rgba(214, 213, 313, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(234, 13, 13, 1)',
                                'rgba(23, 113, 13, 1)',
                                'rgba(234, 213, 13, 1)',
                                'rgba(234, 103, 113, 1)',
                                'rgba(234, 83, 13, 1)',
                                'rgba(34, 13, 213, 1)',
                                'rgba(78, 93, 13, 1)',
                                'rgba(34, 123, 113, 1)',
                                'rgba(134, 145, 103, 1)',
                                'rgba(22, 245, 3, 1)',
                                'rgba(64, 49, 193, 1)',
                                'rgba(156, 3, 153, 1)',
                                'rgba(187, 113, 213, 1)',
                                'rgba(214, 213, 313, 1)',
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