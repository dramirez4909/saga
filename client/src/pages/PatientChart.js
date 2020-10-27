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
import { Fade, Slide } from '@material-ui/core';
import PatientEncounters from '../components/PatientEncounters';
import PatientOrders from '../components/PatientOrders';
import { useSelector } from 'react-redux';

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
      position:"inherit",
    },
    drawerPaper: {
      width: drawerWidth,
      position:"inherit",
    },
    drawerContainer: {
      position:"inherit",
    },
    content: {
      flexGrow: 1,
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
  marginRight:"20px",
  fontSize:"24px",
  fontWeight:"strong",
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
    const form = useRef(null)
    const [patientTabs,setPatientTabs] = useState(["Chart Review","Encounters","Notes","Orders"])
    const [currentPatientTab,setCurrentPatientTab] =useState("Chart Review")

    useScrollPosition(({ prevPos, currPos }) => {
      console.log(currPos.x)
      console.log(currPos.y)
    })

    const [hideOnScroll, setHideOnScroll] = useState(true)

    useScrollPosition(({ prevPos, currPos }) => {
    const isShow = currPos.y > -15
    if (isShow !== hideOnScroll) {
      context.setSideBarDisplay(isShow)
      setHideOnScroll(isShow)
    }
    }, [hideOnScroll])

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

    useEffect(()=>{
        const searchDxs= async (searchTerm) => {
            const response = await fetch(`/api/umls/search-term/${searchTerm}`)
            const data = await response.json()
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

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
    console.log("Patient",props.patient)
    return (
        <>
        <div>
          <div style={{position:"sticky",top:"29px",display:"flex",boxShadow: "0 2px 2px -2px rgba(0,0,0,.2)",flexDirection:"row",zIndex:8,margin:0,width:"100%",backgroundColor:"white",justifyContent:"space-between"}}>
            <div className={classes.left}>
              <div style={{display:"flex", alignItems:"center", cursor:"pointer"}} >
                <span style={{fontSize:"35px",padding:"6px",textDecoration:"none", fontFamily:"Garamond",}}>{patient.firstName + " " + patient.lastName}</span>
              </div>
            </div>
            <Fade in={!hideOnScroll} timeout={250} mountOnEnter unmountOnExit>
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
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/113553339-weights-concept-vector-linear-icon-isolated-on-transparent-background-weights-concept-transparency-c-removebg-preview.png"></img> */}
                        <FitnessCenterIcon style={{height: "32px", width:"32px", color:"rgb(85, 177, 250)"}} />
                        <span style={{...metricTextStyle}}>{props.patient.weight}<span style={{fontSize:"18px", color:"lightgrey"}}>kgs</span></span>
                    </div>
                    <div style={{...metricContainerStyle}}>
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/heart-removebg-preview.png"></img> */}
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
                </Fade>
          </div> 
        <div className={classes.root}>
        <div className={classes.drawerContainer} style={{display:"flex",flexDirection:"column", alignSelf:"flex-start",position:"sticky",top:"91px",borderRight:"1px solid rgba(0, 0, 0, 0.12)"}}>
            <div className={"circular--portrait"} style={{justifyContent:"center",alignSelf:"center", marginTop:"5px"}}>
                {loadingPicture ? <img id="user-photo" src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"/> : <img id="user-photo" src={patient.picture ? patient.picture : ""}/>}
            </div>
          <List>
              <ListItem button
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon><TableChartIcon /></ListItemIcon>
                <ListItemText primary={"Chart Review"} />
              </ListItem>
              <ListItem button
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon><NoteAddTwoToneIcon /></ListItemIcon>
                <ListItemText primary={"Notes"} />
              </ListItem>
          <Divider />
              <ListItem button
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}>
                <ListItemIcon><EventNoteTwoToneIcon /></ListItemIcon>
                <ListItemText primary={"Encounters"} />
              </ListItem>
              <ListItem button
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}>
                <ListItemIcon><BorderColorTwoToneIcon /></ListItemIcon>
                <ListItemText primary={"Orders"} />
              </ListItem>
          </List>
        </div>
      <div className={classes.content}> 
            <div style={{background: "rgb(221,224,230)",height:"100vh"}}>
            <div className={"tabs"} style={{display:"flex",flexDirection:"row",background:"rgb(221,224,230)",zIndex:8,paddingTop:"8px",paddingLeft:"19px",position:"sticky",top:"91px"}}>
              {patientTabs.map((tab,index)=>{
                return (
                <li style={{listStyleType:"none",cursor:"pointer",...tabStyle}} className={`${currentPatientTab === tab ? "active" : ""}`} onClick={()=>{setCurrentPatientTab(tab)}}>
                  <a style={tabStyle}>
                    {tab}
                  </a>
                </li>
                )
              })}
            </div>
            <div>
              {currentPatientTab === "Chart Review" ? <ChartReview patient={currentPatient}/> : <></>}
              {currentPatientTab === "Encounters" ? <PatientEncounters patient={currentPatient}/> : <></>}
              {currentPatientTab === "Orders" ? <PatientOrders patient={currentPatient}/> : <></>}
            </div>
            {/* <LoginTextField placeholder="enter a diagnosis" value={dxSearchTerm} onChange={(e)=>setDxSearchTerm(e.target.value)}></LoginTextField>
            <ul>
                {dxSearchResults.map(dx=>{
                    return(
                        <li>{dx}</li>
                    )
                    })}
            </ul>
            <form ref={form} onSubmit={submit}>
                <input type="file" name="file"></input>
                <input type="submit" name="Sign Up" />
            </form> */}
            </div>
            </div>
            </div>
            </div>
        </>
    );
}
export default PatientChart;