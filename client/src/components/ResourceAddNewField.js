import React from 'react'
import Radium from 'radium'
import { AppBar, Toolbar, Box, IconButton, Avatar, Typography, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd } from '@fortawesome/free-solid-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
    marginLeft:"0px",
    marginRight:"0px",
    cursor:"pointer",
    transition:".2s",
    alignItems:"center",
    backgroundColor:"white",
    color:"#1a73e8",
    // boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    // backgroundImage:"linear-gradient(to bottom, #ff6e7f 0%, white 100%)",
    ':hover':{
        // backgroundColor:"rgba(0,0,0,.03)",
        backgroundColor:"#1a73e8",
        color:"white"
        // boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}


const DashButton = (props) => {
    const classes = useStyles()
    return (
        <div style={buttonStyle}>
                  <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",paddingTop:"10px",paddingBottom:"10px",paddingLeft:"16px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",minWidth:"190px"}}>
                        {props.label}
                    </div>
                    <div style={{fontSize:"18px",fontFamily:"Roboto,Arial,sans-serif",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        <div>
                            {props.text}
                        </div>
                        
                        <div style={{marginRight:"26px"}}>
                        <AddCircleOutlineIcon style={{justifySelf:"right",height:"24px",width:"24px"}}/>
                    </div>
                    </div>
                    
                    

                  </div>
        </div>
    )
}

const ResourceAddNewField = Radium(DashButton);

export default ResourceAddNewField