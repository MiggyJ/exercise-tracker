import React, { useContext, useEffect, useState } from 'react'

// Material UI
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

// Material Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LoopIcon from '@material-ui/icons/Loop';

// Components
import Login from '../components/Profile/Login'
import Register from '../components/Profile/Register'
import Single from '../components/Profile/Single'
import Stats from '../components/Profile/Stats'
import Summary from '../components/Profile/Summary'
import Today from '../components/Profile/Today'

// Context
import { GlobalContext } from '../context/GlobalState'

const Profile = () => {

    const { user, changePage } = useContext(GlobalContext)

    const [openLogin, setOpenLogin] = useState(true)
    const [openRegister, setOpenRegister] = useState(false)



    useEffect(() => {
        changePage('Profile')
        if (user.weight !== 0)
            setOpenLogin(false)
        else
            setOpenLogin(true)
    }, [user])
    
    

    return (
        <Card style={{ margin: '2% auto', width: '75vw', padding: 10}}>
            <CardContent style={{height: '78vh'}}>
                <Grid container direction='row'>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={() => setOpenRegister(true)}
                            startIcon={<AddCircleIcon />}
                        >
                            Add New Profile
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            style={{ marginLeft: 10 }}
                            onClick={() => setOpenLogin(true)}
                            startIcon={<LoopIcon />}
                        >
                            Switch Profile
                        </Button>
                        <Divider style={{margin: '10px 0'}} />
                    </Grid>
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={7}>
                            <Single />
                        </Grid>
                        <Grid item xs={5}>
                            <Grid
                                container
                                direction='column'
                                spacing={2}
                                style={{ padding: 1 }}
                            >
                                <Summary />
                                <Today />
                                <Stats />
                            </Grid>
                        </Grid>
                    </Grid>
                       

                    {
                        openRegister === true &&
                        <Register
                            openRegister={openRegister}
                            setOpenRegister={setOpenRegister}
                            setOpenLogin={setOpenLogin}
                        />
                    }
                    {
                        openLogin === true &&
                        <Login
                            openLogin={openLogin}
                            setOpenLogin={setOpenLogin}
                            setOpenRegister={setOpenRegister}
                        />
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Profile
