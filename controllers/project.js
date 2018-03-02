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
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).render('500', { error: err });
    });
});

router.post('/', ensureAuthenticated, (req, res) => {
  db.Project.create({
    user_id: req.user.id,
    title: req.body.title,
    progress: req.body.progress,
    completed: req.body.completed,
    priority: req.body.priority
  })
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send('Error!');
    });
});

router.put('/:projectId', (req, res) => {
  db.Project.update(req.body, {
    where: {
      id: req.params.projectId
    }
  })
    .then(function(results) {
      res.send(200).send({ success: true });
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send('Error!');
    });
});

router.delete('/:projectId', (req, res) => {
  db.Resource.destroy({
    where: {
      id: req.params.projectId
    }
  })
    .then(function(results) {
      res.status(200).send({ success: true });
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send('Error!');
    });
});

// MILESTONE ROUTES
/////////////////////////////////////

// List all milestones for a project
router.get('/milestone/:projectId', ensureAuthenticated, (req, res) => {
  db.Milestone.findAll({ where: { user_id: req.user.id } })
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).render('500', { error: err });
    });
});

router.post('/milestone/:projectId', (req, res) => {
  db.Milestone.create({
    user_id: req.user.id,
    project_id: req.body.project_id,
    title: req.body.title,
    priority: req.body.priority || null,
    target_completion_date: req.body.target_completion_date || null
  })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

router.put('/milestone/:milestoneId', (req, res) => {
  db.Milestone.update(req.body, {
    where: {
      id: req.params.milestoneId
    }
  })
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send('Error!');
    });
});

router.delete('/milestone/:milestoneId', (req, res) => {
  db.Milestone.destroy({
    where: {
      id: req.params.milestoneId
    }
  })
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send('Error!');
    });
});

module.exports = router;
