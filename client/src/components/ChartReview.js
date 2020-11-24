import React, { useContext } from 'react';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import BasicPatientAttributes from './BasicPatientAttributes';
import PatientPhoneNumbers from './PatientPhoneNumbers';
import PatientAddressInfo from './PatientAddressInfo';
import PatientMedications from './PatientMedications';
import ThemeContext from './utils/ThemeContext';
import PatientProblems from './PatientMentalProblems';
import PatientMentalProblemList from './PatientMentalProblemList';
import PatientPhysicalProblemList from './PatientPhysicalProblemList';
import PatientMedicationsList from './PatientMedicationsList';
import PatientEncounters from '../components/PatientEncounters';
import PatientOrders from '../components/PatientOrders';
import { useSelector } from 'react-redux';
import PatientNotes from '../components/PatientNotes';
import { Grid } from '@material-ui/core';
import PatientEncountersList from './PatientEncountersList';

const imageStyle={
    hieght:"32px",
    width:"32px"
  }



const metricTextStyle ={
    marginLeft:"6px"
}
function ChartReview(props) {

    const themeContext = useContext(ThemeContext)
    return (
        <>
            <div style={{display:"flex",flexDirection:"column", background:themeContext.themes === "dark" ? "#444444" : "white"}}>
                <Grid container direction={"row"} spacing={1}>
                    <Grid item xs={6}>
                        <PatientMedicationsList patient={props.patient}/>
                    </Grid>
                    <Grid item xs={6}>
                        <PatientMentalProblemList patient={props.patient}/>
                    </Grid>
                    <Grid item xs={6}>
                        <PatientPhysicalProblemList patient={props.patient}/>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <PatientEncountersList patient={props.patient}/>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
export default ChartReview;