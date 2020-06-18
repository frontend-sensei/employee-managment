const {body} = require('express-validator')

exports.employeeValidators = [
  body('fullName')
    .isString()
    .withMessage('FullName length must be string')
    .isLength({min: 3})
    .withMessage('FullName length must be at least 3 characters')
    .matches(/^[A-Za-z\s]+$/).withMessage('FullName must be alphabetic.'),

  body('dateOfBirth')
    .isString()
    .withMessage('Date of birth length must be string')
    .trim(),

  body('position')
    .isString()
    .withMessage('Position must be string')
    .matches(/^[A-Za-z\s]+$/).withMessage('Position must be alphabetic.'),

  body('salary')
    .isNumeric()
    .withMessage('Salary must be numeric'),
]

// exports.loginValidators = [  
//   body('password')
//     .isLength({min: 3, max: 20})
//     .withMessage('Password length must be at least 3 characters')
//     .custom(async (value, {req}) => {

//       try {
//         const login = req.body.login
//         const candidate = await User.findOne({ login })

//         if (candidate) {
//           // User with same login exists
//           const areSame = await bcrypt.compare(value, candidate.password)

//           if (areSame) {
//             return true
//           } else {
//             return Promise.reject('Wrong password.')
//           }
//         } else {
//           return Promise.reject('User with same login doesn`t exist.')
//         }

//       } catch (e) {
//         console.log(e)
//       }

//     })
// ]