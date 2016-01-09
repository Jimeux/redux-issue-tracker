'use strict'

const mongoose = require('mongoose')
const User = require('./models/user')
const Issue = require('./models/issue')
const Activity = require('./models/activity')
const config = require('../config')

mongoose.connect(config.mongoose.uri)

const users = [
  {
    username: 'james',
    password: 'passer',
    adminLevel: 2
  },
  {
    username: 'baynes',
    password: 'passer',
    adminLevel: 2
  },
  {
    username: 'dregston',
    password: 'passer',
    adminLevel: 0
  },
  {
    username: 'imatool',
    password: 'passer',
    adminLevel: 0
  },
  {
    username: 'edington',
    password: 'passer',
    adminLevel: 1
  }
]

const issues = [
  {
    title: 'Questionable content',
    description: `I feel like drawing attraction to the protagonist's prosthetic limb is not politically correct.`,
    //creator: '565fd696fee263a604c0a331'
  },
  {
    title: 'This is a good issue to raise',
    description: `And some kind of expansion`
  },
  {
    title: 'The issue with this thing is...',
    description: `I dunno`
  },
  {
    title: 'The other issue with this thing is...',
    description: `I dunno`
  },
  {
    title: 'One more issue with this thing is...',
    description: `I dunno`
  },
  {
    title: 'If you ask me what is wrong with this, then...',
    description: `I'll tell you some other time.`
  },
  {
    title: 'There must be an easier way to populate data.',
    description: `Use a faker library.`
  },
  {
    title: 'I would have an issue with using lorem ipsum',
    description: `It is pretty tedious.`
  },
  {
    title: 'How many issues so far?',
    description: `It is pretty tedious.`
  },
  {
    title: 'Do you want any more?',
    description: `It is pretty tedious.`
  },
  {
    title: 'Problem: Yes or no?',
    description: `It is pretty tedious.`
  },
  {
    title: 'Too many issues to think about.',
    description: `It is pretty tedious.`
  },
  {
    title: 'If you want an issue, then just ask.',
    description: `It is pretty tedious.`
  },
  {
    title: `Here's one for ya`,
    description: `It is pretty tedious.`
  },
  {
    title: `I'm not finished yet`,
    description: `I never actually started though.`
  },
]

User.remove({}, () => {})
//Issue.remove({}, () => {})
//createUsers()
//createIssuesWithUser()

function createUsers() {
  User.remove({}, () => {
    for (let u of users) {
      let user = new User(u)
      user.save((err, user) => {
        if (err)
          console.log(err)
        else
          console.log(`Created user: ${user.username}`)
      })
    }
  })
}

function createIssuesWithUser() {
  User.findOne((err, user) => {
    if (err)
      return
    if (user) {
      createIssues(user._id)
    }
  })
}

function createIssues(userId) {
  Issue.remove({}, () => {
    for (let i of issues) {

      let issue = new Issue(i)
      issue.creator = userId
      issue.activities.push({
        user: userId,
        content: i.description,
        type: Activity.Types.CREATED
      })

      issue.save((err, issue) => {
        if (err)
          console.log(err)
        else
          console.log(`Created issue: ${issue.title}`)
      })
    }
  })
}