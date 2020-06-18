const {Schema, model} = require('mongoose')

const employeeSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
})

module.exports = model('Employee', employeeSchema)