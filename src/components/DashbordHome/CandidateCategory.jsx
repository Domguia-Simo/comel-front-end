import { MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import React, { useState } from 'react'
import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom'

export default function CandidateCategory() {
    const election = useLoaderData()
    const navigate = useNavigate()
    const [loading, setLoading] = useState([])
    const [loader, setLoader] = useState(false)
    // console.log(election);


    // let electionList = election.election.map((item, i) => (
    //     <MDBRow
    //         key={item._id}
    //         value={item._id}
    //         style={{
    //             minHeight: "50px",
    //             // backgroundColor: "pink",
    //             width: "100%",
    //             margin: "20px 0",
    //             textAlign: "center",
    //             fontWeight: "bolder",
    //         }}

    //     >
    //         <a
    //             // href='#detailasjkadjgasdhas'
    //             onClick={() => {
    //                 // console.log(item);
    //                 let load = [];
    //                 load = loading.map((value) => false);
    //                 load[i] = true;
    //                 setLoading(load);
    //                 navigate("/home/" + item._id)
    //                 // fetchVoter(item._id)
    //                 // window.location.pathname = "/dashboard/home/" + item._id
    //             }}
    //         >
    //             <h6>{item.title}</h6>
    //             <MDBBtn color="warning"

    //             >
    //                 More..<i className='fas fa-long-arrow-down'></i>
    //             </MDBBtn>
    //         </a>
    //         {loading[i] ? (
    //             <Outlet />
    //         ) : (<></>)}
    //     </MDBRow>

    // ))
    let electionList = election.election.map((item, i) => (
        <MDBCol
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
            <NavLink
                className='headerLinkCategory'
                to={`/home/${item._id}`}
                onClick={() => {
                    // console.log(item);
                    let load = [];
                    load = loading.map((value) => false);
                    load[i] = true;
                    setLoading(load);
                }}
            >
                <h6>{item.title}</h6>
            </NavLink>
        </MDBCol>

    ))
    return (
        <div>
            <center>
                <MDBRow>
                    <div
                        style={{
                            width: "95%",
                            position: "fixed",
                            // height: "5%",
                            left: "2.5%",
                            top: "5%",
                            zIndex: 6,
                            // background: 'linear-gradient( 270deg, rgba(0,0,0,0.6) ,rgba(17, 221, 20, 0.5 )'
                        }}>
                        <MDBRow>
                            {electionList}
                        </MDBRow>
                    </div>
                    <Outlet />
                </MDBRow>
            </center>
        </div>
    )
}

export const homeLoader = async () => {

    const res = await fetch(`${process.env.REACT_APP_API_URL}/election/getElections`, {
        headers: {
            'content-type': 'application/json',
            'accept': 'applicaion/json',
            'access-control-origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    // console.log(res);
    if (!res.ok) {
        throw Error('An error occur while get resources please check you connection and try again')
    }
    return res.json()
}
