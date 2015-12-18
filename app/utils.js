const crypto = require('crypto')

/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10)
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
const uid = function (len) {
  const buf = []
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charlen = chars.length

  for (let i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)])
  }

  return buf.join('')
}

const hashToken = function(token) {
  return crypto.createHash('sha1').update(token).digest('hex')
}

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}


function convertPathToUrl(question, req) {
  const url = req.protocol + '://' + req.get('host')
  if (question.user.avatar && question.user.avatar.indexOf('://') === -1)
    question.user.avatar = url + question.user.avatar
  return question
}

function capitalise(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

exports.capitalise = capitalise
exports.uid = uid
exports.hashToken = hashToken
exports.convertPathToUrl = convertPathToUrl