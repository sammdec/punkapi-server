const request = require('supertest')
const app = require('../../index')

describe('/beers/:id', function() {
  it('should return Punk IPA 10 beer', function (done) {
    request(app)
      .get('/beers/106')
      .end(function(err, res) {
        res.statusCode.should.equal(200)
        res.should.be.json()
        res.body.should.be.a.Array()
        res.body[0].should.have.keys('id', 'name', 'food_pairing')
        res.body[0].should.containEql({name: 'Punk IPA 2010 - Current'})
        res.body[0].should.containEql({id: 106})
        done()
      });
  })

  it('should return 404 if id doesnt match', function (done) {
    request(app)
      .get('/beers/1000')
      .end(function(err, res) {
        res.statusCode.should.equal(404)
        res.should.be.json()
        res.body.should.be.a.Object()
        res.body.should.containEql({statusCode: 404})
        done()
      });
  })
})