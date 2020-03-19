import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { MdDelete } from 'react-icons/md';

import './styles.css';

export default function ChatAdminMessages() {
  const [username, setUsername] = useState('');
  const [day, setDay] = useState('');
  const [order, setOrder] = useState('1');
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
  }, [token]);

  const handleDelete = async id => {
    try {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      await api.delete(`/admin/chat/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (username, day, order) => {
    try {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const response = await api.get(
        `/admin/chat?order=${+order}&username=${username}&data=${day}`
      );
      if (response) {
        setMessages(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <div className='search'>
        <label className='names' htmlFor='username'>
          Username
        </label>
        <input
          type='text'
          placeholder='Username'
          className='inputSearch'
          value={username}
          onChange={event => {
            setUsername(event.target.value);
          }}
        />
        <label className='names' htmlFor='Data'>
          Data
        </label>
        <input
          type='text'
          placeholder='Data(2020-12-30)'
          className='inputSearch'
          value={day}
          onChange={event => {
            setDay(event.target.value);
          }}
        />
        <label className='names' htmlFor='Order'>
          Ordenar
        </label>
        <select
          className='inputSearch'
          value={order}
          onChange={event => {
            setOrder(event.target.value);
          }}
        >
          <option value='1'>Decrescente</option>
          <option value='-1'>Crescente</option>
        </select>
        <button
          className='btnPesquisar'
          type='submit'
          onClick={() => handleSearch(username, day, order)}
        >
          Pesquisar
        </button>
      </div>

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
