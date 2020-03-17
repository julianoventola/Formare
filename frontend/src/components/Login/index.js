import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
// import { Container } from './styles';

export default function Login() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>
          <div>
            <input
              type='text'
              placeholde='Name'
              className='joinInput'
              onChange={event => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
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
            onClick={event => (!name || !room ? event.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button type='submit' className='button mt-20'>
              Sign In
            </button>
          </Link>
        </h1>
      </div>
    </div>
  );
}
