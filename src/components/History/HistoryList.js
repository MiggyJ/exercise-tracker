import React, { useContext, useEffect, useState } from 'react'

// Material UI
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

// Context
import { GlobalContext } from '../../context/GlobalState'

const HistoryList = ({ date, setBurned, setDuration, setWeight }) => {

    const { user } = useContext(GlobalContext)
    const [record, setRecord] = useState({})
    
    const history = async () => {
        let res =
        await fetch(`http://localhost:5000/api/history/view`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                id: user.id,
                date: new Date(date).toLocaleDateString()
            })
        })
        
        let data = await res.json()

        return data
    }

    useEffect(() => {
        let subscribed = true
        const getHistory = async () => {
            let response = await history()
            if (subscribed) {
                setRecord(response)
                if (!response.message) {
                    setBurned(
                        (
                            response.exercises
                                .map(el => el.burned)
                                .reduce((prev, curr) => prev + curr)
                        ).toFixed(3)
                    )
                    setDuration(
                        response.exercises
                            .map(el => el.duration)
                            .reduce((prev, curr) => prev + curr)
                    )
                    setWeight(response.weight)
                } else {
                    setBurned(0)
                    setDuration(0)
                    setWeight(0)
                }
            }
        }
        getHistory()
        
        return () => {
            subscribed = false
        }
    },[date])


    return (
        <TableContainer
            component={Paper}
            style={{
                height: '60vh',
                marginTop: 10,
                border: '1px solid #ccc'
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Exercise</TableCell>
                        <TableCell align='center'>Duration</TableCell>
                        <TableCell align='center'>Calories Burned</TableCell>
                    </TableRow>
                </TableHead>
                    {record.exercises && 
                        <TableBody>
                            {record.exercises.map((el, index) => (
                                <TableRow key={index}>
                                    <TableCell>{ el.name }</TableCell>
                                    <TableCell align='center'>{ el.duration } minutes</TableCell>
                                    <TableCell align='center'>{ el.burned } kcal</TableCell>
                                </TableRow>
                            ))}    
                        </TableBody>
                    }
            </Table>
            {record.message &&
                <div align='center' style={{marginTop: 20}}>{ record.message }</div>
            }
        </TableContainer>
    )
}

export default HistoryList
