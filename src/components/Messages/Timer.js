import React, { useContext, useEffect, useState } from 'react'
// const { ipcRenderer } = window.require('electron')

// Material UI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

// Context
import { GlobalContext } from '../../context/GlobalState'

const Timer = ({ activity, timer, startTimer }) => {

    const { user } = useContext(GlobalContext)

    const [minutes, setMinutes] = useState(2)
    const [seconds, setSeconds] = useState(0)
    const [counting, isCounting] = useState(false)
    const [total, setTotal] = useState(0)

    const historyUpdate = async () => {
        let burned = (total * activity.met * 3.5 * user.weight) / 200
        const res = await fetch('http://localhost:5000/api/history/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: user.id,
                weight: user.weight,
                exercise: {
                    name: activity.name,
                    duration: parseInt(total, 10),
                    burned: parseFloat(burned.toFixed(3))
                }
            })
        })

        const data = await res.json()

        console.log(data)
    }

    

    useEffect(() => {
        let subscribe = true
        const focus = () => {
            let time = minutes
            let seconds = 0
            // ipcRenderer.send('ACTIVE_TIMER')
            const timer = setInterval(function () {
                if (time === 0 && seconds === 0){
                    clearInterval(timer)
                    isCounting(false)
                    startTimer(false)
                    // ipcRenderer.send('STOP_TIMER')
                    const speech = window.speechSynthesis
                    const message = new SpeechSynthesisUtterance(
                        "Time's up! You can now rest for a while."
                    )
                    speech.speak(message)
                    
                    historyUpdate()
                }
                else if (subscribe === false)
                    clearInterval(timer)
                else {
                    isCounting(true)
                    if (seconds !== 0) {
                        seconds--
                        setSeconds(seconds)
        
                    } else {
                        seconds = 59
                        setSeconds(seconds)
                        time--
                        setMinutes(time)
                    }
                }
                
            }, 1000)
        }
        if(counting === true)
            focus()
        return () => {
            subscribe = false
        }
    }, [counting])

    return (
        <Dialog open={timer}>
            <DialogTitle style={{ textAlign: 'center' }} >Timer - { activity.name }</DialogTitle>
            <DialogContent>
                <Grid container direction='row' alignItems='center' spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                            variant='outlined'
                            label='Duration'
                            type='number'
                            value={minutes}
                            
                            onChange={(e)=>setMinutes(e.target.value)}    
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>Minutes</InputAdornment>,
                                inputProps: {
                                    min: 2
                                }
                            }}
                    />
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container direction='column' spacing={1}>
                            <Grid item>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    onClick={() => {
                                        setTotal(minutes)
                                        isCounting(true)
                                    }}
                                    disabled={counting || minutes < 2}
                                >
                                    Start
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    color='secondary'
                                    size='small'
                                    onClick={() => {
                                        isCounting(false)
                                        startTimer(false)
                                    }}
                                    // disabled={counting} negotiable
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify='center'>
                    <Grid item>
                        <Typography variant='h1' align='center'>
                            {minutes >= 10 ? minutes : '0' + minutes}:{seconds >= 10 ? seconds : '0'+seconds}
                        </Typography>
                        {activity.tags.includes('Lower Body') &&
                            <center>Make sure to work on both legs.</center>
                        }
                        {activity.name === 'Standing Oblique Crunches' &&
                            <center>Work on both sides.</center>
                        }
                        <center style={{marginTop: 10}}>
                            <img
                                src={require(`../../images/${activity.url}`)}
                                alt={activity.name}
                                style={{height: 240, backgroundSize: 'contain'}}
                            />
                        </center>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default Timer
