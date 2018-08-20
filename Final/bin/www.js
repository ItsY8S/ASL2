// If the app environment is not set, we default to development
var NODE_ENV = process.env.NODE_ENV || 'development'

// Here, we use dotenv  to load our env vars in the .env, into process.env
if (NODE_ENV === 'development') {
  require('dotenv').load()
}

const app = require('../app')
const http = require('http')

const port = 3000
app.set('port', port)

const server = http.createServer(app)
server.listen(port)
server.on('listening', () => console.log(`Server running on: ${port}`))
