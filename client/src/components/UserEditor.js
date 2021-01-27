import React, { useState, useRef, useContext, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import { AppBar, Toolbar, Box, IconButton, Avatar, Typography, Button, CircularProgress } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { logout } from '../store/auth';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem'
import {openTab} from '../store/activities'
import HomeContext from '../components/utils/HomeContext'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputBase from '@material-ui/core/InputBase';
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';
import ScheduleSelector from './ScheduleSelector';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import ListItemText from '@material-ui/core/ListItemText';
import {Breakpoint} from 'react-socks'
import PatientSearchResults from '../components/PatientSearchResults';
import { fade} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PatientSearchContext from './utils/PatientSearchContext'
import ThemeContext from './utils/ThemeContext';
import { useSelector } from 'react-redux';
import UserEditForm from './UserEditForm';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserEditRoleForm from './UserEditRoleForm';
import UserEditSecurityForm from './UserEditSecurityForm';


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
      backgroundColor: fade(theme.palette.common.white, 0.15),
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
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
      color: "white",
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
      
    },
    
    input: {
        display: 'none',
      },
    tabRoot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        justifyContent:"center",
      },
      tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        fontWeight:"400",
        // width:"100%",
        // maxWidth:"300px"
      },
  
  }));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{padding:"1px"}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const UserEditor = (props) => {
    const classes = useStyles();

    const [user,setUser]=useState(props.user)
    const [firstName,setFirstName]=useState()
    const [lastName,setLastName]=useState()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loadingPicture,setLoadingPicture] = useState(false)
    const themeContext = useContext(ThemeContext)
    const [loading,setLoading]=useState(true)
    const currentRecord = useSelector(state=>state.currentRecord)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [email,setEmail]=useState(props.user.email)
    const [roles, setRoles]=useState("")

    const form = useRef(null)
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleProfileFormSubmit=(e)=>{
        e.preventDefault()
      }

    const submit = e => {
        setLoadingPicture(true)
        e.preventDefault()
        const data = new FormData(form.current)
        fetch(`/api/users/upload-photo/${user.id}`, {
        method: 'POST',
        body: data,
        })
        .then(res => res.json())
        .then(json => {
        console.log(json)
        setUser(json.user)
        setLoadingPicture(false)
        })
      }

      useEffect(()=>{
        if (props.user.id === currentRecord.id && (props.user.id && currentRecord.id)) {
          setUser(currentRecord)
          setLoading(false)
        }
      },[currentRecord])

      if (loading) {
        return (
          <CircularProgress/>
        )
      }
    
    return (
      <div className={classes.paper} style={{display:"flex",flexDirection:"column",outline:"none",width:"100%",color:themeContext.themes === "dark" ? "white" : "#444444",paddingTop:"20px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
        {/* <img style={{width:"200px",alignSelf:"center"}} src="https://www.gstatic.com/identity/boq/accountsettingsmobile/privacycheckup_scene_316x112_3343d1d69c2d68a4bd3d28babd1f9e80.png"></img> */}
          {/* <Avatar style={{width:"90px",height:"90px",alignSelf:"center"}} src={currentRecord.picture}/> */}
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",fontSize:"28px",fontFamily:"system-ui",fontWeight:"300"}}>{currentRecord.first_name + " " + currentRecord.last_name}</div>
        </div>
        <div className={classes.tabRoot}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
            <Tab style={{fontWeight:"400"}}label="Basic Info" {...a11yProps(0)} />
            <Tab style={{fontWeight:"400"}}label="User Roles" {...a11yProps(1)} />
            <Tab style={{fontWeight:"400"}}label="Security Points" {...a11yProps(2)} />
          </Tabs>
        <TabPanel style={{width:"100%",maxWidth:"900px",overflow:"scroll"}} value={value} index={0}>
          <UserEditForm user={currentRecord}/>
        </TabPanel>
        <TabPanel style={{width:"100%",maxWidth:"900px"}} value={value} index={1}>
          <UserEditRoleForm user={currentRecord}/>
        </TabPanel>
        <TabPanel style={{width:"100%",maxWidth:"900px"}} value={value} index={2}>
          <UserEditSecurityForm user={currentRecord}/>
        </TabPanel>
      </div>
    </div>
    )
}

export default UserEditor