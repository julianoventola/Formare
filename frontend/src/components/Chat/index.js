import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './styles.css';
// import { Container } from './styles';

let socket;

export default function Chat({ location }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:3333';

  // Creating user in room
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  // Saving user's message of the room
  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // Sending messages
  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <div className='outerContainer'>
      <div className='container'>
        <input
          type='text'
          value={message}
          onChange={event => {
            setMessage(event.target.value);
          }}
          onKeyPress={event =>
            event.key === 'Enter' ? sendMessage(event) : null
          }
        />
      </div>
    </div>
  );
}
