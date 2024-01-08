import React from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'

import LandingPage from './components/LandingPage'
import EmailVerification from './components/EmailVerification'
import VotingForm from './components/VotingForm'
import Login from './components/Login'
import Views from './components/Dashboard/view'

import './assets/fontawesome/css/all.css'
import Header from './components/Header'
import Create from './components/Dashboard/Create'
import Result, { getElectionResult } from './components/Dashboard/Result'
import Dashboard from './components/Dashboard'
import ViewDetail, { CareersViewsDetial, viewDetailLoader } from './components/Dashboard/ViewDetail'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Header />}>
            <Route index element={<LandingPage />} />
            <Route path="voting-form" element={<VotingForm />} />
            <Route path="email-verification" element={<EmailVerification />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} >
                <Route path="view" element={<Views />} >
                    <Route
                        path=":classes"
                        element={<ViewDetail />}
                        loader={viewDetailLoader}
                        errorElement={<CareersViewsDetial />}
                    />
                </Route>
                <Route path="create" element={<Create />} />
                <Route
                    path="result"
                    element={<Result />}
                    loader={getElectionResult} />
            </Route>

            {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
    )
)
const App = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default App