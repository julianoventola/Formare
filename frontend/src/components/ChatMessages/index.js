import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Messages';

import './styles.css';

export default function ChatMessages({ messages, username }) {
  return (
    <ScrollToBottom className='messages'>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} username={username} />
        </div>
      ))}
    </ScrollToBottom>
  );
}
