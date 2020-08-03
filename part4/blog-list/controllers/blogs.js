const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/:id/comments', async (request, response) => {

    const blog = await Blog.findById(request.params.id)
    console.log('blog: ', blog)

    if(!blog) {
        response.status(400).end()
        return
    }

    const comments = blog.comments
    console.log('comments: ', comments)

    const update = blog.comments.push(request.body.comment)
    console.log('updated comments: ', update)

    await blog.update(update)
    await blog.save()
    console.log('updated blog: ', blog)

    response.json(blog)

})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
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

    console.log(request.body)
    //NB: this doesnt work with the frontend, because both properties
    //are always sent, they are jsut empty.

    //checking if author & url are given
    //if not responding with 400 Bad Request
    if (!('author' in request.body) || !('url' in request.body) || request.body.author === '' || request.body.url === '') {
        console.log('author & url missing from request')
        response.status(400).end()
        return
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    console.log('$log: savedBlog.user', savedBlog.user)

    response.json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {

    console.log('id from request: ', request.params.id)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const userOfBlogId = await (await Blog.findById(request.params.id)).user.toString()
    console.log('id of creator', userOfBlogId)
    console.log('id in token', decodedToken.id.toString())

    if (!request.token || (decodedToken.id.toString() !== userOfBlogId) ) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

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