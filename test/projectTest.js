process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

const Project = require('../models/project');
const project = require('../controllers/project');
const server = require('../server.js');

describe('Project', function() {
  describe('/GET project', function() {
    it('should GET all the projects', function(done) {
      chai
        .request(server)
        .get('/project')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
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
          user_id: 1,
          title: 'Test project'
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.title).to.equal('Test project');
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
        .send({
          id: 1,
          user_id: 1,
          title: 'New test project'
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.title).to.equal('New test project');
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
        .send({
          id: 1,
          user_id: 1
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });

  // Project-specific Milestone tests
  /////////////////////////////////////
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
          expect(res.body).to.be.a('object');
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
        .send({
          title: 'Test milestone',
          target_completion_date: '2018-03-03',
          project_id: 1
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.title).to.equal('Test milestone');
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
        .send({
          title: 'New test milestone',
          target_completion_date: '2018-03-03',
          project_id: 1
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.title).to.equal('New test milestone');
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
        .send({
          id: 1,
          project_id: 1
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
});
