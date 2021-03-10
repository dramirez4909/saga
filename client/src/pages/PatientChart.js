import React, { useState, useEffect, useRef, useLayoutEffect, useContext } from 'react';
import {withStyles,makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import EventNoteTwoToneIcon from '@material-ui/icons/EventNoteTwoTone';
import NoteAddTwoToneIcon from '@material-ui/icons/NoteAddTwoTone';
import TableChartIcon from '@material-ui/icons/TableChart';
import { useScrollPosition } from '../components/utils/useScrollPosition'
import HomeContext from '../components/utils/HomeContext'
import '../styles/PatientChart.css'
import ChartReview from '../components/ChartReview';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { Avatar, CircularProgress, Fade, Slide } from '@material-ui/core';
import PatientEncounters from '../components/PatientEncounters';
import PatientOrders from '../components/PatientOrders';
import { useSelector } from 'react-redux';
import PatientNotes from '../components/PatientNotes';
import ThemeContext from '../components/utils/ThemeContext';
import PatientProblems from '../components/PatientMentalProblems';
import PatientMedications from '../components/PatientMedications';
import BasicPatientAttributes from '../components/BasicPatientAttributes';
import AllProblems from '../components/PatientAllProblems';
import ChartReviewBasicAttributes from '../components/ChartReviewBasicAttributes';
import PatientPhoneNumbers from '../components/PatientPhoneNumbers';
import HomeIcon from '@material-ui/icons/Home';
import PatientAddressInfo from '../components/PatientAddressInfo';
import '../styles/PatientChartRibbon.css'
import ChartReviewTabs from '../components/ChartReviewTabs';
import ChartReviewActivityButton from '../components/ChartReviewActivityButton'
import PatientMedicationsList from '../components/PatientMedicationsList';
const isBrowser = typeof window !== `undefined`

const useStylesLoginTextField = makeStyles((theme) => ({
    root: {
      border: '2px solid #e2e2e1',
      overflow: 'hidden',
      paddingLeft: "10px",
      paddingTop: "4px",
      paddingBottom: "4px",
      marginTop: "14px",
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

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    avatar:{
      width:"140px",
      height:"140px",
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

  const imageStyle={
      hieght:"32px",
      width:"32px"
    }

const tabStyle = {
  '&:hover': {
    background:"grey"
  }

}

const metricContainerStyle={
  marginRight:"12px",
  fontSize:"24px",
  borderRadius:"9px",
  background:"white",
  fontWeight:"strong",
  boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
  padding:"4px",
  color:"grey",
  alignItems:"center"
  }

const metricTextStyle ={
  marginLeft:"6px"
}

function PatientChart(props) {
    const currentPatient = useSelector(state=>state.currentPatient)
    const classes = useStyles();
    const context = useContext(HomeContext)
    const [dxSearchTerm,setDxSearchTerm] = useState("")
    const [dxSearchResults,setDxSearchResults]=useState([]);
    const [patient,setPatient] = useState(props.patient)
    const [patientDob,setPatientDob] =useState()
    const [loadingPicture,setLoadingPicture] = useState(false)
    const [loading,setLoading] = useState(true)
    const form = useRef(null)
    const [patientTabs,setPatientTabs] = useState(["Chart Review","Encounters","Orders","Problem List","Meds","Notes","Allergies","Media"])
    const [currentPatientTab,setCurrentPatientTab] =useState("Chart Review")
    const themeContext = useContext(ThemeContext)
    const [displayChartButtons,setDisplayChartButtons] = useState(true)
    const [displayMedications,setDisplayMedications] = useState(false)

    const handleShowMedications = () => {
      setDisplayChartButtons(false)
      setDisplayMedications(true)
    }

    const handleHideMedications = () => {
      setDisplayChartButtons(true)
      setDisplayMedications(false)
    }

    // useScrollPosition(({ prevPos, currPos }) => {
    //   console.log(currPos.x)
    //   console.log(currPos.y)
    // })

    // const [hideOnScroll, setHideOnScroll] = useState(true)

    // useScrollPosition(({ prevPos, currPos }) => {
    // const isShow = currPos.y > -15
    // if (isShow !== hideOnScroll) {
    //   context.setSideBarDisplay(isShow)
    //   setHideOnScroll(isShow)
    // }
    // }, [hideOnScroll])

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

  const imageStyle={
      hieght:"28px",
      width:"28px"
  }
  
  const tabStyle = {
  '&:hover': {
    background:"grey"
  }
  
  }
  
  const metricContainerStyle={
  display:"flex",
  flexDirection:"column",
  fontSize:"18px",
  borderRadius:"9px",
  cursor:"pointer",
  fontWeight:"strong",
  padding:"4px",
  alignItems:"center",
  '&:hover': {
      boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
  }
  }

    useEffect(()=>{
        const searchDxs= async (searchTerm) => {
            const response = await fetch(`/api/umls/search-term/${searchTerm}`)
            const data = await response.json()
            console.log(data)
            setDxSearchResults(data.results)
            return;
        }
        if (dxSearchTerm.length > 0) {
            searchDxs(dxSearchTerm)
        }
    },[dxSearchTerm])

    const submitProfilePicture=(e)=>{
        console.log(e)
    }

    useEffect(()=>{
      if (props.patient.id === currentPatient.id) {
        setLoading(false)
        const dobstr = patient.dob + "-500"
        const dob = new Date(dobstr)
        setPatientDob(dob)
        setPatient(currentPatient)
      }
    },[currentPatient])

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
    console.log("Patient AHHHH!",props.patient)

    if (loading) {
      return (
      <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",alignContent:"center",justifyContent:"center"}}>
        <CircularProgress style={{width:"230px",height:"230px",alignSelf:"center",justifySelf:"center",marginTop:"200px"}} />
      </div>
      )
    }
    return (
        <>
        <div style={{display:"flex",justifyContent:"center",marginRight:"10px",width:"100%",backgroundColor:"transparent",flexDirection:"column",alignItems:"center"}}>
          {/* <div style={{display:"flex",flexDirection:"row",zIndex:8,margin:0,width:"100%",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
            <div>
              <div style={{display:"flex", alignItems:"center", cursor:"pointer",display:"flex",flexDirection:"row", background:themeContext.themes === "dark" ? "#444444" : "white"}} >
                <div style={{...metricContainerStyle,color:themeContext.themes === "dark" ? "white" : "grey",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
                            {props.patient.sex === "female" ? 
                                <img style={{height:"24px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/female-removebg-preview.png"></img>
                                :
                                <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/_Pngtree_vector_male_sign_icon_4184181-removebg-preview.png"></img>}
                </div>
                <div style={{borderRadius:"9px",display:"flex",color: themeContext.themes === "dark" ? "white" : "grey",fontSize:"17px",zIndex:"3",padding:"3px"}}>{props.patient.sex === "female" ? "[ she / her ]" : "[ he / him ]"}</div>
              </div>
            </div>
            </div> */}
            {/* <Fade in={!hideOnScroll} timeout={250} mountOnEnter unmountOnExit>
            <div style={{display:"flex",flexDirection:"row", background:"white",alignItems:"center",justifyContent:"space-between", margin:"8px"}}>
                    <div style={{...metricContainerStyle}}>
                        {props.patient.sex === "female" ? 
                            <img style={{height:"29px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/female-removebg-preview.png"></img>
                            :
                            <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/_Pngtree_vector_male_sign_icon_4184181-removebg-preview.png"></img>}
                    </div>
                    <div style={{...metricContainerStyle}}>
                        <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/my-baby-page-height-38152201fffe401cf5b4a5c923b5ad80.png"></img>
                        <span style={{...metricTextStyle}}>{props.patient.height}</span>
                    </div>
                    <div style={{...metricContainerStyle}}>
                        <FitnessCenterIcon style={{height: "32px", width:"32px", color:"rgb(85, 177, 250)"}} />
                        <span style={{...metricTextStyle}}>{props.patient.weight}<span style={{fontSize:"18px", color:"lightgrey"}}>kgs</span></span>
                    </div>
                    <div style={{...metricContainerStyle}}>
                        <FavoriteIcon style={{height: "32px", width:"32px", color:"red"}}/>
                        <span style={{...metricTextStyle}}>{props.patient.beats_per_minute}<span style={{fontSize:"18px", color:"lightgrey"}}>bpm</span></span>
                    </div>
                    <div style={{...metricContainerStyle}}>
                        <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/unnamed.png"></img>
                        <span style={{...metricTextStyle}}>{props.patient.bmi}</span>
                    </div>
                    <div style={{...metricContainerStyle}}>
                        {props.patient.smoker ? 
                            <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/images-removebg-preview.png"></img>
                            :
                            <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/no-smoking-smoke-cigarette-forbidden-habit-cigar-tobacco-nicotine-prohibition-toxic-unhealthy_1--removebg-preview.png"></img>
                        }
                    </div>
                </div>
                </Fade> */}
        <div style={{display:"flex",width:"100%",backgroundColor:"transparent",flexDirection:"row",alignItems:"center",paddingLeft:"10px",marginTop:"20px",paddingTop:"4px", flexWrap:"wrap",justifyContent:"center"}}>
        <div style={{display:"flex",flexDirection:"row", height:"150px",backgroundColor:"white", borderRadius:"8px",boxShadow:"rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",paddingLeft:"10px",minWidth:"450px",paddingTop:"4px"}}>
          {/* <span style={{fontSize:"34px",color:themeContext.themes === "dark" ? "white" : "grey"}}>{patient.fullName}</span> */}
            {/* <div className={"circular--portrait"} style={{justifyContent:"center",alignSelf:"center", marginLeft:"10px",marginTop:"10px",marginBottom:"10px",boxShadow: themeContext.themes === "dark" ? "" : "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}> */}
                {loadingPicture ? <img id="user-photo" src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"/> : <Avatar className={classes.avatar} src={patient.picture ? patient.picture : ""}/>}
            {/* </div> */}
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center",margin:"15px"}}>
                  <div style={{display:"flex",justifyContent:"flex-start",fontWeight:"600",fontSize:"22px"}}>
                    {patient.lastName+ "," + " " + patient.firstName}
                  </div>
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",color:"dimgrey"}}>
                  <div>
                  <div style={{fontWeight:"400",fontSize:"18px"}}>
                    {patientDob ? `${patient.sex.charAt(0).toUpperCase() + patient.sex.slice(1)}, ${patientDob.getMonth() + 1}.${patientDob.getDate()}.${patientDob.getFullYear()}` : ""}
                  </div>
                  <div style={{fontWeight:"400",fontSize:"18px"}}>
                    {patient.occupation}
                  </div>
                  <PatientAddressInfo patient={props.patient}/>
                  </div>
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                    <PatientPhoneNumbers patient={props.patient}/>
                  </div>
                  </div>
                </div>

        </div>
          <ChartReviewBasicAttributes patient={props.patient}></ChartReviewBasicAttributes>
          </div>
        {displayMedications ? 
              <PatientMedications patient={props.patient} hideMedications={handleHideMedications}></PatientMedications>
              : 
              ""
            }
      <Slide in={displayChartButtons} direction="up">
      <div style={{display:"grid",flexWrap:"wrap", gridTemplateColumns:"20% 20% 20% 20% 20%", gridTemplateRows:"100%",backgroundColor: "transparent",marginTop:"8px",width:"100%",paddingLeft:"16px",paddingRight:"16px"}}> 
            {/* <div className={ themeContext.themes === "dark" ? "dark-tabs" : "tabs"} style={{display:"flex",flexDirection:"row",background:themeContext.themes === "dark" ? "#212121" : "rgb(221,224,230)",zIndex:8,paddingTop:"8px",paddingLeft:"19px",position:"sticky",top:"91px",width:"100%"}}>
              {patientTabs.map((tab,index)=>{
                return (
                <li style={{borderRadius:"4px",listStyleType:"none",cursor:"pointer",...tabStyle}} className={`${currentPatientTab === tab ? "active" : ""}`} onClick={()=>{setCurrentPatientTab(tab)}}>
                  <a style={{...tabStyle, color:themeContext.themes === "dark" ? "white" : "black"}}>
                    {tab}
                  </a>
                </li>
                )
              })}
            </div> */}
                <div onClick={handleShowMedications} style={{padding:"8px",width:"100%",gridColumnStart:1,gridColumnEnd:2,}}>
                  <ChartReviewActivityButton style={{cursor:"pointer"}} color={"coral"} title="Medications"/>
                </div>
                <div style={{padding:"8px",width:"100%",gridColumnStart:2,gridColumnEnd:3}}>
                  <ChartReviewActivityButton style={{cursor:"pointer"}} color={"coral"} title="Physical Problems List"/>
                </div>
                <div style={{padding:"8px",width:"100%",gridColumnStart:3,gridColumnEnd:4}}>
                  <ChartReviewActivityButton style={{cursor:"pointer"}} color={"coral"} title="Mental Problems List"/>
                </div>
                <div style={{padding:"8px",width:"100%",gridColumnStart:4,gridColumnEnd:5}}>
                  <ChartReviewActivityButton style={{cursor:"pointer"}} color={"coral"} title="Orders"/>
                </div>
                <div style={{padding:"8px",width:"100%",gridColumnStart:5,gridColumnEnd:6}}>
                  <ChartReviewActivityButton style={{cursor:"pointer"}} color={"coral"} title="Encounters"/>
                </div>
              {/* {currentPatientTab === "Chart Review" ? <ChartReviewTabs patient={currentPatient}/> : <></>} */}
            </div>
            </Slide>
            {/* <div style={{minWidth:"400px",marginTop:"0px",position:"sticky",top:"85px",}}>
             Care Timeline 
            </div> */}

            </div>
            {/* <form ref={form} onSubmit={submit}>
                <input type="file" name="file"></input>
                <input type="submit" name="Sign Up" />
            </form> */}
        </>
    );
}
export default PatientChart;