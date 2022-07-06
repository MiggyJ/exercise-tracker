import React, { useEffect, useState } from 'react'

// Material UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const Instructions = ({ id }) => {
    const [exercise, setExercise] = useState()

    const getOneExercise = async () => {
        const res = await fetch(`http://localhost:5000/api/exercise/find/${id}`)
        const data = await res.json()
        return data
    }

    useEffect(() => {
        const getOne = async () => {
            const response = await getOneExercise()
            setExercise(response)
            console.log(response)
        }
        if (id !== 0)
            getOne()
        
    }, [id])

    return ( 
        <Card style={{ height: '80vh' }}>
            <Typography align='center' variant="h5" style={{padding: 10}}>
                Instructions for {exercise !== undefined ? exercise.name : 'Exercises'}
            </Typography>
            <Divider/>
            {exercise !== undefined &&
                <CardMedia
                style={{ backgroundSize: 'contain', height: 200}}
                    image={require(`../../images/${exercise.url}`)}
                    title={exercise.name}    
                />
            }
            <Divider/>
            <CardContent style={{ maxHeight: '44vh', overflow: 'auto' }}>
                    {
                        exercise !== undefined ?
                        <List>
                            {exercise.instructions.map((el, index) => (
                                <ListItem key={index}>
                                    <ListItemText>
                                        {index + 1}. {el}
                                    </ListItemText>
                                </ListItem>
                            ))}
                         </List> :
                        <Typography align='center' variant='h4'>
                            Instructions will appear here
                        </Typography>
                    }
                </CardContent>
        </Card>
     );
}
 
export default Instructions;