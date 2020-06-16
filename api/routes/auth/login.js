const {Router} = require('express') 
const router = Router()
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
const {loginValidators} = require('./validators')
const keys = require('../../keys')

router.post('/admin-login', loginValidators, async (req, res) => {
  
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      msg: errors.array()[0].msg
    })
  }

  try {
    const user = {
      user: req.body.login,
      role: 'admin'
    }
    const token = jwt.sign(user, keys.JWT_SECRET, { 
      expiresIn: '1d'
    });
    console.log('Authenticated')
    
    res.json({
      token 
    })

  } catch (e) {
    console.log(e)
  } 
})

module.exports = router