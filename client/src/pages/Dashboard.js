import { Button } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../store/auth'
import DashboardComponent from '../components/DashboardComponent'
import ThemeContext from '../components/utils/ThemeContext';
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';
import json2mq from 'json2mq';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Breakpoint} from 'react-socks'

const Dashboard=(props)=>{
    const [loading,setLoading] = useState(true)
    const [activities,setActivities] =useState([])
    const dispatch = useDispatch()
    const themeContext = useContext(ThemeContext)

    const handleLogOut = ()=> {
        dispatch(logout())
    }

    function JavaScriptMedia() {
    const matches = useMediaQuery(
    json2mq({
      minWidth: 600,
    }),
  );

  return <span>{`{ minWidth: 600 } matches: ${matches}`}</span>;
    }

    const changeThemes = () =>{
        if (themeContext.themes === "light") {
          themeContext.setThemes("dark")
        } else if (themeContext.themes === "dark") {
          themeContext.setThemes("light")
        }
      }

    const allActivities = useSelector(state=>state.activities)
    useEffect(()=>{
        if (allActivities.role_activities || allActivities.user_activities){
            setActivities([...Object.values(allActivities.role_activities),...Object.values(allActivities.user_activities)])
            setLoading(false)
        }
    },[allActivities])
    if (loading) {
        return (
            <p>loading...</p>
        )
    }
    return (
        <>
        <div style={{margin:"20px"}}>
        <h1>Dashboard</h1>
        <Button onClick={handleLogOut}>Log out</Button>
            {activities.map(activity=>{
              return (
                <>
                <div>{activity.name}</div>
                <div></div>
                </>
              )
            })}
        </div>
        <div>
            {themeContext.themes === "light" ? <Button onClick={changeThemes} size="small" style={{outline:"none",backgroundColor: "#7f53ac",backgroundImage: "linear-gradient(315deg, #7f53ac 0%, #647dee 74%)",marginRight:"30px",color:"white",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#3badfb"}}/></Button>
            :
            <Button onClick={changeThemes} size="small" style={{outline:"none",background:"linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",marginRight:"30px",color:"white",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#f7b732"}}/></Button>}
        </div>
        </>
    )
}

export default Dashboard