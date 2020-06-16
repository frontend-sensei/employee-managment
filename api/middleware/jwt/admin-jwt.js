const jwt = require('jsonwebtoken')
const UnauthorizedError = require('./errors/UnauthorizedError')
const keys = require('../../keys')

module.exports = function(req, res, next) {
  
  let token, decodedToken

  if (req.method === 'OPTIONS' && req.headers.hasOwnProperty('access-control-request-headers')) {
    var hasAuthInAccessControl = !!~req.headers['access-control-request-headers']
                                  .split(',').map(function (header) {
                                    return header.trim()
                                  }).indexOf('authorization')

    if (hasAuthInAccessControl) {
      return next()
    }
  }

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ')
    if (parts.length == 2) {
      var scheme = parts[0]
      var credentials = parts[1]

      if (/^Bearer$/i.test(scheme)) {
        token = credentials
      } else {
        if (credentialsRequired) {
          return next(new UnauthorizedError('credentials_bad_scheme', { message: 'Format is Authorization: Bearer [token]' }))
        } else {
          return next()
        }
      }
    } else {
      return next(new UnauthorizedError('credentials_bad_format', { message: 'Format is Authorization: Bearer [token]' }))
    }
  }

  if (!token) {
    return next(new UnauthorizedError('credentials_required', { message: 'No authorization token was found' }))
  }

  try {
    decodedToken = jwt.verify(token, keys.JWT_SECRET)
  } catch (err) {
    return next(new UnauthorizedError('invalid_token', err))
  }

  try {
    if (decodedToken.role === 'admin') {
      next()
    } else {
      return res.status(401).send('Access Denied: You dont have correct privilege to perform this operation')
    }
  } catch (e) {
    res.status(401).send('Invalid Token')
  }
  
}