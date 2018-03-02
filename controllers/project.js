const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;

// Route base is '/project'

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
  const projectData = db.Project.findOne({
    where: {
      id: req.params.projectId,
      user_id: req.user.id
    }
  });
  const milestoneData = db.Milestone.findAll({
    where: {
      project_id: req.params.projectId
    }
  });
  Promise.all([projectData, milestoneData])
    .then(data => {
      const projectData = data[0].dataValues;
      const milestoneData = data[1].map(milestone => milestone.dataValues);
      res.render('project', {
        user: req.user,
        project: projectData,
        milestones: milestoneData
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).render('project', {
        error:
          "Something went wrong. Maybe this isn't your item. If it is, we broke something. Bummer!"
      });
    });
});

router.post('/', ensureAuthenticated, (req, res) => {
  console.log(req.body);
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

router.put('/:projectId', ensureAuthenticated, (req, res) => {
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
      res.status(500).send({
        error:
          "Something went wrong. Maybe this isn't your item. If it is, we broke something. Bummer!"
      });
    });
});

router.delete('/:projectId', ensureAuthenticated, (req, res) => {
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
      res.status(500).send({
        error:
          "Something went wrong. Maybe this isn't your item. If it is, we broke something. Bummer!"
      });
    });
});

module.exports = router;
