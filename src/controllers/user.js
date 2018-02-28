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
  console.log('in /user/ root')
  res.send('<p>This is test content. The page is \'/user/\'. That is, it is the top of the user hierarchy.</p>')
  // content below is commmented out because models aren't working yet, as of 2/27/2018 7:45 PM CAH.
  // User.findById(req.params.id)
  //   .then(data => {
  //     // do stuff
  //   })
  //   .catch(err => res.status(500).send('Could not fetch user'));
});

module.exports = router;
