import React from 'react';

import './styles.css';
import ChatAdminMessages from '../ChatAdminMessages';

export default function ChatAdmin() {
  return (
    <div className='outerContainer'>
      <div className='innerContainer'>
        <ChatAdminMessages />
      </div>
    </div>
  );
}
