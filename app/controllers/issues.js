'use strict'

const express = require('express')
const passport = require('passport')
const Issue = require('../models/issue')
const Activity = require('../models/activity')
const User = require('../models/user')
const router = express.Router()

router.use(passport.authenticate('bearer', {session: false}))

router.route('/')
    .get(index)
    .post(create)
    .patch(batchUpdate)

router.route('/:id')
    .all(isEditor)
    .patch(update)

router.route('/:id/plusone')
    .post(plusOne)

function index(req, res) {

  Issue.find({})
      .populate(Issue.defaultSelectOpts())
      .sort('-createdAt')
      .exec((err, issues) => {
        if (err)
          res.sendStatus(500)
        else {
          issues = issues.map((i) => Issue.jsonFormat(i, req.user))
          res.json({issues})
        }
      })
}

function create(req, res) {
  const issue = new Issue({
    //category: 'General',
    title: req.body.title,
    creator: req.user
  })

  issue.activities.push({
    user: req.user,
    content: req.body.description,
    type: Activity.Types.CREATED
  })

  saveIssue(res, issue, req.user, (err) => {
    res.status(422).json(err.errors)
  })
}

function update(req, res) {
  Issue.findById(req.params.id, (err, issue) => {
    if (err)
      res.sendStatus(422)
    else {
      const field = req.body.field
      const value = req.body.value
      issue[field] = value
      saveIssue(res, issue, req.user, () => res.sendStatus(422))
    }
  })
}

function batchUpdate(req, res) {
  const ids = req.body.issues
  const field = req.body.field
  const value = req.body.value
  const user = req.user

  const update = {}
  update[field] = value

  let type = null
  let content = null
  let taggedUser = null

  if (field === 'assignee') {
    type = Activity.Types.ASSIGNED_TO
    taggedUser = value
  } else if (field === 'priority') {
    type = Activity.Types.MARKED_AS
    content = value
  } else if (field === 'resolved') {
    type = Activity.Types.CHANGED_STATUS
    content = value ? 'resolved' : 'unresolved'
  }

  const activity = {user, content, type, taggedUser}

  Issue.where({'_id': {$in: ids}})
      .setOptions({multi: true})
      .update({$set: update, $push: {'activities': activity}}, (err, count) => {
        if (err) {
          console.log(err)
          res.sendStatus(500)
        } else {
          Issue.find({'_id': {$in: ids}})
              .populate(Issue.defaultSelectOpts())
              .sort('-createdAt')
              .exec((err, issues) => {
                if (err)
                  res.sendStatus(500)
                else {
                  issues = issues.map((i) => Issue.jsonFormat(i, req.user))
                  res.json({issues: issues})
                }
              })
        }
      })
}

function plusOne(req, res) {
  Issue.findById(req.params.id, (err, issue) => {
    if (err)
      res.sendStatus(422)
    else {
      issue.vote(req.user)
      saveIssue(res, issue, req.user, () => res.sendStatus(422))
    }
  })
}

function saveIssue(res, issue, user, errCallback) {
  issue.save((err, issue) => {
    if (err)
      errCallback(err)
    else {
      issue.populate(Issue.defaultSelectOpts(), (err, issue) => {
        if (err)
          res.sendStatus(500)
        else
          res.json(Issue.jsonFormat(issue, user))
      })
    }
  })
}

function isEditor(req, res, next) {
  if (req.user.adminLevel < User.roles().EDITOR)
    res.sendStatus(401)
  else
    next()
}

module.exports = router