import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AuthRoute, ProtectedRoute } from './components/utils/routes';
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import Home from './pages/HomePage'
import { CssBaseline } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {setUser} from './store/auth'

import UserList from './components/UsersList';


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
    const loadUser = async () => {
      const res = await fetch("/api/session/current_user");
      if (res.ok) {
        res.data = await res.json(); // current user info
        dispatch(setUser(res.data.user))
      }
      setLoading(false);
    }
    loadUser();
  }, [dispatch]);

  const currentUser = useSelector(state => state.auth.user);

  if (loading) {
    return <p>loading...</p>
  }

  console.log("____Rendering app_____")
    return (
    <>
    <CssBaseline/>
    <BrowserRouter>
        <Switch>
            <AuthRoute exact path='/signup' component={SignUpPage} currentUserId={currentUser.id}/>
            <AuthRoute exact path='/login' component={LoginPage} currentUserId={currentUser.id}/>
            <ProtectedRoute exact path='/users' component={UserList} currentUserId={currentUser.id}/>
            <ProtectedRoute exact path='/dashboard' component={Dashboard} currentUserId={currentUser.id}/>
            <AuthRoute exact path='/' component={Home} currentUserId={currentUser.id}/>
        </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
