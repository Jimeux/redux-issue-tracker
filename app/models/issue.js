const mongoose = require('mongoose');
const Material = require('./material');
const User     = require('./user');
const util     = require('../utils');

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    default: null
  },
  priority: {
    type: String,
    default: 'Medium',
    enum: ['Urgent', 'High', 'Medium', 'Low'],
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
  material: {
    type: mongoose.Schema.ObjectId,
    ref: 'Material',
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
  }]
});

IssueSchema.methods.vote = function (user) {
  const index = this.votes.indexOf(user._id);

  if (index >= 0)
    this.votes.splice(index, 1);
  else
    this.votes.push(user._id);
}

IssueSchema.statics.defaultSelectOpts = function () {
  return [
    {path: 'creator', select: '_id username'},
    {path: 'assignee', select: '_id username'},
    {path: 'material', select: '_id title type level index'}
  ];
}

IssueSchema.statics.jsonFormat = function (issue, user) {
  issue = issue.toJSON();
  issue.showDetails = false;
  issue.voted = issue.votes.indexOf(user._id) >= 0;
  issue.voteCount = issue.votes.length;
  issue.creatorName = util.capitalise(issue.creator.username);
  issue.assigneeName = issue.assignee ? util.capitalise(issue.assignee.username) : 'Unassigned';
  const m = issue.material;
  issue.materialString = `Lv${m.level} ${m.type} ${m.index}`;
  return issue;
}

module.exports = mongoose.model('Issue', IssueSchema, 'issues');