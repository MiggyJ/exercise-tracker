import React, { useContext, useEffect, useState } from 'react'

// Material UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { KeyboardDatePicker } from '@material-ui/pickers'

import HelpIcon from '@material-ui/icons/Help'

// Components
import HistoryList from '../components/History/HistoryList'

// Context
import { GlobalContext } from '../context/GlobalState'
import { useHistory } from 'react-router-dom'

const History = () => {
    const { user, changePage } = useContext(GlobalContext)
    const history = useHistory()

    const [viewDate, setDate] = useState(new Date().toISOString())
    const [burned, setBurned] = useState(0)
    const [duration, setDuration] = useState(0)
    const [weight, setWeight] = useState(0)

    useEffect(() => {
       changePage('History') 
       if (user.weight === 0)
          history.push('/profile')
    }, [user])


    const BetterTooltip = makeStyles(() => ({
        arrow: {
            color: 'rgba(10,10,10,0.7)'
        },
        tooltip: {
            backgroundColor: 'rgba(10,10,10,0.7)',
            color: '#fff',
            maxWidth: 250,
            fontSize: '12px'
        }
    }))

    const tooltipClasses = BetterTooltip()

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ marginTop: 30 }}
        >
            <Grid item xs={8}>
                <Card>
                    <CardContent>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <div style={{
                                border: '1px solid #ccc',
                                padding: '5px 7px',
                                borderRadius: 5,
                                cursor: 'default'
                            }}>
                                <div>
                                    Weight: {weight} kilograms
                                </div>
                                <div>
                                    Total Workout Duration: {duration} minutes
                                </div>
                                <div>
                                    Total Calories Burned: {burned} kcal
                                </div>
                                <Tooltip classes={tooltipClasses} placement="right" arrow title="This value is calculated from the exercises you completed. Actual weight loss (or gain) is the difference between calorie intake (example: eating food) and this value.">
                                    <div style={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                                        Initial Weight Loss: {(parseFloat(burned) / 3500 * 0.45).toFixed(3)} kilograms <HelpIcon fontSize='inherit'/>
                                    </div>
                                </Tooltip>
                            </div>
                            <div>
                                <KeyboardDatePicker
                                    style={{marginLeft: '5%'}}
                                    label='Change to view history'
                                    value={viewDate}
                                    onChange={date => setDate(date)}
                                    mask='__-__-____'
                                    format='MM-dd-yyyy'
                                    maxDate={new Date()}
                                    maxDateMessage={`Can't see the future.`}
                                    minDate={new Date('2020-02-20')}
                                    minDateMessage={`This was released on 02-20-2021.`}
                                    views={['year', 'month', 'date']}
                                />
                            </div>
                        </div>
                        <HistoryList
                            burned={burned}
                            date={viewDate}
                            setBurned={setBurned}
                            setDuration={setDuration}
                            setWeight={setWeight}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default History
