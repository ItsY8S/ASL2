const app = require('../app')
const http = require('http')

// Set the port
const port = 3000
app.set('port', port)

// Start the server
const server = http.createServer(app)
server.listen(port)
server.on('listening', () => console.log('Server running on: ' + port))
