require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3001

const errorHandler = require('./middlewares/errorHandler')
const userRoute = require('./routes/userRoute')
const taskRoute = require('./routes/taskRoute')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/user', userRoute)
app.use('/tasks', taskRoute)
app.use(errorHandler)

app.listen(port, () => console.log('listening on port: ', port))