import React, { useContext } from 'react';
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
  const dispatch = useDispatch()
  const openTabs = useSelector(state=>state.activities.open_tabs)
  
  const handleListItemClick = (event, index) => {
    context.setSelectedIndex(index);
    context.setSelectedPatient(props.patientSearchResults[index])
  };

  const openChart=(patient)=>{
    if (!openTabs.some(activity=>activity.name === `${patient.lastName}, ${patient.firstName}`)) dispatch(openPatientChart(patient.id))
    homeContext.setSelectedTabName(`${patient.lastName}, ${patient.firstName}`)
  }

  return (
    <div className={classes.root}>
      <List component="nav">
        {props.patientSearchResults.map((patient,index) => {
          return(<ListItem
              button
              selected={context.selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
              style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}
            >
              <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <ListItemIcon>
                  <ContactIcon />
                </ListItemIcon>
                <div>{patient.firstName + " " + patient.lastName}</div>
              </div>
              <div style={{display:"flex",flexDirection:"row", alignItems:"center"}}>
              <div style={{color:"grey"}}>DOB: <span style={{color:"green"}}>{`${patient.dob.split(" ")[1]} ${patient.dob.split(" ")[2]} ${patient.dob.split(" ")[3]}`}</span></div>
              <ColorButton size="small" onClick={()=>{openChart(patient)}}>Open Chart</ColorButton>
              </div>
            </ListItem>)})}
      </List>
    </div>
  );
}