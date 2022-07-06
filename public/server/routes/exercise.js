const router = require('express').Router()
const path = require('path')

const lowDB = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.join(__dirname, '../db.json'))
let db = lowDB(adapter)

router.get('/view/:tag', (req, res) => {
    let exercises
    if (req.params.tag !== 'all'){
        exercises =
            db.get('exercises')
            .filter({ tags: [req.params.tag] })  
            .value()
    } else {
        exercises =
            db.get('exercises')
            .value()
    }

    res.send(exercises)
})

router.get('/find/:id', (req, res) => {
    let exercise =
        db.get('exercises')
        .find({ id: parseInt(req.params.id) })
        .value()
    
    res.send(exercise)
})

/**
 * TODO: Add to FrontEnd
 * * Button to suggest random exercise set
 * * Update Context API with suggested set 
 * ?    -> Action/State/Reducer
 */

router.get('/random', (req, res) => {
    let exercises =
        db.get('exercises')
            .value()
    
    let core = exercises
        .filter(e => e.tags.includes('Core'))
        .sort(() => Math.random() - Math.random())
        .slice(0,2)
    
    let lower = exercises
        .filter(e => !core.includes(e))
        .filter(e => e.tags.includes('Lower Body'))
        .sort(() => Math.random() - Math.random())
        .slice(0, 2)
    
    let upper = exercises
        .filter(e => !core.includes(e))
        .filter(e => e.tags.includes('Upper Body'))
        .sort(() => Math.random() - Math.random())
        .slice(0, 2)
    
    exercises = lower.concat(upper, core)
    
    res.send(exercises)
})

module.exports = router