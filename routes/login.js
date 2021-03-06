let express = require('express');
let router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let model = require('../models/User_model');
const User = require('mongoose').model('users');

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passportField: 'password',
  },
  function (username, password, done) {
    User.findOne({ username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done({ status: 404, message: 'Incorrect username.' }, false, { message: 'Incorrect username.' });
      }
      if (!user.checkPassword(password)) {
        return done({ status: 400 }, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  },
));


router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  function (req, res) {
    res.send({ user: req.user });
  });

router.get('/', function (req, res, next) {
  res.send({ user: req.user });
});


module.exports = router;
