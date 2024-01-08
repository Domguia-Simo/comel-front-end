import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from './Header'

// Styling
import '../assets/styles/landingStyles.css'

const raw_candiidates = [
    {
        picture:require('../assets/images/damso.png'),
        name:'Paul',
        description:'I Paul, i promise that if i become the president i will respect all what i said'
    },
    {
        picture:require('../assets/images/jac.jfif'),
        name:'John',
        description:'I John, i promise that if i become the president i will respect all what i said'
    },
    // {
    //     picture:require('../assets/images/mali.jpg'),
    //     name:'Peter',
    //     description:'I Peter, i promise that if i become the president i will respect all what i said '
    // },
]

const LandingPage=()=>{
    const navigate = useNavigate()

    const [candidates ,setCandidates] = useState(raw_candiidates)

    function sendToForm(candidate){
        navigate(`voting-form` ,{state:candidate})
    }

    let displayCandidate
    displayCandidate = candidates.map((candidate ,index) => {

        let description
        if(candidate.description.length > 120){
            description = candidate.description.split(0 ,130)+'...'
        }else{description = candidate.description}

        return(
            <div key={index} className='candidate-container'>
                <img src={candidate.picture} alt={candidate.name} title={candidate.name} className='candidate-picture'/>

                <div className='candidate-content'>
                    <span className='candidate-name'>Mr. {candidate.name}</span>

                    <span className='candidate-description'>
                      {description}
                    </span>

                    <span 
                        className='vote-button'
                        onClick={()=>sendToForm(candidate)}
                    >
                        Vote <i className='fas fa-vote-yea'></i>
                    </span>
                    
                </div>
            </div>
        )
    })

    return(
        <React.Fragment>
            <div className='body'>
                <Header/>

                <div className="main-container">
                    {displayCandidate}
                </div>
            <br/>
            </div>

        </React.Fragment>
    )
}

export default LandingPage