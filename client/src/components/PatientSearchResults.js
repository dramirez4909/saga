import React, { useContext, useEffect,useRef} from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ContactIcon from '@material-ui/icons/AccountCircleTwoTone';
import DraftsIcon from '@material-ui/icons/Drafts';
import PatientSearchContext from './utils/PatientSearchContext';
import Button from '@material-ui/core/Button'
import HomeContext from './utils/HomeContext';
import { useDispatch, useSelector } from 'react-redux';
import {openPatientChart} from '../store/activities'
import ThemeContext from './utils/ThemeContext';

const iconStyle = {
  height: "25px",
  width: "25px",
}

function useOutsideAlerter(ref,context) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        context.setPatientSearchTerm("")
        context.setDisplayPatientSearchResults(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
      color: "white",
      paddingRight: "10px",
      paddingLeft: "10px",
      outline: "none",
      textDecoration:"none",
      margin: "4px",
      backgroundColor:"grey",
      '&:hover': {
          backgroundColor: "#b1f3b1 !important",
      },
  },
}))(Button);

export default function PatientSearchResults(props) {
  const classes = useStyles();
  const context = useContext(PatientSearchContext)
  const homeContext = useContext(HomeContext)
  const themeContext = useContext(ThemeContext)
  const dispatch = useDispatch()
  const openTabs = useSelector(state=>state.activities.open_tabs)

  const handleListItemClick = (event, index) => {
    // context.setSelectedIndex(index);
    // context.setSelectedPatient(props.patientSearchResults[index])
  };

  const openChart=(patient)=>{
    context.setDisplayPatientSearchResults(false)
    context.setPatientSearchTerm("")
    if (!openTabs.some(activity=>activity.name === `${patient.lastName}, ${patient.firstName}`)) dispatch(openPatientChart(patient.id))
    homeContext.setSelectedTab(`${patient.lastName}, ${patient.firstName}`,patient)
  }

  const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef,context);

  return (
      <List ref={wrapperRef} component="nav" style={{backgroundColor:themeContext.themes === "dark" ? "#444444" : "white",position:"absolute",zIndex:10}}>
        {props.patientSearchResults.map((patient,index) => {
          return(<ListItem
              button
              // selected={context.selectedIndex === index}
              style={{display:"flex",flexDirection:"row",justifyContent:"space-between",color:themeContext.themes === "dark" ? "white" : "black",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}
            >
              <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                  <img style={{...iconStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/folder-open-flat.svg"/>
                <div style={{marginLeft:"4px",marginRight:"4px"}}>{patient.firstName + " " + patient.lastName}</div>
              </div>
              <div style={{display:"flex",flexDirection:"row", alignItems:"center"}}>
              <div style={{color:themeContext.themes === "dark" ? "grey" : "grey"}}>DOB: <span style={{color:"black"}}>{`${patient.dob.split(" ")[1]} ${patient.dob.split(" ")[2]} ${patient.dob.split(" ")[3]}`}</span></div>
              <ColorButton size="small" onClick={()=>{openChart(patient)}}>Open Chart</ColorButton>
              </div>
            </ListItem>)})}
      </List>
  );
}