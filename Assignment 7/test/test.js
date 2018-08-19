const request = require('supertest')
const app = require('../app')
const assert = require('chai').assert

// test get all lists
describe('GET /lists', function() {
  it('returns an array of different todo lists that have a title and a color', function(done) {
    request(app)
      .get('/lists')
      .expect(200)
      .end(function(err, res) {
        assert(Array.isArray([]), 'Array exists')
        assert(res.body[0].title === 'My List')
        assert(res.body[0].color === 'Teal')
        done()
      })
  })
})

// Test get items by list id
describe('GET /lists/:id', function() {
  it('returns a list of todo items that have a title and status', function(done) {
    const testId = '5b79e8cecf8f71971865a8c3'
    request(app)
      .get('/lists/5b79e8cecf8f71971865a8c3')
      .expect(200)
      .end(function(err, res) {
        assert(res.body[0]._list === testId)
        console.log(res.body[0])
        assert(res.body[0].title === 'Chopper #2')
        assert(res.body[0].status === 'Bad')
        done()
      })
  })
})

// Test get item by id
describe('GET /item/:id', function() {
  it('returns one todo item with each of its parts (title, due date, notes, and status', function(done) {
    const testId = '5b79e9846e8c2b973217b3bb'
    request(app)
      .get('/item/5b79e9846e8c2b973217b3bb')
      .expect(200)
      .end(function(err, res) {
        assert(res.body._id === testId)
        assert(res.body.title === 'Chopper #2')
        assert(res.body.date === '2017-07-16T04:00:00.000Z')
        assert(res.body.notes === 'Another note')
        assert(res.body.status === 'Bad')
        done()
      })
  })
})

// Test add list
describe('POST /lists', function() {
  let data = {
    title: 'Test Title',
    color: 'Red'
  }

  it('accepts a list item and return the new id', function(done) {
    request(app)
      .post('/lists')
      .send(data)
      .expect(200)
      .end(function(err, res) {
        console.log(res.body)
        assert.isNotNull(res.body._id, 'Not Null')
        done()
      })
  })
})

// Test add item
describe('POST /item', function() {
  let data = {
    title: 'My New Note Title',
    status: 'Working',
    duedate: '2001-01-01T05:00:00.000Z',
    notes: 'My notes here'
  }

  it('accepts a todo item and return the new id', function(done) {
    request(app)
      .post('/item')
      .send(data)
      .expect(200)
      .end(function(err, res) {
        console.log(res.body)
        assert.isNotNull(res.body._id, 'Not Null')
        done()
      })
  })
})

// Test update an item by id
describe('PUT /item/:id', function() {
  let data = {
    title: 'Wow Cool'
  }

  it('updates a todo item', function(done) {
    request(app)
      .put('/item/5b79f1430f46769ae7fc5c80')
      .send(data)
      .expect(200)
      .end(function(err, res) {
        console.log(res.body)
        assert(res.body.title === 'Wow Cool')
        done()
      })
  })
})

// Test delete an item by id
describe('DELETE /item/:id', function() {
  const testId = '5b79f1430f46769ae7fc5c80'

  it('deletes an item', function(done) {
    request(app)
      .delete(`/item/${testId}`)
      .expect(200)
      .end(function(err, res) {
        console.log(res.body)
        assert(res.body === 'It works')
        done()
      })
  })
})
