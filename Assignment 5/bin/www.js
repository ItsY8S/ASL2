const express = require('express')
const app = express()
const http = require('http')

const port = 3000
app.set('port', port)

const server = http.createServer(app)
server.listen(port)
server.on('listening', () => console.log('Server running on: ' + port))

module.exports = app
