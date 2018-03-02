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

router.get('/:projectId', ensureAuthenticated, (req, res) => {
  db.Project.findOne({
    where: {
      id: req.params.projectId,
      user_id: req.user.id
    }
  }).then(data => res.render('project', { project: data }));
});

router.post('/', ensureAuthenticated, (req, res) => {
  db.Project.create({
    user_id: req.user.id,
    title: req.body.title,
    description: req.body.description,
    target_completion_date: req.body.target_completion_date,
    progress: req.body.progress,
    completed: req.body.completed,
    priority: req.body.priority
  })
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send({
        error: 'Something went wrong. Try again, maybe with valid data.'
      });
    });
});

router.put('/:projectId', (req, res) => {
  db.Project.update(req.body, {
    where: {
      id: req.params.projectId,
      user_id: req.user.id
    }
  })
    .then(function(results) {
      res.send(200).send({ success: true });
    })
    .catch(function(err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "Something went wrong. Maybe this isn't your item." });
    });
});

router.delete('/:projectId', (req, res) => {
  db.Project.destroy({
    where: {
      id: req.params.projectId,
      user_id: req.user.id
    }
  })
    .then(function(results) {
      res.status(200).send({ success: true });
    })
    .catch(function(err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "Something went wrong. Maybe this isn't your item." });
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
    title: req.body.title,
    target_completion_date: req.body.target_completion_date
  })
    .then(result => res.json(result))
    .catch(err =>
      res.status(500).send({
        error: 'Something went wrong. Try again, maybe with valid data.'
      })
    );
});

router.put('/milestone/:projectId', (req, res) => {
  db.Milestone.update(req.body, {
    where: {
      id: req.params.projectId,
      user_id: req.user.id
    }
  })
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "Something went wrong. Maybe this isn't your item." });
    });
});

router.delete('/milestone/:projectId', (req, res) => {
  db.Milestone.destroy({
    where: {
      id: req.params.projectId,
      user_id: req.user.id
    }
  })
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "Something went wrong. Maybe this isn't your item." });
    });
});

module.exports = router;
