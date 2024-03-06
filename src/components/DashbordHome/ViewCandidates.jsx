
import React, { useEffect, useState } from "react"
import {
    MDBBtn, MDBCard,
    MDBCardBody, MDBCardFooter, MDBCardText,
    MDBCardTitle, MDBCol, MDBModal, MDBModalBody,
    MDBModalContent, MDBModalDialog, MDBModalFooter,
    MDBModalHeader, MDBModalTitle, MDBRow
} from "mdb-react-ui-kit"
import { Link, useLoaderData, useNavigate } from "react-router-dom"


export default function ViewCandidates() {
    const navigate = useNavigate()
    const candidatesData = useLoaderData()
    // console.log("candidatesData", candidatesData);
    function Design({ design, ind }) {
        const [basicModal, setBasicModal] = React.useState(false)
        const [data, setData] = React.useState({
            payment: "MTN",
            candidate: design._id,
            election: design.election,
            phone: '',
            confirm: false,
        })
        const [success, setSuccess] = React.useState('')
        const [respond, setRespond] = React.useState('')
        const [warning, setWarning] = React.useState('')
        const [error, setError] = React.useState('')
        const [loading, setLoading] = React.useState(false)

        const toggleOpen = () => setBasicModal(!basicModal);
        function handleChange(e) {
            if (e.target.type == 'text' || e.target.type == 'email') {
                setData({ ...data, [e.target.name]: e.target.value })
            } else {
                setData({ ...data, [e.target.name]: !data.confirm })
            }
        }
        function checkResponse(id) {
            const attemptPayment = async (transID) => {
                try {
                    let resp = await fetch(`${process.env.REACT_APP_API_URL}/verify/${transID}`, {
                        method: 'put',
                        headers: {
                            'content-type': 'application/json',
                            'accept': 'application/json',
                            'access-control-origin': '*',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            payment: data.payment,
                            candidate: data.candidate,
                            election: data.election,
                            phone: data.phone,
                            confirm: data.confirm,
                        })
                    })
                        .then(res => res.json())
                        .then(respond => {
                            return respond
                        })
                        .catch(err => {
                            return false
                        })
                    return resp
                } catch (e) {
                    setError('Verify your internet connection')
                    return false
                }
            }
            let attempts = 0; // Initialize attempts counter outside the interval
            let maxAttempts = 5; // Set maximum attempts
            const intervalId = setInterval(async () => {
                let payResponse = await attemptPayment(id);
                if (payResponse) {
                    let status = payResponse.status
                    if (status === 'FAILED') {
                        clearInterval(intervalId)
                        setError('')
                        setSuccess('')
                        setRespond('')
                        setWarning('')
                        setRespond(payResponse.reason)
                        setLoading(false)
                        return {
                            message: payResponse.reason,
                        };
                    }
                    if (status === 'SUCCESSFUL') {
                        clearInterval(intervalId)
                        setError('')
                        setSuccess('')
                        setRespond('')
                        setWarning('')
                        setSuccess('Your vote has being accepted')
                        setTimeout(() => {
                            setLoading(false);
                            setBasicModal(false);
                        }, 2000);
                        return {
                            message: "accept successful",
                        };
                    }
                }
                attempts++;
                if (attempts > maxAttempts) {
                    clearInterval(intervalId)
                    setError('')
                    setSuccess('')
                    setRespond('')
                    setWarning('')
                    setLoading(false)
                    setError("timeout")
                    return {
                        message: 'Transaction Failed',
                    };
                }
            }, 15000);
        }
        const votes = async () => {
            setError('')
            setSuccess('')
            setRespond('')
            setWarning('')
            setLoading(true)
            if (data.phone === '') {
                setRespond("Enter a phone number for payment")
                setLoading(false)
                return
            } else if (data.confirm === false) {
                setRespond("Confirm you candidate")
                setLoading(false)
                return
            } else {
                try {
                    await fetch(`${process.env.REACT_APP_API_URL}/payment`, {
                        method: 'post',
                        headers: {
                            'content-type': 'application/json',
                            'accept': 'application/json',
                            'access-control-origin': '*',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            payment: data.payment,
                            candidate: data.candidate,
                            election: data.election,
                            phone: "237" + data.phone,
                            confirm: data.confirm,
                        })
                    })
                        .then(res => res.json())
                        .then(respond => {
                            // console.log(respond)
                            if (respond.statusError) {
                                setRespond(respond.message);
                                setLoading(false);
                            } else if (respond.error_code) {
                                setRespond(respond.message);
                                setLoading(false);
                            } else if (respond.status) {
                                if (respond.status === 'PENDING') {
                                    setWarning("valid transaction on your phone");
                                    checkResponse(respond.reference)
                                } else {
                                    setRespond("Transaction failed please start back")
                                    setLoading(false)
                                }
                            } else {
                                setWarning("operator " + respond.operator + " Press " + respond.ussd_code + " on your phone and valid transaction");
                                checkResponse(respond.reference)
                            }
                        })
                        .catch(err => {
                            // console.log(err)
                            setLoading(false)
                            setError('internet problem')
                        })
                } catch (e) {
                    // console.log("err", e)
                    setError('Verify your internet connection')
                    setLoading(false)
                }
            }
        }
        let shortText
        if (design.desc.length > 100) {
            shortText = design.desc.slice(0, 100) + '...'
        } else {
            shortText = design.desc
        }
        return (
            <MDBCol key={ind}>
                <MDBModal
                    open={basicModal}
                    setOpen={setBasicModal}
                    tabIndex='-1'
                    staticBackdrop
                >
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Voting form</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <MDBRow>
                                    {error ?
                                        <center style={{ color: 'darkred' }}>
                                            {error} &nbsp;
                                            <i className='fas fa-wifi' style={{ textDecoration: 'line-through', color: 'darkred' }}></i>
                                        </center>
                                        : ''}
                                    {
                                        respond != '' ? <span style={{ color: 'darkred' }}>{respond}</span> : ''
                                    }
                                    {
                                        warning != '' ? <span style={{ color: 'goldenrod' }}>{warning}</span> : ''
                                    }
                                    {
                                        success != '' ? <span style={{ color: 'green' }}>{success}</span> : ''
                                    }
                                </MDBRow>
                                <MDBRow>
                                    {/* <MDBCol>
                                        <span>
                                            <i className="fas fa-credit-card"></i>Select a payment method
                                        </span>
                                        <select
                                            id="design"
                                            name="payment"
                                            onChange={e => {
                                                setData({ ...data, ["payment"]: e.target.value })
                                            }}
                                            style={{
                                                border: "solid 1px rgba(0, 0, 0, 0.3)",
                                                color: "black",
                                                margin: "5px",
                                                width: "212px",
                                                padding: "10px 10px",
                                                borderRadius: "10px"
                                            }}
                                        >
                                            <option value='MTN'>MTN Momo</option>
                                            <option value='ORANGE'>Orange Money</option>
                                        </select>
                                    </MDBCol> */}
                                    <MDBCol>
                                        <span>
                                            <i className="fas fa-volume-control-phone"></i>Phone Number
                                        </span>
                                        <input type="text" placeholder='Phone E.g 676132726' name="phone" onChange={e => handleChange(e)} required />
                                    </MDBCol>
                                    <MDBRow>
                                        <div>
                                            <input type="checkbox" value={data.confirm} id="confirm" name='confirm' onChange={e => handleChange(e)} required />
                                            <label htmlFor='confirm' style={{ textAlign: 'center' }}>
                                                <span>I Agree and confirm my vote for</span> <br />
                                                <center><b> {design.name} </b></center>
                                            </label>
                                        </div>
                                    </MDBRow>
                                </MDBRow>
                            </MDBModalBody>
                            <MDBModalFooter>
                                {loading ? (
                                    <>
                                        <MDBBtn color='secondary' disabled={true}>
                                            Close
                                        </MDBBtn>
                                        <MDBBtn aria-readonly
                                            // disabled={loading ? true:false}
                                            style={{ backgroundColor: 'goldenrod' }}
                                        >SUBMIT {loading ? <img src={require('../../assets/images/loader.gif')} width={'20px'} /> : ''}</MDBBtn>
                                    </>
                                ) : (
                                    <>
                                        <MDBBtn color='secondary' onClick={toggleOpen}>
                                            Close
                                        </MDBBtn>
                                        <MDBBtn style={{ backgroundColor: 'goldenrod' }}
                                            onClick={() => {
                                                votes();
                                                // console.log(data);
                                            }}
                                        >SUBMIT</MDBBtn>
                                    </>
                                )}
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
                <MDBCard className='h-100' >
                    <center>
                        <div className='bg-image hover-overlay'
                            style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "50%",
                            }}>
                            <img
                                className=' pink-circular-fill2'
                                // src='https://mdbootstrap.com/img/new/standard/city/062.webp'
                                src={`${process.env.REACT_APP_API_URL}/../images/${design.name}`}
                                alt='...'
                                width={"200px"}
                                height={"200px"}
                            />
                            <div
                                className='mask'
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: 'linear-gradient(45deg, rgba(236, 205, 29, 0.5), rgba(79, 59, 4, 0.5) 100%)',
                                }}
                            >
                                <MDBBtn color="warning"
                                    onClick={() => {
                                        setBasicModal(true)
                                    }}
                                >VOTE </MDBBtn>
                            </div>
                        </div>
                        <MDBCardBody style={{ height: "fit-content", border: 'solid 0px green' }}>
                            <MDBCardTitle>{design.name}</MDBCardTitle>
                            <MDBCardText >
                                {shortText}
                            </MDBCardText>
                        </MDBCardBody>
                        <MDBCardFooter style={{ color: "goldenrod" }}>
                            <MDBBtn color="warning"
                                onClick={() => {
                                    setBasicModal(true)
                                }}
                            >
                                VOTE
                            </MDBBtn>
                        </MDBCardFooter>
                    </center>
                </MDBCard>
            </MDBCol>
        )
    }
    return (
        <div id="detailasjkadjgasdhas"
            style={{ marginTop: "20px" }}>
            <div style={{
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <MDBBtn color="warning"
                    onClick={() => {
                        navigate("/home/")
                    }}
                >
                    Less..<i className='fas fa-long-arrow-up'></i>
                </MDBBtn>
            </div>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>

                {candidatesData.candidates.map((items, i) => (
                    <MDBCol key={i} >
                        <Design design={items} ind={i} />
                    </MDBCol>
                ))}
            </MDBRow>
        </div>
    )
}
export const viewCandidatesLoader = async ({ params }) => {
    const { id } = params
    const res = await fetch(`${process.env.REACT_APP_API_URL}/candidate/getCandidateByElection/${id}`)

    if (!res.ok) {
        throw Error('An error occur while get resources please check you connection and try again')
    }
    return res.json()
}
