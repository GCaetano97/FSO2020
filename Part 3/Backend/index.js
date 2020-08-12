require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')


app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })

})

app.get('/info', (req,res,next) => {
  Person.countDocuments({}, (error, count) => {
    res.send(`<div>Phonebook has info for ${count} people,<p/>${Date()}</div>`)
  }).catch((error) => next(error))
})

app.get('/api/persons/:id', (req,res,next) => {
  Person.findById(req.params.id).then(person => {
    if (person){
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  console.log(req.params.id)
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, { number: req.body.number }, { runValidators: true })
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const name = body.name
  const number = body.number

  const person = new Person ({
    name: name,
    number: number,
    id: Math.floor(Math.random() * (100000 - 1)) + 1
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})



const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
