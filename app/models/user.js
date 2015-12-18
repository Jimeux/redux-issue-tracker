const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const util     = require('../utils');

const UserSchema = new mongoose.Schema({
  username: {
    type     : String,
    unique   : true,
    required : true
  },
  password: {
    type     : String,
    required : true
  },
  adminLevel: {
    type     : Number,
    required : true,
    default  : 1,
    enum     : [0, 1, 2]
  }
});

/**
 *  Encrypt user's password if modified.
 *  Executed before each user.save() call.
 */
UserSchema.pre('save', function(callback) {
  var user = this;

  if (!user.isModified('password')) return callback();

  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });

  });
});

/**
 * Check plain text password against encrypted version
 * in the DB.
 */
UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err)
      return cb(err);
    else
      cb(null, isMatch);
  });
};

UserSchema.statics.roles = function() {
  return {
    USER: 0,
    EDITOR: 1,
    ADMIN: 2
  }
}

UserSchema.statics.jsonFormat = function (user) {
  return {
    _id: user.id,
    username: util.capitalise(user.username)
  }
}

module.exports = mongoose.model('User', UserSchema, 'users');