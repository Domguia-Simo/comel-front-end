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
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import Header from './components/Header'
import Create, { electionsLoader } from './components/Dashboard/Create'
// import Result, { getElectionResult } from './components/Dashboard/Result'
import Dashboard from './components/Dashboard'
import ViewDetail, { viewDetailLoader, ViewsDetialError } from './components/Dashboard/ViewDetail'
import Elections from './components/Dashboard/Create'
import Candidates, { candidatesLoader } from './components/Dashboard/Candidate'
import Voting from './components/Voting'
import Register from './components/Register'
import ViewCandidates, { viewCandidatesLoader } from './components/DashbordHome/ViewCandidates'
import Result, { getElectionResult } from './components/DashbordHome/Result'
import CandidateCategory, { homeLoader } from './components/DashbordHome/CandidateCategory'
import ResultCategory from './components/DashbordHome/ResultCategory'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/"
            element={<Header />}
            // loader={loginLoader}
            errorElement={<ViewsDetialError />}
        >
            <Route
                index
                element={<Login />}
            // loader={loginLoader}
            />
            <Route
                path="email-verification"
                element={<EmailVerification />}
            // loader={loginLoader}
            />
            <Route
                path="register"
                element={<Register />}
            // loader={loginLoader}
            />
            <Route
                path="dashboard"
                element={<Dashboard />}
                loader={loginLoader}
            >
                <Route
                    path='home'
                    element={<CandidateCategory />}
                    loader={homeLoader}
                >
                    <Route
                        path=":id"
                        element={<ViewCandidates />}
                        loader={viewCandidatesLoader}
                    />
                </Route>
                <Route
                    path='result'
                    element={<ResultCategory />}
                    loader={homeLoader}
                >
                    <Route
                        path=":id"
                        element={<Result />}
                        loader={getElectionResult}
                    />
                </Route>
                <Route
                    path="elections"
                    element={<Elections />}
                    loader={electionsLoader}
                    errorElement={<ViewsDetialError />}
                />
                <Route
                    path="candidates"
                    element={<Candidates />}
                    loader={candidatesLoader}
                    errorElement={<ViewsDetialError />}
                />
            </Route>

            <Route element={<h1>Not Found</h1>} />
            {/* <Route
                path="*"
                element={<Login />}
                loader={loginLoader}
            /> */}
        </Route>
    )
)
const App = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default App