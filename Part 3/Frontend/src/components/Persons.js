import React from 'react';
import Person from './Person'

const Persons = ({persons, newFilter, handleDelete}) => {
    const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return(
        <div>
            {personsFiltered.map((person) => (
                <Person
                    key={person.id}
                    person={person}
                    handleDelete={handleDelete}
                />  
            ))}
        </div>
    )
}

export default Persons
