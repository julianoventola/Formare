import React from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FaUserCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

const schema = Yup.object().shape({
  username: Yup.string().required('Digite seu username'),
  password: Yup.string()
    .min(6)
    .required('Digite sua senha'),
});

export default function Login() {
  let history = useHistory();
  const handleSubmit = async values => {
    const { username, password } = values;
    try {
      const response = await api.post('/admin/sessions', {
        username,
        password,
      });

      const { data } = response;

      if (data) {
        localStorage.setItem('app-token', data.token);
        api.defaults.headers.Authorization = `Bearer ${data.token}`;

        history.push('/admin/chat');
      }
    } catch (error) {
      toast.error('Dados inválido!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form className='joinOuterContainer'>
          <div className='joinInnerContainer'>
            <h1 className='heading'>
              <div className='logo'>
                <FaUserCircle size={90} />
              </div>
              <div>
                <label htmlFor='username'>Username</label>
                <Field
                  name='username'
                  placeholder='username'
                  className='joinInput'
                />
                <ErrorMessage
                  className='joinInput-error'
                  component='span'
                  name='username'
                />
              </div>
              <label htmlFor='password'>Password</label>
              <Field
                type='password'
                name='password'
                placeholder='password'
                className='joinInput'
              />
              <ErrorMessage
                className='joinInput-error'
                component='span'
                name='password'
              />
              <button type='submit' className='button'>
                Sign In
              </button>
            </h1>
          </div>
          <ToastContainer />
        </Form>
      </Formik>
    </>
  );
}
