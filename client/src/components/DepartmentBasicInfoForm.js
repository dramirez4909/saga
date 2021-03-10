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
import AddressDisplayField from './AddressDisplayField'
import AddressEditField from './AddressEditField'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

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

const DepartmentBasicInfoForm = (props) => {
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
    const [specialtyEdit,setSpecialtyEdit] = useState(true)
    const [nameEdit,setNameEdit] =useState(true)

    const [editAddressDisplay,setEditAddressDisplay]=useState(false)
    const [addressLineOne,setAddressLineOne] = useState(props.department.address_line_one)
    const [addressLineTwo,setAddressLineTwo] = useState(props.department.address_line_two)
    const [addressCity,setAddressCity] = useState(props.department.address_city)
    const [addressState,setAddressState] = useState(props.department.address_state)
    const [addressZip,setAddressZip] = useState(props.department.address_zip)

    const [addressLineOneEdit,setAddressLineOneEdit]=useState(false)
    const [addressLineTwoEdit,setAddressLineTwoEdit]=useState(false)
    const [addressCityEdit,setAddressCityEdit]=useState(false)
    const [addressStateEdit,setAddressStateEdit]=useState(false)
    const [addressZipEdit,setAddressZipEdit]=useState(false)
    const [address,setAddress]=useState(`${props.department.address_line_one}`)
    const currentRecord = useSelector(state=>state.currentRecord)
    const dispatch = useDispatch()

    // const [roles, setRoles]=useState("")

    const form = useRef(null)
  
    // const handleClick = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };
  
    // const handleClose = () => {
    //   setAnchorEl(null);
    // };

    const handleProfileFormSubmit=(e)=>{
        e.preventDefault()
      }

    // const submit = e => {
    //     setLoadingPicture(true)
    //     e.preventDefault()
    //     const data = new FormData(form.current)
    //     fetch(`/api/users/upload-photo/${user.id}`, {
    //     method: 'POST',
    //     body: data,
    //     })
    //     .then(res => res.json())
    //     .then(json => {
    //     console.log(json)
    //     setUser(json.user)
    //     setLoadingPicture(false)
    //     })
    //   }

    const handleNameSubmit=(e)=>{
      e.stopPropagation()
      setNameEdit(false)
    }
    const handleSpecialtySubmit=(e)=>{
      e.stopPropagation()
      setSpecialtyEdit(false)
    }
    const handleAddressLineOneSubmit=(e)=>{
      e.stopPropagation()
      setAddressLineOneEdit(false)
    }
    const handleAddressLineTwoSubmit=(e)=>{
      e.stopPropagation()
      setAddressLineTwoEdit(false)
    }
    const handleAddressCitySubmit=(e)=>{
      e.stopPropagation()
      setAddressCityEdit(false)
    }
    const handleAddressStateSubmit=(e)=>{
      e.stopPropagation()
      setAddressStateEdit(false)
    }
    const handleAddressZipSubmit=(e)=>{
      e.stopPropagation()
      setAddressZipEdit(false)
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
          setNameEdit(false)
          setSpecialtyEdit(false)
          setAddressLineOneEdit(false)
          setAddressLineTwoEdit(false)
          setAddressCityEdit(false)
          setAddressStateEdit(false)
          setAddressZipEdit(false)
          dispatch(
            updateRecord({
              type:"department",
              name:name,specialty,
              id:department.id,
              addressLineOne,
              addressLineTwo,
              addressCity,
              addressState,
              addressZip,
              timeOpen,
              timeClosed}))
      }
    return (
      <Fade in={loading === true}>
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",overflow:"hidden"}}>
        <div style={{outline:"none",paddingTop:"16px",minWidth:"800px",borderRadius:"8px",border:"1px solid #dadce0",display:"flex",flexDirection:"column",marginLeft:"50px",marginRight:"50px",overflow:"hidden",paddingBottom:"18px"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingRight:"16px"}}>
        <h3 style={{paddingLeft:"16px"}}>Basic Info</h3>
        <div style={{display:"flex",flexDirection:"row",alignSelf:"flex-end",marginBottom:"10px"}}>
            <ColorButton onClick={(e)=>saveChanges(e)}>Accept Changes <CheckCircleOutlineIcon style={{marginLeft:"8px"}}></CheckCircleOutlineIcon></ColorButton>
        </div>
        </div>
          
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
                
                <div style={{display:"flex",flexDirection:"column",width:"100%",paddingLeft:"0px",paddingRight:"0px"}}>

                    { nameEdit ? 
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%",maxWidth:"770px",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368"}}>
                        Name
                    </div>
                    <form onSubmit={(e)=>handleNameSubmit(e)} style={{width:"90%",paddingLeft:"6px"}}>
                    {/* <InputBase autoFocus={true} fontSize="18px" type="text" value={name} onChange={(e)=>setName(e.target.value)} style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"dodgerblue"}}id="outlined-basic" variant="outlined" /> */}
                    <InputGroup size="md" style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"yellowgreen"}}>
                    <FormControl
                    placeholder="e.g. SHN Outpatient Imaging"
                    aria-label="specialty"
                    aria-describedby="basic-addon1"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                    </InputGroup>
                    </form>
                    </div>
                    :
                    <div onClick={(e)=>setNameEdit(true)} style={{margin:"0px"}}>
                    <DepartmentEditFormField label={"department name"} text={name}/>
                    </div>
                    }
                    { specialtyEdit ? 
                    <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row",width:"100%",maxWidth:"770px",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368"}}>
                        Specialty
                    </div>
                    <form onSubmit={(e)=>handleSpecialtySubmit(e)} style={{width:"90%",paddingLeft:"6px"}}>
                    {/* <InputBase autoFocus={true} fontSize="18px" type="text" value={specialty} onChange={(e)=>setSpecialty(e.target.value)} style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"dodgerblue"}}id="outlined-basic" label="FIRST NAME" variant="outlined" /> */}
                    <InputGroup size="md" style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"yellowgreen"}}>
                    <FormControl
                    placeholder="e.g. Radiology, Pediatrics, Family Medicine, etc..."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={specialty}
                    onChange={(e)=>setSpecialty(e.target.value)}
                    />
                    </InputGroup>
                    </form>
                    </div>
                    :
                    <div onClick={(e)=>setSpecialtyEdit(true)} style={{margin:"0px"}}>
                    <DepartmentEditFormField label={"sepcialty"} text={specialty}/>
                    </div>
                    }
                    {/* { addressLineOneEdit ? 
                    <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368",minWidth:"180px"}}>
                        Address Line One
                    </div>
                    <form onSubmit={(e)=>handleAddressLineOneSubmit(e)} style={{width:"90%",paddingLeft:"6px"}}>
                    <InputBase autoFocus={true} fontSize="18px" endAdornment={<InputAdornment position="end">
                      <Button fullwidth style={{color:"grey"}} size="medium" onClick={(e)=>setAddressLineOneEdit(false)}>
                        Done
                      <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                      </Button></InputAdornment>} type="text" value={addressLineOne} onChange={(e)=>setAddressLineOne(e.target.value)} style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"dodgerblue"}}id="outlined-basic" label="FIRST NAME" variant="outlined" />
                    </form>
                    </div>
                    :
                    <div onClick={(e)=>setAddressLineOneEdit(true)} style={{margin:"0px"}}>
                    <DepartmentEditFormField label={"Address Line One"} text={addressLineOne}/>
                    </div>
                    }
                    <Divider style={{ width: "100%"}} />
                    { addressLineTwoEdit ? 
                    <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368",minWidth:"180px"}}>
                        Address Line Two
                    </div>
                    <form onSubmit={(e)=>handleAddressLineTwoSubmit(e)} style={{width:"90%",paddingLeft:"6px"}}>
                    <InputBase autoFocus={true} fontSize="18px" endAdornment={<InputAdornment position="end">
                      <Button fullwidth style={{color:"grey"}} size="medium" onClick={(e)=>setAddressLineTwoEdit(false)}>
                        Done
                      <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                      </Button></InputAdornment>} type="text" value={addressLineTwo} onChange={(e)=>setAddressLineTwo(e.target.value)} style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"dodgerblue"}}id="outlined-basic" label="FIRST NAME" variant="outlined" />
                    </form>
                    </div>
                    :
                    <div onClick={(e)=>setAddressLineTwoEdit(true)} style={{margin:"0px"}}>
                    <DepartmentEditFormField label={"Address Line Two"} text={addressLineTwo}/>
                    </div>
                    }
                    <Divider style={{ width: "100%"}} />
                    { addressCityEdit ? 
                    <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368",minWidth:"180px"}}>
                        City
                    </div>
                    <form onSubmit={(e)=>handleAddressCitySubmit(e)} style={{width:"90%",paddingLeft:"6px"}}>
                    <InputBase autoFocus={true} fontSize="18px" endAdornment={<InputAdornment position="end">
                      <Button fullwidth style={{color:"grey"}} size="medium" onClick={(e)=>setAddressCityEdit(false)}>
                        Done
                      <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                      </Button></InputAdornment>} type="text" value={addressCity} onChange={(e)=>setAddressCity(e.target.value)} style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"dodgerblue"}}id="outlined-basic" label="FIRST NAME" variant="outlined" />
                    </form>
                    </div>
                    :
                    <div onClick={(e)=>setAddressCityEdit(true)} style={{margin:"0px"}}>
                    <DepartmentEditFormField label={"City"} text={addressCity}/>
                    </div>
                    }
                    <Divider style={{ width: "100%"}} />
                    { addressStateEdit ? 
                    <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368",minWidth:"180px"}}>
                        State
                    </div>
                    <form onSubmit={(e)=>handleAddressStateSubmit(e)} style={{width:"90%",paddingLeft:"6px"}}>
                    <InputBase autoFocus={true} fontSize="18px" endAdornment={<InputAdornment position="end">
                      <Button fullwidth style={{color:"grey"}} size="medium" onClick={(e)=>setAddressStateEdit(false)}>
                        Done
                      <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                      </Button></InputAdornment>} type="text" value={addressState} onChange={(e)=>setAddressState(e.target.value)} style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"dodgerblue"}}id="outlined-basic" label="FIRST NAME" variant="outlined" />
                    </form>
                    </div>
                    :
                    <div onClick={(e)=>setAddressStateEdit(true)} style={{margin:"0px"}}>
                    <DepartmentEditFormField label={"State"} text={addressState}/>
                    </div>
                    }
                    <Divider style={{ width: "100%"}} />
                    { addressZipEdit ? 
                    <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368",minWidth:"180px"}}>
                        Zip
                    </div>
                    <form onSubmit={(e)=>handleAddressZipSubmit(e)} style={{width:"90%",paddingLeft:"6px"}}>
                    <InputBase autoFocus={true} fontSize="18px" endAdornment={<InputAdornment position="end">
                      <Button fullwidth style={{color:"grey"}} size="medium" onClick={(e)=>setAddressZipEdit(false)}>
                        Done
                      <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                      </Button></InputAdornment>} type="text" value={addressZip} onChange={(e)=>setAddressZip(e.target.value)} style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"dodgerblue"}}id="outlined-basic" label="FIRST NAME" variant="outlined" />
                    </form>
                    </div>
                    :
                    <div onClick={(e)=>setAddressZipEdit(true)} style={{margin:"0px"}}>
                    <DepartmentEditFormField label={"Zip"} text={addressZip}/>
                    </div>
                    } */}
                    
                    {/* <Divider style={{ width: "100%"}} />
                    { emailEdit ? 
                    <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",paddingLeft:"16px",minHeight:"47px"}}>
                    <div style={{fontSize:"11px",fontFamily:"Roboto,Arial,sans-serif",textTransform:"uppercase",color:"#5f6368",minWidth:"180px"}}>
                        EMAIL
                    </div>
                    <form onSubmit={(e)=>handleEmailSubmit(e)} style={{width:"90%",paddingLeft:"6px"}}>
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
                    <form onSubmit={(e)=>handleUsernameSubmit(e)} style={{width:"90%",paddingLeft:"6px"}}>
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
                    } */}
                    {/* <TextField size="medium" fullWidth value={lastName} onChange={(e)=>setLastName(e.target.value)}style={{margin:"5px"}}id="outlined-basic" label="Last Name" variant="outlined" />
                    <TextField size="medium" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)}style={{margin:"5px"}}id="outlined-basic" label="Email" variant="outlined" />
                    <TextField size="medium" fullWidth value={username} onChange={(e)=>setUsername(e.target.value)}style={{margin:"5px"}}id="outlined-basic" label="Username" variant="outlined" /> */}
                </div>

                </div>
            </form>
          </div>
        </div>
        </Fade>
    )
}

export default DepartmentBasicInfoForm