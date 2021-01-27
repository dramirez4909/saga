import React, { useState, useRef, useContext, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import { AppBar, Toolbar, Box, IconButton, Avatar, Typography, Button, CircularProgress, Divider, InputAdornment } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { logout } from '../store/auth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircle';
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
import { useDispatch, useSelector } from 'react-redux';
import { updateRecord } from '../store/current_record';
import UserEditFormField from './UserEditFormField';

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

  const ColorButton = withStyles((theme) => ({
    root: {
        color:"dodgerblue",
        paddingRight: "10px",
        paddingLeft: "10px",
        outline: "none",
        margin:"10px",
        marginTop:"15px",
        border:"1px solid dodgerblue",
        textDecoration:"none",
        margin: "4px",
        backgroundColor:"transparent",
        '&:hover': {
            backgroundColor: "dodgerblue !important",
            color:"white"
        },
    },
  }))(Button);

const UserEditForm = (props) => {
    const classes = useStyles();

    const [user,setUser]=useState(props.user)
    const [firstName,setFirstName]=useState(props.user.first_name)
    const [lastName,setLastName]=useState(props.user.last_name)
    const [username,setUsername]=useState(props.user.username)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loadingPicture,setLoadingPicture] = useState(false)
    const themeContext = useContext(ThemeContext)
    const [loading,setLoading]=useState(true)
    const [firstNameEdit,setFirstNameEdit] = useState(false)
    const [lastNameEdit,setLastNameEdit] =useState(false)
    const [emailEdit,setEmailEdit] = useState(false)
    const [usernameEdit,setUsernameEdit] = useState(false)
    const currentRecord = useSelector(state=>state.currentRecord)
    const dispatch = useDispatch()

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

    const handleFirstNameSubmit=(e)=>{
      e.stopPropagation()
      setFirstNameEdit(false)
    }
    const handleLastNameSubmit=(e)=>{
      e.stopPropagation()
      setLastNameEdit(false)
    }
    const handleEmailSubmit=(e)=>{
      e.stopPropagation()
      setEmailEdit(false)
    }
    const handleUsernameSubmit=(e)=>{
      e.stopPropagation()
      setUsernameEdit(false)
    }

    //   useEffect(()=>{
    //     if (props.user.id === currentRecord.id) {
    //       setUser(currentRecord)
    //       setLoading(false)
    //     }
    //   },[currentRecord,props.user])

    //   if (loading) {
    //     return (
    //       <CircularProgress/>
    //     )
    //   }

      const saveChanges = (e) => {
          e.preventDefault()
          setFirstNameEdit(false)
          setLastNameEdit(false)
          setEmailEdit(false)
          setUsernameEdit(false)
          dispatch(updateRecord({type:"user",first_name:firstName,last_name:lastName,email,username,id:user.id}))
      }
    
    return (
      <Fade in={loading === true}>
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"row",alignSelf:"flex-end",marginBottom:"10px"}}>
            <ColorButton onClick={(e)=>saveChanges(e)}>Accept Changes <CheckCircleOutlineIcon style={{marginLeft:"8px"}}></CheckCircleOutlineIcon></ColorButton>
        </div>
        <div style={{outline:"none",paddingTop:"16px",minWidth:"600px",minHeight:"280px",borderRadius:"8px",border:"1px solid #dadce0",display:"flex",flexDirection:"column",marginLeft:"50px",marginRight:"50px"}}>
        <h3 style={{paddingLeft:"16px"}}>Basic Info</h3>
          
            <form onSubmit={(e)=>{handleProfileFormSubmit(e)}} >
              <div style={{display:"flex",flexDirection:"row"}}>
                {/* <div>
                <form ref={form} onSubmit={submit}>
                  <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <div className={"circular--portrait"} style={{justifyContent:"center",alignSelf:"center", marginTop:"5px"}}>
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
                  <Button style={{backgroundColor:"cornflowerblue",color:"white"}} type="submit" name="Sign Up" >Update Photo</Button>
                  </div>
                  </div>
                </form>
                </div> */}
                <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                
                <div style={{display:"flex",flexDirection:"column",width:"100%",paddingLeft:"0px",paddingRight:"0px"}}>

                    { firstNameEdit ? 
                    <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368",minWidth:"180px"}}>
                        FIRST NAME
                    </div>
                    <form onSubmit={(e)=>handleFirstNameSubmit(e)} style={{width:"100%",paddingLeft:"6px"}}>
                    <InputBase autoFocus={true} fontSize="18px" endAdornment={<InputAdornment position="end">
                      <Button fullwidth style={{color:"grey"}} size="medium" onClick={(e)=>setFirstNameEdit(false)}>
                        Done 
                      <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                      </Button></InputAdornment>} type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"dodgerblue"}}id="outlined-basic" label="FIRST NAME" variant="outlined" />
                    </form>
                    </div>
                    :
                    <div onClick={(e)=>setFirstNameEdit(true)} style={{margin:"0px"}}>
                    <UserEditFormField label={"first name"} text={firstName}/>
                    </div>
                    }
                    <Divider style={{ width: "100%"}} />
                    { lastNameEdit ? 
                    <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368",minWidth:"180px"}}>
                        LAST NAME
                    </div>
                    <form onSubmit={(e)=>handleLastNameSubmit(e)} style={{width:"100%",paddingLeft:"6px"}}>
                    <InputBase autoFocus={true} fontSize="18px" endAdornment={<InputAdornment position="end">
                      <Button fullwidth style={{color:"grey"}} size="medium" onClick={(e)=>setLastNameEdit(false)}>
                        Done 
                      <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                      </Button></InputAdornment>} type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"dodgerblue"}}id="outlined-basic" label="FIRST NAME" variant="outlined" />
                    </form>
                    </div>
                    :
                    <div onClick={(e)=>setLastNameEdit(true)} style={{margin:"0px"}}>
                    <UserEditFormField label={"last name"} text={lastName}/>
                    </div>
                    }
                    <Divider style={{ width: "100%"}} />
                    { emailEdit ? 
                    <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368",minWidth:"180px"}}>
                        EMAIL
                    </div>
                    <form onSubmit={(e)=>handleEmailSubmit(e)} style={{width:"100%",paddingLeft:"6px"}}>
                    <InputBase autoFocus={true} style={{height:"27px"}} fontSize="18px" endAdornment={<InputAdornment position="end" >
                      <Button fullwidth style={{color:"grey"}} size="medium" onClick={(e)=>setEmailEdit(false)}>
                        Done 
                      <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                      </Button></InputAdornment>} type="text" value={email} onChange={(e)=>setEmail(e.target.value)} style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"dodgerblue"}}id="outlined-basic" label="FIRST NAME" variant="outlined" />
                    </form>
                    </div>
                    :
                    <div onClick={(e)=>setEmailEdit(true)} style={{margin:"0px"}}>
                    <UserEditFormField label={"email"} text={email}/>
                    </div>
                    }
                    <Divider style={{ width: "100%"}} />
                    { usernameEdit ? 
                    <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368",minWidth:"180px"}}>
                        USERNAME
                    </div>
                    <form onSubmit={(e)=>handleUsernameSubmit(e)} style={{width:"100%",paddingLeft:"6px"}}>
                    <InputBase autoFocus={true} fontSize="18px" endAdornment={<InputAdornment position="end">
                      <Button fullwidth style={{color:"grey"}} size="medium" onClick={(e)=>setUsernameEdit(false)}>
                        Done 
                      <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                      </Button></InputAdornment>} type="text" value={username} onChange={(e)=>setUsername(e.target.value)} style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"dodgerblue"}}id="outlined-basic" label="FIRST NAME" variant="outlined" />
                    </form>
                    </div>
                    :
                    <div onClick={(e)=>setUsernameEdit(true)} style={{margin:"0px"}}>
                    <UserEditFormField label={"username"} text={username}/>
                    </div>
                    }
                    {/* <TextField size="medium" fullWidth value={lastName} onChange={(e)=>setLastName(e.target.value)}style={{margin:"5px"}}id="outlined-basic" label="Last Name" variant="outlined" />
                    <TextField size="medium" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)}style={{margin:"5px"}}id="outlined-basic" label="Email" variant="outlined" />
                    <TextField size="medium" fullWidth value={username} onChange={(e)=>setUsername(e.target.value)}style={{margin:"5px"}}id="outlined-basic" label="Username" variant="outlined" /> */}
                </div>

                </div>
              </div>
            </form>
          </div>
        </div>
        </Fade>
    )
}

export default UserEditForm