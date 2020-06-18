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