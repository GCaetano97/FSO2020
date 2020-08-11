import React from 'react'

const Course = ({course}) => {
  return(
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const Header = ({course}) => {
  return(
    <h1>{course.name}</h1>
  )
}


const Content = ({course}) => {
  return (
    <div>
      <Part course={course}/>
    </div>
  )
}

const Part = ({course}) => {
  const hey = course.parts
  return(
    <ul>
      {hey.map(heyy => 
          <li key={heyy.id}>
            {heyy.name} {heyy.exercises}
          </li>)}
    </ul>
  )
    
}



const Total = ({course}) =>{
  const hey = course.parts

  const total = hey.map(heyy => heyy.exercises)
  
  const totalFinal = total.reduce(function(s, p) {
    return s+p;
  })
  return(
    <p>
    total of {totalFinal} exercises
    </p>
  )
}

export default Course