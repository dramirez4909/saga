import React from 'react'
import Radium from 'radium'
import { AppBar, Toolbar, Box, IconButton, Avatar, Typography, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd } from '@fortawesome/free-solid-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'



const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      outline:"none",
      borderRadius:"8px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  }));

const buttonStyle = {
    fontFamily:"Google Sans,Roboto,Arial,sans-serif",
    fontWeight:"400",
    display:"block",
    width:"100%",
    cursor:"pointer",
    transition:".2s",
    backgroundColor:"white",
    // backgroundImage:"linear-gradient(to bottom, #ff6e7f 0%, white 100%)",
    ':hover':{
        // backgroundColor:"rgba(0,0,0,.03)",
        backgroundColor:"#f5f5f5",
        // boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        // boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}


const DashButton = (props) => {
    const classes = useStyles()
    return (
        <div style={buttonStyle}>
                  <div style={{display:"flex",flexDirection:"row",alignItems:"center",marginLeft:"14px",marginRight:"14px",marginTop:"5px",alignItems:"center",paddingBottom:"5px"}}>
                    
                    <Avatar src={props.user.picture} className={classes.large}/>
                    <div style={{display:"flex",width:"100%",justifyContent:"space-between",fontSize:"18px",marginLeft:"15px",marginRight:"15px",alignItems:"center"}}>
                    <div style={{display:"flex",justifyContent:"center",fontSize:"18px",marginLeft:"15px",marginRight:"15px",color:"black"}}>
                        <span>{props.user.first_name + " " + props.user.last_name}</span>
                        <span style={{marginLeft:"5px",color:"darkgrey"}}>{props.user.email}</span>
                        </div>
                    <div style={{display:"flex",justifyContent:"center",fontSize:"18px",alignItems:"center"}}>
                    {Object.values(props.user.roles).map(role=>{
                        if (role.name === "provider") {
                            return(
                            <FontAwesomeIcon icon={faUserMd} style={{width:"24px",height:"24px",marginLeft:"5px",color:"yellowgreen"}}/>
                        )}
                        if (role.name === "administrator") {
                            return(
                            <FontAwesomeIcon icon={faUserCog} style={{width:"28px",height:"28px",marginLeft:"5px",color:"dodgerblue"}}/>
                        )}
                        if (role.name === "scheduler") {
                            return(
                            <FontAwesomeIcon icon={faCalendarAlt} style={{width:"24px",height:"24px",marginLeft:"5px",color:"lightcoral"}}/>
                        )}
                    })}
                    </div>
                    </div>
                  </div>
        </div>
    )
}

const UserCardNarrow = Radium(DashButton);

export default UserCardNarrow