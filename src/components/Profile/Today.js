import React, { useContext, useEffect, useState } from 'react'

// Material UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Context
import { GlobalContext } from '../../context/GlobalState'

const Today = () => {
    
    const { user } = useContext(GlobalContext)

    const [burned, setBurned] = useState(0)
    const [duration, setDuration] = useState(0)

    const summary = async () => {
        const res = await fetch(`http://localhost:5000/api/history/today/${user.id}`)
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const getSummary = async () => {
            let response = await summary()
            setBurned(response.burned)
            setDuration(response.duration)
        }
        if (user.id !== '')
            getSummary()
    }, [user])

    return (
        <Grid item>
            <Card raised>
                <CardContent style={{padding: '12px 16px'}}>
                    <Grid container alignItems='baseline' direction='column'>
                        <Grid item style={{width: '100%', marginBottom: 20}}>
                            <Typography variant='h6' align='center'>
                                Summary (Today)
                            </Typography>
                        </Grid> 
                        <Grid item>
                            <Typography>
                                Calories Burned: { burned } kcal
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Time Worked out: { duration } minutes
                            </Typography>    
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Today
