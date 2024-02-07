import { MDBBtn, MDBRow } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'

export default function ResultCategory() {
    const election = useLoaderData()
    const navigate = useNavigate()
    const [loading, setLoading] = useState([])
    // console.log(election);
    let electionList = election.election.map((item, i) => (
        <MDBRow
            key={item._id}
            value={item._id}
            style={{
                minHeight: "50px",
                // backgroundColor: "pink",
                width: "100%",
                margin: "20px 0",
                textAlign: "center",
                fontWeight: "bolder",
            }}

        >
            <a
                // href='#detailasjkadjgasdhas'
                onClick={() => {
                    // console.log(item);
                    let load = [];
                    load = loading.map((value) => false);
                    load[i] = true;
                    setLoading(load);
                    navigate("/dashboard/result/" + item._id)
                    // window.location.pathname = "/dashboard/result/" + item._id
                }}
            >
                <h6>{item.title}</h6>
                <MDBBtn color="warning"

                >
                    More..<i className='fas fa-long-arrow-down'></i>
                </MDBBtn>
            </a>
            {loading[i] ? (
                <Outlet />
            ) : (<></>)}
        </MDBRow>
    ))
    return (
        <div>
            <center>
                <div>
                    {electionList}
                </div>
            </center>
            {/* <Outlet /> */}
        </div>
    )
}


