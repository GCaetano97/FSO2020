const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
    const body = request.body

    if(!body.username){
        response.status(400).send({error: 'username is required'})
    } else if (!body.password){
        response.status(400).send({error: 'password is required'})
    } else if (body.username.length < 3){
        response.status(400).send({error: 'username must contain at least 3 characters'})
    } else if (body.password.length < 3) {
        response.status(400).send({error: 'password must contain at least 3 characters'})
    } else {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
}})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter