/**
 * This file is imported into app.js, making these strategies
 * available to passport.
 */

// Libraries
const config = require('./config')
const utils = require("./utils")
const passport = require('passport')
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy

// Models
const User = require('./models/user')
const Client = require('./models/client')
const AccessToken = require('./models/accessToken')

/**
 * This strategy is used to verify Clients before passing on
 * the User's credentials to the methods in oauth2.js
 */
passport.use(new ClientPasswordStrategy(Client.verify.bind(Client)))

/**
 * This strategy verifies a User's access token directly
 */
passport.use(new BearerStrategy((accessToken, done) => {
      //TODO: Add token encryption back in
      //utils.hashToken(accessToken)

      AccessToken.findOne({token: accessToken}, (err, token) => {

        if (err)
          return done(err)
        if (!token)
          return done(null, false)

        if (Math.round((Date.now() - token.created) / 1000) > config.get('security:tokenLife')) {
          AccessToken.remove({token: accessToken}, (err) => {
            if (err)
              return done(err)
          })
          return done(null, false, {message: 'Token expired'})
        }

        if (token.userId === null)
          return done(null, false)

        User.findOne({_id: token.userId}, (err, user) => {
          if (err)
            return done(err)
          if (!user)
            return done(null, false)
          // scope not implemented
          const info = {scope: '*'}
          done(null, user, info)
        })
      })
    }
))