import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from'./services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ content: null })

  const blogFormRef = useRef()
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  console.log(sortedBlogs)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (content, color = '#228B22') => {

    if(content instanceof Error){
      const errorMessage =
       content.response.data.error !== undefined
         ? content.response.data.error
         : 'Opps something went wrong'

      setMessage({ content: errorMessage, color: 'red' })
      setTimeout(() => {
        setMessage({ content: null })
      }, 5000)
    } else{
      setMessage({ content, color })
      setTimeout(() => {
        setMessage({ content: null })
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const addBlog = async (blogObject) => {

    try{
      const blogPost = await blogService.create(blogObject)
      console.log('posted blog ', blogPost)

      setBlogs(blogs.concat(blogPost))
      showNotification(`Successfully added ${blogObject.title} to the list!`)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log(exception)
      showNotification(exception)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      console.log('logged as ', user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`Successfully logged as ${user.name}`)
    } catch (exception){
      console.log('wrong credentials')
      showNotification(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleDeleteClick = async (blogObject) => {
    if(window.confirm(`Do you want to delete ${blogObject.title} from the list?`)){
      try{
        console.log(blogObject)
        await blogService.remove(blogObject)
        setBlogs(await blogService.getAll())
        showNotification(`Successfully deleted ${blogObject.title} from the list`)
      }
      catch(exception){
        showNotification(exception)
      }
    }
  }

  
  const handleLikeButton = async (blogObject, likes, setLikes) => {
    console.log('clicked', blogObject.likes )
    const updatedBlog = {
      user: blogObject.user,
      likes: likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
      id: blogObject._id
    }

    const update = await blogService.update(updatedBlog)
    console.log(update)
    setLikes(update.data.likes)

  }

  return (
    <div>
      <Notification message={message} />
      <h2>Log in to application</h2>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>Logout</button>
          </p>
          <h2>Create a New Blog</h2>
          <Togglable buttonId="newBlog-button" buttonLabel="new blog" ref={blogFormRef} >
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
        </div>
      )}

      <h2>blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} removeBlog={handleDeleteClick} handleLikeButton={handleLikeButton} />
      ))}
      <p />
    </div>
  )
}

export default App