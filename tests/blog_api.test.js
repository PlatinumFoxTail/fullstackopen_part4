const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

//ensuring db has two blogs before each test
beforeEach(async () => {
    await Blog.deleteMany({})
    
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body.length, 2)
})
  
test('the first blog is about React patterns', async () => {
    const response = await api.get('/api/blogs')
    
    const titles = response.body.map(e => e.title)
    assert(titles.includes('React patterns'))
})

//making request to the API to check that 'id' is used instead of '_id'
test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
  
    //checking only id field and no _id in each blog
    blogs.forEach(blog => {
      assert(blog.id !== undefined, 'id field missing')  
      assert(blog._id === undefined, '_id field should not be present')
    })
})
  
test('blog of correct format can be added', async () => {
    //number of blogs prior adding new blog
    const blogsPriorAdd = await helper.blogsInDb()
  
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    }
  
    //POST request to add new blog
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    //number of blogs after adding new blog
    const blogsPostAdd = await helper.blogsInDb()
  
    //check number of blogs increased
    assert.strictEqual(blogsPostAdd.length, blogsPriorAdd.length + 1)
})

after(async () => {
  await mongoose.connection.close()
})