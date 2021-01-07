import React, { useContext } from 'react';
import HomeContext from './utils/HomeContext';
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SearchIcon from '@material-ui/icons/Search';
import ContactIcon from '@material-ui/icons/AccountCircleTwoTone';
import ThemeContext from './utils/ThemeContext'
import CloseIcon from '@material-ui/icons/Close'
import { IconButton } from '@material-ui/core';
import { closeTab } from '../store/activities';
import { useDispatch } from 'react-redux';

const iconStyle = {
    height: "25px",
    width: "25px",
  }

const closeTabStyle = {
    color:"grey",
    height: "20px",
    width: "20px",
  }

const tabStyle = {
    display: "inline-block",
    transition: "all .2s ease-in-out",
    '&:hover': {
        transform: "scale(1.5)"
    }
}


function ActivityTab(props) {
    const context = useContext(HomeContext)
    const themeContext = useContext(ThemeContext)
    const dispatch = useDispatch()

    const closeThisTab = (e, activityName) => {
        e.stopPropagation()
        dispatch(closeTab(activityName,props.index))
        console.log("openTabs context var after deletion: ",context.openTabs)
        context.setSelectedTab(context.openTabs[props.index - 1].name,context.openTabs[props.index - 1].patient,context.openTabs[props.index - 1].record)
    }

    return (
        <>
            <li key={props.activity.name} style={{...tabStyle}} onClick={(e)=>{context.setSelectedTab(props.activity.name,props.activity.patient,props.activity.record)}} 
                className={`${props.activity.name === context.selectedTabName ? "active" : ""}`} 
                style={{zIndex: props.activity.name === context.selectedTabName ? 1 : "",
                background: props.activity.name === context.selectedTabName ? themeContext.themes === "light" ? "white" : "#444444" : themeContext.themes === "light" ? "rgb(221,224,230)" : "#212121",
                borderTopLeftRadius: props.activity.name === context.selectedTabName ? "10px" : "",
                borderTopRightRadius: props.activity.name === context.selectedTabName ? "10px" : ""
            }}
                > 
            <a style={{display:"flex", alignItems:"center", zIndex:3}}>{props.activity.name === "dashboard" ? <img src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-dashboard-layout-100.png" style={{...iconStyle}}></img> : <></> }
            {props.activity.name === "My Schedule" ? <img src="https://saga-health.s3-us-west-1.amazonaws.com/binocular-flat.svg" style={{...iconStyle }}></img> : <></>}
            {props.activity.name === "Place Orders" ? <img src="https://saga-health.s3-us-west-1.amazonaws.com/binocular-flat.svg" style={{...iconStyle }}></img> : <></>}
            {props.activity.department ? <img src="https://saga-health.s3-us-west-1.amazonaws.com/calendar-flat-2.svg" style={{...iconStyle }}></img> : <></>}
            {props.activity.name === "Patient Search" ? <img src="https://saga-health.s3-us-west-1.amazonaws.com/binocular-flat.svg" style={{...iconStyle }}></img> : <></>}
            {props.activity.patient ? <img src="https://saga-health.s3-us-west-1.amazonaws.com/folder-open-flat.svg" style={{...iconStyle }}></img> : <></>}
            {props.activity.name === "dashboard" ? "" : <span style={{margin:0,cursor:"default", marginLeft:"4px",color: themeContext.themes === "light" ? "black" : "white" }}>{props.activity.name}</span>} 
            {props.activity.name === "dashboard" ? "" : 
            <IconButton style={{height:"19px",width:"19px",color:"lightgrey",outline:"none"}} onClick={(e)=>closeThisTab(e,props.activity.name)}>
            <CloseIcon style={{height:"19px",width:"19px",color:themeContext.themes === "dark" ? "white" : "grey"}} ></CloseIcon>
            </IconButton>}
            </a>
            </li>
        </>
    );
}
export default ActivityTab;