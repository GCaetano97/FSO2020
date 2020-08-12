import React from 'react'

const Notification = ({message}) => {
    const notiStyle = {
        
        color: message.color,
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
            {message.content}
        </div>
    )
}

export default Notification;