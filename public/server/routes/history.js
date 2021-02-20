const router = require('express').Router()
const path = require('path')

const lowDB = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.join(__dirname, '../db.json'))
let db = lowDB(adapter)


router.post('/store', (req, res) => {
    let history =
        db.get('history')
            .find({ id: req.body.id, date: new Date().toLocaleDateString() })
            .value()
    
    if (history === undefined){
        history = {
            id: req.body.id,
            date: new Date().toLocaleDateString(),
            weight: req.body.weight,
            exercises: [req.body.exercise]
        }

        db.get('history')
            .push(history)
            .write()

    } else {
        history = db.get('history')
            .find({ id: req.body.id, date: new Date().toLocaleDateString() })
            .get('exercises')
            .push(req.body.exercise)
            .write()
    }

    res.send(history)
})

router.get('/today/:id', (req, res) => {
    let history = 
        db.get('history')
            .find({id: req.params.id, date: new Date().toLocaleDateString()})
            .get('exercises')
            .value()
    
    let burned
    let duration

    if (history === undefined) { 
        burned = 0
        duration = 0
    } else {
        burned = history
            .map(el => el.burned)
            .reduce((prev, curr) => prev + curr)
        duration = history
            .map(el => el.duration)
            .reduce((prev, curr) => prev + curr)
    }
    res.send({
        burned: parseFloat(burned.toFixed(3)),
        duration
    })
})

router.get('/all/:id', (req, res) => {
    let history = 
        db.get('history')
            .filter({id: req.params.id})
            .value()

    let burned
    let duration

    if (!history.length) { 
        burned = 0
        duration = 0
    } else {
        let allExercises = history.map(el => el.exercises)
        let mergedExercises = []
        for (let i = 0; i < allExercises.length; i++){
            mergedExercises = mergedExercises.concat(allExercises[i])
        }

        burned = mergedExercises
            .map(el => el.burned)
            .reduce((prev, curr) => prev + curr)
        duration = mergedExercises
            .map(el => el.duration)
            .reduce((prev, curr) => prev + curr)
    }

    res.send({
        burned: parseFloat(burned.toFixed(3)),
        duration
    })
})

router.get('/best/:id', (req, res) => {
    let history =
        db.get('history')
            .filter({ id: req.params.id })
            .map(el => el.exercises)
            .value()
            
    if (history.length) {
        let mergedExercises = []
        for (let i = 0; i < history.length; i++){
            mergedExercises = mergedExercises.concat(history[i])
        }
        
        let average =
            (
                mergedExercises
                .map(el => el.duration)
                .reduce((prev, curr) => prev + curr) / history.length
            ).toFixed(2)
        
        let times = (history.map(day => 
            day
                .map(el => el.duration)
                .reduce((prev, curr) => prev + curr)
        ))
        res.send({
            average,
            longest: Math.max(...times),
            shortest: Math.min(...times)
        })
    } else {
        res.send({
            average: 0,
            longest: 0,
            shortest: 0
        })
    }
    
    
})

router.post('/view', (req, res) => {
    let history =
        db.get('history')
            .find({ id: req.body.id, date: req.body.date })
            .value()
    
    if (history === undefined) {
        res.send({message: 'No activities to show.'})
    } else {
        res.send(history)
    }
})

module.exports = router