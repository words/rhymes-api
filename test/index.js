/* globals describe, it */

const supertest = require('supertest')
const expect = require('code').expect
const app = require('..')

describe('GET /', function () {
  it('redirects to github repo', function (done) {
    supertest(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(302, done)
  })
})

describe('GET /rhymes/dog', function () {
  it('responds with a JSON array of rhymes', function (done) {
    supertest(app)
      .get('/rhymes/dog')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body).to.be.an.array()
        expect(res.body).to.not.be.empty()
        done()
      })
  })

  it('supports CORS', function (done) {
    supertest(app)
      .get('/rhymes/dog')
      .expect('Access-Control-Allow-Origin', '*')
      .expect(200, done)
  })

})

describe('GET /rhymes/oksjdfoisdufsd', function () {
  it('responds an empty JSON array', function (done) {
    supertest(app)
      .get('/rhymes/oksjdfoisdufsd')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body).to.be.an.array()
        expect(res.body).to.be.empty()
        done()
      })
  })
})
