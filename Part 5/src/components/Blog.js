import React, { useState } from 'react'


const Blog = ({ blog, removeBlog, handleLikeButton }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }




  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        {blog.title}<button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible} className='blogDetails'>
        <p>{blog.title}  <button onClick={toggleVisibility}>hide</button> </p>
        <p>{blog.url}</p>
        <p>{likes}<button onClick={() => handleLikeButton(blog, likes, setLikes)}>like</button></p>
        <p>{blog.author}</p>
        <button onClick={() => { removeBlog(blog)}} > Delete </button>
      </div>
    </div>
  )}

export default Blog
