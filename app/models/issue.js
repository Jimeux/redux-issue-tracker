const mongoose = require('mongoose')
const User     = require('./user')
const Activity = require('./activity')
const util     = require('../utils')

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'General',
    enum: ['General', 'Spelling', 'Too Difficult'] //etc
  },
  resolved: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  assignee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null
  },
  votes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    unique: true
  }],
  activities: [Activity.schema]
})

IssueSchema.methods.vote = function (user) {
  const index = this.votes.indexOf(user._id)

  if (index >= 0)
    this.votes.splice(index, 1)
  else
    this.votes.push(user._id)
}

IssueSchema.statics.defaultSelectOpts = function () {
  return [
    {path: 'creator', select: '_id username'},
    {path: 'assignee', select: '_id username'},
    {path: 'activities', select: '_id content type createdAt'},
    {path: 'activities.user', select: '_id username'},
    {path: 'activities.taggedUser', select: '_id username'}
  ]
}

IssueSchema.statics.jsonFormat = function (issue, user) {
  issue = issue.toJSON()
  issue.showDetails = false
  issue.voted = issue.votes.indexOf(user._id) >= 0
  issue.voteCount = issue.votes.length
  issue.creatorName = util.capitalise(issue.creator.username)
  issue.assigneeName = issue.assignee ? util.capitalise(issue.assignee.username) : 'Unassigned'
  return issue
}

module.exports = mongoose.model('Issue', IssueSchema, 'issues')