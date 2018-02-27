const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/github', passport.authenticate('github'));
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/')
);

router.get('/', (req, res) => {
  User.findById(req.params.id)
    .then(data => {
      // do stuff
    })
    .catch(err => res.status(500).send('Could not fetch user'));
});

module.exports = router;
