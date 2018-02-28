const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('in /dashboard/ root')
  res.send('<p>This is test content. The page is \'/dashboard/\'. That is, it is the top of the dashboard hierarchy.</p>')
});
module.exports = router;
