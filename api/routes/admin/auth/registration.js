const {Router} = require('express') 
const router = Router()
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const {registerValidators} = require('./validators')
const User = require('../../../models/user')

router.post('/admin-register', registerValidators, async (req, res) => {
  try {
    const {login, password} = req.body
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        msg: errors.array()[0].msg
      })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const admin = new User({
      login, password: hashPassword, role: "admin"
    })
    await admin.save()
    res.json({
      msg: "Created new Admin"
    })

  } catch (e) {
    console.log(e)
  }
})

module.exports = router