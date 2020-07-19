const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

/*const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}*/

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    //const token = getTokenFrom(request)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    //not sure this will work
    //edit: it works!!!
    const blog = new Blog({ ...body, user: user._id })

    //checking if likes are given
    //if not, defaulting to zero
    if (!('likes' in request.body)) {
        console.log('no likes were given, defaulting to 0')
        blog.likes = 0
    }

    //checking if author & url are given
    //if not responding with 400 Bad Request
    if (!('author' in request.body) && !('url' in request.body)) {
        console.log('author & url missing from request')
        response.status(400).end()
        return
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(updated)
})

module.exports = blogsRouter