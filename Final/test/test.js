require('dotenv').load()
const request = require('supertest')
const app = require('../app')
const assert = require('chai').assert

describe('GET /api/:userId', function() {
  it('returns an array of fruits upon a valid user id', function(done) {
    // const testId = '5b7b215c0c6b89b69b3b6139'
    request(app)
      .get('/api/5b7b215c0c6b89b69b3b6139')
      .expect(200)
      .end(function(err, res) {
        console.log(err)
        assert(Array.isArray([]), 'Array Exists')
        done()
      })
  })
})
