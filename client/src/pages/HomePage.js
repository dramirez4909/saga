import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, NavLink, Switch } from 'react-router-dom'
import { ProtectedRoute } from '../components/utils/routes'
import Dashboard from './Dashboard'
import Orders from './Orders'
import Schedule from './Schedule'
import NavBar from '../components/NavBar'
import HomeContext from '../components/utils/HomeContext'
import { makeStyles } from '@material-ui/core/styles';
import '../styles/HomePage.css'
import ActivityTab from '../components/ActivityTab'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DepSchedule from './DepSchedule'

const useStyles = makeStyles((theme) => ({
    tabStyle: {
        cursor:"pointer",
        margin:"5px",
        padding:"3px",
        color:"grey",
        borderRadius: "5px",
        display:"flex",
        transition: "all .1s ease-in-out",
        '&:hover': {
            transform: "scale(1.15)",
        }
    }
    
}));

const tabStyle = {
    cursor:"pointer",
    padding:"3px",
    color:"grey",
    borderRadius: "5px",
    display:"flex",
    alignItems:"center",
    alignContent:"center",
    transition: "all .1s ease-in-out",
    '&:hover': {
        transform: "scale(1.15)",
    }
}

const tabContentStyle = {
    backgroundColor:"white",
}

const HomePage=(props)=>{
    const classes = useStyles()
    const [tabs,setTabs] = useState([])
    const [selectedTabName,setSelectedTabName] = useState("dashboard")
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const [activities,setActivities] =useState([])
    const allActivities = useSelector(state=>state.activities)

    useEffect(()=>{
        if (openTabs && (allActivities.role_activities || allActivities.user_activities)){
            setTabs(openTabs)
            setActivities([{name:"dashboard",id:0 },...Object.values(allActivities.role_activities),...Object.values(allActivities.user_activities)])
        }
    },[openTabs, allActivities])
    console.log(activities)

    return (
        <>
            <HomeContext.Provider value={{setSelectedTabName, selectedTabName}}>
                <DragDropContext>
                <NavBar>
                </NavBar>
                <div style={{display:"flex",flexDirection:"column",height:"100%",backgroundColor:"#ececec"}}>
                    <ul className={"tabs"} style={{display:"flex",flexDirection:"row",marginBottom:0, listStyleType:"none"}}>
                    {tabs.map((activity, index)=>
                    (
                        <ActivityTab activity={activity}/>
                        ))}
                    </ul>
                    {tabs.map(( activity, index)=>
                    (
                        <div key={activity.name} style={{display: activity.name === selectedTabName ? "flex" : "none", flexDirection:"column", ...tabContentStyle}}>
                            {activity.name === "dashboard" ? <Dashboard/> : <></>}
                            {activity.name === "My Schedule" ? <Schedule/> : <></>}
                            {activity.name === "Place Orders" ? <Orders/> : <></>}
                            {activity.name === "Dep. Schedule" ? <DepSchedule/> : <></>}
                        </div>
                        ))}
                </div>
                </DragDropContext>
            </HomeContext.Provider>
        </>
    )
}

export default HomePage
