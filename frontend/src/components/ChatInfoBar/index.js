import React from 'react';
import { IoMdChatboxes, IoMdCloseCircleOutline } from 'react-icons/io';

import './styles.css';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //Janeiro = 0!
let yyyy = today.getFullYear();
let fullDate = `${dd}/${mm}/${yyyy}`;

export default function InfoBar({ room, username }) {
  return (
    <div className='infoBar'>
      <div className='leftInnerContainer'>
        <IoMdChatboxes size={30} />
        <h3>
          {username} - Sala: {room} - {`${fullDate}`}
        </h3>
      </div>
      <div className='rightInnerContainer'>
        <a href='/'>
          <IoMdCloseCircleOutline size={33} />
        </a>
      </div>
    </div>
  );
}
