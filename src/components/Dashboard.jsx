import React,{useState ,useMemo ,useLayoutEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import Header from './Header'

const classes = [
    {
        level:"One",
        list:["ba1a" ,"ba1b" ,"ba1c" ,"l1a" ,"l1b" ,'l1c','l1d','l1e','l1f','l1g','l1h','l1i','l1j','l1k',]
    },
    {
        level:"Two",
        list:[ "ba2a" ,"ba2b" ,'l2a','l2b','l2c','l2d','l2e','l2f','l2g','l2h']
    },
    {
        level:"Three",
        list:[ 'se3','sr3','gl1','gl2','gl3']
    }
]
const levels = ["One" ,"Two" ,"Three"]

const rawStudents =[
    {
        name:'Rashford',
        voted:false,
    },
    {
        name:'Cristiano Rolnaldo',
        voted:true,
    },
    {
        name:'Harry Kane',
        voted:true,
    },

    {
        name:'Garnacho',
        voted:false,
    },
    {
        name:'Mbappe',
        voted:true,
    },
    {
        name:'Halland',
        voted:true,
    }
]

// const rawMenu = ["View Students" , ""] 


const Dashboard =()=>{
    const navigate = useNavigate()
    const [level ,setLevel] = useState('One')
    const [classe ,setClasse] = useState('ba1a')
    const [filter ,setFilter] = useState('')
    const [students ,setStudents] = useState(rawStudents)

    const [selectedMenu ,setSelectedMenu] = useState()

    const [loading ,setLoading] = useState(false)

useLayoutEffect(()=>{
    async function verify(){
        if(await localStorage.getItem('token') == null){
            navigate('/login')
            window.location.pathname = 'login'
        }
    }
    verify()
} ,[0])


    let currentLevel
    switch(level){
        case "One":
            // setClasse('ba1a')
            currentLevel = 1
        break;
        case "Two":
            // setClasse('ba2a')
            currentLevel = 2
        break;
        case "Three":
            // setClasse('se3')
            currentLevel = 3
        break;
    }
        
        useMemo(()=>{
            let newStudents = students.map(student => {
               if(student.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())){
                student.display = true
               }else{
                student.display = false
               }
               return student
            })
            setStudents(newStudents)
        },[filter])

        function handleLevelChange(e){

            setLevel(e.target.value)
            switch(e.target.value){
                case "One":
                    setClasse('ba1a')
                break;
                case "Two":
                    setClasse('ba2a')
                break;
                case "Three":
                    setClasse('se3')
                break;
            }
        }

    let displayClasses = classes[currentLevel-1].list.map(classe => {
        return(
            <option key={classe}>{classe}</option>
        )
    })

    let displayLevel = levels.map(level => {
        return(
            <option key={level}>{level}</option>
        )
    })

    let displayStudents = students.map((student ,index) => {
        let state = student.voted ? 'true':'false'
        return(
            <tr key={index} style={{display:student.display ? '':'none'}}>
                <td style={{padding:'5px'}}>{student.name}</td>
                <td style={{color: student.voted ? 'green':'red' ,padding:'5px'}}>{state}</td>
            </tr>
        )
    })

    return(
        <React.Fragment>
            <div>
                <Header/>
                <div>

                </div>
                <br/>

                    <div>
                        <div style={{display:'flex',flexDirection:'column' ,rowGap:'10px' ,marginLeft:'10px'}}>
                            <div style={{display:'flex' ,columnGap:'20px'}}>
                                <div>
                                    <select value={level} id="level" onChange={(e)=>handleLevelChange(e)} style={{padding:'5px 10px'}}>
                                        {displayLevel}
                                    </select>
                                    <label htmlFor='level'> level</label>
                                </div>

                                <div>
                                    <select value={classe} id="class" onChange={(e)=>setClasse(e.target.value)} style={{padding:'5px 10px'}}>
                                        {displayClasses}
                                    </select>
                                    <label htmlFor='class'> class</label>
                                </div>

                            </div>

                            <input type="text" value={filter} onChange={(e)=>setFilter(e.target.value)} placeholder='Enter student name'
                                style={{width:'200px' ,padding:'10px 20px' ,borderRadius:'5px' ,border:'solid 1px rgba(0,0,0,0.2)'}}
                            />

                        </div>
                        <h2 style={{marginLeft:' 10px'}}>Lists of students in <b style={{color:'blue'}}>{classe}</b></h2>
                        <center>
                            <table border='1' style={{borderCollapse:'collapse'}}>
                                <thead>
                                    <tr>
                                        <th style={{padding:'5px'}}>Name</th>
                                        <th style={{padding:'5px'}}>Voted</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {displayStudents}
                                </tbody>
                            </table>
                        </center>
                    </div>

            </div>
        </React.Fragment>
    )
}

export default Dashboard