/**
 * This file is imported into app.js, making these strategies
 * available to passport.
 */

// Libraries
var config = require('./config'),
    utils = require("./utils"),
    passport = require('passport'),
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy;

// Models
var User = require('./models/user'),
    Client = require('./models/client'),
    AccessToken = require('./models/accessToken');

/**
 * This strategy is used to verify Clients before passing on
 * the User's credentials to the methods in oauth2.js
 */
passport.use(new ClientPasswordStrategy(Client.verify.bind(Client)));

/**
 * This strategy verifies a User's access token directly
 */
passport.use(new BearerStrategy((accessToken, done) => {
      //TODO: Add token encryption back in
      //utils.hashToken(accessToken)

      AccessToken.findOne({token: accessToken}, (err, token) => {

        if (err)
          return done(err);
        if (!token)
          return done(null, false);

        if (Math.round((Date.now() - token.created) / 1000) > config.get('security:tokenLife')) {
          AccessToken.remove({token: accessToken}, (err) => {
            if (err)
              return done(err);
          });
          return done(null, false, {message: 'Token expired'});
        }

        if (token.userId === null)
          return done(null, false);

        User.findOne({_id: token.userId}, (err, user) => {
          if (err)
            return done(err);
          if (!user)
            return done(null, false);
          // to keep this example simple, restricted scopes are not implemented,
          // and this is just for illustrative purposes
          var info = {scope: '*'};
          done(null, user, info);
        });
      });
    }
));