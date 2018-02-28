require('dotenv').config();
const keys = require('./config/keys');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const PORT = process.env.PORT || 3000;
const app = express();

const db = require('./models');

const GitHubStrategy = require('passport-github').Strategy;
passport.use(
  new GitHubStrategy(
    {
      clientID: keys.github.id,
      clientSecret: keys.github.secret,
      callbackURL: 'https://178a9b76.ngrok.io/user/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      const options = {
        where: {
          github_id: profile.id
        },
        defaults: {
          github_username: profile.username,
          name: profile.displayName,
          avatar: profile._json.avatar_url,
          email: profile._json.email
        }
      };
      db.User.findOrCreate(options)
        .spread((user, created) => done(null, user))
        .catch(err => done(err, null));
    }
  )
);

// Middleware used in routes to determine if a user is logged in
const ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); 
  }
  res.redirect('/')
}
app.use(ensureAuthenticated);

// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id)
    .then(user => {
      console.log(user);
      done(null, user);
    })
    .catch(err => done(err, null));
});

app.use(session({ secret: keys.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

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

db.sequelize
  .sync({ force: true })
  .then(() =>
    app.listen(PORT, () => console.log(`App running on port ${PORT}`))
  );
