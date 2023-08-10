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
        next()
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "something went wrong",
        err: err.message,
        stack: err.stack
      })
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser middleware')
  const { name } = req.body
  if(!name || Object.keys(name).length === 0) {
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePost middleware')
  const { text } = req.body
  if(!text || Object.keys(text).length === 0) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost }