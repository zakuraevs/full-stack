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

    //checking if likes are given
    //if not, defaulting to zero
    if(!('likes' in request.body)) {
        console.log('no likes were given, defaulting to 0')
        blog.likes = 0
    }

    //checking if author & url are given
    //if not responding with 400 Bad Request
    if(!('author' in request.body) && !('url' in request.body)) {
        console.log('author & url missing from request')
        response.status(400).end()
        return
    }

    const savedBlog = await blog.save()
    response.json(savedBlog)
})

module.exports = blogsRouter