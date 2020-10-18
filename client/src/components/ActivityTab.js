import React, { useContext } from 'react';
import HomeContext from './utils/HomeContext';
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SearchIcon from '@material-ui/icons/Search';

const iconStyle = {
    height: "25px",
    width: "25px",
  }

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

function ActivityTab(props) {
    const context = useContext(HomeContext)
    return (
        <>
            <li key={props.activity.name} onClick={(e)=>{context.setSelectedTabName(props.activity.name)}} 
                className={`${props.activity.name === context.selectedTabName ? "active" : ""}`} 
                style={{zIndex: props.activity.name === context.selectedTabName ? 1 : "",
                background: props.activity.name === context.selectedTabName ? "white" : "#ececec",
                borderTopLeftRadius: props.activity.name === context.selectedTabName ? "5px" : "",
                borderTopRightRadius: props.activity.name === context.selectedTabName ? "5px" : "",
            }}
                >   
            <a style={{display:"flex", alignItems:"center", zIndex:3}}>{props.activity.name === "dashboard" ? <DashboardTwoToneIcon style={{...iconStyle,color:"#FFC8DD"}}/> : <></> }
            {props.activity.name === "My Schedule" ? <ScheduleTwoToneIcon style={{...iconStyle,color:"#b1f3b1"}}/> : <></>}
            {props.activity.name === "Place Orders" ? <BorderColorTwoToneIcon style={{...iconStyle,color:"#BDE0FE"}}/> : <></>}
            {props.activity.name === "Dep. Schedule" ? <CalendarTodayIcon style={{...iconStyle,color:"#BAA4C7"}}/> : <></>}
            {props.activity.name === "Patient Search" ? <SearchIcon style={{...iconStyle,color:"#d3d3d3"}}/> : <></>}
            <p style={{margin:0, marginLeft:"4px"}}>{props.activity.name}</p></a>
            </li>
        </>
    );
}
export default ActivityTab;