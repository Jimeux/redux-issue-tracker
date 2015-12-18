// Libraries
const config      = require('./config')
const utils       = require('./utils')
const oauth2orize = require('oauth2orize')
const passport    = require('passport')
const server      = oauth2orize.createServer()

// Models
const User         = require('./models/user')
const Client       = require('./models/client')
const AccessToken  = require('./models/accessToken')

/**
 * Implements the Resource Owner Password Credentials Grant flow
 * [1] http://tools.ietf.org/html/rfc6749#page-37
 * [2] http://oauthlib.readthedocs.org/en/latest/oauth2/grants/password.html
 *
 * Clients are separate entities to Users and represent apps. The Client
 * will be authenticated by its Client ID and Client Secret by the
 * strategies defined in auth.js before being passed to this function.
 *
 * This function verifies the User's identity and generates a new access token.
 *
 * @param {String}   client   - Authenticated Client instance
 * @param {String}   username - User's username
 * @param {String}   password - User's password
 * @param {String}   scope    - Oauth scope type
 * @param {Function} done     - passport callback
 */
server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  User.findOne({username: username}, (err, user) => {
    if (err)
      return done(err)
    if (!user)
      return done(null, false)

    user.verifyPassword(password, (err, isMatch) => {
      if (err)
        return done(err)
      if (!isMatch)
        return done(null, false)

      AccessToken.remove({
        userId: user._id,
        clientId: client.clientId
      }, (err) => {
        if (err)
          return done(err)
      })

      AccessToken.createFrom(client.clientId, user, scope, done)
    })
  })
}))

/**
 * Specify the passport strategies to use to authenticate Clients.
 * Set session to false, since we're not using cookies.
 */
exports.token = [
  passport.authenticate(['oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler()
]