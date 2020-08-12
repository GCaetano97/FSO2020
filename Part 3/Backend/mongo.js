const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-ml6h3.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser : true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to the phonebook`)
    mongoose.connection.close()
  })
} else {

  console.log('phonebook:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })

}

/*
Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})



person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
})

const persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "Delete me",
        "number": "39-23-6423122",
        "id": 5
      }
]

persons.forEach(person => {
    const tempPerson = new Person({
        name: person.name,
        number: person.number,
        id: person.id
    })
    tempPerson.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
})

const person = new Person({
    name: 'test',
    number: 2222,
    id: 1
})

person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
})
*/