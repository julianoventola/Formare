import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdChatboxes } from 'react-icons/io';

import './styles.css';
// import { Container } from './styles';

export default function Join() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('1');
  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>
          <div className='logo'>
            <IoMdChatboxes size={90} />
          </div>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              placeholde='Username'
              className='joinInput'
              value={username}
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor='room'>Room</label>
            <select
              className='joinInput'
              value={room}
              onChange={event => {
                setRoom(event.target.value);
              }}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
          </div>
          <Link
            onClick={event => (!username ? event.preventDefault() : null)}
            to={`/chat?username=${username}&room=${room}`}
          >
            <button type='submit' className='button'>
              Chat
            </button>
          </Link>
        </h1>
      </div>
    </div>
  );
}
