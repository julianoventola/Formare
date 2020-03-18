import React from 'react';

import './styles.css';

export default function ChatInput({ message, sendMessage, setMessage }) {
  return (
    <form className='form'>
      <input
        className='input'
        type='text'
        placeholder='Type a message...'
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event =>
          event.key === 'Enter' ? sendMessage(event) : null
        }
      />
      <button className='sendButton' onClick={e => sendMessage(e)}>
        Enviar
      </button>
    </form>
  );
}
