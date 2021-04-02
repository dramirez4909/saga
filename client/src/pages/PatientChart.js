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
import Button from '@material-ui/core/Button';
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
import { Avatar, CircularProgress, Fade, IconButton, Slide } from '@material-ui/core';
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
import ChartReviewActivityButtonLarge from '../components/ChartReviewActivityButtonLarge'
import PatientMedicationsList from '../components/PatientMedicationsList';
import PatientEncountersList from '../components/PatientEncountersList';
import PatientMentalProblemsList from '../components/PatientMentalProblemList'
import PatientPhysicalProblemsList from '../components/PatientPhysicalProblemList'
import PatientOrdersList from '../components/PatientOrdersList';
import ColorizeIcon from '@material-ui/icons/Colorize';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EditIcon from '@material-ui/icons/Edit';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PatientBasicInfoEdit from '../components/PatientBasicInfoEdit';
import PatientVitalsForm from '../components/PatientVitalsForm';
import VitalsLineGraph  from '../components/VitalsLineGraph';
import PatientVitals from '../components/PatientVitals';
import PatientNameCard from './PatientNameCard';
import { updatePatientInfo } from '../store/current_patient';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPills } from '@fortawesome/free-solid-svg-icons'
import { faUserInjured as userInjured} from '@fortawesome/free-solid-svg-icons'
import { faBrain } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import ChartReviewSmallActivityButton from '../components/ChartReviewSmallActivityButton';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ChartReviewMetrics from '../components/ChartReviewMetrics'
import EventIcon from '@material-ui/icons/Event';

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

  const EditBasicInfoButton = withStyles((theme) => ({
    root: {
        paddingRight: "10px",
        paddingLeft: "10px",
        margin: "4px",
        border:"1px solid tomato",
        color:"tomato",
        outline:"none",
        width:"fit-content",
        backgroundColor:"transparent",
        textTransform:"none",
        height:"30px",
        transition:"all .2s ease-in-out",
        '&:hover': {
            backgroundColor: "rgb(0,0,0,.1)",
        },
    },
    }))(Button);

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
    const [displayPhysicalProblems,setDisplayPhysicalProblems] = useState(false)
    const [displayMentalProblems,setDisplayMentalProblems] = useState(false)
    const [displayOrders,setDisplayOrders] = useState(false)
    const [displayEncounters,setDisplayEncounters] = useState(false)
    const [chartData,setChartData]=useState({});
    const [open,setOpen]=useState()

    const handleShowMedications = () => {
      setDisplayChartButtons(false)
      setDisplayMedications(true)
    }

    const handleShowPhysicalProblems = () => {
      setDisplayChartButtons(false)
      setDisplayPhysicalProblems(true)
    }

    const handleShowMentalProblems = () => {
      setDisplayChartButtons(false)
      setDisplayMentalProblems(true)
    }

    const handleShowEncounters = () => {
      setDisplayChartButtons(false)
      setDisplayEncounters(true)
    }

    const handleShowOrders = () => {
      setDisplayChartButtons(false)
      setDisplayOrders(true)
    }

    const handleHideMedications = () => {
      setDisplayChartButtons(true)
      setDisplayMedications(false)
    }

    const handleHidePhysicalProblems = () => {
      setDisplayChartButtons(true)
      setDisplayPhysicalProblems(false)
    }

    const handleHideMentalProblems = () => {
      setDisplayChartButtons(true)
      setDisplayMentalProblems(false)
    }

    const handleHideEncounters = () => {
      setDisplayChartButtons(true)
      setDisplayEncounters(false)
    }

    const handleHideOrders = () => {
      setDisplayChartButtons(true)
      setDisplayOrders(false)
    }

    const newMedication = (e) => {
      e.stopPropagation();
      setDisplayChartButtons(false)
      setDisplayMedications(true)
      setOpen(true)
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
        const dobstr = patient.dob + "-500"
        const dob = new Date(dobstr)
        setPatientDob(dob)
        setPatient(currentPatient)
        //Gather data for line graphs
        const bpmReadings = getReadingsArray("bpm",currentPatient.overtime_items)
        const weightReadings = getReadingsArray("weight",currentPatient.overtime_items)
        const bmiReadings = getReadingsArray("bmi",currentPatient.overtime_items)
        const temperatureReadings = getReadingsArray("temperature",currentPatient.overtime_items)
        console.log("bpmReadings: ",temperatureReadings)
        setChartData({bpmReadings,weightReadings,bmiReadings,temperatureReadings})
        setLoading(false)
      }
    },[currentPatient])

    const getReadingsArray = (metric,readingsObj={}) => {
      const filteredValues = Object.values(readingsObj).filter(el => {
        if (el.name === metric ) {
          return true
        } 
        return false
      })
      const readings = filteredValues.map(el=>{
          const dateString = el.date + "-500"
          const date = new Date(dateString)
          return [date,Number(el.value)]
      })
      return readings.sort((a,b)=> b.date - a.date)
    }

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
        <Fade in={displayChartButtons} direction="down" timeout={300}>
        <div style={{
          display:displayChartButtons ? "flex" : "none",
          justifyContent:"center",
          width:"100%",
          backgroundColor:"white",
          flexDirection:"column",
          alignItems:"center",
          fontFamily:"Roboto,RobotoDraft,Helvetica,Arial,sans-serif",
          paddingBottom:"100px"}}>
        {/* <Fade in={displayChartButtons} direction="up">
          <div style={{
            display:displayChartButtons ? "flex" : "none",
            flexWrap:"wrap",justifyContent:"center",
            // backgroundColor: "#827be5",
            backgroundColor:"white",
            width:"100%",
            paddingLeft:"16px",
            paddingRight:"16px",
            flexDirection:"row"}}> 
              <EditBasicInfoButton>Schedule an appointment</EditBasicInfoButton>
            </div>
            </Fade> */}
        <div style={{
          display:"flex",
          width:"100%", 
        //  backgroundColor:"#1a73e8",
        //  backgroundColor:"#95a1d3",
        backgroundSize:"cover",
        backgroundColor:"transparent",
        // backgroundImage:"linear-gradient( 67.2deg,  rgba(37,208,199,1) -7.5%, rgba(165,90,240,1) 62.7% )",
        //  backgroundImage:"url('https://saga-health.s3-us-west-1.amazonaws.com/110494-blue-blurred-background-vector+(2).jpg')",
         flexDirection:"row",alignItems:"center",paddingLeft:"10px",paddingTop:"4px", paddingBottom:"6px",flexWrap:"wrap",justifyContent:"center"}}>
        <div style={{flexDirection:"column",display:"flex",alignItems:"center"}}>
        <Avatar style={{ boxShadow:"rgb(0 0 0 / 30%) 0px 19px 38px, rgb(0 0 0 / 22%) 0px 15px 12px",width:"230px",height:"230px",margin:"20px"}} src={patient.picture ? patient.picture : ""}/>
        <EditBasicInfoButton><EventIcon style={{marginRight:"4px"}}></EventIcon>Request an office visit</EditBasicInfoButton>
        </div>
        <div style={{
          display:"flex",
          flexDirection:"column", 
          paddingTop:"4px",
          alignItems:"center",
          }}>
            <PatientBasicInfoEdit patient={patient}/>

            <PatientNameCard patientDob={patientDob} patient={patient}/>

        </div>
            <PatientVitals patient={patient} chartData={chartData}/>
            
          </div>
          <div style={{display:"flex",flexDirection:"column"}}>
          <ChartReviewMetrics patient={patient} chartData={chartData}/>

          <Fade in={displayChartButtons} direction="up">
          <div style={{
            display:displayChartButtons ? "flex" : "none",
            flexWrap:"wrap",justifyContent:"center",
            // backgroundColor: "#827be5",
            // boxShadow:"rgb(0 0 0 / 30%) 0px 19px 38px, rgb(0 0 0 / 22%) 0px 15px 12px",
            width:"100%",
            paddingLeft:"16px",
            height:"min-content",
            paddingRight:"16px",
            flexDirection:"row"}}> 
                  <ChartReviewActivityButtonLarge patient={patient} handleShowMedications={handleShowMedications} style={{cursor:"pointer"}} icon={<FontAwesomeIcon style={{width:"25px",height:"25px"}} icon={faPills}></FontAwesomeIcon>} handleNewItem={(e)=>newMedication(e)} title="Medications"/>
                  <ChartReviewActivityButtonLarge patient={patient} handleShowPhysicalProblems={handleShowPhysicalProblems} style={{cursor:"pointer"}} icon={<FontAwesomeIcon style={{width:"25px",height:"25px"}} icon={userInjured}></FontAwesomeIcon>} color={"coral"} title="Problems List"/>
                  <ChartReviewActivityButtonLarge patient={patient} handleShowMentalProblems={handleShowMentalProblems} style={{cursor:"pointer"}} icon={<FontAwesomeIcon style={{width:"25px",height:"25px"}} icon={faBrain}></FontAwesomeIcon>} color={"coral"} title="Mental Health"/>
                  <ChartReviewActivityButtonLarge patient={patient} handleShowOrders={handleShowOrders} style={{cursor:"pointer"}} icon={<FontAwesomeIcon style={{width:"25px",height:"25px"}} icon={faPaperPlane}></FontAwesomeIcon>} color={"coral"} title="Procedure Orders"/>
                  <ChartReviewActivityButtonLarge handleShowEncounters={handleShowEncounters} style={{cursor:"pointer"}} icon={<FontAwesomeIcon style={{width:"25px",height:"25px"}} icon={faCalendarCheck}></FontAwesomeIcon>} color={"coral"} title="Encounters"/>
              {/* {currentPatientTab === "Chart Review" ? <ChartReviewTabs patient={currentPatient}/> : <></>} */}
            </div>
            </Fade>
            </div>
            </div>
        </Fade>



            {displayMedications ? <div style={{display: "flex",justifyContent:"center",width:"100%",backgroundColor:"transparent",flexDirection:"column",alignItems:"center"}}>
              <PatientMedications patient={props.patient} open={open} hideMedications={handleHideMedications}></PatientMedications>
            </div> : <></>}
            {displayPhysicalProblems ? <div style={{display: "flex",justifyContent:"center",width:"100%",backgroundColor:"transparent",flexDirection:"column",alignItems:"center"}}>
            <PatientPhysicalProblemsList patient={props.patient} hidePhysicalProblems={handleHidePhysicalProblems}/>
            </div> : <></>}
            {displayMentalProblems ? <div style={{display: "flex",justifyContent:"center",width:"100%",backgroundColor:"transparent",flexDirection:"column",alignItems:"center"}}>
            <PatientMentalProblemsList patient={props.patient} hideMentalProblems={handleHideMentalProblems}/>
            </div> : <></>}
            {displayOrders ? <div style={{display:"flex",justifyContent:"center",width:"100%",backgroundColor:"transparent",flexDirection:"column",alignItems:"center"}}>
            <PatientOrdersList patient={props.patient} hideOrders={handleHideOrders}/>
            </div> : <></>}
            {displayEncounters ? <div style={{display:  "flex",justifyContent:"center",width:"100%",backgroundColor:"transparent",flexDirection:"column",alignItems:"center"}}>
            <PatientEncountersList patient={props.patient} hideEncounters={handleHideEncounters}/>
            </div> : <></>}
            {/* <form ref={form} onSubmit={submit}>
                <input type="file" name="file"></input>
                <input type="submit" name="Sign Up" />
            </form> */}
        </>
    );
}
export default PatientChart;