const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const exerciseRoutes = require('./routes/exercise')
const userRoutes = require('./routes/user')
const historyRoutes = require('./routes/history')
app.use('/exercise', exerciseRoutes)
app.use('/user', userRoutes)
app.use('/history', historyRoutes)


app.listen(5000, () => {
    console.log('Server at port 5000')
})