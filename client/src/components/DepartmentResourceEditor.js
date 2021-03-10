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
import DepartmentEditFormField from './DepartmentEditFormField';
import ResourceEditor from './ResourceList';
import ResourceListContext from './utils/ResourceListContext';

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

const DepartmentResourceEditor = (props) => {
    const classes = useStyles();

    const [department,setDepartment]=useState(props.department)
    const [name,setName]=useState(props.department.name)
    const [timeOpen,setTimeOpen]=useState(props.department.time_open)
    const [timeClosed,setTimeClosed]=useState(props.department.time_closed)
    const [specialty,setSpecialty]=useState(props.department.specialty)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loadingPicture,setLoadingPicture] = useState(false)
    const themeContext = useContext(ThemeContext)
    const [loading,setLoading]=useState(true)
    const [specialtyEdit,setSpecialtyEdit] = useState(false)
    const [nameEdit,setNameEdit] =useState(false)
    const [timeOpenEdit,setTimeOpenEdit]=useState(false)
    const [timeClosedEdit,setTimeClosedEdit]=useState(false)
    const [resources,setResources] =useState({})
    const [addressLineOne,setAddressLineOne] = useState(props.department.address_line_one)
    const [addressLineTwo,setAddressLineTwo] = useState(props.department.address_line_two)
    const [addressCity,setAddressCity] = useState(props.department.address_city)
    const [addressState,setAddressState] = useState(props.department.address_state)
    const [addressZip,setAddressZip] = useState(props.department.address_zip)
    const [address,setAddress]=useState(`${props.department.address_line_one}`)
    const currentRecord = useSelector(state=>state.currentRecord)
    const dispatch = useDispatch()

    const resourcesFromStore = useSelector(state=>state.currentRecord.resources)

    useEffect(()=>{
        if (resourcesFromStore) {
            console.log("from da sTOOOO!",resourcesFromStore)
            setResources(resourcesFromStore)
            setLoading(false)
        }
    },[resourcesFromStore])

    const form = useRef(null)

    const handleProfileFormSubmit=(e)=>{
        e.preventDefault()
      }

    const handleNameSubmit=(e)=>{
      e.stopPropagation()
      setNameEdit(false)
    }

      const saveChanges = (e) => {
          e.preventDefault()
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
      }

    if (loading) return "...loading";

    return (
      <ResourceListContext.Provider value={{setResources,resources}}>
      <Fade in={loading === false}>
      <div style={{width:"100%",display:"flex",marginTop:"35px",flexDirection:"column",alignItems:"center"}}>
        <div style={{outline:"none",minWidth:"800px",minHeight:"280px",borderRadius:"8px",border:"1px solid #dadce0",display:"flex",flexDirection:"column",marginLeft:"50px",marginRight:"50px",paddingTop:"16px"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingRight:"16px"}}>
        <h3 style={{paddingLeft:"16px"}}>Rooms</h3>
        {/* <div style={{display:"flex",flexDirection:"row",alignSelf:"flex-end",marginBottom:"10px"}}>
            <ColorButton onClick={(e)=>saveChanges(e)}>Accept Changes <CheckCircleOutlineIcon style={{marginLeft:"8px"}}></CheckCircleOutlineIcon></ColorButton>
        </div> */}
        </div>
          
            <form onSubmit={(e)=>{handleProfileFormSubmit(e)}} >
              <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                <div style={{display:"flex",flexDirection:"column",width:"100%",paddingLeft:"0px",paddingRight:"0px"}}>
                    <ResourceEditor resources={resources} department={department}></ResourceEditor>
                    </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        </Fade>
        </ResourceListContext.Provider>

    )
}

export default DepartmentResourceEditor