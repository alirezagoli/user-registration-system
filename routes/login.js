/**
 * Created by Alireza on 10/21/2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userModel = require("../models/user");

/* login to app */

router.get('/', function (req, res, next) {
    res.render('login');
});

// passport configuration
passport.use(new LocalStrategy(
    function (username, password, done) {
        userModel.getUserByUsername(username, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            if (user.Activate) {
                userModel.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) {
                        return done(err);
                    }
                    if (isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                })
            }
            else
            {
                return done(null, false, {message: 'Incorrect username.'});
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    userModel.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/',
    passport.authenticate('local', {successRedirect: '/users',  failureFlash: true}),
    function (req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/users');
    });


module.exports = router;