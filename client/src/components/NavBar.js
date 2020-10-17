import React, {useState,useEffect, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink,Link, Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Box, IconButton, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../store/auth';
import {openTab} from '../store/activities'
import HomeContext from '../components/utils/HomeContext'

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "rgb(255, 107, 107)",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px",
    height: "15px"
  },
  left: {
    display: 'flex',
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    margin: "2px",
  },
  icon: {
    fontSize: "28px",
    color: "rgba(255,255,255,.5)",
    opacity: "white",
  },
  button: {
    color: "white",
    backgroundColor: "hsla(0,0%,100%,.3)",
    borderRadius: "5px",
    padding: "5px",
    margin: "2px",
  },
}));


const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.user);
  const context = useContext(HomeContext)
  const [loading,setLoading] = useState(true)
  const [activities,setActivities] =useState([])
  const handleLogOut = ()=> {
      dispatch(logout())
  }
  const allActivities = useSelector(state=>state.activities)
  useEffect(()=>{
      if (allActivities.role_activities || allActivities.user_activities){
          setActivities([...Object.values(allActivities.role_activities),...Object.values(allActivities.user_activities)])
          setLoading(false)
      }
  },[allActivities])

  const openActivity=(activity)=>{
      context.setSelectedTabName(activity.name)
  }

  return (
    <>
        <div style={{position:"sticky",top:0,display:"flex",flexDirection:"row",margin:0,width:"100%",backgroundColor:"rgb(255, 107, 107)", justifyContent:"space-between"}}>
          <div className={classes.left}>
            <div onClick={()=>context.setSelectedTabName("dashboard")} style={{display:"flex", alignItems:"center", cursor:"pointer"}} >
              <p className={classes.logo} style={{textDecoration:"none"}}>Saga</p>
            </div>
            {activities.map(activity=><button key={activity.id} onClick={(e)=>openActivity(activity)}>{activity.name}</button>)}
          </div>
          <div>
          </div>
        </div>
    </>
  )
}

export default Navbar;
