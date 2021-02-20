import React from 'react'
// MAaterial UI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

const About = ({ about, openAbout }) => {

    return (
        <Dialog open={about}>
            <DialogTitle>
                <Typography variant='h3'>About</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant='body1'>
                    <p>
                        This software was developed as a medium of data collection in a research conducted by Eugene Kyle A. Cancio and Jairus Miguel T. Montante. 
                    </p>
                    <p>
                        <strong>Problem</strong>: A 2019 pandemic has vastly changed the way of life everywhere in the world. Almost any activity needed to be proceeded with utmost care and the solution was to move everything online. This meant sitting in front of a computer for an extended amount of time which, according to studies, can bring several conditions and diseases.
                    </p>
                    <p>
                        <strong>Our Solution</strong>: We, the researchers, thought that since people will be using a computer, we could develop a software that can remind a user to take a break from using the computer and do some exercise. Light physical movement, such as walking or stretching, promotes better blood circulation and helps ease our muscles. Regular physical activity can also reduce high blood pressure, help manage weight, and reduce the risk of heart disease, stroke, type 2 diabetes, and various cancers.
                    </p>
                </Typography>
                <Typography align='center' variant='body2'>
                    &copy; 2020, Jairus Miguel T. Montante
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={()=>openAbout(!about)}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default About
