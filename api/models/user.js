const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  name: String,
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  avatarUrl: String
})

module.exports = model('User', userSchema)