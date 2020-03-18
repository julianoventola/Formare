import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

// -- > COMPONENTS < --
import Chat from './components/Chat';
import Join from './components/Join';
import Login from './components/Login';
import ChatAdmin from './components/ChatAdmin';

const PrivateRoute = props => {
  const isLogged = !!localStorage.getItem('app-token');
  return isLogged ? <Route {...props} /> : <Redirect to='/admin/users' />;
};

export default function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Switch>
        <Route path='/' exact component={Join} />
        <Route path='/chat' component={Chat} />
        <Route path='/admin/users' component={Login} />
        <PrivateRoute path='/admin/chat' render={ChatAdmin} />
      </Switch>
    </BrowserRouter>
  );
}
