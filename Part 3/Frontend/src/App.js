import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('A new name')
  const [newNumber, setNewNumber] = useState('A new number')
  const [ newFilter, setNewFilter ] = useState('') 
  const [message,setMessage] = useState({content: null})

  useEffect(() =>{
    personService
      .getAll()
        .then(intialPersons => {
          setPersons(intialPersons)
        })
  },[])

  const showNotification = (content, color = '#228B22') => {

    if(content instanceof Error){
      const errorMessage =
       content.response.data.error !== undefined
       ? content.response.data.error
       : 'Opps something went wrong'

       setMessage({content: errorMessage, color: 'red'})
       setTimeout(() => {
         setMessage({content: null})
       }, 5000);
    } else{
      setMessage({content, color})
      setTimeout(() => {
        setMessage({content: null})
      }, 5000);
    }
  }
  
  const addPersons = (event) => {
    const personObject = {
      name: newName,
      number: newNumber,
    }
    event.preventDefault()
    const filteredPerson = persons.filter(person => person.name===personObject.name)
    if(filteredPerson.length > 0 ){
      if(window.confirm(`${personObject.name} is already added to phonebook. Would you like to update the number?`)){
        personService
          .update(filteredPerson[0].id, personObject)
            .then(personA => {
              personService
                .getAll()
                  .then(intialPersons => {
                   setPersons(intialPersons)
                   setNewName('')
                   setNewNumber('')
                   showNotification(`Updated ${personObject.name}'s number`)
                  })

              
            })
            .catch((error) => {
              showNotification(error)
              setPersons(persons.filter((person) => person.id !== filteredPerson[0].id))
            })
            personService
              .getAll()
              .then(persons => setPersons(persons))    
      }
    }else{
      
      personService
        .create(personObject)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Added ${personObject.name}'s number to the Phonebook`)
          })
          .catch(error => {
            showNotification(error)
          })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value) 
  }

  const handleDelete = (id, personName) => {
    if(window.confirm(`Do you want to delete ${personName} from your list?`)){
      personService
        .remove(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id))
          })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        filter={newFilter}
        handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm
        addPersons={addPersons}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleDelete={handleDelete}
      />
     
    </div>
  )
}
export default App