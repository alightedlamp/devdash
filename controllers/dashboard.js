const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;
const axios = require('axios');
const _ = require('lodash');

const BASE_URL = 'https://api.github.com';

const getEvents = function(username, page) {
  return axios.get(`${BASE_URL}/users/${username}/events?page=${page}`, {
    headers: { 'User-Agent': 'devdash' }
  });
};

router.get('/', ensureAuthenticated, (req, res) => {
  const q = { where: { id: req.user.id } };
  const projectsPromise = db.Project.findAll(q);
  const resourcesPromise = db.Resource.findAll(q);
  // This should be updated to paginate results until there are no more
  // Store results in redis
  // Check if value for user exists in redis, return or hit API
  const githubStats = getEvents(req.user.github_username, 1);

  Promise.all([projectsPromise, resourcesPromise, githubStats])
    .then(data => {
      const githubData = _.groupBy(data[2].data, 'type');
      const dashboardData = {
        user: req.user,
        projects: data[0],
        resources: data[1],
        githubData: githubData
      };
      console.log(dashboardData);
      res.render('dashboard', dashboardData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).render('dashboard', { error: 'Error retrieving data' });
    });
});
module.exports = router;
