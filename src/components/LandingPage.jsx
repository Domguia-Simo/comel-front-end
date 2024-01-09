import React, { useState } from 'react'
import { useNavigate, useLoaderData } from 'react-router-dom'
import Header from './Header'

// Styling
import '../assets/styles/landingStyles.css'

const raw_candiidates = [
    {
        picture: require('../assets/images/damso.png'),
        name: 'Paul',
        description: 'I Paul, i promise that if i become the president i will respect all what i said'
    },
    {
        picture: require('../assets/images/jac.jfif'),
        name: 'John',
        description: 'I John, i promise that if i become the president i will respect all what i said'
    },
    // {
    //     picture:require('../assets/images/mali.jpg'),
    //     name:'Peter',
    //     description:'I Peter, i promise that if i become the president i will respect all what i said '
    // },
]
let pic = [require('../assets/images/damso.png'),require('../assets/images/jac.jfif'),require('../assets/images/mali.jpg')]

export default function LandingPage() {
    const navigate = useNavigate()
    const candidatesData = useLoaderData()
    console.log("candidatesData", candidatesData.candidates);
    const [candidates, setCandidates] = useState(candidatesData.candidates)

    function sendToForm(candidate) {
        navigate(`voting-form`, { state: candidate })
    }

    let displayCandidate
    displayCandidate = candidates.map((candidate, index) => {

        let description
        if (candidate.desc.length > 120) {
            description = candidate.desc.split(0, 130) + '...'
        } else { description = candidate.desc }

        return (
            <div key={candidate._id} className='candidate-container'>
                <img src={pic[index]} alt={candidate.name} title={candidate.name} className='candidate-picture' />

                <div className='candidate-content'>
                    <span className='candidate-name'>Mr. {candidate.name}</span>

                    <span className='candidate-description'>
                        {description}
                    </span>

                    <span
                        className='vote-button'
                        onClick={() => sendToForm(candidate)}
                    >
                        Vote <i className='fas fa-vote-yea'></i>
                    </span>

                </div>
            </div>
        )
    })

    return (
        <React.Fragment>
            <div className='body'>
                {/* <Header/> */}

                <div className="main-container">
                    {displayCandidate}
                </div>
                <br />
            </div>

        </React.Fragment>
    )
}

export const landingPageLoader = async ({ params }) => {
    // const { classes } = params
    const res = await fetch('http://comel-back-end.vercel.app/api/candidate/getCandidates')

    if (!res.ok) {
        throw Error('Could not find that getting voter.')
    }
    // console.log("res.json()",res.json());
    return res.json()
}