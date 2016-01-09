const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')

/* Auth */
const passport = require('passport')
const auth = require('./app/auth')
const oauth2 = require('./app/oauth2')

/* Controllers */
const issues = require('./app/controllers/issues')
const users = require('./app/controllers/users')

const app = express()

/* DB setup */
const mongoose = require('mongoose')
mongoose.connect(config.mongoose.uri)

/* View engine setup */
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'app/views'))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/public', express.static(__dirname + '/public'))

app.use(passport.initialize())
app.use(passport.session())

/* Set up routes */
app.get('/', (req, res) => {
  res.render('index')
})
app.use('/issues', issues)
app.use('/users', users)
app.post('/oauth/token', oauth2.token)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

/** error handlers */

// development error handler (will print stacktrace)
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler (no stacktraces leaked to user)
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


module.exports = app