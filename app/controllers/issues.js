const express = require('express')
const passport = require('passport')
const Issue = require('../models/issue')
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
          res.json({issues: issues})
        }
      })
}

function create(req, res) {
  const issue = new Issue({
    //category: 'General',
    title: req.body.title,
    description: req.body.description,
    creator: req.user
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
  const update = {}
  update[req.body.field] = req.body.value

  Issue.where({'_id': {$in: ids}})
      .setOptions({ multi: true })
      .update({ $set: update }, (err, count) => {
        if (err)
          res.sendStatus(500)
        else
          res.send(req.body.issues)
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