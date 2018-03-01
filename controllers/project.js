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
  db.Project.findAll({ where: { user_id: req.user.id } }).then(result => {
    res.render('project', {
      projects: result
    });
  });
});

router.post('/', ensureAuthenticated, (req, res) => {
  // Needs user ID in request body
  const data = req.body;
  db.Project.create(data)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

router.put('/', (req, res) => {
  console.log('in /API/project');
  res.send('in /API/project');
});

router.delete('/', (req, res) => {
  console.log('in /API/project');
  res.send('in /API/project');
});

// MILESTONE ROUTES
/////////////////////////////////////

// List all milestones for a project
router.get('/milestone/:ProjectID', (req, res) => {
  console.log('in /project/milestone/:ProjectID' + req.params.ProjectID);
  res.send('in /project/milestone/:ProjectID' + req.params.ProjectID + '</p>');
});

router.post('/milestone', (req, res) => {
  // Needs project ID in request body
  console.log('in /API/project');
  res.send('in /API/project');
});

router.put('/milestone', (req, res) => {
  console.log('in /API/project');
  res.send('in /API/project');
});

router.delete('/milestone', (req, res) => {
  console.log('in /API/project');
  res.send('in /API/project');
});

module.exports = router;
