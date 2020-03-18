import React from 'react';

import ReactEmoji from 'react-emoji';

import './styles.css';

export default function Messages({ message: { text, user }, username }) {
  let isSentByCurrentUser = false;

  const trimmedName = username.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //Janeiro = 0!
  let yyyy = today.getFullYear();
  let fullDate = `${dd}/${mm}/${yyyy}`;

  let hours = String(today.getHours()).padStart(2, '0');
  let minutes = String(today.getMinutes()).padStart(2, '0');
  let time = `${hours}:${minutes}`;

  return isSentByCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sentText pr-10'>
        {fullDate} - <b>{trimmedName}</b> - {time}
      </p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className='messageBox backgroundLight'>
        <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
      </div>
      <p className='sentText pl-10 '>
        {fullDate} - <b>{user}</b> - {time}
      </p>
    </div>
  );
}
