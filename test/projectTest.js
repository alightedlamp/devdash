process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

const Project = require('../src/models/project');
const project = require('../src/controllers/project');
const server = require('../src/server.js');

describe('Project', function() {
  it('should render pages successfully', function() {});
  it('should produce applicable errors on failed requests', function() {});

  describe('/GET project', function() {
    it('should GET all the projects', function(done) {
      chai
        .request(server)
        .get('/project')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.should.be.a('object');
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/POST project', function() {
    it('should POST a new project', function(done) {
      chai
        .request(server)
        .post('/project')
        .send({
          id: 1,
          title: 'Test project',
          createdAt: Date.now(),
          updatedat: Date.now()
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/PUT project', function() {
    it('should update the project', function() {
      chai
        .request(server)
        .put('/project')
        .send({})
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/DELETE project', function() {
    it('should delete a project', function() {
      chai
        .request(server)
        .delete('/project')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/GET /milestone/projectID', function() {
    it('should return all milestones for a project', function() {});
  });
  describe('/GET milestone', function() {
    it('should get a milestone', function() {
      chai
        .request(server)
        .get('/project/milestone')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/POST milestone', function() {
    it('should post a new milestone', function() {
      chai
        .request(server)
        .post('/project/milestone')
        .send({})
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/PUT milestone', function() {
    it('should update a milestone', function() {
      chai
        .request(server)
        .put('/project/milestone')
        .send({})
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/DELETE milestone', function() {
    it('should delete a milestone', function() {
      chai
        .request(server)
        .delete('/project/milestone')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
});
