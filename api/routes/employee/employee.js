const {Router} = require('express') 
const router = Router()
const {validationResult} = require('express-validator')
const {employeeValidators} = require('./validators')
const Employee = require('../../models/employee')

router.post('/', employeeValidators, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      msg: errors.array()[0].msg
    })
  }

  const {fullName, dateOfBirth, position, salary} = req.body

  const employee = new Employee({
    fullName, dateOfBirth, position, salary
  })
  await employee.save()

  res.json({
    msg: "New employee created"
  })
  
})

module.exports = router