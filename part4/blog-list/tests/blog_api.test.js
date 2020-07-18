const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const config = require('../utils/config')

describe('api tests', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})

        for (let blog of helper.initialBlogs) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
    })

    helper.blogsInDb()


    test('api: blogs are returned as json', async () => {
        console.log('entered test')

        const response = await api.get('/api/blogs')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')

        //.expect('Content-Type', /application\/json/)
    })

    test('api: correct number of blogs is returned', async () => {
        console.log('entered test')

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('api: correct name of id property', async () => {
        console.log('entered test')

        const response = await api.get('/api/blogs')

        for (let index = 0; index < response.body.length; index++) {
            expect(response.body[index].id).toBeDefined()
        }
    })

    test('api: every new blog is added correctly', async () => {
        console.log('entered test')

        const newBlog = {
            title: 'A single test blog',
            author: 'me :)',
            url: 'test blog url',
            likes: 44
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

         const blogsAtEnd = await helper.blogsInDb()

         expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    afterAll(() => {
        mongoose.connection.close()
    })

})
