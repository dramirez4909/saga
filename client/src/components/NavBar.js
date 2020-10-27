import React, {useState,useEffect, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink,Link, Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Box, IconButton, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../store/auth';
import {openTab} from '../store/activities'
import HomeContext from '../components/utils/HomeContext'
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SearchIcon from '@material-ui/icons/Search';

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
    color: "#0BB5FF",
    textDecoration: "none",
    fontSize: "18px",
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

const iconStyle = {
  height: "17px",
  width: "17px",
  marginRight:"3px",
}

const buttonStyle = {
  display: "flex",
  flexDirection:"row",
  padding: "2px",
  alignItems: "center",
  color: "grey",
  backgroundColor: "hsla(0,0%,100%,.3)",
  borderRadius: "2px",
  margin: "2px",
  cursor: "pointer"
}


const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.user);
  const context = useContext(HomeContext)
  const [loading,setLoading] = useState(true)
  const [activities,setActivities] =useState([])
  const openTabs = useSelector(state=>state.activities.open_tabs)
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
      if (!openTabs.includes(activity)){
        dispatch(openTab(activity))
      }
      context.setSelectedTab(activity.name,activity.patient)
  }

  return (
    <>
        <div style={{position:"sticky",top:0,display:"flex",boxShadow: "0 2px 2px -2px rgba(0,0,0,.2)",zIndex:5,flexDirection:"row",margin:0,width:"100%",backgroundColor:"white", justifyContent:"space-between"}}>
          <div className={classes.left}>
            <div onClick={()=>context.setSelectedTab("dashboard")} style={{display:"flex", alignItems:"center", cursor:"pointer"}} >
              <p className={classes.logo} style={{textDecoration:"none", fontStyle: "italic", fontWeight:"bold"}}>Saga</p>
            </div>
            {activities.map(activity=>
            <div key={activity.id} onClick={(e)=>openActivity(activity)} style={{...buttonStyle}}>
            {activity.name === "My Schedule" ? <ScheduleTwoToneIcon style={{...iconStyle,color:"#b1f3b1"}}/> : <></>}
            {activity.name === "Place Orders" ? <BorderColorTwoToneIcon style={{...iconStyle,color:"#BDE0FE"}}/> : <></>}
            {activity.name === "Dep. Schedule" ? <CalendarTodayIcon style={{...iconStyle,color:"#BAA4C7"}}/> : <></>}
            {activity.name === "Patient Search" ? <SearchIcon style={{...iconStyle,color:"grey"}}/> : <></>}
            {activity.name === "chart" ? "" : <p style={{margin:0, marginLeft:"4px"}}>{activity.name}</p>}
              </div>)}
          </div>
          <div>
          </div>
        </div>
    </>
  )
}

export default Navbar;
