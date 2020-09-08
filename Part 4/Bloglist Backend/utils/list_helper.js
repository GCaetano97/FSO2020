const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0) {
        return 0
    } else if(blogs.length === 1) {
        return blogs[0].likes
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const likesArray = []

    blogs.forEach(element => {
        likesArray.push(element.likes)
    });
    return likesArray.reduce(reducer)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) {
        return null
    } else if(blogs.length === 1) {
        let mostLiked = blogs[0]

        delete mostLiked._id
        delete mostLiked.url
        delete mostLiked.__v

        return mostLiked
    }

    let mostLiked = blogs[0]

    blogs.forEach(blog => {
        if(blog.likes > mostLiked.likes){
            mostLiked = blog
        }
    })

    delete mostLiked._id
    delete mostLiked.url
    delete mostLiked.__v

    return mostLiked
}

const mostBlogs = (blogs) => {
    if(blogs.length === 1){
        return null
    }

    const groupedBlogs = _.groupBy(blogs, 'author')

    const sortedBlogs = Object.keys(groupedBlogs).map((author) => {
      return {author, blogs: groupedBlogs[author]}
    })
    .sort((a, b) => {
      return b.blogs.length - a.blogs.length;
    })

  return { author: sortedBlogs[0].author, blogs: sortedBlogs[0].blogs.length }
}

module.exports={
    dummy, totalLikes, favoriteBlog, mostBlogs
}