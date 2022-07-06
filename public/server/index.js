const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const exerciseRoutes = require('./routes/exercise')
const userRoutes = require('./routes/user')
const historyRoutes = require('./routes/history')
app.use('/api/exercise', exerciseRoutes)
app.use('/api/user', userRoutes)
app.use('/api/history', historyRoutes)


app.listen(5000, () => {
    console.log('Server at port 5000')
})