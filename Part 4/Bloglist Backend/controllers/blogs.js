const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findOne({ _id: request.params.id }).populate('user', { username: 1, name: 1 })
  
    if (!blog) {
      return response.status(404).end();
    }
  
    return response.json(blog);
  });

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    if(!body.title && !body.url){
        response.status(400).send({error: 'bad request'})
    } else {
   

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
    }
})

blogsRouter.put('/:id', async (request, response ) => {
    console.log(request.body)
    const { title, author, url, likes } = request.body

    if (!title) {
        return response.status(400).json({ error: 'Title missing'})
    }

    if (!url) {
        return response.status(400).json({ error: 'Url missing'})
    }

    const blog = { title, author, url, likes}

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

    if(!updatedBlog){
        return response.status(400).end()
    }

    return response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(request.params)

    const blog = await Blog.findOne({_id: request.params.id})
    console.log(blog)
    if (!request.token || decodedToken.id.toString() !== blog.user.toString()){
        return response.status(401).json({ error: 'token missing or invalid'})
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})





module.exports = blogsRouter