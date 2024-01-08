import React,{useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import Header from './Header'

// Styling 
import '../assets/styles/global.css'

const Login=()=>{
    const navigate = useNavigate()
    const [email ,setEmail] = useState('')
    const [password ,setPassword] = useState('')
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')
    const [respond ,setRespond] = useState('')

    async function submit(){
        if(email == '' || password == ''){
            return
        }
        setError('')
        setRespond('')
        setLoading(true)

        fetch('http://localhost:5000/api/admin/login',{
            method:'post',
            headers:{
                'content-type':'application/json',
                'accept':'applicaion/json',
                'access-conteol-origin':'*'
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
        .then(res => res.json())
        .then(async(data) => {
            // console.log(data)
            if(data.token){
                await localStorage.setItem('token' ,data.token)
                navigate('/dashboard')
            }else{
                setRespond(data.message)
            }
            setLoading(false)
        })
        .catch(e => {
            console.log(e)
            setError("Verify your internet connection")
            setLoading(false)
        })
    }


    return(
        <React.Fragment>
            <div  className='body2'>
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
                        <span>
                            IAI COMEL ADMIN <i className='far fa-user'></i>
                        </span>
                    </div>

                    <div>
                        {error != '' ? 
                            <span style={{color:'darkred'}}>
                                {error} &nbsp;
                                <i className='fas fa-wifi' style={{textDecoration:'line-through' ,color:'darkred'}}></i>
                            </span>
                         :''}
                         {
                            respond != ''?<span style={{color:'darkred'}}>{respond}</span>:''
                         }
                    </div>

                        <div style={{display:'flex',alignItems:'center' ,columnGap:'5px'}}>
                            <i className='far fa-envelope' style={{color:'rgba(0,0,0,0.5)'}}></i>
                            <input type="email" placeholder='Email' value={email} name="password" onChange={e=>setEmail(e.target.value)} required/>
                        </div>

                        <div style={{display:'flex',alignItems:'center' ,columnGap:'5px'}}>
                            <i className='fas fa-lock' style={{color:'rgba(0,0,0,0.5)'}}></i>
                            <input type="password" placeholder='Password' value={password} name="password" onChange={e=>setPassword(e.target.value)} required/>
                        </div>
                    
                    <button onClick={()=>submit()} className='submit'>
                        Login 
                        {
                            loading ? <img src={require('../assets/images/loader.gif')} width={'30px'} alt="loader"/>:''
                        }
                    </button>

                </form>

            </div>
        </React.Fragment>
    )
}

export default Login