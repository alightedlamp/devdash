const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;

// Route base is '/project'

// PROJECT ROUTES
/////////////////////////////////////
router.get('/', ensureAuthenticated, (req, res) => {
  db.Project.findAll({ where: { user_id: req.user.id } })
  .then(result => {
    res.render('project', {
      projects: result
    });
  });
  .catch(function(err) {
  console.log(err);
  res.status(500).render('500', { error: err });
});
});

router.post('/', ensureAuthenticated, (req, res) => {
  // Needs user ID in request body
  const data = req.body;
  db.Project.create(data)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

router.put('/:projectId', (req, res) => {
  db.Project.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send('Error!');
    });
});

router.delete('/:projectId', (req, res) => {
  db.Resource.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send('Error!');
    });
});

// MILESTONE ROUTES
/////////////////////////////////////

// List all milestones for a project
router.get('/milestone/:projectId', ensureAuthenticated, (req, res) => {
  db.Milestone.findAll({ where: { user_id: req.user.id } })
    .then(result => {
      res.render('milestone-block', {
        milestone: result
      });
    });
  .catch (function(err) {
    console.log(err);
    res.status(500).render('500', { error: err });
  });
});

router.post('/milestone/:projectId', (req, res) => {
  const data = req.body;
  db.Milestone.create(data)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

router.put('/milestone/:projectId', (req, res) => {
  db.Milestone.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send('Error!');
    });
});

router.delete('/milestone/:projectId', (req, res) => {
  db.Milestone.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send('Error!');
    });
});

module.exports = router;
