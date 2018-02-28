const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('in / root')
  res.send('<p>This is test content. The page is \'/\'. That is, it is the root of the whole site.</p>')
});

module.exports = router;
