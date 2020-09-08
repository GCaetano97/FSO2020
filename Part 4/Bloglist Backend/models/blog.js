const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')


const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: ((document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
    })
})


module.exports = mongoose.model('Blog', blogSchema)