const {body} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

exports.registerValidators = [
  body('login')
    .isLength({min: 3})
    .withMessage('Login length must be at least 3 characters')
    .trim(),

  body('password', 'Password length must be at least 3 characters')
    .isLength({min: 3, max: 32})
    .isAlphanumeric()
    .trim(),
]

exports.loginValidators = [  
  body('password')
    .isLength({min: 3, max: 20})
    .withMessage('Password length must be at least 3 characters')
    .custom(async (value, {req}) => {

      try {
        const login = req.body.login
        const candidate = await User.findOne({ login })

        if (candidate) {
          // User with same login exists
          const areSame = await bcrypt.compare(value, candidate.password)

          if (areSame) {
            return true
          } else {
            return Promise.reject('Wrong password.')
          }
        } else {
          return Promise.reject('User with same login doesn`t exist.')
        }

      } catch (e) {
        console.log(e)
      }

    })
]