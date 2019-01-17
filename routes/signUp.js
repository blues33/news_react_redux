let express = require('express');
let router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let model = require('../models/User_model');
const User = require('mongoose').model('users');

passport.use(new LocalStrategy({
    passReqToCallback: true,
  },
  function (req, username, password, done) {
    User.findOne({username}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        let newUser = new User({
          username: req.body.username,
          fullName: req.body.fullName,
          password: req.body.password,
        });
        newUser.save(function (err) {
          if (err) return next(err);
        });
        console.log('new User -->', newUser);
        return done(null, newUser);
      } else {
        return done({ status: 409 }, false);
      }
    });
  }));

router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  function (req, res) {
    res.send({ user: req.user });
  });

module.exports = router;