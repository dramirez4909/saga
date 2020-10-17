import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, NavLink, Switch } from 'react-router-dom'
import { ProtectedRoute } from '../components/utils/routes'
import Dashboard from './Dashboard'
import Orders from './Orders'
import Schedule from './Schedule'
import NavBar from '../components/NavBar'
import HomeContext from '../components/utils/HomeContext'

const tabStyle = {

}

const HomePage=(props)=>{
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
            <HomeContext.Provider value={{setSelectedTabName}}>
                <NavBar>
                </NavBar>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{display:"flex",flexDirection:"row"}}>
                    {activities.map((activity, index)=>
                    (
                        <div key={activity.name} onClick={(e)=>{setSelectedTabName(activity.name)}} style={{ cursor:"pointer"}}>
                            {activity.name}
                        </div>
                        ))}
                    </div>
                    {activities.map(( activity, index)=>
                    (
                        <>
                        <div key={activity.name} style={{display: activity.name === selectedTabName ? "flex" : "none", flexDirection:"column"}}>
                            {activity.name === "dashboard" ? <Dashboard/> : <></>}
                            {activity.name === "schedule" ? <Schedule/> : <></>}
                            {activity.name === "orders" ? <Orders/> : <></>}
                        </div>
                        </>
                        ))}
                </div>
            </HomeContext.Provider>
        </>
    )
}

export default HomePage
