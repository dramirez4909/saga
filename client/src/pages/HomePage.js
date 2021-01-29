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
import { fade} from '@material-ui/core/styles';
import {setCurrentPatient} from '../store/current_patient'
import ScheduleSelector from '../components/ScheduleSelector'
// import DepartmentScheduler from './DepartmentScheduler'
// import ProviderSchedule from './ProviderSchedule'
import ThemeContext from '../components/utils/ThemeContext'
import DepartmentSchedule from './DepartmentSchedule'
import {Breakpoint} from 'react-socks'
  import { fromPairs } from 'lodash'
import { BottomNavigation, CircularProgress,Button } from '@material-ui/core'
import MobileBottomNav from '../components/MobileBottomNav'
import MobileBottomMenu from '../components/MobileBottomMenu'
import Registration from './Registration'
import RecordEditor from './RecordEditor'
import { setCurrentRecord } from '../store/current_record'
import {reorderTabs} from '../store/activities'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
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

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    console.log(result)
    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newTabs = reorder(
      tabs,
      result.source.index,
      result.destination.index
    );
    dispatch(reorderTabs(newTabs))
    console.log(newTabs)
    setTabs(newTabs)
  }

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
    const [loading,setLoading] =useState(false)

    const setSelectedTab = (tabName,patient,record) => {
      if (patient){
        console.log(tabName)
        dispatch(setCurrentPatient(patient))
      } else if (record) {
        console.log(tabName,record)
        dispatch(setCurrentRecord(record))
      }
      setSelectedTabName(tabName)
      console.log("new selected tab name: ", tabName)
    }

    const closeTab =(index)=>{
      const newTabs = tabs.splice(index,1)
      setTabs(newTabs)
    }

    useEffect(()=>{
        if (openTabs && (allActivities.role_activities || allActivities.user_activities)){
            // if (openTabs.length !== tabs.length) {
            //   console.log("THIS FIRED!!!!!")
              setTabs(openTabs)
            console.log("tabs tabs tabs",openTabs)
            console.log("tabs state variable: ",tabs)
            setActivities([{name:"dashboard",id:0 },...Object.values(allActivities.role_activities),...Object.values(allActivities.user_activities)])
        }
    },[openTabs, allActivities])

    const tabStyle = {
        '&:hover': {
            backgroundColor: "black",
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

    console.log("tabs state variable: ",tabs)

    if (loading) {
      return (
        <CircularProgress/>
      )
    }

    return (
        <>    
                <HomeContext.Provider value={{setSelectedTab,setSelectedTabName, selectedTabName, setSideBarDisplay,openTabs,tabs,setTabs,setLoading,loading}}>
                <Breakpoint medium up style={{    
                  display: "block",
                  margin: 0,
                  minHeight: "100vh",
                  height:"100vh",
                  overflowX: "visible",
                  overflowY: "scroll"}}>
                <div style={{
                  display: "block",
                  minHeight:"100%",
                  overflowX: "visible",
                  overflowY: "scroll"
                }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
              <NavBar currentUser={currentUser}>
                </NavBar>
      <div style={{
        left:0,
        maxWidth:"64px",
        position:"fixed",
        minHeight:"100%",
        zIndex:2,
        overflowY:"hidden",
        display:"block",
        marginTop:"44px",
        background:"cornflowerblue"
        }}>
        <div style={{display:"flex",width:"100%",justifyContent:"flex-end"}}>
          {!open ? <IconButton onClick={handleDrawerOpen}>
             <ChevronLeftIcon />
          </IconButton>
          :
          <IconButton fullWidth size="large" onClick={handleDrawerClose}>
            <ChevronRightIcon/>
          </IconButton>}
        </div>
        <Divider />
        <List style={{justifyContent:"center",display:"flex"}}>
              <ScheduleSelector/>
        </List>
      </div>
        {/* <div className={classes.toolbar} /> */}
              <div style={{
                display:"flex",
                flexDirection:"column",
                flexGrow:1,
                position:"fixed",
                marginTop:"44px",
                height:"46px",
                marginLeft:"64px",
                width:"calc(100% - 64px)",
                zIndex:2,
                backgroundColor:context.themes === "dark" ? "#212121" : "rgb(221,224,230,0.5)"
                }}>
                    {/* <div 
                    className={context.themes === "dark" ? "dark-tabs" : "tabs"} 
                    style={{display:"flex",flexDirection:"row",marginBottom:0,marginLeft:"20px", marginTop:"0px",listStyleType:"none",...tabStyle,marginTop:"8px"}}>
                    {tabs.map((activity, index)=>
                        (   
                            <ActivityTab key={activity.name} index={index} activity={activity}/>
                        ))}
                    </div> */}
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={context.themes === "dark" ? "dark-tabs" : "tabs"}
                            style={{display:"flex",
                            flexDirection:"row",
                            marginBottom:0,
                            marginLeft:"20px", 
                            marginTop:"0px",
                            padding:0,
                            height:"100%"
                            }}>
                            {tabs.map((activity, index) => (
                              <Draggable style={{cursor:"pointer",background: activity.name === selectedTabName ? "white" : "transparent"}}key={activity.name} draggableId={activity.name} index={index}>
                                {(provided, snapshot) => (  
                                    <div
                                    className={`draggable-tabs tabs draggable-tab`}
                                    style={{cursor:"pointer"}}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    index={index} activity={activity}>
                                      <ActivityTab key={activity.name} index={index} activity={activity}/>
                                    </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    </div>
                    {tabs.map((activity, index)=> {
                      if (activity.name === selectedTabName) {
                        console.log("record from home page: !!!!!",activity)
                    return (
                        <div style={{
                          width:"calc(100% - 64px)",
                          marginLeft:"64px",
                          display: activity.name === selectedTabName ? "block" : "none", 
                          position:"relative",
                          marginTop:"92px",
                          minHeight:"calc(100vh - 112px)",
                          backgroundColor:context.themes === "dark" ? "#444444" : "white",
                          position:"relative",
                          overflowY:"hidden",
                          }}>
                            {activity.name === "dashboard" ? <Dashboard/> : <></>}
                            {activity.name === "Patient Registration" ? <Registration/> : <></>}
                            {activity.name === "Patient Search" ? <PatientSearch/>: <></>}
                            {activity.patient ? <PatientChart patient={activity.patient}/> : <></>}
                            {activity.record ? activity.record.type === "user" ? <RecordEditor record={activity.record} /> : "" : "" }
                            {activity.record ? activity.record.type === "department" ? <RecordEditor record={activity.record} /> : "" : "" }
                            {activity.department ? <DepartmentSchedule department={activity.department}/> : <></>}
                        </div>
                        
                        )}})}
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
                    {tabs.map(( activity, index)=> {
                      console.log("activity: ",activity,"index: ",index)
                    return (
                        <Fade in={activity.name === selectedTabName} timeout={350} mountOnEnter unmountOnExit>
                        <div key={activity.name} style={{width:"100%",display: activity.name === selectedTabName ? "flex" : "none", flexDirection:"column",backgroundColor:context.themes === "dark" ? "#444444" : "white",alignItems:"center"}}>
                            {activity.name === "dashboard" ? <Dashboard/> : <></>}
                            {/* {activity.name === "My Schedule" ? <ProviderSchedule/> : <></>} */}
                            {/* {activity.name === "Place Orders" ? <Orders/> : <></>} */}
                            {activity.name === "Patient Search" ? <PatientSearch/>: <></>}
                            {activity.name === "Registration" ? <Registration/> : <></>}
                            {activity.patient ? <PatientChart patient={activity.patient}/> : <></>}
                            {activity.record ? <RecordEditor record={activity.record}/> : <></>}
                            {activity.department ? <DepartmentSchedule department={activity.department}/> : <></>}
                        </div>
                        </Fade>
                        )})}
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
