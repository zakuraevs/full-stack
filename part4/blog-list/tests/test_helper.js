const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Test blog 1',
    author: 'Bob',
    url: 'url1',
    likes: 1
  },
  {
    title: 'Test blog 2',
    author: 'Alice',
    url: 'url2',
    likes: 2
  },
  {
    title: 'Test blog 3',
    author: 'Joe',
    url: 'url3',
    likes: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}