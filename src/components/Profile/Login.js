import React, { useContext, useState } from 'react'

// Material UI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

// Material Icons
import CloseIcon from '@material-ui/icons/Close';

// Context
import { GlobalContext } from '../../context/GlobalState'

const Login = ({ openLogin, setOpenLogin, setOpenRegister }) => {
    
    const { changeUser, user } = useContext(GlobalContext)
    
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const attempt = () => {
        fetch('http://localhost:5000/api/user/auth', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                nickname,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.user !== undefined) {
                    changeUser(data.user)
                    setOpenLogin(false)
                }
                else
                    setError(true)
            })
    }

    return (
        <Dialog open={openLogin} onClose={()=>user.weight !== 0 && setOpenLogin(false)}>
            <DialogTitle>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>Log In</div>
                    {user.weight !== 0 &&
                        <div
                            style={{cursor: 'pointer'}}
                            onClick={() => setOpenLogin(false)}
                        >
                            <CloseIcon />
                        </div>
                    }
                </div>
            </DialogTitle>
            <DialogContent style={{width: 300, height: 180}}>
                <Grid container direction='column' spacing={3} alignItems='center'>
                    <Grid item>
                        <TextField
                            variant='outlined'
                            label='Nickname'
                            value={nickname}
                            onChange={(e) => {
                                setError(false)
                                setNickname(e.target.value)
                            }}
                            error={error}
                            helperText={error && 'Wrong Nickname or Password'}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant='outlined'
                            label='Password'
                            type='password'
                            value={password}
                            onChange={(e) => {
                                setError(false)
                                setPassword(e.target.value)
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={()=>setOpenRegister(true)}
                >
                    Register   
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={attempt}
                >
                    Log In    
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Login
