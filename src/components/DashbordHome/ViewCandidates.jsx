
import React, { useState } from "react"
import {
    MDBBtn, MDBCard,
    MDBCardBody, MDBCardFooter, MDBCardText,
    MDBCardTitle, MDBCol, MDBModal, MDBModalBody,
    MDBModalContent, MDBModalDialog, MDBModalFooter,
    MDBModalHeader, MDBModalTitle, MDBRow
} from "mdb-react-ui-kit"
import img1 from "../../assets/image/1.jpg"
import img2 from "../../assets/image/2.jpg"
import img3 from "../../assets/image/3.jpg"
import img4 from "../../assets/image/4.jpg"
import img5 from "../../assets/image/5.jpg"
import img6 from "../../assets/image/6.jpg"
import img7 from "../../assets/image/7.jpg"
import img8 from "../../assets/image/8.jpg"
import img9 from "../../assets/image/9.jpg"
import { Link, useLoaderData, useNavigate } from "react-router-dom"
const item = [
    {
        title: "Install Wigs",
        description: "This is the DECS title  mjaksjs askjs xnjjan xjsaj jashsjsajsa snjahsja sjadjhjdshalk bjsasjhcjhjas jbjk ahjhja shajk saghasgaks cjaj bsagjasa c ahsajkkjas bkajskasjk bsabkdsa",
        catagory: 'Men',
        image: [img1],
        prix: 320,
    },
    {
        title: "Boho Braids",
        description: "This is the DECS title 1 mjaksjs askjs xnjjan xjsaj jashsjsajsa snjahsja sjadjhjdshalk bjsasjhcjhjas jbjk ahjhja shajk saghasgaks cjaj bsagjasa c ahsajkkjas bkajskasjk bsabkdsa",
        catagory: 'Men',
        image: [img2],
        prix: 220,
    },
    {
        title: "Knotless Braids",
        description: "This is the DECS title 2 mjaksjs askjs xnjjan xjsaj jashsjsajsa snjahsja sjadjhjdshalk bjsasjhcjhjas jbjk ahjhja shajk saghasgaks cjaj bsagjasa c ahsajkkjas bkajskasjk bsabkdsa",
        catagory: 'Men',
        image: [img3],
        prix: 200,
    },
    {
        title: "Cornrows",
        description: "This is the DECS title 3 mjaksjs askjs xnjjan xjsaj jashsjsajsa snjahsja sjadjhjdshalk bjsasjhcjhjas jbjk ahjhja shajk saghasgaks cjaj bsagjasa c ahsajkkjas bkajskasjk bsabkdsa",
        catagory: 'Men',
        image: [img4],
        prix: 120,
    },
    {
        title: "Box Braids",
        description: "This is the DECS title 4 mjaksjs askjs xnjjan xjsaj jashsjsajsa snjahsja sjadjhjdshalk bjsasjhcjhjas jbjk ahjhja shajk saghasgaks cjaj bsagjasa c ahsajkkjas bkajskasjk bsabkdsa",
        catagory: 'Men',
        image: [img5],
        prix: 180,
    },
    {
        title: "Two Strands twist",
        description: "This is the DECS title 5",
        catagory: 'Women',
        image: [img6],
        prix: 85,
    },
    {
        title: "Crochet braids",
        description: "This is the DECS title 6",
        catagory: 'Women',
        image: [img7],
        prix: 160,
    },
    {
        title: "Passion braids",
        description: "This is the DECS title 6",
        catagory: 'Women',
        image: [img8],
        prix: 160,
    },
    {
        title: "Twist",
        description: "This is the DECS title 6",
        catagory: 'Women',
        image: [img9],
        prix: 160,
    }
]

export default function ViewCandidates() {
    const navigate = useNavigate()
    const candidatesData = useLoaderData()
    console.log("candidatesData", candidatesData);
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
        const votes = async () => {
            setError('')
            setSuccess('')
            setRespond('')
            setLoading(true)
            if (data.payment === '' || data.candidate === '' || data.election === '' || data.phone === '' || data.confirm === false) {
                setRespond("fill all the form")
                setLoading(false)
                return
            } else {
                try {
                    await fetch(`${process.env.REACT_APP_API_URL}/voter/votes`, {
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
                            phone: data.phone,
                            confirm: data.confirm,
                        })
                    })
                        .then(res => res.json())
                        .then(respond => {
                            console.log(respond)
                            if (respond.status) {
                                setSuccess(respond.message)
                                setLoading(false)
                                setBasicModal(false)
                            } else if (respond.statusError) {
                                setRespond(respond.message)
                                setLoading(false)
                            } else if (respond.statusCon) {
                                setError(respond.message)
                                setLoading(false)
                            } else if (respond.login) {
                                setRespond(respond.message)
                                setTimeout(() => {
                                    navigate('/', { replace: true })
                                }, 1500);
                            }

                        })
                        .catch(err => {
                            console.log(err)
                            setLoading(false)
                            setError('internet problem')
                        })
                } catch (e) {
                    console.log("err", e)
                    setError('Verify your internet connection')
                    // setLoading(false)
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
                                        success != '' ? <span style={{ color: 'green' }}>{success}</span> : ''
                                    }
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <i className="fas fa-credit-card">Select a payment method</i>
                                        <select
                                            id="design"
                                            name="payment"
                                            onChange={e => handleChange(e)}
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
                                    </MDBCol>
                                    <MDBCol>
                                        <i className="fas fa-volume-control-phone">Phone Number</i>
                                        <input type="text" placeholder='Phone' name="phone" onChange={e => handleChange(e)} required />
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
                                        <MDBBtn color='secondary'>
                                            Close
                                        </MDBBtn>
                                        <MDBBtn aria-readonly
                                         style={{ backgroundColor: 'goldenrod' }}
                                        >SUBMIT</MDBBtn>
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
                <MDBCard className='h-100'>
                    <center>
                        <div className='bg-image hover-overlay'
                            style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "50%",
                            }}>
                            <img
                                className=' pink-circular-fill2'
                                src='https://mdbootstrap.com/img/new/standard/city/062.webp'
                                // src={design.image[0]}
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
                                >VOTE</MDBBtn>
                            </div>
                        </div>
                        <MDBCardBody style={{ height: "200px" }}>
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
                        navigate("/dashboard/home/")
                    }}
                >
                    Less..<i className='fas fa-long-arrow-up'></i>
                </MDBBtn>
            </div>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>

                {candidatesData.candidates.map((items, i) => (
                    <MDBCol key={i}>
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
        throw Error('Could not find that getting voter.')
    }
    // console.log("res.json()",res.json());
    return res.json()
}
