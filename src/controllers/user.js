const Sequelize = require('sequelize');
const express = require('express');
const passport = require('passport');
const router = express.Router();

if (process.env.NODE_ENV === 'development') {
  var fakeUser = {
    id: 3614260,
    avatar: 'https://avatars0.githubusercontent.com/u/3614260?v=4',
    username: 'alightedlamp',
    _id: 'fake'
  };
  function middleware(req, res, next) {
    if (req && req.session && req.session.user_tmp) {
      req.user = req.session.user_tmp;
    }
    if (next) {
      next();
    }
  }
  router.use(middleware);
  router.get('/auth/fake', function(req, res) {
    req.session = req.session || {};
    req.session.user_tmp = fakeUser;
    res.redirect('/');
  });
}

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

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
