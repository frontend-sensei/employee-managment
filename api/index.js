const express = require('express')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')


/* Middleware */
const notFoundRequest = require('./middleware/404')


/* Routes */
const registrationRoutes = require('./routes/auth/registration')
const loginRoutes = require('./routes/auth/login')
const employeeRoutes = require('./routes/employee/employee')


/* App Keys */
const keys = require('./keys')


/* Application initialization */
const app = express()

/* For access to public files */
app.use(express.static(path.join(__dirname, 'public')))

/* Parse incoming requests */
app.use(bodyParser.urlencoded({ extended: false })) // x-www-urlencoded
app.use(bodyParser.json()) // json

app.use(helmet())

/* Use middleware */
app.use(cors())

/* Use Routes */
app.use('/api', registrationRoutes)
app.use('/api', loginRoutes)
app.use('/api/employee', employeeRoutes)


// Error middleware after all routes
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    console.log(err)
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});

app.use(notFoundRequest)

const PORT = process.env.PORT || 3000

async function start() {
  try {
    
    await mongoose.connect(keys.MONGODB_URI, {
      useUnifiedTopology: true, 
      useNewUrlParser: true,
      useFindAndModify: false
    })

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })

  } catch (e) {
    console.log(e)
  }
}
start()





