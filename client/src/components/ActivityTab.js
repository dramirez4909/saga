import React, { useContext } from 'react';
import HomeContext from './utils/HomeContext';
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SearchIcon from '@material-ui/icons/Search';
import ContactIcon from '@material-ui/icons/AccountCircleTwoTone';
import ThemeContext from './utils/ThemeContext'

const iconStyle = {
    height: "25px",
    width: "25px",
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
    return (
        <>
            <li key={props.activity.name} style={{...tabStyle}} onClick={(e)=>{context.setSelectedTab(props.activity.name,props.activity.patient)}} 
                className={`${props.activity.name === context.selectedTabName ? "active" : ""}`} 
                style={{zIndex: props.activity.name === context.selectedTabName ? 1 : "",
                background: props.activity.name === context.selectedTabName ? themeContext.themes === "light" ? "white" : "#444444" : themeContext.themes === "light" ? "rgb(221,224,230)" : "#212121",
                borderTopLeftRadius: props.activity.name === context.selectedTabName ? "10px" : "",
                borderTopRightRadius: props.activity.name === context.selectedTabName ? "10px" : ""
            }}
                >   
            <a style={{display:"flex", alignItems:"center", zIndex:3}}>{props.activity.name === "dashboard" ? <DashboardTwoToneIcon style={{...iconStyle,color:"#FFC8DD"}}/> : <></> }
            {props.activity.name === "My Schedule" ? <ScheduleTwoToneIcon style={{...iconStyle,color:"#b1f3b1"}}/> : <></>}
            {props.activity.name === "Place Orders" ? <BorderColorTwoToneIcon style={{...iconStyle,color:"#BDE0FE"}}/> : <></>}
            {props.activity.name === "Dep. Schedule" ? <CalendarTodayIcon style={{...iconStyle,color:"#BAA4C7"}}/> : <></>}
            {props.activity.name === "Patient Search" ? <SearchIcon style={{...iconStyle,color:themeContext.themes === "light" ? "grey" : "whitesmoke" }}/> : <></>}
            {props.activity.patient ? <ContactIcon style={{...iconStyle,color:"seashell"}}/> : <></>}
            {props.activity.name === "dashboard" ? "" : <p style={{margin:0,cursor:"default", marginLeft:"4px",color: themeContext.themes === "light" ? "black" : "white" }}>{props.activity.name}</p>} </a>
            </li>
        </>
    );
}
export default ActivityTab;