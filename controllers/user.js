const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;

router.get('/auth/github', passport.authenticate('github'));
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);

router.get('/:userId', (req, res) => {
  // In the future, this can be a public profile page with user info
  res.redirect('/');
  // res.render('user', {
  //   user: req.user
  // });
});

router.get('/edit/:userId', (req, res) => {
  // In the future, this can be an edit page for the user's profile
  res.redirect('/');
  // res.render('edit', {
  //   user: req.user
  // });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy(function(err) {
    req.user = null;
    console.log(`On logout, user is authenticated: ${req.isAuthenticated()}`);
    console.log(err);
    res.redirect('/');
  });
});

module.exports = router;
