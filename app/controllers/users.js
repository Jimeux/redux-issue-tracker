const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')
const AccessToken = require('../models/accessToken')

router.use(passport.authenticate('bearer', {session: false}))

router.get('/logout', (req, res) => {
  AccessToken.remove({userId: req.user._id}, (err) => {
    res.sendStatus(200)
  })
})

router.get('/editors', (req, res) => {
  User.where('adminLevel')
      .gte(User.roles().EDITOR)
      .exec((err, users) => {
        if (err)
          res.sendStatus(500)
        else
          res.json(users.map(u => User.jsonFormat(u)))
      })
})

module.exports = router