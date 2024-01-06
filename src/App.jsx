import React from 'react'
import { Route ,Routes ,BrowserRouter as Router } from 'react-router-dom'

import LandingPage from './components/LandingPage'
import EmailVerification from './components/EmailVerification'
import VotingForm from './components/VotingForm'
import Login from './components/Login'

import './assets/fontawesome/css/all.css'

const App=()=>{
    return(
            <Router>

            <Routes>
                <Route Component={LandingPage}  path={'/'}/>
                <Route Component={VotingForm}  path={'/voting-form'}/>
                <Route Component={EmailVerification}  path={'/email-verification'}/>
                <Route Component={Login} path={'/login'}/>
            </Routes>

            </Router>
    )
}

export default App