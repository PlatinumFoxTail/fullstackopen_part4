const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

//get all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users)
})
//delete a user
usersRouter.delete('/:id', async (request, response) => {
  const userId = request.params.id
  const result = await User.findByIdAndDelete(userId)

  if (result) {
    response.status(204).end()
  } else {
    response.status(404).json({ error: 'user not found, hence not deleted' })
  }
})

module.exports = usersRouter