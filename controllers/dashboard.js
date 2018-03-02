const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../models');
const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;
const axios = require('axios');
const _ = require('lodash');

const BASE_URL = 'https://api.github.com';
const getEvents = function(username, page) {
  return axios.get(`${BASE_URL}/users/${username}/events?page=${page}`, {
    headers: {
      'User-Agent': 'devdash'
    }
  });
};
const prepQueryObject = function(req) {
  return {
    where: {
      id: req.user.id
    },
    order: [['priority', 'DESC']]
  };
};
const getUserData = function(req) {
  return [
    db.Project.findAll(q),
    db.Resource.findAll(q),
    getEvents(req.user.github_username, 1)
  ];
};

router.get('/', ensureAuthenticated, (req, res) => {
  const userData = getUserData(prepQueryObject(req), 1);
  console.log(userData());

  Promise.all(userData)
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
      res.status(500).render('dashboard', {
        error: 'Error retrieving data'
      });
    });
});
module.exports = router;
