import React ,{useState ,useEffect, useLayoutEffect} from 'react'
import {useNavigate ,useLocation } from 'react-router-dom'

import Header from './Header'

// styling
import '../assets/styles/global.css'

const classes = [
    {
        level:"One",
        list:["ba1a" ,"ba1b" ,"ba1c" ,"l1a" ,"l1b" ,'l1c','l1d','l1e','l1f','l1g','l1h','l1i','l1j','l1k',]
    },
    {
        level:"Two",
        list:[ "ba2a" ,"ba2b" ,'l2a','l2b','l2c','l2d','l2e','l2f','l2g','l2h']
    },
    {
        level:"Three",
        list:[ 'se3','sr3','gl1','gl2','gl3']
    }
]
const levels = ["One" ,"Two" ,"Three"]

const VotingForm=()=>{

    const navigate = useNavigate()

        const [data ,setData] = useState({
            name:'',
            email:'',
            class:'ba1a',
            confirm:false
        })
        const [voted ,setVoted] = useState(useLocation().state)
        const [error ,setError] = useState('')
        const [loading ,setLoading] = useState(false)
        const [level ,setLevel] = useState("One")
        const [position ,setPosition] = useState({longitude:'' ,latitude:''})

        function handleChange(e){
            // return
            if(e.target.type == 'text' || e.target.type == 'email'){
                setData({...data ,[e.target.name]:e.target.value})
            }else{
                setData({...data ,[e.target.name]:!data.confirm})
            }
        }

        async function findLocation(){
            await window.navigator.geolocation.getCurrentPosition(async(point) => {
                if(point.coords){
                    setPosition({
                        longitude:point.coords.longitude,
                        latitude:point.coords.latitude
                    })
                }

            // comparing with the location of the school

                try{
                    setLoading(true)
                    let respond = await fetch('http://localhost:5000/api/voter/votes' ,{
                        method:'post',
                        headers:{
                            'content-type':'application/json',
                            'accept':'application/json',
                            'access-control-origin':'*'
                        },
                        body:JSON.stringify({
                            name:data.name,
                            email:data.email,
                            classe:data.class,
                            candidate:voted.name
                        })
                    })
                    let res = await respond.json()
                    console.log(res)
    
                    setLoading(false)

                    if(res.status){
                        navigate("/email-verification")
                    }else{
                        setError(res.message)
                    }
    
                    return
    
                }
                catch(e){
                    console.log(e)
                    setError('Verify your internet connection')
                    setLoading(false)
                }


            }
            ,
            error => {
                if(error.code == error.PERMISSION_DENIED){
                    setError(<div>You MUST enable your location to vote <br/> settings - privacy - location</div>)
                }
                if(error.code == error.POSITION_UNAVAILABLE){
                    setError('Sorry but your device does not support geolocation, use another device to vote')
                }
            }
            )
        }

        async function sendInfo(){
            setError('')
            if(data.name === '' || data.email === '' || data.class === '' || data.confirm === false){
                return
            }

             await findLocation()

        }

        let currentLevel
        switch(level){
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
        let displayClasses = classes[currentLevel-1].list.map(classe => {
            return(
                <option key={classe}>{classe}</option>
            )
        })

        let displayLevel = levels.map(level => {
            return(
                <option key={level}>{level}</option>
            )
        })

    return(
        <React.Fragment>
            <div  className='body'>
                <Header/>
                <form onSubmit={(e)=>e.preventDefault()}>

                    <div
                        style={{
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center',
                            rowGap:'5px',
                            fontWeight:'bold',
                            letterSpacing:1
                        }}
                    >
                        <img src={require('../assets/images/logo.jpeg')} alt="logo" title='iai logo'
                        className='iai-logo'
                        />
                        IAI COMEL
                    </div>

                    <div>
                        {error ? 
                            <center style={{color:'darkred'}}>
                                {error} &nbsp;
                                {/* <i className='fas fa-wifi' style={{textDecoration:'line-through' ,color:'darkred'}}></i> */}
                            </center>
                         :''}
                    </div>

                    <blockquote>
                        Please you will need to <b>authorise location</b>
                    </blockquote>

                    <input type="text" placeholder='Name' value={data.name} name="name" onChange={e=>handleChange(e)} required/>
                    <input type="email" placeholder='Email' value={data.email} name="email" onChange={e=>handleChange(e)} required/>
                    
                    <div style={{display:'flex' ,justifyContent:'space-between' ,alignItems:'center' ,columnGap:'20px'}}>
                        <div>
                            <select id="level" value={level} onChange={(e)=>setLevel(e.target.value)}>
                                {displayLevel}
                            </select>
                            <label htmlFor='level'> level </label>
                        </div>

                        <div> 
                            <select id="class" value={data.class} name="class" onChange={(e)=>setData({...data ,class:e.target.value})}> 
                                {displayClasses}
                            </select>
                            <label htmlFor='class'> class </label>
                        </div>
                    </div>
                    {/* <input type="text" placeholder='Class' value={data.class} name="class" onChange={e=>handleChange(e)} required/> */}

                    <div>
                        <input type="checkbox" value={data.confirm} id="confirm" name='confirm' onChange={e=>handleChange(e)} required/>
                        <label htmlFor='confirm' style={{textAlign:'center'}}>
                            <span>I Agree and confirm my vote for</span> <br/> 
                            <center><b> Mr. {voted.name} </b></center>
                        </label>
                    </div>

                    <button onClick={()=>sendInfo()} className='submit'>
                        Vote 
                        {
                            loading ? <img src={require('../assets/images/loader.gif')} width={'30px'} alt="loader"/>:''
                        }
                    </button>

                </form>

            </div>
        </React.Fragment>
    )
}

export default VotingForm