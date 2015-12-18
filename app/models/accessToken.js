const config = require('../config')
const mongoose = require('mongoose')
const utils = require("../utils")

var AccessTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  userId: {
    type: String, //TODO: Make reference to User model
    required: true,
    unique: true
  },
  scope: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now
  }
})

AccessTokenSchema.statics.createFrom = function (clientId, user, scope, callback) {
  const accessTokenValue = utils.uid(256)
  const accessTokenHash = accessTokenValue //utils.hashToken(accessTokenValue),

  const accessTokenData = {
    token: accessTokenHash,
    clientId: clientId,
    userId: user._id,
    scope: scope
  }

  this.create(accessTokenData, (err) => {
    if (err)
      return callback(err)
    else
      return callback(null, accessTokenValue, null, {
        expires_in: config.get('security:tokenLife'),
        user_id: user._id,
        username: user.username,
        role: user.adminLevel
      })
  })
}

module.exports = mongoose.model('AccessToken', AccessTokenSchema, 'tokens')