const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

require('dotenv').config();
const keys = require('./config/keys');

const PORT = process.env.PORT || 3000;
const app = express();

const GitHubStrategy = require('passport-github').Strategy;
passport.use(
  new GitHubStrategy(
    {
      clientID: keys.github.id,
      clientSecret: keys.github.secret,
      callbackURL: 'https://devprogdash.herokuapp.com/auth'
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ githubId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    }
  )
);

app.use(session({ secret: keys.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const root = require('./controllers/root.js');
app.use('/', root);

const project = require('./controllers/project.js');
app.use('/project', project);

const dashboard = require('./controllers/dashboard.js');
app.use('/dashboard', dashboard);

const user = require('./controllers/user.js');
app.use('/user', user);

const resource = require('./controllers/resource.js');
app.use('/resource', resource);

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
