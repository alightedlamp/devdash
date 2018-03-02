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

router.post('/', ensureAuthenticated, (req, res) => {
  db.Resource.create({
    user_id: req.user.id,
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
      id: req.params.resourceId
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

router.delete('/:resourceId', (req, res) => {
  db.Resource.destroy({
    where: {
      id: req.params.resourceId
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

module.exports = router;
