import React, { useContext, useEffect, useState } from 'react'

// Material UI
import Grid from '@material-ui/core/Grid'

// Components
import ExerciseTable from '../components/Home/ExerciseTable'
import Instructions from '../components/Home/Instructions'
import Timer from '../components/Messages/Timer'

// Context
import { GlobalContext } from '../context/GlobalState'
import { useHistory } from 'react-router-dom'

const Home = () => {

    const { user, changePage } = useContext(GlobalContext)
    const history = useHistory()
    const [activity, setActivity] = useState({})
    const [id, setId] = useState(0)
    const [timer, startTimer] = useState(false)

    useEffect(() => {
        changePage('Home')
        if (user.weight === 0)
           history.push('/profile')
    },[user])

    return (
        <Grid container direction="row" style={{marginTop: 30, padding: '10px 15px'}}>
            <Grid item xs={8} style={{padding: 5}}>
                <ExerciseTable
                    setActivity={setActivity}
                    startTimer={startTimer}
                    setId={setId}
                />
            </Grid>
            <Grid item xs={4} style={{padding: 5}}>
                <Instructions id={id}/>
            </Grid>
            {
                timer === true && 
                <Timer
                    activity={activity}
                    timer={timer}
                    startTimer={startTimer}
                />
            }
        </Grid>
    )
}

export default Home
