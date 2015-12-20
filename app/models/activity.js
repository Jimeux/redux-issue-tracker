const mongoose = require('mongoose')
const User     = require('./user')

const Types = {
  CREATED: 'created',
  COMMENTED: 'commented',
  MARKED_AS: 'marked as',
  ASSIGNED_TO: 'assigned to',
  CHANGED_STATUS: 'status changed to'
}

const keys = Object.keys(Types)
const acceptedValues = keys.map(key => Types[key])

const ActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  taggedUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  content: {
    type: String
  },
  type: {
    type: String,
    enum: acceptedValues,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

//ActivitySchema.methods.vote = function () {}

ActivitySchema.statics.Types = Types

module.exports = mongoose.model('Activity', ActivitySchema, 'activities')