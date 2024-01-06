import React ,{useState ,useEffect, useLayoutEffect} from 'react'
import {useNavigate ,useLocation } from 'react-router-dom'

// styling
import '../assets/styles/global.css'

const VotingForm=()=>{

    const navigate = useNavigate()

        const [data ,setData] = useState({
            name:'',
            email:'',
            class:'',
            confirm:false
        })
        const [voted ,setVoted] = useState(useLocation().state)
        const [error ,setError] = useState('')
        const [loading ,setLoading] = useState(false)

        function handleChange(e){
            console.log(e.target)
            return
            if(e.target.type === 'text' || e.target.type === 'email'){
                setData({...data ,[e.target.name]:e.target.value})
            }else{
                // setData({...data ,[e.target.name]:!e.target.value})
            }
        }

        async function sendInfo(){
            if(data.name === '' || data.email === '' || data.class === '' || data.confirm === false){
                setError("Please fill the entire form")
            }
            try{
                setLoading(true)
                let respond = await fetch('http://localhost:5000' ,{
                    method:'post',
                    headers:{
                        'content-type':'application/json',
                        'accept':'application/json',
                        'access-control-origin':'*'
                    },
                    body:JSON.stringify({
                        name:data.name,
                        email:data.email,
                        class:data.class
                    })
                })
                let data = await respond.json()
                console.log(data)
                setLoading(true)

            }
            catch(e){
                console.log(e)
                setLoading(false)
            }
        }

    return(
        <React.Fragment>
            <div>
                <form onSubmit={(e)=>e.preventDefault()}>

                    <div
                        style={{
                            display:'flex',
                            alignItems:'center',
                            columnGap:'5px'
                        }}
                    >
                        <img src={require('../assets/images/logo.jpeg')} alt="logo" title='iai logo' width={'50px'} height={'50px'} style={{borderRadius:'10px'}}/>
                        IAI COMEL
                    </div>

                    <input type="text" placeholder='Name' value={data.name} name="name" onChange={e=>handleChange(e)} required/>
                    <input type="email" placeholder='Email' value={data.email} name="email" onChange={e=>handleChange(e)} required/>
                    <input type="text" placeholder='Class' value={data.class} name="class" onChange={e=>handleChange(e)} required/>

                    <div>
                        <input type="checkbox" value={data.confirm} id="confirm" name='confirm' onChange={e=>handleChange(e)} required/>
                        <label htmlFor='confirm'>I Agree and confirm my vote</label>
                    </div>

                <input type="submit" value="Vote" onClick={()=>sendInfo()}/>
                </form>

            </div>
        </React.Fragment>
    )
}

export default VotingForm