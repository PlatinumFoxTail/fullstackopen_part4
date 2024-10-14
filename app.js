const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

//MongoDB connection via .env
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('MongoDB connection success!')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  });

//middleware for allowing cross-origin-requests
app.use(cors())
//middleware for parsing request body
app.use(express.json())

//routes
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

//error handling middleware (placeholder)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app