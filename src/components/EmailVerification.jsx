import React,{useState } from 'react'
import { useNavigate,useLocation} from 'react-router-dom'

import Header from './Header'

// Styling
import '../assets/styles/global.css'

const EmailVerification=()=>{

    const navigate = useNavigate()
    const [loading ,setLoading] = useState(false)
    const [code ,setCode] = useState(null)
    const [error ,setError] = useState('')
    const [userInfo ,setUserInfo] = useState(useLocation().state)
    const [success ,setSuccess] = useState('')
    const [respond ,setRespond] = useState('')


    async function sendConfirmation(){
        // console.log(code)
        if(code == null){
            return
        }
        setError('')
        setRespond('')
        setLoading(true)
        try{
            fetch('http://comel-back-end.vercel.app/api/voter/validateVotes' ,{
                method:'post',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'access-control-origin':'*'
                },
                body:JSON.stringify({
                    name:userInfo.name ,
                    email:userInfo.email,
                    classe:userInfo.classe,
                    code:code
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.status){
                    setSuccess('Vote Registered successfully')
                    setTimeout(()=>{
                        navigate('/')
                    },2500)
                }else{
                    setRespond(data.message)
                }
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
                setError('Verify your internet connection')
                setLoading(false)
            })
        }
        catch(e){
            console.log(e)
            setError('Verify your internet connection')
            setLoading(false)
        }
    }

    return(
        <React.Fragment>
            <div  className='body'>
                {/* <Header/> */}
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
                        {error != '' ? 
                            <span style={{color:'darkred'}}>
                                {error} &nbsp;
                                <i className='fas fa-wifi' style={{textDecoration:'line-through' ,color:'darkred'}}></i>
                            </span>
                         :''}
                         {
                            respond != '' ? <span style={{color:'darkred'}}>{respond}</span>:''
                         }
                         {
                            success != '' ? <span style={{color:'green'}}>{success}</span>:''
                         }
                    </div>

                    <blockquote>
                        - A code has been send to your email .<br/>-<b> Enter the code to register your vote </b>
                    </blockquote>
                    <input type="text" placeholder=' Verification code' value={code} name="code" onChange={e=>setCode(e.target.value)} required/>
                    
                    <button onClick={()=>sendConfirmation()} className='submit'>
                        Confirm 
                        {
                            loading ? <img src={require('../assets/images/loader.gif')} width={'30px'} alt="loader"/>:''
                        }
                    </button>

                </form>

            </div>
        </React.Fragment>
    )
}

export default EmailVerification