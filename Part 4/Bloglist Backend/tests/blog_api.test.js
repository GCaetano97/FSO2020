const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



let token = '';

const initialBlogs = [ 
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[3])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[4])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[5])
    await blogObject.save()

    const response = await api.post('/api/login').send({
        username:'Goncalo',
        password:'testtesting'
    })

    token = response.body.token
    console.log(token)
})

test('correct amount of blogs posts and they are returned as json', async () => {
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('sucessfully post a new blog', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17f2",
        title: "A random title",
        author: "Gonçalo Caetano",
        url: "www.test.test",
        likes: 895,
        __v: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length+1)
    expect(titles).toContain(
        'A random title'
    )
})

test('no likes no problem', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17f2",
        title: "A random title",
        author: "Gonçalo Caetano",
        url: "www.test.test",
        __v: 0
    }

    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length+1)
    expect(titles).toContain(
        'A random title'
    )
    
})

test('no url and name no creation', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17f2",
        author: "Gonçalo Caetano",
        likes: 2,
        __v: 0
    }

    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

})

test('delete blog', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17f2",
        title: "A random title",
        author: "Gonçalo Caetano",
        url: "www.test.test",
        __v: 0
    }

    await api 
      .post('/api/blogs')
      .send(newBlog)

    await api
      .delete('/api/blogs/5a422bc61b54a676234d17f2')
      .expect(204)
      
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('update likes on a post', async () => {
    const updatedBlog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 55,
        __v: 0
    }

    await api
      .put('/api/blogs/5a422bc61b54a676234d17fc')
      .send(updatedBlog)
      .expect(204)
    
    const allBlogs = await api.get('/api/blogs')
    expect(allBlogs.body[5].likes).toBe(55)
})

afterAll(() => {
    mongoose.connection.close()
})