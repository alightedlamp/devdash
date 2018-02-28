const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/', (req, res) => {
  console.log('in /project/ root')
  res.send('<p>This is test content. The page is \'/project/\'. That is, it is the top of the project hierarchy.</p>')
});

router.get('/milestone/:ProjectID', (req, res) => {
  console.log('in /project/milestone/:ProjectID' + req.params.ProjectID)
  res.send('in /project/milestone/:ProjectID' + req.params.ProjectID + '</p>')
});

router.post('/API/Project', (req, res) => {
  console.log('in /API/project')
  res.send('in /API/project')
});

router.post('/API/Milestone', (req, res) => {
  console.log('in /API/project')
  res.send('in /API/project')
});

router.put('/API/Project', (req, res) => {
  console.log('in /API/project')
  res.send('in /API/project')
});

router.put('/API/Milestone', (req, res) => {
  console.log('in /API/project')
  res.send('in /API/project')
});

router.delete('/API/Project', (req, res) => {
  console.log('in /API/project')
  res.send('in /API/project')
});

router.delete('/API/Milestone', (req, res) => {
  console.log('in /API/project')
  res.send('in /API/project')
});

module.exports = router;
