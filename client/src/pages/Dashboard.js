import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../store/auth'
import DashboardComponent from '../components/DashboardComponent'

const Dashboard=(props)=>{
    const [loading,setLoading] = useState(true)
    const [activities,setActivities] =useState([])
    const dispatch = useDispatch()
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
        </div>
        </>
    )
}

export default Dashboard