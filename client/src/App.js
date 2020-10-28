import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AuthRoute, ProtectedRoute } from './components/utils/routes';
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'
import Home from './pages/HomePage'
import { CssBaseline } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {setUser} from './store/auth'
import {loadActivities} from './store/activities'
import HomeContext from './components/utils/HomeContext'
import { loadProviderEncounters , loadDepartmentEncounters} from './store/encounters';
import { loadDepartmentOrders} from './store/orders';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
    const loadUser = async () => {
      const res = await fetch("/api/session/current_user");
      if (res.ok) {
        res.data = await res.json(); // current user info
        if (res.data.user) {
          dispatch(setUser(res.data.user))
          dispatch(loadActivities())
          console.log(res.data.user)
          if (res.data.user.roles) {
            const userRoles = res.data.user.roles.map(role=>role.name)
            // if (userRoles.includes("scheduler")) {
            //   dispatch(loadDepartmentEncounters())
            //   dispatch(loadDepartmentOrders())
            // }
          }
          if (res.data.user.provider) dispatch(loadProviderEncounters(res.data.user.id))
        }
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
            <ProtectedRoute exact path='/dashboard' component={Dashboard} currentUserId={currentUser.id}/>
            <ProtectedRoute exact path='/' component={Home} currentUserId={currentUser.id}/>
            <AuthRoute exact path='/' component={LoginPage} currentUserId={currentUser.id}/>
        </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
