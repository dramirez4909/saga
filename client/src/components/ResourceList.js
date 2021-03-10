import React, { useState, useRef, useContext, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import { AppBar, Toolbar, Box, IconButton, Avatar, Typography, Button, CircularProgress, Divider, InputAdornment, Slide } from '@material-ui/core';
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
import { updateRecord, createRecord } from '../store/current_record';
import UserEditFormField from './UserEditFormField';
import DepartmentEditFormField from './DepartmentEditFormField';
import ResourceEditField from './ResourceEditField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ResourceListContext from './utils/ResourceListContext';
import ResourceAddNewField from './ResourceAddNewField';


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

  const RedColorButton = withStyles((theme) => ({
    root: {
        color:"tomato",
        paddingRight: "10px",
        paddingLeft: "10px",
        outline: "none",
        margin:"10px",
        border:"1px solid tomato",
        textDecoration:"none",
        margin: "4px",
        backgroundColor:"transparent",
        '&:hover': {
            backgroundColor: "tomato !important",
            color:"white"
        },
    },
  }))(Button);

const ResourceEditor = (props) => {
    const classes = useStyles();
    const [department,setDepartment]=useState(props.department)
    const [resources,setResources]=useState(props.resources)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loadingPicture,setLoadingPicture] = useState(false)
    const themeContext = useContext(ThemeContext)
    const [specialtyEdit,setSpecialtyEdit] = useState(false)
    const [nameEdit,setNameEdit] =useState(false)
    const [timeOpenEdit,setTimeOpenEdit]=useState(false)
    const [timeClosedEdit,setTimeClosedEdit]=useState(false)
    const currentRecord = useSelector(state=>state.currentRecord)
    const dispatch = useDispatch()
    const [loading,setLoading]=useState(true)
    const [showResourceEdit,setShowResourceEdit] = useState(true)
    const [selectedResource,setSelectedResource] = useState({})
    const [selectedResourceName,setSelectedResourceName] = useState()
    const [selectedResourceActive,setSelectedResourceActive] = useState()
    const [creatingResource,setCreatingResource] = useState(false)
    const resourceContext = useContext(ResourceListContext)
    const [updatingResource, setUpdatingResource] =useState(false)

    const resourcesFromStore = useSelector(state=>state.currentRecord.resources)

    useEffect(()=>{
        if (resourcesFromStore) {
            console.log("from da sTOOOO!",resourcesFromStore)
            setResources(resourcesFromStore)
            setLoading(false)
        }
    },[resourcesFromStore])

    const handleResourceClick = (resource) => {
        setUpdatingResource(true)
        setShowResourceEdit(false)
        setSelectedResource(resource)
        setSelectedResourceName(resource.name)
        setSelectedResourceActive(resource.active)
    }

    const handleActiveClick = ()=>{
        setSelectedResourceActive(!selectedResourceActive)
    }

    const handleNewResourceClick = () => {
        setShowResourceEdit(false)
        setCreatingResource(true)
        setSelectedResource({name:"New Room",active:false})
        setSelectedResourceName("")
        setSelectedResourceActive(false)
    }

    const handleBackButtonClick = () => {
        setUpdatingResource(false)
        setCreatingResource(false)
        setSelectedResource({})
        setShowResourceEdit(true)
        setSelectedResourceName("")
    }

    const handleNameSubmit=(e)=>{
        e.preventDefault();
        handleSaveClick();
    }

    const handleNewResourceSubmit=(e)=>{
        e.preventDefault();
        createNewResource();
    }

    const createNewResource = ()=>{
        setCreatingResource(false)
        setShowResourceEdit(true)
        dispatch(createRecord({type:"resource",name:selectedResourceName,departmentId:department.id,active:selectedResourceActive}))
        setSelectedResource({})
        setShowResourceEdit(true)
        setSelectedResourceName("")
    }

    const handleSaveClick =(e)=> {
        const newResources = {...resourceContext.resources}
        newResources[selectedResource.id] = {name:selectedResourceName,id:selectedResource.id,active:selectedResourceActive}
        resourceContext.setResources(newResources)
        dispatch(updateRecord({name:selectedResourceName,id:selectedResource.id,active:selectedResourceActive,type:"resource"}))
        setSelectedResource({})
        setUpdatingResource(false)
        setShowResourceEdit(true)
    }

    if (loading) return "...loading"

    return (
        <Fade in={loading === false}>
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",overflow:"hidden"}}>
            <Fade in={showResourceEdit}>
                <div style={{
                    width:"100%",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    marginTop:"25px",
                    overflow:"hidden"
                    }}>
                {Object.values(resources).map(
                    (resource, index) =>{
                        console.log("holy camo!")
                    return(
                            <div onClick={(e)=>handleResourceClick(resource)} 
                            style={{
                                margin:"0px",
                                width:"100%"
                                }}>
                                  <Divider style={{width:"100%"}}/>
                                <ResourceEditField label={`${index + 1}`} text={`${resource.name}`}/>

                            </div>
                    )
                })}
                <div onClick={handleNewResourceClick} 
                style={{
                    margin:"0px",
                    width:"100%"
                    }}>
                <ResourceAddNewField text="Create A New Room"></ResourceAddNewField>
                </div>
                </div>
            </Fade>
            <Fade in={updatingResource}>
                <div style={{
                    width:"100%",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    position:"absolute",
                    overflow:"hidden",
                    }}>
                        <div style={{
                            fontSize:"24px",
                            display:"flex",
                            width:"100%",
                            flexDirection:"row",
                            alignItems:"center",
                            maxWidth:"798px",
                            padding:"16px"
                        }}>
                        </div>
                        <div style={{maxWidth:"798px",padding:"16px",paddingTop:"0px",width:"100%",flexDirection:"row",display:"flex",justifyContent:"center"}}>
                        {selectedResource.name ? 
                        <form onSubmit={(e)=>handleNameSubmit(e)} 
                            style={{
                                minWidth:"300px",
                                borderRadius:"4px",
                                display:"flex",
                                flexDirection:"column",
                                width:"100%",
                                justifyContent:"center"
                                }}>
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"space-between",
                                width:"100%"
                            }}>
                            <ColorButton style={{justifySelf:"flex-start"}} onClick={handleBackButtonClick}><ArrowBackIosIcon style={{marginRight:"5px"}}></ArrowBackIosIcon>Back </ColorButton>
                            <ColorButton onClick={handleSaveClick}><CheckCircleOutlineIcon style={{marginRight:"8px"}}></CheckCircleOutlineIcon>Save Changes</ColorButton>
                            </div>
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"space-around",
                                alignItems:"center",
                                maxWidth:"700px",
                                width:"100%"
                            }}>
                                <div style={{
                                    display:"flex",
                                    flexDirection:"row",
                                    width:"100%"
                                }}>
                                <span style={{fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",margin:"8px",alignSelf:"center",textTransform:"uppercase",color:"#5f6368"}}>NAME:</span> 
                                <InputBase 
                                    autoFocus={true} 
                                    style={{
                                        fontSize:"20px",
                                        border:"1px solid dodgerblue",
                                        margin:"5px",
                                        fontFamily:"Roboto,Arial,sans-serif",
                                        padding:"8px",
                                        borderRadius:"4px",
                                        width:"400px"
                                        }} 
                                    type="text" 
                                    value={selectedResourceName} 
                                    onChange={(e)=>setSelectedResourceName(e.target.value)} 
                                    id="outlined-basic" 
                                    variant="outlined" 
                                />
                                </div>
                                {selectedResourceActive ? <RedColorButton onClick={handleActiveClick} style={{justifySelf:"center",alignSelf:"center"}}> <DeleteOutlineIcon style={{marginRight:"5px"}}></DeleteOutlineIcon><span style={{marginRight:"5px"}}>Deactivate</span></RedColorButton> : <ColorButton onClick={handleActiveClick}>Activate</ColorButton>}
                            </div>
                        </form>
                        : ""}
                        </div>

                </div>
            </Fade>
            <Fade in={creatingResource}>
                <div style={{
                    width:"100%",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    position:"absolute",
                    overflow:"hidden",
                    }}>
                        <div style={{
                            fontSize:"24px",
                            display:"flex",
                            width:"100%",
                            flexDirection:"row",
                            alignItems:"center",
                            maxWidth:"798px",
                            padding:"16px"
                        }}>
                        </div>
                        <div style={{maxWidth:"798px",padding:"16px",paddingTop:"0px",width:"100%",flexDirection:"row",display:"flex",justifyContent:"center"}}>
                        {selectedResource.name ? 
                        <form onSubmit={(e)=>handleNewResourceSubmit(e)} 
                            style={{
                                minWidth:"300px",
                                borderRadius:"4px",
                                display:"flex",
                                flexDirection:"column",
                                width:"100%",
                                justifyContent:"center"
                                }}>
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"space-between"
                            }}>
                            <RedColorButton style={{justifySelf:"flex-start"}} onClick={handleBackButtonClick}><ArrowBackIosIcon style={{marginRight:"5px"}}></ArrowBackIosIcon>Cancel </RedColorButton>
                            <ColorButton onClick={createNewResource}><CheckCircleOutlineIcon style={{marginRight:"8px"}}></CheckCircleOutlineIcon>Create Room</ColorButton>
                            </div>
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"space-around",
                                alignItems:"center",
                                maxWidth:"700px",
                                width:"100%"
                            }}>
                                <div style={{
                                    display:"flex",
                                    flexDirection:"row"
                                }}>
                                <span style={{fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",margin:"8px",alignSelf:"center",textTransform:"uppercase",color:"#5f6368"}}>NAME:</span> 
                                <InputBase 
                                    autoFocus={true} 
                                    style={{
                                        fontSize:"20px",
                                        border:"1px solid dodgerblue",
                                        margin:"5px",
                                        fontFamily:"Roboto,Arial,sans-serif",
                                        padding:"8px",
                                        borderRadius:"4px",
                                        width:"400px"
                                        }} 
                                    type="text" 
                                    value={selectedResourceName} 
                                    onChange={(e)=>setSelectedResourceName(e.target.value)} 
                                    id="outlined-basic" 
                                    variant="outlined" 
                                />
                                </div>
                                {selectedResourceActive ? <RedColorButton onClick={handleActiveClick} style={{justifySelf:"center",alignSelf:"center"}}> <DeleteOutlineIcon style={{marginRight:"5px"}}></DeleteOutlineIcon>Deactivate</RedColorButton> : <ColorButton onClick={handleActiveClick}>Activate</ColorButton>}
                            </div>
                        </form>
                        : ""}
                        </div>

                </div>
            </Fade>
            </div>
        </Fade>
    )
}

export default ResourceEditor