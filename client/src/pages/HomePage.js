import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, NavLink, Switch } from 'react-router-dom'
import { ProtectedRoute } from '../components/utils/routes'
import Dashboard from './Dashboard'
import Orders from './Orders'
import Schedule from './Schedule'
import NavBar from '../components/NavBar'
import HomeContext from '../components/utils/HomeContext'
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import '../styles/HomePage.css'
import ActivityTab from '../components/ActivityTab'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DepSchedule from './DepSchedule'
import PatientSearch from './PatientSearch'
import PatientChart from './PatientChart'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FaceIcon from '@material-ui/icons/Face';
import EncryptionIcon from '@material-ui/icons/LockTwoTone';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import SettingsIcon from '@material-ui/icons/Settings';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import {setCurrentPatient} from '../store/current_patient'
// import DepartmentScheduler from './DepartmentScheduler'
// import ProviderSchedule from './ProviderSchedule'
import ThemeContext from '../components/utils/ThemeContext'
import DepartmentSchedule from './DepartmentSchedule'
import {Breakpoint} from 'react-socks'
  import { fromPairs } from 'lodash'
import { BottomNavigation } from '@material-ui/core'
import MobileBottomNav from '../components/MobileBottomNav'
import MobileBottomMenu from '../components/MobileBottomMenu'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paperDark:{
      position:"fixed",
      top:"32px",
      backgroundColor:"#444444",
      width: "62px",
  },
  paperLight:{
    position:"fixed",
    top:"32px",
    backgroundColor:"white",
    width: "62px",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    position:"inherit",
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  tabStyle: {
    cursor:"pointer",
    margin:"5px",
    padding:"3px",
    color:"grey",
    borderRadius: "5px",
    display:"flex",
    transition: "all .1s ease-in-out",
    '&:hover': {
        transform: "scale(1.15)",
    }
},
}));

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

const HomePage=(props)=>{
  const [sideBarDisplay,setSideBarDisplay] = useState(true)
  const classes = useStyles();
  const theme = useTheme();
  const currentUser = useSelector(state => state.auth.user)
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const [themes,setThemes] = useState("dark")
  const context = useContext(ThemeContext)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
    const [tabs,setTabs] = useState([])
    const [selectedTabName,setSelectedTabName] = useState("dashboard")
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const [activities,setActivities] =useState([])
    const allActivities = useSelector(state=>state.activities)

    const setSelectedTab = (tabName,patient) => {
      if (tabName.includes(",")){
        console.log(tabName)
        dispatch(setCurrentPatient(patient))
      }
      setSelectedTabName(tabName)
      console.log("new selected tab name: ", tabName)
    }

    useEffect(()=>{
        if (openTabs && (allActivities.role_activities || allActivities.user_activities)){
            setTabs(openTabs)
            setActivities([{name:"dashboard",id:0 },...Object.values(allActivities.role_activities),...Object.values(allActivities.user_activities)])
        }
    },[openTabs, allActivities])

    const tabStyle = {
        '&:hover': {
            backgroundColor: "hsla(0,0%,100%,.32)",
        }
    }

    const globalTheme = createMuiTheme => ({
      overrides: {
        MuiCssBaseline: {
          '@global': {
            html: {
              WebkitFontSmoothing: 'auto',
            },
          },
        },
      },
    });

    return (
        <>    
                <HomeContext.Provider value={{setSelectedTab,setSelectedTabName, selectedTabName, setSideBarDisplay,openTabs}}>
                <Breakpoint medium up>
                <NavBar currentUser={currentUser}>
                </NavBar>
              <div style={{display:"flex",flexDirection:"row",backgroundColor:context.themes === "light" ? "white" : "#444444",height:"100%"}}>

              <div className={classes.content}>
                <div style={{display:"flex",flexDirection:"column",backgroundColor:context.themes === "dark" ? "#212121" : "rgb(221,224,230)"}}>
                    <div className={context.themes === "dark" ? "dark-tabs" : "tabs"} style={{display:"flex",flexDirection:"row",marginBottom:0,marginLeft:"20px", marginTop:"8px",listStyleType:"none"}}>
                    {tabs.map((activity, index)=>
                        (   
                            <ActivityTab key={index} style={{...tabStyle}} index={index} activity={activity}/>
                        ))}
                    </div>
                    <div style={{background:context.themes === "dark" ? "#444444" : "white", display:"flex"}}>
                    {tabs.map(( activity, index)=>
                    (
                        <Fade in={activity.name === selectedTabName} timeout={350} mountOnEnter unmountOnExit>
                        <div key={activity.name} style={{width:"100%",display: activity.name === selectedTabName ? "flex" : "none", flexDirection:"column",backgroundColor:context.themes === "dark" ? "#444444" : "white",alignItems:"center"}}>
                            {activity.name === "dashboard" ? <Dashboard/> : <></>}
                            {/* {activity.name === "My Schedule" ? <ProviderSchedule/> : <></>} */}
                            {/* {activity.name === "Place Orders" ? <Orders/> : <></>} */}
                            {activity.name === "Patient Search" ? <PatientSearch/>: <></>}
                            {activity.patient ? <PatientChart patient={activity.patient}/> : <></>}
                            {activity.department ? <DepartmentSchedule department={activity.department}/> : <></>}
                        </div>
                        </Fade>
                        ))}
                </div>
                </div>
            </div>
            </div>
            </Breakpoint>
            <Breakpoint small down>
                <NavBar currentUser={currentUser}>
                </NavBar>
              <div style={{display:"flex",flexDirection:"row",backgroundColor:context.themes === "light" ? "white" : "#444444",height:"100%"}}>

              <div className={classes.content}>
                <div style={{display:"flex",flexDirection:"column",backgroundColor:context.themes === "dark" ? "#212121" : "rgb(221,224,230)"}}>
                    {/* <div className={context.themes === "dark" ? "dark-tabs" : "tabs"} style={{display:"flex",flexDirection:"row",marginBottom:0,marginLeft:"20px", marginTop:"8px",listStyleType:"none"}}>
                    {tabs.map((activity, index)=>
                        (   
                            <ActivityTab key={index} style={{...tabStyle}} index={index} activity={activity}/>
                        ))}
                    </div> */}
                    <div style={{background:context.themes === "dark" ? "#444444" : "white", display:"flex"}}>
                    {tabs.map(( activity, index)=>
                    (
                        <Fade in={activity.name === selectedTabName} timeout={350} mountOnEnter unmountOnExit>
                        <div key={activity.name} style={{width:"100%",display: activity.name === selectedTabName ? "flex" : "none", flexDirection:"column",backgroundColor:context.themes === "dark" ? "#444444" : "white",alignItems:"center"}}>
                            {activity.name === "dashboard" ? <Dashboard/> : <></>}
                            {/* {activity.name === "My Schedule" ? <ProviderSchedule/> : <></>} */}
                            {/* {activity.name === "Place Orders" ? <Orders/> : <></>} */}
                            {activity.name === "Patient Search" ? <PatientSearch/>: <></>}
                            {activity.patient ? <PatientChart patient={activity.patient}/> : <></>}
                            {activity.department ? <DepartmentSchedule department={activity.department}/> : <></>}
                        </div>
                        </Fade>
                        ))}
                </div>
                </div>
            </div>
            </div>
            <MobileBottomMenu/>
            <MobileBottomNav ></MobileBottomNav>
            </Breakpoint>
            </HomeContext.Provider>
        </>
    )
}

export default HomePage
