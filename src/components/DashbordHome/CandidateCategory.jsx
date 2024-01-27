import React from 'react'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'

export default function CandidateCategory() {
    const election = useLoaderData()
    const navigate = useNavigate()
    console.log(election);
    let electionList = election.election.map((item) => (
        <option value={item._id}>{item.title}</option>
    ))
    return (
        <div>
            <center>
                <div>
                    <select id="design"
                        onChange={(e) => {
                            navigate("/dashboard/home/" + e.target.value)
                            // window.location.pathname = "/dashboard/home/" + e.target.value
                        }}
                        style={{
                            height: "40px",
                            width: "fit-content",
                            maxWidth: "150px"
                        }}
                    >
                        <option value=''>Choice an option</option>
                        {electionList}
                    </select>
                </div>
            </center>
            <Outlet />
        </div>
    )
}


