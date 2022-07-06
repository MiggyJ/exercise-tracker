import React, { useContext, useEffect, useState } from 'react'

// Material UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Context
import { GlobalContext } from '../../context/GlobalState'

const Summary = () => {
    
    const { user } = useContext(GlobalContext)
    
    const [average, setAverage] = useState(0)
    const [longest, setLongest] = useState(0)
    const [shortest, setShortest] = useState(0)
    
    const stats = async () => {
        const res = await fetch(`http://localhost:5000/api/history/best/${user.id}`)
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const getStats = async () => {
            let response = await stats()
            setAverage(response.average)
            setLongest(response.longest)
            setShortest(response.shortest)
        }
        if (user.id !== '')
            getStats()
    }, [user])

    return (
        <Grid item>
            <Card raised>
                <CardContent style={{padding: '12px 16px'}}>
                    <Grid container alignItems='baseline' direction='column'>
                        <Grid item style={{width: '100%', marginBottom: 20}}>
                            <Typography variant='h6' align='center'>
                                Statistics
                            </Typography>
                        </Grid> 
                        <Grid item>
                            <Typography>
                               Average Duration: {average} minutes
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Longest Duration: {longest} minutes
                            </Typography>    
                        </Grid><Grid item>
                            <Typography>
                                Least Duration: {shortest} minutes
                            </Typography>    
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Summary
