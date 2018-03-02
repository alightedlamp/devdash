const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;

// List all milestones for a project
router.get('/:projectId', ensureAuthenticated, (req, res) => {
  db.Milestone.findAll({ where: { user_id: req.user.id } })
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).render('500', { error: err });
    });
});

router.post('/:projectId', ensureAuthenticated, (req, res) => {
  db.Milestone.create({
    project_id: req.params.projectId,
    title: req.body.title,
    description: req.body.description,
    target_completion_date: req.body.target_completion_date
  })
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      res.status(500).send({
        error: 'Something went wrong. Try again, maybe with valid data.'
      });
    });
});

router.put('/:milestoneId', ensureAuthenticated, (req, res) => {
  db.Milestone.update(req.body, {
    where: {
      id: req.params.milestoneId,
      user_id: req.user.id
    }
  })
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send({
        error:
          "Something went wrong. Maybe this isn't your item. If it is, we broke something. Bummer!"
      });
    });
});

router.delete('/:milestoneId', ensureAuthenticated, (req, res) => {
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
      res.status(500).send({
        error:
          "Something went wrong. Maybe this isn't your item. If it is, we broke something. Bummer!"
      });
    });
});

module.exports = router;
