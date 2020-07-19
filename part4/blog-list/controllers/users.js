const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { title: 1, author: 1, url: 1, lies: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (!('username' in request.body) || !('password' in request.body)) {
        console.log('username and/or password missing')
        response.status(400).json({ error: 'username and/or password missing' })
        return
    } else if (request.body.username.length < 3 || request.body.password.length < 3) {
        console.log('username and/or password too short')
        response.status(400).json({ error: 'username and/or password missing' })
        return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter