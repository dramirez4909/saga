import { Avatar, Button, CircularProgress, Grid,IconButton } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../store/auth'
import DashboardComponent from '../components/DashboardComponent'
import ThemeContext from '../components/utils/ThemeContext';
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';
import json2mq from 'json2mq';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Breakpoint} from 'react-socks'
import { openEditor, openPatientCheckin, openPatientRegistration } from '../store/activities'
import HomeContext from '../components/utils/HomeContext'
import DashboardActivityButton from '../components/DashboardActivityButton'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { setCurrentRecord } from '../store/current_record'
import UserCard from '../components/UserCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd } from '@fortawesome/free-solid-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      outline:"none",
      borderRadius:"4px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  }));

const DepartmentSearchResults = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles();

    return (
        <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 200
            }}
        >
            <Fade in={props.modalLoading === false && props.open}>
            <div className={classes.paper} style={{maxWidth:"600px",width:"100%",backgroundColor:props.themeContext.themes === "dark" ? "#444444" : "white",display:"flex",flexDirection:"column"}}>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"space-between",paddingLeft:"16px",paddingRight:"10px"}}>
                <div style={{fontWeight:"400",fontSize:"24px"}}>
                    Departments
                </div>
                <div style={{display:"flex",flexDirection:"column",margin:"10px",marginTop:"16px"}}>
                {/* <div style={{display:"flex",flexDirection:"row", marginTop:"4px",alignItems:"center"}}>
                    <FontAwesomeIcon icon={faUserMd} style={{width:"20px",height:"20px",color:"yellowgreen"}}/>
                    <div style={{marginLeft:"5px",fontWeight:"300",fontSize:"18px"}}>
                    - Provider
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"row", marginTop:"4px",alignItems:"center"}}>
                    <FontAwesomeIcon icon={faUserCog} style={{width:"20px",height:"20px",color:"dodgerblue"}}/>
                    <div style={{marginLeft:"5px",fontWeight:"300",fontSize:"18px"}}>
                    - Administrator
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"row", marginTop:"4px",alignItems:"center"}}>
                    <FontAwesomeIcon icon={faCalendarAlt} style={{width:"20px",height:"20px",color:"lightcoral"}}/>
                    <div style={{marginLeft:"5px",fontWeight:"300",fontSize:"18px"}}>
                    - Scheduler
                    </div>
                </div> */}
                </div>
                <IconButton onClick={(e)=>props.setOpen(false)} size="large" style={{alignSelf:"baseline",marginRight:"-30px"}}>
                    <CloseIcon/>
                </IconButton>
                </div>
                {props.modalLoading ? <CircularProgress/> :
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",maxWidth:"600px",width:"100%",overFlow:"scroll",maxHeight:"600px"}}>
                {props.departments.map(department=>{
                    {console.log(department)}
                    return(
                    <div onClick={(e)=>props.handleDepartmentEditorClick(department)} style={{background:"grey",display:"flex",flexDirection:"column",alignItems:"center",marginLeft:"14px",marginBottom:"5px",marginRight:"14px",borderRadius:"8px",width:"100%"}}>
                        {/* <departmentCard department={department}/>
                        hi */}
                        {department.name}
                    </div>
                    )
                })}
                </div>
                }
            </div>
            </Fade>
        </Modal>
    </div>
    )
}

export default DepartmentSearchResults