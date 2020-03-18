import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdChatboxes } from 'react-icons/io';

import './styles.css';
// import { Container } from './styles';

export default function Join() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

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
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor='room'>Room</label>
            <input
              type='text'
              placeholde='Room'
              className='joinInput'
              onChange={event => {
                setRoom(event.target.value);
              }}
            />
          </div>
          <Link
            onClick={event =>
              !username || !room ? event.preventDefault() : null
            }
            to={`/chat?username=${username}&room=${room}`}
          >
            <button type='submit' className='button mt-20'>
              Join Chat
            </button>
          </Link>
        </h1>
      </div>
    </div>
  );
}
