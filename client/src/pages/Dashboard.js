import { Button, CircularProgress, Grid } from '@material-ui/core'
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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Dashboard=(props)=>{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const [loading,setLoading] = useState(true)
    const [activities,setActivities] =useState([])
    const [selectedActivity,setSelectedActivity] =useState([])
    const [getUserRecordsFromDB,setGetUserRecordsFromDB] =useState(false)
    const [getDepartmentRecordsFromDB,setGetDepartmentRecordsFromDB] =useState(false)
    const [modalLoading,setModalLoading]=useState(false)
    const [users,setUsers]=useState([])
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const dispatch = useDispatch()
    const themeContext = useContext(ThemeContext)
    const homeContext = useContext(HomeContext)

    const handleLogOut = ()=> {
        dispatch(logout())
    }

    const handleUserEditorClick=(user)=>{
      setOpen(false)
      if (!openTabs.some(activity=>activity.name === `${user.first_name} ${user.last_name}`)) dispatch(openEditor({type:"user",user}))
      homeContext.setSelectedTab(`${user.first_name} ${user.last_name}`,null,{type:"user",user})
    }

    const handleActivityClick=(name)=>{
      console.log(name)
      if (name==="Patient Registration") {
        dispatch(openPatientRegistration())
        homeContext.setSelectedTab("Patient Registration")
      } else if (name==="Patient Check-in") {
        dispatch(openPatientCheckin())
      } else if (name==="User Editor") {
        setModalLoading(true)
        setOpen(true)
        setGetUserRecordsFromDB(!getUserRecordsFromDB)
        setSelectedActivity("users")
        // dispatch(openEditor({type:"user"}))
      } else if (name==="Department Editor") {
        dispatch(openEditor({type:"department"}))
      }
    }

    useEffect(()=>{
      const getRecords = async () => {
        const res = await fetch(`/api/users/`)
        const data = await res.json()
        setUsers(data.users)
        setModalLoading(false)
      }
      if (allActivities.role_activities || allActivities.user_activities) {
        getRecords()
      }
    },[getUserRecordsFromDB])

    function JavaScriptMedia() {
    const matches = useMediaQuery(
    json2mq({
      minWidth: 600,
    }),
  );

  return <span>{`{ minWidth: 600 } matches: ${matches}`}</span>;
    }

    const changeThemes = () =>{
        if (themeContext.themes === "light") {
          themeContext.setThemes("dark")
        } else if (themeContext.themes === "dark") {
          themeContext.setThemes("light")
        }
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
            <Grid container style={{width:"100%"}}>
            {activities.some(activity=> activity.name === "Patient Registration") ? 
                  <Grid item xs={12} sm={12} lg={6} style={{cursor:"pointer"}} onClick={(e)=>handleActivityClick("Patient Registration")}>
                  <DashboardActivityButton style={{cursor:"pointer"}} color={"coral"} title="Patient Registration"></DashboardActivityButton>
                  </Grid> : ""}
            {activities.some(activity=> activity.name === "Patient Check-in") ? 
                  <Grid item xs={12} sm={12} lg={6} style={{cursor:"pointer"}} onClick={(e)=>handleActivityClick("Patient Check-in")}>
                  <DashboardActivityButton style={{cursor:"pointer"}} color={"coral"} title="Patient Check-in"></DashboardActivityButton>
                  </Grid> : ""}
            {activities.some(activity=> activity.name === "User Editor") ? 
                  <Grid item xs={12} sm={12} lg={6} style={{cursor:"pointer"}} onClick={(e)=>handleActivityClick("User Editor")}>
                  <DashboardActivityButton style={{cursor:"pointer"}} color={"coral"} title="User Editor"></DashboardActivityButton>
                  </Grid> : ""}
            {activities.some(activity=> activity.name === "Record Editor") ?
                  <Grid item xs={12} sm={12} lg={6} style={{cursor:"pointer"}} onClick={(e)=>handleActivityClick("Department Editor")}>
                  <DashboardActivityButton style={{cursor:"pointer"}} color={"coral"} title="Department Editor" onClick={(e)=>handleActivityClick("Department Editor")}></DashboardActivityButton>
                  </Grid>
                  : ""
                  }
            </Grid>
        </div>
        <div>
            {themeContext.themes === "light" ? <Button onClick={changeThemes} size="small" style={{outline:"none",backgroundColor: "#7f53ac",backgroundImage: "linear-gradient(315deg, #7f53ac 0%, #647dee 74%)",marginRight:"30px",color:"white",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#3badfb"}}/></Button>
            :
            <Button onClick={changeThemes} size="small" style={{outline:"none",background:"linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",marginRight:"30px",color:"white",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#f7b732"}}/></Button>}
        </div>
        <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {modalLoading ? <CircularProgress/> : 

            <div>
              {users.map(user=>{
                return(
                  <div onClick={(e)=>handleUserEditorClick(user)}>
                    {user.first_name}
                  </div>
                )
              })}
            </div>
            
            }
          </div>
        </Fade>
      </Modal>
    </div>
    </>
  )
}

export default Dashboard