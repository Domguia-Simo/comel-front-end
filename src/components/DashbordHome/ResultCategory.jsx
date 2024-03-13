import { MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom'

export default function ResultCategory() {
    const election = useLoaderData()
    const navigate = useNavigate()
    const [loading, setLoading] = useState([])
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
    //                 navigate("/result/" + item._id)
    //                 // window.location.pathname = "/dashboard/result/" + item._id
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
                to={`/result/${item._id}#detailasjkadjgasdhas`}
                onClick={() => {
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
                            // height: "10%",
                            // height: "fit-content",
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


