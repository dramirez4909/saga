import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ContactIcon from '@material-ui/icons/AccountCircleTwoTone';
import DraftsIcon from '@material-ui/icons/Drafts';
import PatientSearchContext from './utils/PatientSearchContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function PatientSearchResults(props) {
  const classes = useStyles();
  const context = useContext(PatientSearchContext)
  
  const handleListItemClick = (event, index) => {
    context.setSelectedIndex(index);
    context.setSelectedPatient(props.patientSearchResults[index])
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        {props.patientSearchResults.map((patient,index) => {
          return(<ListItem
              button
              selected={context.selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                <ContactIcon />
              </ListItemIcon>
            <div>{patient.firstName + " " + patient.lastName}</div>
            </ListItem>)})}
      </List>
    </div>
  );
}