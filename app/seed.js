const mongoose = require('mongoose')
const User = require('./models/user')
const Issue = require('./models/issue')
const config = require('../config')

mongoose.connect(config.mongoose.uri)

const users = [
  {
    username: 'anthony',
    password: 'passer',
    adminLevel: 2
  },
  {
    username: 'nathan',
    password: 'passer',
    adminLevel: 1
  },
  {
    username: 'jason',
    password: 'passer',
    adminLevel: 0
  }
]

const issues = [
  {
    title: 'Questionable content',
    description: `I feel like drawing attraction to the protagonist's prosthetic limb is not politically correct.`,
    category: 'General',
    creator: '565fd696fee263a604c0a331'
  }
]

//User.remove({}, () => {})
//Issue.remove({}, () => {})
//createUsers()
//createIssues()

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

function createIssues() {
  Issue.remove({}, () => {
    for (let i of issues) {
      /*let issue = new Issue(i)
      issue.save((err, issue) => {
        if (err)
          console.log(err)
        else
          console.log(`Created issue: ${issue.title}`)
      })*/
    }
  })
}