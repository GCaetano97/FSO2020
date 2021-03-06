import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const likesAux = new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
  const [likes, setLikes] = useState(likesAux)
  const topVoted = likes.indexOf(Math.max(...likes))

  const randomGenerator = () => {
    let numberReturned = Math.floor(Math.random() * anecdotes.length)

    while(selected === numberReturned) {
      numberReturned = Math.floor(Math.random() * anecdotes.length)
    }

    return numberReturned
  }
    
  

  const nextAnecdoteHandler = () => {
    console.log('clicked')
    setSelected(randomGenerator())
  }

  const likeHandler = () => {
    const copy = [...likes];
    copy[selected] += 1;
    setLikes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {likes[selected]} likes</p>
      
      <button onClick={likeHandler}>like</button> <button onClick={nextAnecdoteHandler}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
  <p>{props.anecdotes[topVoted]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)