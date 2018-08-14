const request = require('supertest')
const app = require('../app')

describe('GET /lists', function() {
  it('returns an array of different todo lists that have a title and a color', function(done) {
    request(app)
      .get('/lists')
      .expect(200, done)
  })
})
