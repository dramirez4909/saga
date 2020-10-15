import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../store/auth'

const Dashboard=()=>{
    const dispatch = useDispatch()
    
    const handleLogOut = ()=> {
        dispatch(logout())
    }
    return (
        <>
        <h1>Dashboard Page</h1>
        <Button onClick={handleLogOut}>Log out</Button>
        </>
    )
}

export default Dashboard