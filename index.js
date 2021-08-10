const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

// app.use('/style', express.static(__dirname + '/style'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

let users = []
let connections = []

io.on('connection', (socket) => {
    connections.push(socket)
    console.log('connected')

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1)
        console.log('disconnected')
    })

    socket.on('send', data => {
        io.emit('write', data)
    })
})

http.listen(3000, () => console.log('listening at http://localhost:3000'))
