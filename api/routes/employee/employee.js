const {Router} = require('express') 
const router = Router()
const {validationResult} = require('express-validator')
const {employeeValidators} = require('./validators')
const Employee = require('../../models/employee')

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find()

    res.json({
      employees
    })
  } catch(e) {
    console.log(e)
  }
})

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
  try {
    await employee.save()

    res.json({
      msg: "New employee created",
      employee
    })
  } catch(e) {
    console.log(e)
  }
})

router.post('/edit', employeeValidators, async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      msg: errors.array()[0].msg
    })
  }

  try {
    const employee = await Employee.findById(req.body._id)
    delete req.body._id
    Object.assign(employee, req.body)
    await employee.save()

    res.json({
      msg: "Employee edited"
    })
  } catch(e) {
    console.log(e)
  }
})

router.post('/delete', async (req, res) => {
  const {_id} = req.body

  try {
    await Employee.deleteOne({ _id })
    res.json({
      msg: "Employee deleted"
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router