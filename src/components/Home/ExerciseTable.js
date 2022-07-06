import React, { useContext, useEffect, useState } from 'react'
const NavLink = require('react-router-dom').NavLink

// Material UI
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'

// Material Icons
import SearchIcon from '@material-ui/icons/Search'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'

// Context
import { GlobalContext } from '../../context/GlobalState'

const ExerciseTable = ({ setActivity, startTimer, setId }) => {
    const { user, changeUser, suggested, changeSuggested } = useContext(GlobalContext)
    
    const [exercises, setExercises] = useState([])
    const [favorites, setFavorites] = useState(user.favorites)
    const [remove, setDelete] = useState(0)
    const [add, setAdd] = useState(0)
    const [tag, setTag] = useState('all')
    const [search, searchWord] = useState('')
    const [newSuggestion, setSuggestion] = useState(false)
    
    useEffect(() => {
        
        const deleteFavorite = async () => {
            const res = await fetch('http://localhost:5000/api/user/favorite', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    id: user.id,
                    remove
                })
            })
            
            const data = await res.json()
            
            changeUser(data)
        }
        if (remove !== 0)
            deleteFavorite()
        
    },[remove])

    useEffect(() => {
    
        const addFavorite = async () => {
            
            const res = await fetch('http://localhost:5000/api/user/favorite', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    id: user.id,
                    add
                })
            })
            
            const data = await res.json()
            
            changeUser(data)
        }
        if(add !== 0)
            addFavorite()
        
    }, [add])

    const suggestNew = () => {
        setTag('Suggested')
        setSuggestion(true)
    }

    const getFilteredExercises = async (tag) => {
        let data
        if (tag !== 'Suggested') {
            if (tag === 'Starred')
                tag = 'all'
            const res = await fetch(`http://localhost:5000/api/exercise/view/${tag}`)
            data = await res.json()
        } else {
            const res = await fetch('http://localhost:5000/api/exercise/random')
            data = await res.json()
        }
        return data
    }

    useEffect(() => {
        let subscribed = true
        const getFiltered = async (tag) => {
            const response = await getFilteredExercises(tag)
            if(subscribed){
                if (tag === 'Suggested' && newSuggestion === true) {
                    setExercises(response)
                    changeSuggested(response)
                    setSuggestion(false)
                } else if (tag === 'Suggested' && newSuggestion === false) {
                    setExercises(suggested)
                } else {
                    setExercises(response)
                }
            }
        }   
        getFiltered(tag)

        return () => {
            subscribed = false
        }
    }, [tag])
    
    const changeTag = (e) => {
        setTag(e.target.value)
    }

    const listExercises = exercises.map(el => (
        <TableRow key={el.id}>
            <TableCell align='center'>
                <Checkbox
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon />}
                    color='primary'
                    checked={favorites.includes(el.id)}
                    onChange={ (e) => {
                        if (e.target.checked === true) {
                            setFavorites(prev => [...prev, el.id])
                            setAdd(el.id)
                        } else {
                            setFavorites(prev => prev.filter(data => data !== el.id))
                            setDelete(el.id)
                        }
                    }}
                />
            </TableCell>
            <TableCell>{el.name}</TableCell>
            <TableCell align='center'>
                {el.tags.map((tag, index) => {
                    return (
                        <span key={index}>{tag}{index < el.tags.length -1 ? ', ' : ""}</span>
                )})}
            </TableCell>
            <TableCell align='center'>
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={()=>setId(el.id)}
                >
                    View
                </Button>
            </TableCell>
            <TableCell align='center'>
            <Button
                    color='primary'
                    variant='contained'
                    onClick={() => {
                        startTimer(true)
                        setActivity(el)
                    }}
                >
                    Go
                </Button>
            </TableCell>
        </TableRow>
    ))

    const searchExercises = exercises
        .filter(el => el.name.toLowerCase().includes(search.toLowerCase()))
        .map(el => (
            <TableRow key={el.id}>
                <TableCell align='center'>
                    <Checkbox
                        icon={<StarBorderIcon />}
                        checkedIcon={<StarIcon />}
                        color='primary'
                        checked={user.favorites.includes(el.id)}
                        onChange={ (e) => {
                            if (e.target.checked === true) {
                                setFavorites(prev => [...prev, el.id])
                                setAdd(el.id)
                            } else {
                                setFavorites(prev => prev.filter(data => data !== el.id))
                                setDelete(el.id)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell align='center'>
                    {el.tags.map((tag, index) => {
                        return (
                            <span key={index}>{tag}{index < el.tags.length -1 ? ', ' : ""}</span>
                    )})}
                </TableCell>
                <TableCell align='center'>
                    <Button
                        color='secondary'
                        variant='contained'
                        component={NavLink}
                        to={`/instruction/${el.id}`}
                    >
                        View
                    </Button>
                </TableCell>
                <TableCell align='center'>
                <Button
                        color='primary'
                        variant='contained'
                        onClick={() => {
                            startTimer(true)
                            setActivity(el)
                        }}
                    >
                        Go
                    </Button>
                </TableCell>
            </TableRow>
        ))
    
    const starredExercises = exercises
        .filter(el => user.favorites.includes(el.id))
        .map(el => (
            <TableRow key={el.id}>
                <TableCell align='center'>
                    <Checkbox
                        icon={<StarBorderIcon />}
                        checkedIcon={<StarIcon />}
                        color='primary'
                        checked={user.favorites.includes(el.id)}
                        onChange={ (e) => {
                            if (e.target.checked === true) {
                                setFavorites(prev => [...prev, el.id])
                                setAdd(el.id)
                            } else {
                                setFavorites(prev => prev.filter(data => data !== el.id))
                                setDelete(el.id)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell align='center'>
                    {el.tags.map((tag, index) => {
                        return (
                            <span key={index}>{tag}{index < el.tags.length -1 ? ', ' : ""}</span>
                    )})}
                </TableCell>
                <TableCell align='center'>
                    <Button
                        color='secondary'
                        variant='contained'
                        component={NavLink}
                        to={`/instruction/${el.id}`}
                    >
                        View
                    </Button>
                </TableCell>
                <TableCell align='center'>
                <Button
                        color='primary'
                        variant='contained'
                        onClick={() => {
                            startTimer(true)
                            setActivity(el)
                        }}
                    >
                        Go
                    </Button>
                </TableCell>
            </TableRow>
    ))
    

    return (
        <TableContainer component={Paper} style={{ height: '80vh' }}>
            <div style={{
                margin: '14px 16px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10
            }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <FormControl style={{minWidth: 180}}>
                        <TextField
                            select
                            variant='outlined'
                            value={tag}
                            defaultValue={tag}
                            onChange={(e) => changeTag(e)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        Filter: 
                                    </InputAdornment>
                                )
                            }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="Core">Core</MenuItem>
                            <MenuItem value="Lower Body">Lower Body</MenuItem>
                            <MenuItem value="Upper Body">Upper Body</MenuItem>
                            <MenuItem value="Starred">Starred</MenuItem>
                            <MenuItem value="Suggested">Suggested</MenuItem>
                        </TextField>
                    </FormControl>
                </div>
                <div>
                    <Button
                        variant='contained'
                        onClick={() => { suggestNew() }}
                        disabled={tag === 'Suggested'}
                    >
                        Suggest
                    </Button>
                </div>
                <div>
                    <TextField
                        label='Search'
                        variant='outlined'
                        value={search}
                        onChange={(e)=>searchWord(e.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>
                                <SearchIcon />
                            </InputAdornment>
                        }}
                    />
                </div>
            </div>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Favorite</TableCell>
                        <TableCell>Exercise</TableCell>
                        <TableCell align="center">Muscle Group</TableCell>
                        <TableCell align="center">Instruction</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        exercises.length > 0 && tag !== 'Suggested' && tag !== 'Starred' && !search.length ?
                            listExercises :
                            tag === 'Starred' && !search.length ?
                                starredExercises :
                                searchExercises
                    }
                    <Dialog
                        open={newSuggestion}
                    >
                        <DialogContent>
                            <center>
                                <h3>Getting Suggestion</h3>
                                <CircularProgress/>
                            </center>
                        </DialogContent>
                    </Dialog>
                </TableBody>
            </Table>
        </TableContainer>
            
    )
}

export default ExerciseTable
