import React, { useContext, useEffect, useState } from 'react'

// Material UI
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

//Component
import Alerts from '../Messages/Alerts'

// Context
import { GlobalContext } from '../../context/GlobalState'

const Single = () => {
    
    
    const { user, changeUser } = useContext(GlobalContext)

    const [nickname, setNickname] = useState('')
    const [weight, setWeight] = useState(0)
    const [newPassword, setNewPassword] = useState('')
    const [password, setPassword] = useState('')
    const [success, openSuccess] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setNickname(user.nickname)
        setWeight(user.weight)
    }, [user])

    const updateUser = async () => {
        let res = await fetch('http://localhost:5000/api/user/edit',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    id: user.id,
                    nickname,
                    weight: parseFloat(weight),
                    newPassword,
                    password,
                    confirm: user.password
                })
            }
        )

        let data = await res.json()
        
        if (data.error) {
            setError(true)
        } else {
            changeUser(data)
            openSuccess(true)
        }
        setPassword('')
        setNewPassword('')
    }

    return (
        <Card raised>
            <CardContent style={{ padding: 10 }}>
                <Grid
                    container
                    direction='column'
                    alignItems='center'
                    spacing={1}
                    style={{ minHeight: '60vh' }}
                >
                    <Grid item>
                        <h2>Profile Information</h2>
                    </Grid>
                    <Grid item style={{width: '80%'}}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='Nickname'
                            type='text'
                            value={nickname}
                            onChange={(e)=>{ setNickname(e.target.value) }}
                        />
                    </Grid>
                    <Grid item style={{width: '80%'}}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='Weight'
                            type='number'
                            value={weight}
                            
                            onChange={(e) => { setWeight(e.target.value)}}
                            InputProps={{
                                endAdornment: 
                                    <InputAdornment position='end' >Kilograms</InputAdornment>,
                                inputProps: {
                                    min: 1,
                                    step: '0.01'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item style={{width: '80%'}}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='Change Password'
                            type='password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item style={{width: '80%'}}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='Current Password'
                            type='password'
                            error={error}
                            helperText={error ? 'Wrong Password' :'*Required'}
                            value={password}
                            onChange={(e) => {
                                setError(false)
                                setPassword(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item style={{width: '80%'}}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={updateUser}
                            fullWidth={true}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        {success === true && 
            <Alerts
                title='Update'
                message='Profile updated successfully'
                alert={success}
                openAlert={openSuccess}
            />
        }
        </Card>
        
    )
}

export default Single
