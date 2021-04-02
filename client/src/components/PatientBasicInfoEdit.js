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
import { useDispatch } from 'react-redux';
import { updatePatientInfo } from '../store/current_patient';


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
  
  export default function PatientBasicInfoEdit(props) {
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
    const [patient,setPatient]=useState(props.patient)
    // const [email, setEmail]=useState(props.patient.email)
  
    const handleOpen = () => {
      setOpen(true);
    };

    const dispatch = useDispatch()

    const handleSave = () => {
        dispatch(updatePatientInfo({
            patient_id:props.patient.id,
            sex,
            home_phone:homePhone,
            mobile_phone:mobilePhone,
            work_phone:workPhone,
            address_line_one:addressLineOne,
            address_line_two: addressLineTwo,
            address_state:addressState,
            address_city:addressCity,
            address_zip: addressZip,
            occupation,
            firstName,
            lastName
        }))
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
        <Button onClick={handleOpen} style={{alignSelf:"flex-start",margin:"10px",color:"black",textTransform:"none",backgroundColor:"rgba(0, 0, 0, 0.04)"}}>
          <BrushIcon></BrushIcon>
          <span style={{fontSize:"14px", marginLeft:"4px"}}>Update Basic Information</span>
        </Button>
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
              <div style={{display:"flex",width:"100%",maxWidth:"1000px",maxHeight:"800px", backgroundColor:"white", overflow:"scroll",padding:"16px",borderRadius:"8px",flexDirection:"column",alignItems:"center"}}>
              <div style={{display:"flex",width:"100%",alignItems:"center", flexDirection:"row"}}>
            <div style={{alignSelf:"center",margin:"10px"}}>
             <form style={{display:"flex",flexDirection:"row", alignItems:"center"}} ref={form} onSubmit={submit}>
                {loadingPicture ? <img className={classes.avatar} src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"/> : <Avatar className={classes.avatar} src={patient.picture ? patient.picture : ""}/>}
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center", margin:"10px"}}>
                <input type="file" name="file"></input>
                <EditBasicInfoButton style={{width:"100%"}} type="submit">Update Photo</EditBasicInfoButton>
                </div>
            </form>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
                <div style={{display:"flex",flexDirection:"row", alignItems:"center",width:"100%",margin:"1px"}}>
                <span style={{minWidth:"90px"}}> First Name </span>
                <LoginTextField size="small" fullWidth value={firstName} onChange={(e)=>setFirstName(e.target.value)}  />
                </div>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",margin:"1px"}}>
                <span style={{minWidth:"90px"}}> Last Name </span>
                <LoginTextField size="small" fullWidth value={lastName} onChange={(e)=>setLastName(e.target.value)}  />
                </div>
                <div style={{width:"100%",display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center"}}>


<FormControl component="fieldset">
    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
    <span>Gender Identity: </span>
    <RadioGroup aria-label="gender" name="gender1" value={sex} onChange={(e)=>setSex(e.target.value)}>
        <div style={{display:"flex",flexDirection:"row",marginLeft:"20px"}}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        </div>
    </RadioGroup>
    </div>
</FormControl>
{/* <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"center"}}>
    <span style={{minWidth:"90px"}}>Date of Birth</span>
    <LoginTextField value={birthday} onChange={(e)=>setBirthday(e.target.value)} type="date" style={{margin:"10px"}} variant="standard" />
    </div> */}
</div>
<div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%"}}>
    <span style={{minWidth:"90px"}}>Occupation</span>
    <LoginTextField size="small" fullWidth value={occupation} onChange={(e)=>setOccupation(e.target.value)}  />
    </div>
            </div>
            </div>

                <div style={{display:"flex",flexDirection:"row", flexWrap:"wrap",justifyContent:"center", width:"100%"}}>
                <div style={{display:"flex",flexDirection:"column",width:"100%",maxWidth:"360px",margin:"10px"}}>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",margin:"1px"}}>
                <span style={{minWidth:"110px"}}>Home Phone</span>
                <LoginTextField size="small" type="tel" value={homePhone} onChange={(e)=>setHomePhone(e.target.value)} fullWidth  variant="standard" />
                </div>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",margin:"1px"}}>
                <span style={{minWidth:"110px"}}>Mobile Phone</span>
                <LoginTextField size="small" type="tel" value={mobilePhone} onChange={(e)=>setMobilePhone(e.target.value)} fullWidth  variant="standard" />
                </div>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",margin:"1px"}}>
                <span style={{minWidth:"110px"}}>Work Phone</span>
                <LoginTextField size="small" type="tel" value={workPhone} onChange={(e)=>setWorkPhone(e.target.value)} fullWidth  variant="standard" />
                </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",width:"100%",maxWidth:"360px",margin:"10px"}}>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",margin:"1px"}}>
                        <span style={{minWidth:"110px"}}>Address Line 1</span>
                        <LoginTextField size="small" fullWidth value={addressLineOne} onChange={(e)=>setAddressLineOne(e.target.value)}  />
                    </div>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",margin:"1px"}}>
                        <span style={{minWidth:"110px"}}>Address Line 2</span>
                        <LoginTextField size="small" fullWidth value={addressLineTwo} onChange={(e)=>setAddressLineTwo(e.target.value)}  />
                    </div>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",margin:"1px"}}>
                    <span style={{minWidth:"110px"}}>Address City</span>
                    <LoginTextField size="small" fullWidth value={addressCity} onChange={(e)=>setAddressCity(e.target.value)}  />
                    </div>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",margin:"1px"}}>
                    <span style={{minWidth:"110px"}}>Address State</span>
                    <LoginTextField size="small" fullWidth value={addressState} onChange={(e)=>setAddressState(e.target.value)}  />
                    </div>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",margin:"1px"}}>
                    <span style={{minWidth:"110px"}}>Address Zip</span>
                    <LoginTextField size="small" fullWidth value={addressZip} onChange={(e)=>setAddressZip(e.target.value)} />
                    </div>
                    </div>
                </div>

                {/* <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%"}}>
                <span style={{minWidth:"110px"}}>Email</span>
                <LoginTextField size="small" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth  />
                </div> */}


                <div style={{display:"flex",width:"100%",justifyContent:"center", flexDirection:"row"}}>
                <EditBasicInfoButton onClick={handleSave}>
                    Save Changes
                </EditBasicInfoButton>
                </div>



            {/* <FormControl component="fieldset">
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <RadioGroup aria-label="gender" name="gender1" value={smoker} onChange={(e)=>setSmoker(e.target.value)}>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <FormControlLabel value="yes" control={<Radio />} label="Smoker" />
                        <FormControlLabel value="no" control={<Radio />} label="Non-Smoker" />
                    </div>
                </RadioGroup>
                </div>
            </FormControl> */}

            </div>
          </Fade>
        </Modal>
      </div>
    );
  }