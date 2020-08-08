import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const Statistic = ({ text, value }) => (
  <tr>
    <td><strong>{text}:</strong></td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  /// ...
  if(props.all === 0){
    return (<div>
      No feedback given
    </div>)
  } else {
    return (
      <div>
        <table>
          <tbody>
        <Statistic text="good" value={props.good}/>
        <Statistic text="neutral" value={props.neutral}/>
        <Statistic text="bad" value={props.bad}/>
        <Statistic text="all" value={props.all}/>
        <Statistic text="average" value={props.average / props.all}/>
        <Statistic text="positive" value={props.good / props.all * 100} />
        </tbody>
        </table>
      </div>
    )
  }
  }

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () =>{
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average+1)
  }
  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBadClick = () =>{
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average-1)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='Good' />
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad' />

      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average}/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)