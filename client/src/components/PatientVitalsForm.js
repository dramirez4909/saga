import React, {useState, useRef, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import BrushIcon from '@material-ui/icons/Brush';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Avatar, CircularProgress} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ColorizeIcon from '@material-ui/icons/Colorize';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { useDispatch } from 'react-redux';
import { updateVitals } from '../store/current_patient';


const EditBasicInfoButton = withStyles((theme) => ({
    root: {
        paddingRight: "10px",
        paddingLeft: "10px",
        margin: "4px",
        color:"white",
        outline:"none",
        width:"fit-content",
        backgroundColor:"yellowgreen",
        height:"30px",
        transition:"all .2s ease-in-out",
        '&:hover': {
            backgroundColor: "#8cb931 !important",
        },
    },
    }))(Button);

const useStylesLoginTextField = makeStyles((theme) => ({
    root: {
      border: '2px solid #e2e2e1',
      overflow: 'hidden',
      paddingLeft: "10px",
      height:"35px",
      paddingBottom:"0px",
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&$focused': {
        border: '2px solid rgb(94, 158, 214)',
        backgroundColor: '#fff',
        // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 1px`,
      },
    },
    focused: {},
  }));

  function LoginTextField(props) {
    const classes = useStylesLoginTextField();
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }

  const iconStyle = {
    background:"grey",
    borderRadius:"50%",
    color:"white",
    padding:"2px",
    boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    width:"24px",
    height:"24px",
    marginRight:"5px"
}

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    avatar:{
        width:"140px",
        height:"140px",
      },
  }));

  
  
  export default function PatientVitalsForm(props) {
    const classes = useStyles();
    const form = useRef(null)
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [firstName,setFirstName] = useState(props.patient.firstName)
    const [lastName,setLastName] = useState(props.patient.lastName)
    const [loadingPicture,setLoadingPicture] = useState(false)
    const [birthday,setBirthday] = useState(props.patientDob)
    const [sex,setSex] = useState(props.patient.sex)
    const [homePhone,setHomePhone] = useState(props.patient.home_phone)
    const [mobilePhone,setMobilePhone] =useState(props.patient.mobile_phone)
    const [workPhone,setWorkPhone] = useState(props.patient.work_phone)
    const [weight,setWeight] =useState(props.patient.weight)
    const [height,setHeight]=useState(props.patient.height)
    const [occupation,setOccupation]=useState(props.patient.occupation)
    const [bmi,setBmi] = useState(props.patient.bmi)
    const [heartRate,setHeartRate]=useState(props.patient.beats_per_minute)
    const [smoker,setSmoker] =useState(props.patient.smoker)
    const [addressLineOne,setAddressLineOne]=useState(props.patient.address_line_one)
    const [addressLineTwo,setAddressLineTwo]=useState(props.patient.address_line_two)
    const [addressLineThree,setAddressLineThree]=useState(props.patient.address_line_three)
    const [addressCity,setAddressCity]=useState(props.patient.address_city)
    const [addressState,setAddressState]=useState(props.patient.address_state)
    const [addressZip,setAddressZip]=useState(props.patient.address_zip)
    const [picture,setPicture]=useState(props.patient.picture)
    const [temperature,setTemperature]=useState(props.patient.temperature)
    const [patient,setPatient]=useState(props.patient)
    // const [email, setEmail]=useState(props.patient.email)
  
    const handleOpen = () => {
      setOpen(true);
    };

    const dispatch = useDispatch()

    const handleSave = () => {
        dispatch(updateVitals({beats_per_minute:heartRate,patient_id:props.patient.id,height,weight,temperature,bmi}))
        setOpen(false)
    }

    const submit = e => {
        setLoadingPicture(true)
        e.preventDefault()
        const data = new FormData(form.current)
        fetch(`/api/patients/upload/${patient.id}`, {
        method: 'POST',
        body: data,
        })
        .then(res => res.json())
        .then(json => {
        console.log(json)
        setPatient(json.patient)
        setLoadingPicture(false)
        })
    }

  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <EditBasicInfoButton onClick={handleOpen} style={{alignSelf:"flex-start",margin:"10px",color:"white",textTransform:"none",fontWeight:"400"}}>
          <AddCircleOutlineIcon></AddCircleOutlineIcon>
          <span style={{fontSize:"14px", marginLeft:"4px"}}>Update Vitals</span>
        </EditBasicInfoButton>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
              <div style={{display:"flex",width:"100%",maxWidth:"400px",maxHeight:"800px", backgroundColor:"white", overflow:"scroll",padding:"16px",borderRadius:"8px",flexDirection:"column",alignItems:"center"}}>
              <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            width:"100%"
            }}>
            <form style={{
                display:"flex",
                flexDirection:"column",
                width:"100%"
                }}>
                    <div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",margin:"3px"}}>
                        <FitnessCenterIcon style={{...iconStyle}}></FitnessCenterIcon>
                        <span style={{minWidth:"130px",fontSize:"18px"}}>
                            Weight <span style={{color:"darkgray",fontSize:"14px"}}>(lbs)</span>
                        </span>
                        <LoginTextField
                            size="small" 
                            fullWidth 
                            value={weight} 
                            onChange={(e)=>setWeight(e.target.value)}/>
                    </div>
                    <div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",margin:"3px"}}>
                        <FavoriteIcon style={{...iconStyle}}></FavoriteIcon>
                        <span style={{minWidth:"130px",fontSize:"18px"}}>
                            Heart Rate
                        </span>
                        <LoginTextField
                    size="small" 
                    fullWidth 
                    value={heartRate} 
                    onChange={(e)=>setHeartRate(e.target.value)}
                    />
                    </div>
                    <div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",margin:"3px"}}>
                        <TrackChangesIcon style={{...iconStyle}}></TrackChangesIcon>
                        <span style={{minWidth:"130px",fontSize:"18px"}}>
                            BMI
                        </span>
                        <LoginTextField
                    size="small" 
                    fullWidth 
                    value={bmi} 
                    onChange={(e)=>setBmi(e.target.value)} 
                    />
                    </div>
                    <div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",margin:"3px"}}>
                        <ColorizeIcon style={{...iconStyle}}></ColorizeIcon>
                        <span style={{minWidth:"130px",fontSize:"18px"}}>
                            Temperature <span style={{color:"darkgray",fontSize:"14"}}>(°F)</span>
                        </span>
                        <LoginTextField
                    size="small" 
                    fullWidth 
                    value={temperature} 
                    onChange={(e)=>setTemperature(e.target.value)} 
                    />
                    </div>
                    <div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",margin:"3px"}}>
                        <AccessibilityIcon style={{...iconStyle}}></AccessibilityIcon>
                        <span style={{minWidth:"130px",fontSize:"18px"}}>
                           Height
                        </span>
                        <LoginTextField
                    size="small" 
                    fullWidth 
                    value={height} 
                    onChange={(e)=>setHeight(e.target.value)} 
                    />
                    </div>




            </form>
            </div>

                <div style={{display:"flex",width:"100%",justifyContent:"center", flexDirection:"row"}}>
                <EditBasicInfoButton onClick={handleSave}>
                    Save Changes
                </EditBasicInfoButton>
                </div>

            </div>
          </Fade>
        </Modal>
      </div>
    );
  }