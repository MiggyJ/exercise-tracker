const router = require('express').Router()
const path = require('path')

const uuid = require('uuid')
const bcrypt = require('bcrypt')
const lowDB = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.join(__dirname, '../db.json'))
let db = lowDB(adapter)


router.post('/auth', async (req, res) => {
    let user = 
        db.get('users')
            .find({ nickname: req.body.nickname })
            .value()
    if (user !== undefined) {        
        let match = await bcrypt.compare(req.body.password, user.password)
        if(match)
            res.send({ user })
        else
            res.send({error: true})
    } else 
        res.send({error: true})
})

router.post('/register', async (req, res) => {

    /**
     * TODO: duplicate nickname
     */

    let duplicate =
        db
            .get('users')
            .find({ nickname: req.body.nickname })
            .value()
    
    if (duplicate === undefined) {
        let user = {
            id: uuid.v4(),
            nickname: req.body.nickname,
            weight: req.body.weight,
            password: await bcrypt.hash(req.body.password, 10),
            favorites: []
        }
    
        db.get('users')
            .push(user)
            .write()
    
        res.send(user)  
    } else {
        res.send({error: 1})
    }
    
})

router.put('/edit', async (req, res) => {
    let user
    if(req.body.newPassword !== ''){
        user = {
            nickname: req.body.nickname,
            weight: req.body.weight,
            password: await bcrypt.hash(req.body.newPassword, 10)
        }
    } else {
        user = {
            nickname: req.body.nickname,
            weight: parseInt(req.body.weight)
        }
    }

    let match = await bcrypt.compare(req.body.password, req.body.confirm)
    if (match) {
        let auth = db.get('users')
            .find({ id: req.body.id })
            .assign(user)
            .write()
        res.send(auth)
    } else {
        res.send({error: true})
    }    
})

router.put('/favorite', (req, res) => {
    let add = req.body.add

    db.get('users')
        .find({ id: req.body.id })
        .get('favorites')
        .push(add)
        .write()
    
    let user =
        db.get('users')
            .find({ id: req.body.id })
            .value()
    
    res.send(user)
})

router.delete('/favorite', (req, res) => {
    let remove = req.body.remove

    db.get('users')
        .find({ id: req.body.id })
        .get('favorites')
        .pull(remove)
        .write()
    
    let user =
        db.get('users')
            .find({ id: req.body.id })
            .value()
    
    res.send(user)
})

module.exports = router