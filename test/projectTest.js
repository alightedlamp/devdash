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
  // beforeEach(function(done) {
  //   Project.remove({}, function(err) {
  //     done();
  //   });
  // });

  it('should render pages successfully', function() {});
  it('should produce applicable errors on failed requests', function() {});

  describe('/GET project', function() {
    it('should GET all the projects', function(done) {
      chai
        .request(server)
        .get('/project')
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/POST project', function() {
    it('should POST a new project', function() {});
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/PUT project', function() {
    it('should update the project', function() {});
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/DELETE project', function() {
    it('should delete a project', function() {});
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/GET /milestone/projectID', function() {
    it('should return all milestones for a project', function() {});
  });
  describe('/GET milestone', function() {
    it('should get a milestone', function() {});
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/POST milestone', function() {
    it('should post a new milestone', function() {});
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/PUT milestone', function() {
    it('should update a milestone', function() {});
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
  describe('/DELETE milestone', function() {
    it('should delete a milestone', function() {});
    it('should return a 401 for unathenticated user', function() {});
    it('should return a 500 for an invalid id input', function() {});
  });
});
