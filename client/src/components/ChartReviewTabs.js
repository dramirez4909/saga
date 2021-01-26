import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ChartReview from './ChartReview';
import PatientEncountersList from './PatientEncountersList';
import PatientMedicationList from './PatientMedicationsList'
import PatientMentalProblemsList from './PatientMentalProblemList'
import PatientMedsTable from './PatientMedsTable';
import PatientMedications from './PatientMedications';
import ThemeContext from './utils/ThemeContext';
import PatientPhysicalProblemsList from './PatientPhysicalProblemList'
import { Fade } from '@material-ui/core';
import PatientOrdersList from './PatientOrdersList';

const tabStyle = {
  outline: "none",
  zIndex:1,
  transition:"all .3s ease-in-out",
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginRight:"0px",
  },
}));

export default function ChartReviewTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const themeContext = useContext(ThemeContext)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
      <AppBar position="static" style={{backgroundColor:themeContext.themes === "dark" ? "#666666" : "white"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Medications" style={{...tabStyle, color:themeContext.themes === "dark" ? "white" : ""}} 
            // icon={<img style={{height:"30px",width:"30px",transition:"all .3s ease-in-out"}} src="https://saga-health.s3-us-west-1.amazonaws.com/91-919780_stimulant-drugs-clipart-png-download.png"></img>} 
            {...a11yProps(0)}
          />
          <Tab label="Mental Health" style={{...tabStyle, color:themeContext.themes === "dark" ? "white" : ""}} 
            // icon={<img style={{height:"30px",width:"30px",transition:"all .3s ease-in-out"}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-brain-100+(6).png"></img>} 
            {...a11yProps(1)}
          />
          <Tab label="Problem List" style={{...tabStyle, color:themeContext.themes === "dark" ? "white" : ""}} 
            // icon={<img style={{height:"30px",width:"30px",transition:"all .3s ease-in-out"}} src="https://saga-health.s3-us-west-1.amazonaws.com/256x256.png"></img>} 
            {...a11yProps(2)}
          />
          <Tab label="Procedure Orders" style={{...tabStyle, color:themeContext.themes === "dark" ? "white" : ""}} 
            // icon={<img style={{height:"30px",width:"30px",transition:"all .3s ease-in-out"}} src="https://saga-health.s3-us-west-1.amazonaws.com/paper-rocket-flat.svg"></img>} 
            {...a11yProps(3)}
          />
          <Tab label="Encounters" style={{...tabStyle, color:themeContext.themes === "dark" ? "white" : ""}} 
            // icon={<img style={{height:"30px",width:"30px",transition:"all .3s ease-in-out"}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-calendar-100.png"></img>} 
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{width:"100%",display:"flex"}}></div>
        <PatientMedications patient={props.patient}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PatientMentalProblemsList patient={props.patient}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PatientPhysicalProblemsList patient={props.patient}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PatientOrdersList patient={props.patient}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <PatientEncountersList patient={props.patient}/>
      </TabPanel>
    </div>
  );
}