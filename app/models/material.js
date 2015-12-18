var mongoose = require('mongoose');

var MaterialSchema = new mongoose.Schema({
  level: {
    type     : Number,
    enum     : [0, 1, 2, 3, 4, 5]
  },
  type: {
    type     : String,
    required : true,
    enum     : ['FCE', 'BEP', 'WHQ', 'EVIU'] //etc
  },
  index: {
    type     : Number,
    required : true,
    min      : 1
  },
  title: {
    type     : String,
    required : true
  }
});

module.exports = mongoose.model('Material', MaterialSchema, 'materials');