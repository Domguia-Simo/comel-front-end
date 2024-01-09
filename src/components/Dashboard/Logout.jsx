import React from 'react'
import { useNavigate} from 'react-router-dom'

function Logout() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
        localStorage.setItem("token", '')
        
        fetch('http://comel-back-end.vercel.app/logout', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-conteol-origin': '*'
            },
            body: JSON.stringify({
                token: token
            })
        })
            .then(res => res.json())
            .then(data => {
            })
            .catch(err => {
            })
        navigate("/");
}

export default Logout
