import React, { useContext } from 'react'
const NavLink = require('react-router-dom').NavLink

// Material UI
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// Material Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryIcon from '@material-ui/icons/History'
import HomeIcon from '@material-ui/icons/Home'

// Context
import { GlobalContext } from '../../context/GlobalState'

const Sidebar = ({ drawer, openDrawer }) => {

    const { user, changeUser } = useContext(GlobalContext)

    return (
        <Drawer anchor='left' open={drawer} onClose={() => openDrawer(!drawer)}>
            <div style={{ width: 270 }} role="presentation" onClick={() => openDrawer(!drawer)}>
                <List style={{ marginTop: 20 }}>
                    <ListItem button component={NavLink} to='/' activeClassName='Mui-selected' exact>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                    <ListItem button component={NavLink} to='/profile' activeClassName='Mui-selected'>
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText>Profile ({ user.nickname })</ListItemText>
                    </ListItem>
                    <ListItem button component={NavLink} to='/history'>
                        <ListItemIcon><HistoryIcon /></ListItemIcon>
                        <ListItemText primary='History' />
                    </ListItem>
                    <ListItem button
                        onClick={() => {
                            changeUser({
                                id: '',
                                nickname: '',
                                weight: 0,
                                favorites: []
                            })
                        }}
                    >
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary='Log Out' />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}

export default Sidebar
