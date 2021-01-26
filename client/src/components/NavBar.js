import React, {useState,useEffect, useContext,useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink,Link, Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Box, IconButton, Avatar, Typography, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { logout } from '../store/auth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import {openTab} from '../store/activities'
import HomeContext from '../components/utils/HomeContext'
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SearchIcon from '@material-ui/icons/Search';
import ThemeContext from './utils/ThemeContext';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';
import ScheduleSelector from './ScheduleSelector';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputBase from '@material-ui/core/InputBase';
import {Breakpoint} from 'react-socks'
import PatientSearchResults from '../components/PatientSearchResults';
import { fade} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PatientSearchContext from './utils/PatientSearchContext'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "whitesmoke",
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    color:"dimgray",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'dimgray',
  },
  mobileInputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '5ch',
      '&:focus': {
        width: '10ch',
      },
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
  appbar: {
    backgroundColor: "rgb(255, 107, 107)",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px",
    height: "15px"
  },
  left: {
    display: 'flex',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  logo: {
    color:"cornflowerblue",
    textDecoration: "none",
    fontSize: "18px",
    margin: "2px",
  },
  icon: {
    fontSize: "28px",
    color: "rgba(255,255,255,.5)",
    opacity: "white",
  },
  button: {
    color: "white",
    backgroundColor: "hsla(0,0%,100%,.3)",
    borderRadius: "5px",
    padding: "5px",
    margin: "2px",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),},
  
  input: {
      display: 'none',
    },

}));

const iconStyle = {
  height: "17px",
  width: "17px",
  marginRight:"3px",
}

const buttonStyle = {
  display: "flex",
  flexDirection:"row",
  padding: "2px",
  alignItems: "center",
  color: "grey",
  borderRadius: "2px",
  margin: "2px",
  cursor: "pointer"
}


const Navbar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentUser,setCurrentUser] = useState(props.currentUser)
  const [user,setUser] = useState(currentUser)
  const context = useContext(HomeContext)
  const [loading,setLoading] = useState(true)
  const [activities,setActivities] =useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen,setModalOpen] = useState(false)
  const [loadingPicture,setLoadingPicture] = useState(false)
  const [patientSearchTerm,setPatientSearchTerm] = useState("")
  const [patientSearchResults,setPatientSearchResults]=useState([])
  const [displayPatientSearchResults,setDisplayPatientSearchResults]=useState(false)

  const form = useRef(null)


  const handleModalOpen = () => {
    handleClose();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openTabs = useSelector(state=>state.activities.open_tabs)
  const handleLogOut = ()=> {
      dispatch(logout())
  }
  const themeContext = useContext(ThemeContext)
  const allActivities = useSelector(state=>state.activities)
  useEffect(()=>{
      if (allActivities.role_activities || allActivities.user_activities){
          setActivities([...Object.values(allActivities.role_activities),...Object.values(allActivities.user_activities)])
          setLoading(false)
      }
  },[allActivities])

  const openActivity=(activity)=>{
      if (!openTabs.includes(activity)){
        dispatch(openTab(activity))
      }
      context.setSelectedTab(activity.name,activity.patient)
  }

  const handleProfileFormSubmit=(e)=>{
    e.preventDefault()
  }
  const changeThemes = () =>{
    if (themeContext.themes === "light") {
      themeContext.setThemes("dark")
    } else if (themeContext.themes === "dark") {
      themeContext.setThemes("light")
    }
  }

  useEffect(()=>{
    const searchPatients= async (searchTerm) => {
        const response = await fetch(`/api/patients/search/${searchTerm}`)
        const data = await response.json()
        setPatientSearchResults(data.patients)
        return;
    }
    if (patientSearchTerm.length > 0) {
        setDisplayPatientSearchResults(true)
        searchPatients(patientSearchTerm)
    }
  },[patientSearchTerm])

  // useEffect(()=>{
  //   if (currentUser.picture) {
  //     setUser(currentUser)
  //   }
  //   setLoading(false)
  // },[currentUser])

  const submit = e => {
    setLoadingPicture(true)
    e.preventDefault()
    const data = new FormData(form.current)
    fetch(`/api/users/upload-photo/${currentUser.id}`, {
    method: 'POST',
    body: data,
    })
    .then(res => res.json())
    .then(json => {
    console.log(json)
    setCurrentUser(json.user)
    setLoadingPicture(false)
    })
  }
  return (
    <>
    <PatientSearchContext.Provider value={{setDisplayPatientSearchResults,setPatientSearchTerm}}>
      <Breakpoint medium up>
      <div style={{flexGrow:1}}>
        <AppBar position="static">
        <Toolbar style={{minHeight:"0px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
            <div style={{display:"flex", alignItems:"center", flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"row"}}>
            <div onClick={()=>context.setSelectedTab("dashboard")} style={{display:"flex", alignItems:"center", cursor:"pointer"}} >
              <p className={classes.logo} style={{textDecoration:"none", fontStyle: "italic", fontWeight:"bold"}}>Saga</p>
            </div>
            </div>
            <div style={{display:"flex", alignItems:"center", flexDirection:"row"}}>
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Patient Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={patientSearchTerm} 
              onChange={(e)=>setPatientSearchTerm(e.target.value)}
            />
            <div style={{background: themeContext.themes === "dark" ? "#444444" : "white"}}>
              {displayPatientSearchResults ? patientSearchResults.length ? <PatientSearchResults patientSearchResults={patientSearchResults}/> : <></> : <></>}
            </div>
          </div>
              {/* <ScheduleSelector/> */}
            {/* {themeContext.themes === "light" ? <IconButton onClick={changeThemes} style={{height:"38px",width:"38px",boxShadow:"0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",outline:"none",background:"linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",color:"white",marginRight:"4px",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#f7b732"}}/></IconButton>
            :
            <IconButton onClick={changeThemes} style={{height:"38px",width:"38px",outline:"none",backgroundColor: "#7f53ac",backgroundImage: "linear-gradient(315deg, #7f53ac 0%, #647dee 74%)",marginRight:"4px",color:"white",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#3badfb"}}/></IconButton>
            } */}

            {currentUser.picture ? <Avatar onClick={handleClick} style={{boxShadow:"0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}} src={`${currentUser.picture}`}/> 
            : currentUser.provider ? <Avatar onClick={handleClick} style={{marginRight:"30px",boxShadow:"0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}} className={classes.purple}>{currentUser.provider.first_name[0]+currentUser.provider.last_name[0]}</Avatar> : <Avatar onClick={handleClick} style={{marginRight:"30px",boxShadow:"0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}} className={classes.purple}>{currentUser.username[0]}</Avatar>}
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem onClick={handleModalOpen}> 
                  <ListItemText primary="Profile" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemText primary="Settings" />
                </StyledMenuItem>
                <StyledMenuItem onClick={handleLogOut}>
                  <ListItemText primary="Logout" />
                </StyledMenuItem>
            </StyledMenu>
            </div>
            </div>
            </Toolbar>
          </AppBar>
        </div>
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
        <div className={classes.paper} style={{outline:"none",width:"100%",color:themeContext.themes === "dark" ? "white" : "#444444",maxWidth:"600px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
        <div style={{outline:"none",width:"100%",maxWidth:"600px",display:"flex",flexDirection:"column"}}>
        <h3>{currentUser.first_name + " " + currentUser.last_name}</h3>
          
            <form onSubmit={(e)=>{handleProfileFormSubmit(e)}}>
              <div style={{display:"flex",flexDirection:"row"}}>
                <div>
                <form ref={form} onSubmit={submit}>
                  <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <div className={"circular--portrait"} style={{justifyContent:"center",alignSelf:"center", marginTop:"5px",boxShadow: themeContext.themes === "dark" ? "" : "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.9) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"}}>
                      {loadingPicture ? <img id="user-photo" src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"/> : <img id="user-photo" src={currentUser.picture ? currentUser.picture : ""}/>}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",margin:"5px"}}>
                    <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" fullWidth>
                      Select New
                      <PhotoCamera style={{marginLeft:"4px"}}></PhotoCamera>
                    </Button>
                  </label>
                    {/* <input type="file" name="file"></input> */}
                  <Button style={{backgroundColor:"cornflowerblue",color:"white"}} type="submit" name="Sign Up" >Update Photo</Button>
                  </div>
                  </div>
                </form>
                </div>
                <div style={{display:"flex",flexDirection:"column",width:"100%",margin:"20px"}}>
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px"}}>username: <div></div><div>{currentUser.username}</div></div>
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px"}}>email: <div></div><div>{currentUser.email}</div></div>
                </div>
              </div>
            </form>
          </div>
          </div>
        </Fade>
      </Modal>
    </div>
    </Breakpoint>
    <Breakpoint small down>
    <div style={{flexGrow:1}}>
        <AppBar position="static">
        <Toolbar style={{minHeight:"0px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "cornflowerblue"}}>
            <div style={{display:"flex", alignItems:"center", flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"row"}}>
            <div onClick={()=>context.setSelectedTab("dashboard")} style={{display:"flex", alignItems:"center", cursor:"pointer",color:themeContext.themes === "dark" ? "cornflowerblue" : "cornflowerblue"}} >
              <div className={classes.logo} style={{textDecoration:"none", fontStyle: "italic", fontWeight:"bold",color:themeContext.themes === "dark" ? "cornflowerblue" : "cornflowerblue"}}>Saga</div>
            </div>
            </div>
            <div style={{display:"flex", alignItems:"center", flexDirection:"row"}}>
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Patient Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.mobileInputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={patientSearchTerm} 
              onChange={(e)=>setPatientSearchTerm(e.target.value)}
            />
            <div style={{background: themeContext.themes === "dark" ? "#444444" : "white"}}>
              {displayPatientSearchResults ? patientSearchResults.length ? <PatientSearchResults patientSearchResults={patientSearchResults}/> : <></> : <></>}
            </div>
          </div>
            {/* {themeContext.themes === "light" ? <IconButton onClick={changeThemes} style={{height:"38px",width:"38px",boxShadow:"0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",outline:"none",background:"linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",color:"white",marginRight:"4px",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#f7b732"}}/></IconButton>
            :
            <IconButton onClick={changeThemes} style={{height:"38px",width:"38px",outline:"none",backgroundColor: "#7f53ac",backgroundImage: "linear-gradient(315deg, #7f53ac 0%, #647dee 74%)",marginRight:"4px",color:"white",textTransform:"none",fontWeight:"bolder"}}><Brightness4TwoToneIcon style={{cursor:"pointer",color:"#3badfb"}}/></IconButton>} */}

            {currentUser.picture ? <Avatar onClick={handleClick} style={{boxShadow:"0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}} src={`${currentUser.picture}`}/> 
            : <Avatar onClick={handleClick} style={{marginRight:"30px",boxShadow:"0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}} className={classes.purple}>{currentUser.first_name[0]+currentUser.last_name[0]}</Avatar>}
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem onClick={handleModalOpen}> 
                  <ListItemText primary="Profile" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemText primary="Settings" />
                </StyledMenuItem>
                <StyledMenuItem onClick={handleLogOut}>
                  <ListItemText primary="Logout" />
                </StyledMenuItem>
            </StyledMenu>
            </div>
            </div>
            </Toolbar>
          </AppBar>
        </div>
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
        <div className={classes.paper} style={{outline:"none",width:"100%",color:themeContext.themes === "dark" ? "white" : "#444444",maxWidth:"600px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
        <div style={{outline:"none",width:"100%",maxWidth:"600px",display:"flex",flexDirection:"column"}}>
        <h3>{currentUser.first_name + " " + currentUser.last_name}</h3>
          
            <form onSubmit={(e)=>{handleProfileFormSubmit(e)}}>
              <div style={{display:"flex",flexDirection:"row"}}>
                <div>
                <form ref={form} onSubmit={submit}>
                  <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <div className={"circular--portrait"} style={{justifyContent:"center",alignSelf:"center", marginTop:"5px",boxShadow: themeContext.themes === "dark" ? "" : "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.9) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"}}>
                      {loadingPicture ? <img id="user-photo" src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"/> : <img id="user-photo" src={currentUser.picture ? currentUser.picture : ""}/>}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",margin:"5px"}}>
                    <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" fullWidth>
                      Select New
                      <PhotoCamera style={{marginLeft:"4px"}}></PhotoCamera>
                    </Button>
                  </label>
                    {/* <input type="file" name="file"></input> */}
                  <Button style={{backgroundColor:"cornflowerblue",color:"white"}} type="submit" name="Sign Up" >Update Photo</Button>
                  </div>
                  </div>
                </form>
                </div>
                <div style={{display:"flex",flexDirection:"column",width:"100%",margin:"20px"}}>
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px"}}>username: <div></div><div>{currentUser.username}</div></div>
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px"}}>email: <div></div><div>{currentUser.email}</div></div>
                </div>
              </div>
            </form>
          </div>
          </div>
        </Fade>
      </Modal>
    </div>
    </Breakpoint>
    </PatientSearchContext.Provider>
    </>
  )
}

export default Navbar;
