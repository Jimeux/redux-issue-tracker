const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')

const authenticateBearer = passport.authenticate('bearer', {session: false})

router.get('/editors', authenticateBearer, (req, res) => {

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