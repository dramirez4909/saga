import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AuthRoute, ProtectedRoute } from './components/utils/routes';
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'
import Home from './pages/HomePage'
import { CircularProgress, CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {setUser} from './store/auth'
import {loadActivities} from './store/activities'
import HomeContext from './components/utils/HomeContext'
import { loadProviderEncounters , loadDepartmentEncounters} from './store/encounters';
import { loadDepartmentOrders} from './store/orders';
import ThemeContext from './components/utils/ThemeContext';
import {BreakpointProvider} from 'react-socks'


function App() {
  const [loading, setLoading] = useState(true)
  const [themes,setThemes] = useState("light")
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
        }
      }
      setLoading(false);
    }
    loadUser();
  }, [dispatch]);

  const currentUser = useSelector(state => state.auth.user);

  if (loading) {
    return (
    <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",alignContent:"center",justifyContent:"center"}}>
      <CircularProgress style={{width:"230px",height:"230px",alignSelf:"center",justifySelf:"center",marginTop:"200px"}} />
    </div>
    )
  }
  const darkTheme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundColor: '#444444',
          },
        },
      },
    },
  })
  
  const lightTheme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundColor: 'white',
          },
        },
      },
    },
  })

  console.log("____Rendering app_____")
    return (
    <>
    <ThemeProvider theme={themes === "light" ? lightTheme : darkTheme}>
    <BreakpointProvider>
    <CssBaseline/>
    <ThemeContext.Provider value={{themes,setThemes}}>
    <BrowserRouter>
        <Switch>
            <AuthRoute exact path='/signup' component={SignUpPage} currentUserId={currentUser.id}/>
            <AuthRoute exact path='/login' component={LoginPage} currentUserId={currentUser.id}/>
            <ProtectedRoute exact path='/dashboard' component={Dashboard} currentUserId={currentUser.id}/>
            <ProtectedRoute exact path='/' component={Home} currentUserId={currentUser.id}/>
            <AuthRoute exact path='/' component={LoginPage} currentUserId={currentUser.id}/>
        </Switch>
    </BrowserRouter>
    </ThemeContext.Provider>
    </BreakpointProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
