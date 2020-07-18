const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//blogsRouter.get('/', (request, response) => {
//    response.send('<h1>Phonebook app <3</h1>')
//  })

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    const blog = new Blog(request.body)

    if('likes' in request.body) {
        null
    } else {
        console.log('no likes were given, defaulting to 0')
        blog.likes = 0
    }

    const savedBlog = await blog.save()
    response.json(savedBlog)
})

module.exports = blogsRouter