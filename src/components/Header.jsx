import React from 'react'
import {useLocation ,useNavigate } from 'react-router-dom'

const Header=()=>{

    const navigate = useNavigate()

    return( 
        <React.Fragment>
            <div style={{
                padding:'5px 30px' ,
                // backgroundColor:'rgb(180, 205, 107 ,1)' ,
                backgroundColor:'rgb(50, 50, 50 ,0.7)' ,
                height:'50px',
                color:'whitesmoke' ,
                fontWeight:'bold' ,
                letterSpacing:'1px',
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'
                }}>
               <span style={{display:'flex' ,alignItems:'center'}}>
                    <img
                        style={{
                            borderRadius:'10px',
                            width:'50px',
                            height:'40px',
                            marginRight:'5px'
                        }} 
                        src={require('../assets/images/logo.jpeg')} alt="logo"
                    />
                    IAI COMEL
                </span>
               <span style={{ border:'solid 1px ',borderRadius:'10px', cursor:'pointer' ,padding:'5px 7px'}}
                    onClick={()=>navigate("login")}
                >
                    Admin <i className='far fa-user'></i>
               </span>
            </div>
        </React.Fragment>
    )
}

export default Header