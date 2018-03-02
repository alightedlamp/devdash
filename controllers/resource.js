const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;

router.get('/', ensureAuthenticated, (req, res) => {
  db.Resource.findAll({ where: { user_id: req.user.id } })
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).render('500', { error: err });
    });
});

router.post('/', (req, res) => {
  db.Resource.create({
    user_id: req.body.user_id,
    title: req.body.title,
    url: req.body.url,
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

router.put('/:resourceId', (req, res) => {
  db.Resource.update(req.body, {
    where: {
      id: req.body.id
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

router.delete('/:resourceId', (req, res) => {
  db.Resource.destroy({
    where: {
      id: req.params.id
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
