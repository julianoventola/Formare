import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';

import './styles.css';

import InfoBar from '../ChatInfoBar';
import Messages from '../ChatMessages';
import Input from '../ChatInput';

let socket;

export default function Chat({ location }) {
  let history = useHistory();
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:3333';

  // Creating user in room
  useEffect(() => {
    const { username, room } = queryString.parse(location.search);
    if (+room < 1 || +room > 4 || +room.length > 1) {
      history.push('/');
    }
    socket = io(ENDPOINT);
    setUsername(username);
    setRoom(room);
    socket.emit('join', { username, room }, error => {
      if (error) {
        alert(error);
        history.push('/');
      }
    });

    // Leaving chat
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // Saving user's message of the room
  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });

    // Leaving chat
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [messages]);

  // Sending messages
  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} username={username} />
        <Messages messages={messages} username={username} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}
