import React, { useContext, useEffect, useState } from 'react'

// Material UI
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

// Material Icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Context
import { GlobalContext } from '../context/GlobalState'
import { useParams, useHistory } from 'react-router-dom'


const Instruction = () => {

    const { user, changePage } = useContext(GlobalContext)
    const { id } = useParams()
    const history = useHistory()
    const [exercise, setExercise] = useState()

    const getOneExercise = async () => {
        const res = await fetch(`http://localhost:5000/api/exercise/find/${id}`)
        const data = await res.json()
        return data
    }

    useEffect(() => {
        changePage('Instruction')
        const getOne = async () => {
            const response = await getOneExercise()
            setExercise(response)
        }

        if (user.weight === 0)
            history.push('/profile')
        getOne()
        
    }, [user])

    return (
        <Card style={{ width: 800, margin: '3% auto', padding: 10 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={()=>history.goBack()}>
                Go Back
            </Button>
            <Typography align='center' variant="h4">
                Instructions for {exercise !== undefined && exercise.name}
            </Typography>
            
            <Divider style={{ marginTop: 10 }} />
            <div style={{ display: 'flex' }}>
            {exercise !== undefined &&
                <CardMedia
                style={{ backgroundSize: 'contain', width: 600}}
                    image={require(`../images/${exercise.url}`)}
                    title={exercise.name}    
                />
            }
                
                <CardContent style={{ maxHeight: '75vh', overflow: 'auto' }}>
                    <List>
                    {
                        exercise !== undefined &&
                        
                            exercise.instructions.map((el, index) => (
                                <ListItem key={index}>
                                    <ListItemText>
                                        {index + 1}. {el}
                                    </ListItemText>
                                </ListItem>
                            ))
                    }
                    </List>
                </CardContent>
            </div>
        </Card>
    )
}

export default Instruction
