const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUserId middleware')
  User.getById(req.params.id)
    .then(user => {
      if(!user || Object.keys(user).length === 0) {
        res.status(404).json({
          message: "user not found"
        })
      } else {
        req.user = user
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "something went wrong",
        err: err.message,
        stack: err.stack
      })
    })
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser middleware')
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePost middleware')
  next()
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost }