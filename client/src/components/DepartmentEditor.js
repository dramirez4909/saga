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
import DepartmentBasicInfoForm from './DepartmentBasicInfoForm';
import DepartmentHoursEditor from './DepartmentHoursEditor';
import DepartmentResourceEditor from './DepartmentResourceEditor';
import DepartmentAddressEditor from './DepartmentAddressEditor'

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



const DepartmentEditor = (props) => {
    const classes = useStyles();

    const [department,setDepartment]=useState(props.department)
    const [resources,setResources] = useState(props.resources)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loadingPicture,setLoadingPicture] = useState(false)
    const themeContext = useContext(ThemeContext)
    const [loading,setLoading]=useState(true)
    const currentRecord = useSelector(state=>state.currentRecord)
  

    const handleProfileFormSubmit=(e)=>{
        e.preventDefault()
      }

      useEffect(()=>{
        if (props.department.id === currentRecord.id && (props.department.id && currentRecord.id)) {
          setDepartment(currentRecord)
          setLoading(false)
        }
      },[currentRecord])

      if (loading) {
        return (
          <CircularProgress/>
        )
      }
    
    return (
        <div style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          alignSelf:"center",
          paddingTop:"20px",
          paddingBottom:"280px",
          width:"100%"
          }}>
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
        {/* <img style={{width:"200px",alignSelf:"center"}} src="https://www.gstatic.com/identity/boq/accountsettingsmobile/privacycheckup_scene_316x112_3343d1d69c2d68a4bd3d28babd1f9e80.png"></img> */}
          {/* <Avatar style={{width:"90px",height:"90px",alignSelf:"center"}} src={currentRecord.picture}/> */}
          <div style={{display:"flex",marginBottom:"20px",flexDirection:"row",alignItems:"center",fontSize:"28px",fontFamily:"system-ui",fontWeight:"300"}}>{department.name}</div>
          </div>
          <DepartmentBasicInfoForm department={department} />
          <div style={{
          display:"flex",
          flexDirection:"row",
          alignItems:"center",
          alignSelf:"center",
          marginTop:"20px",
          justifyContent:"space-between",
          marginBottom:"20px",
          width:"100%",
          maxWidth:"800px"
          }}>
          <DepartmentHoursEditor department={department} />
          <DepartmentAddressEditor department={department}/>
          </div>
          <DepartmentResourceEditor department={department} resources={resources}/>
        </div>
    )
}

export default DepartmentEditor