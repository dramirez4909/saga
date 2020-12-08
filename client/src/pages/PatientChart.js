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
import { CircularProgress, Fade, Slide } from '@material-ui/core';
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
    const [loadingPicture,setLoadingPicture] = useState(false)
    const [loading,setLoading] = useState(true)
    const form = useRef(null)
    const [patientTabs,setPatientTabs] = useState(["Chart Review","Encounters","Orders","Problem List","Meds","Notes","Allergies","Media"])
    const [currentPatientTab,setCurrentPatientTab] =useState("Chart Review")
    const themeContext = useContext(ThemeContext)

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
        <div style={{display:"flex",marginTop:"10px",marginRight:"10px",width:"100%",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white",flexDirection:"row"}}>
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
        <div style={{display:"flex",flexDirection:"column",borderRight:themeContext.themes === "dark" ? "" : ""}}>
          <span style={{fontFamily:"inherit",borderBottom:themeContext.themes === "dark" ? "1px solid white" : "1px solid black",letterSpacing:"2px",textTransform:"uppercase",fontSize:"25px",padding:"8px",textDecoration:"none",color:themeContext.themes === "dark" ? "white" : "black",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white",fontWeight:"200"}}>{patient.firstName + " " + patient.lastName}</span>

        <div style={{display:"flex",flexDirection:"column", height:"100%",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
          {/* <span style={{fontSize:"34px",color:themeContext.themes === "dark" ? "white" : "grey"}}>{patient.fullName}</span> */}
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center",background:themeContext.themes === "dark" ? "#4444" : "white",borderLeft:themeContext.themes === "dark" ? "" : ""}}>
            <div className={"circular--portrait"} style={{justifyContent:"center",alignSelf:"center", marginLeft:"10px",marginTop:"10px",marginBottom:"10px",border:"3px solid white",boxShadow: themeContext.themes === "dark" ? "" : "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}>
                {loadingPicture ? <img id="user-photo" src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"/> : <img id="user-photo" src={patient.picture ? patient.picture : ""}/>}
            </div>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",paddingTop:"10px",borderTop:themeContext.themes === "dark" ? "1px solid white" : "1px solid black"}}>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <PatientPhoneNumbers patient={props.patient}/>
                    <PatientAddressInfo patient={props.patient}/>
                </div>
                <div>
                  <ChartReviewBasicAttributes patient={props.patient}></ChartReviewBasicAttributes>
                </div>

            </div>
        </div>
        </div>
      <div style={{display:"flex", flexDirection:"column",flexWrap:"wrap",maxHeight:"82vh",alignContent:"flex-start",backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",width:"100%",alignContent:"center"}}> 
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
              {currentPatientTab === "Chart Review" ? <ChartReviewTabs patient={currentPatient}/> : <></>}
              {currentPatientTab === "Encounters" ? <PatientEncounters patient={currentPatient}/> : <></>}
              {currentPatientTab === "Orders" ? <PatientOrders patient={currentPatient}/> : <></>}
              {currentPatientTab === "Notes" ? <PatientNotes patient={currentPatient}/> : <></>}
              {currentPatientTab === "Problem List" ? <AllProblems patient={currentPatient}/> : <></>}
              {currentPatientTab === "Meds" ? <PatientMedications patient={currentPatient}/> : <></>}
            </div>
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