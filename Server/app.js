require('dotenv').config()
const express = require('express')
const socket = require('socket.io')
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

let server = app.listen(port, () => console.log('listening on port: ', port))

var io = socket(server)

io.on('connection', function(socket){
    console.log('make connection')
    socket.on('update-data', function(data){
        socket.broadcast.emit('update-data', data)
    })
})