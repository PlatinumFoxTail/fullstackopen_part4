require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

//MongoDB connection via .env
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('MongoDB connection success!')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

//blog schema Mongoose
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

//middleware for allowing cross-origin-requests
app.use(cors())
//middleware for parsing request body
app.use(express.json())


app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
