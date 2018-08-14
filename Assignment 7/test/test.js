const request = require('supertest')
// const assert = require('assert')
const app = require('../app')
const assert = require('chai').assert

describe('GET /lists', function() {
  it('returns an array of different todo lists that have a title and a color', function(done) {
    request(app)
      .get('/lists')
      .expect(200)
      .end(function(err, res) {
        assert(Array.isArray([]), 'Array exists')
        assert(res.body[0].title === 'List #1')
        assert(res.body[0].color === 'blue')
        done()
      })
  })
})

describe('GET /lists/:id', function() {
  it('returns a list of todo items that have a title and status', function(done) {
    const testId = '5b7215d89cda3f425509c713'
    request(app)
      .get('/lists/5b7215d89cda3f425509c713')
      .expect(200)
      .end(function(err, res) {
        // console.log(res.body)
        assert(res.body._id.toString() === testId)
        // assert(res.body.title === 'List #1')
        // assert(res.body.status === 'blue')
        done()
      })
  })
})

describe('GET /item/:id', function() {
  it('returns one todo item with each of its parts (title, due date, notes, and status', function(done) {
    const testId = '5b7220769cda3f425509c71a'
    request(app)
      .get('/item/5b7220769cda3f425509c71a')
      .expect(200)
      .end(function(err, res) {
        assert(res.body._id.toString() === testId)
        assert(res.body.title === 'wowowowo')
        assert(res.body.duedate === '2001-01-01T05:00:00.000Z')
        assert(res.body.notes === 'something')
        assert(res.body.status === 'good')
        done()
      })
  })
})

describe('POST /lists', function() {
  let data = {
    title: '1',
    color: 'dummy'
  }

  it('accepts a list item and return the new id', function(done) {
    request(app)
      .post('/lists')
      .send(data)
      .expect(200)
      .end(function(err, res) {
        assert.isNotNull(res.body._id, 'Not Null')
        done()
      })
  })
})

// describe('POST /item', function() {
//   let data = {
//     title: 'My Note Title',
//     status: 'Working',
//     duedate: '2001-01-01T05:00:00.000Z',
//     notes: 'My notes here'
//   }

//   it('accepts a todo item and return the new id', function(done) {
//     request(app)
//       .post('/item')
//       .send(data)
//       .expect(200)
//       .end(function(err, res) {
//         console.log(res.body)
//         assert.isNotNull(res.body._id, 'Not Null')
//         done()
//       })
//   })
// })

describe('PUT /item/:id', function() {
  let data = {
    title: 'wowowowo'
  }

  const testId = '5b7220769cda3f425509c71a'
  it('updates a todo item', function(done) {
    request(app)
      .put(`/item/${testId}`)
      .send(data)
      .expect(200)
      .end(function(err, res) {
        // console.log(res.body)
        assert(res.body.title === 'wowowowo')
        done()
      })
  })
})

describe('DELETE /item/:id', function() {
  const testId = '5b734c82df164c59d0de1d84'

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
