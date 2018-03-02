const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const db = require('../models');

const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;

const BASE_URL = 'https://api.github.com';
const getEvents = function(username, page) {
  return axios.get(`${BASE_URL}/users/${username}/events?page=${page}`, {
    headers: { 'User-Agent': 'devdash' }
  });
};

router.get('/', ensureAuthenticated, (req, res) => {
  const q = {
    where: { id: req.user.id },
    order: [['priority', 'DESC']]
  };
  const projectsPromise = db.Project.findAll(q);
  const resourcesPromise = db.Resource.findAll(q);
  // This should increment page number until there are no more results
  const githubStats = getEvents(req.user.github_username, 1);

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
