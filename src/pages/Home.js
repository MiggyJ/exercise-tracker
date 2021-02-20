import React, { useContext, useEffect, useState } from 'react'

// Material UI
import Grid from '@material-ui/core/Grid'

// Components
import ExerciseTable from '../components/Home/ExerciseTable'
import Timer from '../components/Messages/Timer'

// Context
import { GlobalContext } from '../context/GlobalState'
import { useHistory } from 'react-router-dom'

const Home = () => {

    const { user, changePage } = useContext(GlobalContext)
    const history = useHistory()
    const [activity, setActivity] = useState({})
    const [timer, startTimer] = useState(false)

    useEffect(() => {
        changePage('Home')
        if (user.weight === 0)
           history.push('/profile')
    },[user])

    return (
        <Grid container direction="row" justify="center" alignItems="center" style={{marginTop: 30}}>
            <Grid item xs={10}>
                <ExerciseTable
                    setActivity={setActivity}
                    startTimer={startTimer}
                />
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
