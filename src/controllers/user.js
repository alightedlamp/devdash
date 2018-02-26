const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();

app.get('/auth/github', passport.authenticate('github'));
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.get('/', (req, res) => {
  User.findById(req.params.id)
    .then(data => {
      // do stuff
    })
    .catch(err => res.status(500).send('Could not fetch user'));
});
