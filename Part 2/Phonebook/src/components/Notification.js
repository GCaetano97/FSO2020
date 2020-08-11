/*import React from 'react'

const Notification = ({message}) => {
    console.log(message)
    try {
        var messageParsed = JSON.parse(message); // this is how you parse a string into JSON 
      } catch (ex) {
        console.error(ex);
      }
      console.log(messageParsed)
    const notiStyle = {
        
        color: messageParsed.color,
        background: 'lightgrey',
        fontSize: 20,
        bordeStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message.content === null) {
        return null;
    }

    return(
        <div style={notiStyle}>
            {messageParsed.content}
        </div>
    )
}

export default Notification;*/

import React from 'react';

const Notification = ({ message }) => {
  const notificationStyle = {
    color: message.color,
    background: 'transparent',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

  if (message.content === null) {
    return null;
  }

  return <div style={notificationStyle}>{message.content}</div>;
};


export default Notification;