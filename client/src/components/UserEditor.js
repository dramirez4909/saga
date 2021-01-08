import React, { useState, useRef, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import { AppBar, Toolbar, Box, IconButton, Avatar, Typography, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { logout } from '../store/auth';
import Menu from '@material-ui/core/Menu';
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
      boxShadow: theme.shadows[2],
      padding: theme.spacing(2, 4, 3),},
    
    input: {
        display: 'none',
      },
  
  }));

const UserEditor = (props) => {
    const classes = useStyles();

    const [user,setUser]=useState(props.user)
    const [firstName,setFirstName]=useState(props.user.first_name)
    const [lastName,setLastName]=useState(props.user.last_name)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loadingPicture,setLoadingPicture] = useState(false)
    const themeContext = useContext(ThemeContext)

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
    
    return (
        <div>
        <div className={classes.paper} style={{outline:"none",width:"100%",color:themeContext.themes === "dark" ? "white" : "#444444",maxWidth:"600px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
        <div style={{outline:"none",width:"100%",maxWidth:"600px",display:"flex",flexDirection:"column"}}>
        <h3>{user.first_name + " " + user.last_name}</h3>
          
            <form onSubmit={(e)=>{handleProfileFormSubmit(e)}}>
              <div style={{display:"flex",flexDirection:"row"}}>
                <div>
                <form ref={form} onSubmit={submit}>
                  <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <div className={"circular--portrait"} style={{justifyContent:"center",alignSelf:"center", marginTop:"5px",boxShadow: themeContext.themes === "dark" ? "" : "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.9) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"}}>
                      {loadingPicture ? <img id="user-photo" src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"/> : <img id="user-photo" src={user.picture ? user.picture : ""}/>}
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
                <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                    <TextField size="small" fullWidth value={firstName} onChange={(e)=>setFirstName(e.target.value)} style={{margin:"5px"}}id="outlined-basic" label="First Name" variant="outlined" />
                    <TextField size="small" fullWidth value={lastName} onChange={(e)=>setLastName(e.target.value)}style={{margin:"5px"}}id="outlined-basic" label="Last Name" variant="outlined" />
                    <TextField size="small" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)}style={{margin:"5px"}}id="outlined-basic" label="Email" variant="outlined" />
                </div>
                </div>
              </div>
            </form>
          </div>
          </div>
        </div>
    )
}

export default UserEditor