import React, { useContext, useEffect } from 'react'
import format from 'date-fns/format'

// Material UI
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

// Material Icons
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import MenuIcon from '@material-ui/icons/Menu'

// Context
import { GlobalContext } from '../../context/GlobalState'

const Topbar = ({ openAbout, openDrawer, setDate, date }) => {

    const { page } = useContext(GlobalContext)

    let clock = () => {
        setInterval(() => {
            setDate(format(new Date(), 'EEEE, MMMM dd, uuuu | hh:mm bb'))
        }, 1000);
    }
    
    useEffect(() => {
        clock()
        return () => {
            clearInterval(clock)
        }
    }, [])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton disableFocusRipple onClick={()=>openDrawer(true)} style={{marginRight: 2}}>
                        <MenuIcon style={{ color: 'white'}} />
                    </IconButton>
                    <Typography variant="h4">
                        {page}
                    </Typography>
                    <div style={{ marginLeft: 'auto', display: 'flex' }}>
                        <Typography style={{ marginRight: 30, marginTop: 12 }}>{date}</Typography>
                        <IconButton
                            disableFocusRipple
                            onClick={() => openAbout(true)}
                        >
                            <InfoOutlinedIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Topbar
