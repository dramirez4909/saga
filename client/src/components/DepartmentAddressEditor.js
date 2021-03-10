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
import HomeContext from './utils/HomeContext'
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
import PatientSearchResults from './PatientSearchResults';
import { fade} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PatientSearchContext from './utils/PatientSearchContext'
import LocationContext from './utils/LocationContext'
import ThemeContext from './utils/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecord } from '../store/current_record';
import UserEditFormField from './UserEditFormField';
import DepartmentEditFormField from './DepartmentEditFormField';
import ResourceEditor from './ResourceList';
import AddressDisplayField from './AddressDisplayField'
import AddressEditField from './AddressEditField'

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

const DepartmentAddressEditor = (props) => {
    const classes = useStyles();

    const [department,setDepartment]=useState(props.department)
    const [name,setName]=useState(props.department.name)
    const [timeOpen,setTimeOpen]=useState(props.department.time_open ? props.department.time_open : "08:00")
    const [timeClosed,setTimeClosed]=useState(props.department.time_closed ? props.department.time_closed : "17:00")
    const [specialty,setSpecialty]=useState(props.department.specialty)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loadingPicture,setLoadingPicture] = useState(false)
    const themeContext = useContext(ThemeContext)
    const [loading,setLoading]=useState(true)
    const [specialtyEdit,setSpecialtyEdit] = useState(true)
    const [nameEdit,setNameEdit] =useState(true)
    const [timeOpenEdit,setTimeOpenEdit]=useState(true)
    const [timeClosedEdit,setTimeClosedEdit]=useState(true)
    const [editAddressDisplay,setEditAddressDisplay]=useState(true)

    const [addressLineOne,setAddressLineOne] = useState(props.department.address_line_one)
    const [addressLineTwo,setAddressLineTwo] = useState(props.department.address_line_two)
    const [addressCity,setAddressCity] = useState(props.department.address_city)
    const [addressState,setAddressState] = useState(props.department.address_state)
    const [addressZip,setAddressZip] = useState(props.department.address_zip)
    const [address,setAddress]=useState(`${props.department.address_line_one}`)
    const currentRecord = useSelector(state=>state.currentRecord)
    const dispatch = useDispatch()

    const form = useRef(null)
  

    const handleProfileFormSubmit=(e)=>{
        e.preventDefault()
      }

    const handleNameSubmit=(e)=>{
      e.stopPropagation()
      setNameEdit(false)
    }

    const saveChanges = () => {
        setNameEdit(false)
        dispatch(
            updateRecord({
              type:"department",
              name:name,specialty,
              id:department.id,
              addressLineOne,
              addressLineTwo,
              addressCity,
              addressState,
              addressZip}))
        setEditAddressDisplay(false)
      }
    return (
        <LocationContext.Provider value={{setAddressLineOne,setAddressLineTwo,setAddressZip,setAddressState,setAddressCity,saveChanges,addressLineOne,addressLineTwo,addressCity,addressState,addressZip}}>
      <Fade in={loading === true}>
        <div style={{outline:"none",maxWidth:"400px",borderRadius:"8px",overflow:"hidden",marginTop:"35px",border:"1px solid #dadce0",display:"flex",flexDirection:"column",width:"100%",maxWidth:"800px"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingRight:"16px"}}>
        <h3 style={{paddingLeft:"16px"}}>Location</h3>
        <Fade in={editAddressDisplay}>
        <div style={{display:"flex",flexDirection:"row",alignSelf:"flex-end",marginBottom:"10px"}}>
            <ColorButton onClick={(e)=>saveChanges()}>Accept Changes <CheckCircleOutlineIcon style={{marginLeft:"8px"}}></CheckCircleOutlineIcon></ColorButton>
        </div>
        </Fade>
        </div>
        <Divider style={{ width: "100%"}} />
        <Fade in={!editAddressDisplay}>
            <div onClick={(e)=>setEditAddressDisplay(true)} style={{margin:"0px"}}>
                <AddressDisplayField empty={props.department.address_line_one ? false : true}/>
            </div>
            </Fade>
            <Fade in={editAddressDisplay}>
              <div style={{margin:"0px"}}>
              <AddressEditField 
                department={department} 
                setEditAddressDisplay={setEditAddressDisplay}
                // addressLineOne={addressLineOne}
                // addressLineTwo={addressLineTwo}
                // setAddressLineOne={setAddressLineOne}
                // setAddressLineTwo={setAddressLineTwo}
                // setAddressCity={setAddressCity}
                // addressCity={addressCity}
                // addressState={addressState}
                // setAddressState={setAddressState}
                // addressZip={addressZip}
                // setAddressZip={setAddressZip}
                />
              </div>
        </Fade>
          </div>
        </Fade>
        </LocationContext.Provider>
    )
}

export default DepartmentAddressEditor