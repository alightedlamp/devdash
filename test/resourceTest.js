process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

const Resource = require('../src/models/resource');
const resource = require('../src/controllers/resource');
const server = require('../src/server.js');

describe('Resource', function() {
  describe('/GET resource', function() {
    it('should GET all the resources', function(done) {
      chai
        .request(server)
        .get('/resource')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/POST resource', function() {
    it('should POST a new resource', function(done) {
      chai
        .request(server)
        .post('/resource')
        .send({
          id: 1,
          title: 'Test resource',
          createdAt: Date.now(),
          updatedat: Date.now()
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.title).to.be('Test resource');
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/PUT resource', function() {
    it('should update the resource', function() {
      chai
        .request(server)
        .put('/resource')
        .send({
          id: 1,
          title: 'New test resource',
          createdAt: Date.now(),
          updatedat: Date.now()
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.title).to.be('New test resource');
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/DELETE resource', function() {
    it('should delete a resource', function() {
      chai
        .request(server)
        .delete('/resource')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
});
