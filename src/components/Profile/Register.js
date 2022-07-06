import React, { useContext, useState } from 'react'

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

// Context
import { GlobalContext } from '../../context/GlobalState'

const Register = ({ openRegister, setOpenRegister, setOpenLogin }) => {
    
    const { changeUser } = useContext(GlobalContext)
    
    const [error, setError]  = useState(false)
    const [nickname, setNickname] = useState('')
    const [weight, setWeight] = useState(68)
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const register = async () => {
        let res = await fetch('http://localhost:5000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                nickname,
                weight: parseFloat(weight),
                password
            })
        })

        let data = await res.json()
        
        if (data.hasOwnProperty('id')) {
            setOpenRegister(false)
            setOpenLogin(false)
            changeUser(data)
        } else {
            setError(true)
            setPassword('')
            setPassword2('')
        }

    }
    /**
     * TODO: FIX DUPLICATE NICKNAME
     */

    return (
        <Dialog open={openRegister} onClose={()=>setOpenRegister(false)}>
            <DialogTitle>
                New Profile
            </DialogTitle>
            <DialogContent style={{height: 180}}>
                <Grid
                    container
                    style={{ height: '80%' }}
                    spacing={2} 
                    >
                    <Grid item container direction='row' spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                variant='outlined'
                                style={{ width: '100%' }}
                                label='Nickname'
                                type='text'
                                value={nickname}
                                onChange={(e) => {
                                    setNickname(e.target.value)
                                    setError(false)
                                }}
                                error={error}
                                helperText={error && 'This nickname is already used.'}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant='outlined'
                                label='Weight'
                                type='number'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>Kg</InputAdornment>,
                                    inputProps: {
                                        min: 1,
                                        step: '0.01'
                                    }
                                }}
                                value={weight}
                                onChange={(e)=>setWeight(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container direction='row' spacing={2}>  
                        <Grid item xs={6}>
                            <TextField
                                style={{width: '100%'}}
                                variant='outlined'
                                label='Password'
                                type='password'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                style={{ width: '100%' }}
                                variant='outlined'
                                label='Confirm Password'
                                type='password'
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                error={password !== password2 && password2.length !== 0}
                                helperText={
                                    password !== password2 && password2.length !== 0 &&
                                    'Passwords do not match'
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={()=>setOpenRegister(false)}
                >
                    Close
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    disabled={
                        password !== password2 ||
                        password2 === '' ||
                        password === '' ||
                        nickname === ''
                    }
                    onClick={register}
                >
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Register
