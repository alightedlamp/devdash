const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;

router.get('/', (req, res) => {
  console.log('in /resource/ root');
  res.send(
    "<p>This is test content. The page is '/resource/'. That is, it is the top of the resource hierarchy.</p>"
    db.Resource.findAll({})
      .then(function(results) {
        res.json(results);
    });

  );
});

router.post('/', (req, res) => {
  console.log('in /resource/ root');
  res.send(
    "<p>This is test content. The page is '/resource/'. That is, it is the top of the resource hierarchy.</p>"
  db.Resource.create({
      title: req.body.title,
      url: req.body.url,
      completed: req.body.completed,
      priority: req.body.priority
    })
    .then(function(results) {
      res.json(results);
    });

  );
});

router.put('/:resourceId', (req, res) => {
  console.log('in /resource/ root');
  res.send(
    "<p>This is test content. The page is '/resource/'. That is, it is the top of the resource hierarchy.</p>"
  db.Resource.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(results) {
      res.json(results);
    });

  );
});

router.delete('/:resourceId', (req, res) => {
  console.log('in /resource/ root');
  res.send(
    "<p>This is test content. The page is '/resource/'. That is, it is the top of the resource hierarchy.</p>"
  db.Resource.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(results) {
      res.json(results);
    });

  );
});

module.exports = router;