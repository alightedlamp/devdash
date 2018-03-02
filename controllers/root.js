const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.user) {
    // One day this will be a fancy homepage describing the app, maybe tomorrow, March 2nd, who knows
    res.send('A user is logged in');
  } else {
    res.send(
      "<p>This is test content. The page is '/'. That is, it is the root of the whole site.</p>"
    );
  }
});

module.exports = router;
