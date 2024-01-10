import React from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'

import LandingPage, { landingPageLoader } from './components/LandingPage'
import EmailVerification from './components/EmailVerification'
import VotingForm from './components/VotingForm'
import Login, { loginLoader } from './components/Login'
import Views from './components/Dashboard/view'

import './assets/fontawesome/css/all.css'
import Header from './components/Header'
import Create, { electionsLoader } from './components/Dashboard/Create'
import Result, { getElectionResult } from './components/Dashboard/Result'
import Dashboard from './components/Dashboard'
import ViewDetail, { viewDetailLoader, ViewsDetialError } from './components/Dashboard/ViewDetail'
import Elections from './components/Dashboard/Create'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Header />}>
            <Route
                index
                element={<LandingPage />}
                loader={landingPageLoader}
            />
            <Route path="voting-form" element={<VotingForm />} />
            <Route path="email-verification" element={<EmailVerification />} />
            <Route
                path="login"
                element={<Login />}
                loader={loginLoader}
            />
            <Route path="dashboard" element={<Dashboard />} >
                <Route path="view" element={<Views />} >
                    <Route
                        path=":classes"
                        element={<ViewDetail />}
                        loader={viewDetailLoader}
                        errorElement={<ViewsDetialError />}
                    />
                </Route>
                <Route
                    path="elections"
                    element={<Elections />}
                    loader={electionsLoader}
                    errorElement={<ViewsDetialError />}
                />
                <Route
                    path="result/:id"
                    element={<Result />}
                    loader={getElectionResult} />
                <Route path="logout" element={<h1>LogOut</h1>} />
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