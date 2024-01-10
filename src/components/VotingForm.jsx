import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Header from './Header'

// styling
import '../assets/styles/global.css'

const classes = [
    {
        level: "One",
        list: ["B1A", "B1B", "B1C", "L1A", "L1B", 'L1C',
            'L1D', 'L1E', 'L1F', 'L1G', 'L1H', 'L1I', 'L1J', 'L1K',]
    },
    {
        level: "Two",
        list: ["B2A", "B2B", 'L2A', 'L2B', 'L2C', 'L2D', 'L2E', 'L2F', 'L2G', 'L2H']
    },
    {
        level: "Three",
        list: ['SE3', 'SR3', 'GL1', 'GL2', 'GL3']
    }
]
const levels = ["One", "Two", "Three"]

const VotingForm = () => {

    const navigate = useNavigate()
    const [success, setSuccess] = useState('')

    const [data, setData] = useState({
        name: '',
        email: '',
        class: 'B1A',
        confirm: false
    })
    const [voted, setVoted] = useState(useLocation().state)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [level, setLevel] = useState("One")
    const [position, setPosition] = useState(null)
    // const [position1, setPosition1] = useState(null);
    // useEffect(() => {
    //     const watchId = navigator.geolocation.watchPosition(
    //       (position) => setPosition(position),
    //       (error) => console.error('Error:', error),
    //       {
    //         enableHighAccuracy: true, // Adjust as needed
    //         timeout: 1000, // Adjust as needed
    //         maximumAge: 0, // Accept only fresh location data
    //       }
    //     );
    
    //     return () => navigator.geolocation.clearWatch(watchId); // Clean up on unmount
    //   }, []);
    function handleChange(e) {
        if (e.target.type == 'text' || e.target.type == 'email') {
            setData({ ...data, [e.target.name]: e.target.value })
        } else {
            setData({ ...data, [e.target.name]: !data.confirm })
        }
    }
    const votes = async () => {
        setLoading(true)
        try {
            let lat = 0.00 , long = 0.00
            if (position) {
                if (position.coords) {
                    lat = position.coords.latitude
                    long = position.coords.longitude
                }
            }
            console.log(position);
            let respond = await fetch('http://localhost:5000/api/voter/votes', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'applicaion/json',
                    'access-conteol-origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem('token')||''}`
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    classe: data.class,
                    candidate: voted._id,
                    position: {
                        latitude: lat,
                        longitude: long
                    }
                })
            })
            console.log("res", respond)
            let res = await respond.json()
            console.log("res", res)

            setLoading(false)

            if (res.status) {
                setSuccess(res.message)
                setTimeout(() => {
                    navigate("/email-verification", { replace: true, state: { name: data.name, email: data.email, classe: data.class } })
                }, 2500)
            } else if (res.statusAdmin) {
                setSuccess(res.message)
                setTimeout(() => {
                    navigate("/", { replace: true })
                }, 2500)
            } else if (res.statusLogin) {
                setError(res.message)
                setTimeout(() => {
                    navigate("/login", { replace: true })
                }, 2500)
            } else {
                setError(res.message)
            }

            return

        }
        catch (e) {
            console.log("err", e)
            setError('Verify your internet connection')
            setLoading(false)
        }
    }

    async function sendInfo() {
        setError('')
        setSuccess('')
        if (data.name === '' || data.email === '' || data.class === '' || data.confirm === false) {
            setLoading(false)
            return
        }
        votes();
    }

    let currentLevel
    switch (level) {
        case "One":
            currentLevel = 1
            break;
        case "Two":
            currentLevel = 2
            break;
        case "Three":
            currentLevel = 3
            break;
    }
    let displayClasses = classes[currentLevel - 1].list.map(classe => {
        return (
            <option key={classe}>{classe}</option>
        )
    })

    let displayLevel = levels.map(level => {
        return (
            <option key={level}>{level}</option>
        )
    })

    return (
        <React.Fragment>
            <div className='body'>
                {/* <Header/> */}
                <form onSubmit={(e) => e.preventDefault()}>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            rowGap: '5px',
                            fontWeight: 'bold',
                            letterSpacing: 1
                        }}
                    >
                        <img src={require('../assets/images/logo.jpeg')} alt="logo" title='iai logo'
                            className='iai-logo'
                        />
                        IAI COMEL
                    </div>

                    <div>
                        {error ?
                            <center style={{ color: 'darkred' }}>
                                {error} &nbsp;
                                {/* <i className='fas fa-wifi' style={{textDecoration:'line-through' ,color:'darkred'}}></i> */}
                            </center>
                            : ''}
                        {
                            success != '' ? <span style={{ color: 'green' }}>{success}</span> : ''
                        }
                    </div>

                    {/* <blockquote>
                        Please you will need to <b>authorise location</b>
                    </blockquote> */}

                    <input type="text" placeholder='Name' value={data.name} name="name" onChange={e => handleChange(e)} required />
                    <input type="email" placeholder='Email' value={data.email} name="email" onChange={e => handleChange(e)} required />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', columnGap: '20px' }}>
                        <div>
                            <select id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                                {displayLevel}
                            </select>
                            <label htmlFor='level'> level </label>
                        </div>

                        <div>
                            <select id="class" value={data.class} name="class" onChange={(e) => setData({ ...data, class: e.target.value })}>
                                {displayClasses}
                            </select>
                            <label htmlFor='class'> class </label>
                        </div>
                    </div>
                    {/* <input type="text" placeholder='Class' value={data.class} name="class" onChange={e=>handleChange(e)} required/> */}

                    <div>
                        <input type="checkbox" value={data.confirm} id="confirm" name='confirm' onChange={e => handleChange(e)} required />
                        <label htmlFor='confirm' style={{ textAlign: 'center' }}>
                            <span>I Agree and confirm my vote for</span> <br />
                            <center><b> Mr. {voted.name} </b></center>
                        </label>
                    </div>
                    {
                        loading ? (
                            <button readOnly className='submit'>
                                Vote
                                <img src={require('../assets/images/loader.gif')} width={'30px'} alt="loader" />
                            </button>
                        ) : (
                            <button onClick={() => sendInfo()} className='submit'>
                                Vote
                            </button>
                        )
                    }

                </form>

            </div>
        </React.Fragment>
    )
}

export default VotingForm