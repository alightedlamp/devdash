const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const ensureAuthenticated = require('../util/helpers').ensureAuthenticated;

if (process.env.NODE_ENV === 'development') {
  router.get(
    '/auth/dev',
    passport.authenticate('local', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    }
  );
}
router.get('/auth/github', passport.authenticate('github'));
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);

router.get('/', (req, res) => {
  // In the future, this can be a public profile page with user info
  res.redirect('/');
  // res.render('user', {
  //   user: req.user
  // });
});

router.get('/edit', (req, res) => {
  // In the future, this can be an edit page for the user's profile
  res.redirect('/');
  // res.render('edit', {
  //   user: req.user
  // });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
