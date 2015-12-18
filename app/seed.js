const mongoose = require('mongoose')
const Material = require('./models/material')
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
    material: '565fd57deadd309e049caebc',
    creator: '565fd696fee263a604c0a331'
  }
]

const materials = [
  {
    title: `Mr. Hunt's Prosthetic Limb`,
    level: 1,
    type: 'WHQ',
    index: 1
  },
  {
    title: `Ms. Smith's Toys`,
    level: 1,
    type: 'WHQ',
    index: 2
  },
  {
    title: `Ms. Franklin's Medical Appointment`,
    level: 1,
    type: 'WHQ',
    index: 3
  }
]


//User.remove({}, () => {})
//Issue.remove({}, () => {})
//Material.remove({}, () => {})
//createUsers()
createMaterials()
//createIssues()

function createMaterials() {
  Material.remove({}, () => {
    for (let m of materials) {
      let material = new Material(m)
      material.save((err, material) => {
        if (err)
          console.log(err)
        else
          console.log(`Created material: ${material.title}`)
      })
    }
  })
}

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