import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { MdDelete } from 'react-icons/md';

import './styles.css';

export default function ChatAdminMessages() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('app-token');

  useEffect(() => {
    const loadMessages = async () => {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const response = await api.get('/admin/chat');
      if (response) {
        setMessages(response.data);
      }
    };
    try {
      loadMessages();
    } catch (error) {
      console.log(error);
    }
  }, [messages, token]);

  const handleDelete = async id => {
    try {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      await api.delete(`/admin/chat/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
        {messages.map(message => (
          <tr key={message._id}>
            <td>{message._id}</td>
            <td>{message.username}</td>
            <td>{message.message}</td>
            <td>{message.createdAt.substring(0, 10)}</td>
            <button type='submit' onClick={() => handleDelete(message._id)}>
              <MdDelete size={35} />
            </button>
          </tr>
        ))}
      </table>
    </div>
  );
}
