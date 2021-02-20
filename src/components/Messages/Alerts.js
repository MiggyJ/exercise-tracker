import React from 'react'

// Material UI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

const Alerts = ({ title, message, alert, openAlert, confirm=false, id, removeExercise }) => {
    return (
        <Dialog open={alert} BackdropProps={{style: {backgroundColor: 'transparent'}}}>
            <DialogTitle style={{textAlign:'center'}} >{title}</DialogTitle>
            <DialogContent style={{minWidth: 300}}>
                <Typography align='center' variant='h5' >
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions
                style={confirm ?
                    { display: 'flex', justifyContent: 'center', marginTop: 20 } :
                    { display: "flex" }
                }
            >
                {
                    confirm ?
                        <div>
                            <Button
                                variant='outlined'
                                onClick={() => openAlert(state => ({ ...state, alert: false }))}
                            >
                                CANCEL
                            </Button>
                            <Button
                                variant='outlined'
                                style={{ borderColor: '#E10000', color: '#E10000', marginLeft: 10 }}
                                onClick={() => {
                                    removeExercise(id)
                                    openAlert(state => ({...state, alert:false}))
                                }}
                            >
                                YES
                            </Button>  
                        </div>
                        :
                        <Button
                            color='primary'
                            onClick={() => openAlert(false)}
                        >
                            OK
                        </Button>
                }
            </DialogActions>
        </Dialog>
    )
}

export default Alerts
