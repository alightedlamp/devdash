const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;

router.get('/', ensureAuthenticated, (req, res) => {
  // TO DO: Figure out if this actually works
  const q = { where: { id: req.user.id } };
  const projectsPromise = db.Project.findAll(q);
  const resourcesPromise = db.Resource.findAll(q);

  Promise.all([projectsPromise, resourcesPromise])
    .then(data => {
      res.render('dashboard', {
        user: req.user,
        data: data
      });
    })
    .catch(err =>
      res.status(500).render('dashboard', { error: 'Error retrieving data' })
    );
});
module.exports = router;
