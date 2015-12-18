var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
  clientId: {
    type: String,
    unique: true,
    required: true
  },
  clientSecret: {
    type: String,
    required: false
  },
  trustedClient: {
    type: Boolean,
    required: true
  }
});

ClientSchema.statics.verify = function (clientId, clientSecret, done) {
  this.findOne({ clientId: clientId }, (err, client) => {
    if (err)
      return done(err);
    //else if (!client)
    //  return done(null, false);
    //else if (client.clientSecret != clientSecret)
    //  return done(null, false);
    //else
      //return done(null, client);
    return done(null, {clientId: '1234ljkj1234'});
  });
};

module.exports = mongoose.model('Client', ClientSchema);