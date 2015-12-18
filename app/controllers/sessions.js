const express  = require('express')
const passport = require('passport')
const router   = express.Router()

router.get('/logout', (req, res) => {
  //TODO: delete token
  res.redirect('/login')
})

module.exports = router