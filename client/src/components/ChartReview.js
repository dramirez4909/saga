import React, { useContext } from 'react';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import BasicPatientAttributes from './BasicPatientAttributes';
import PatientPhoneNumbers from './PatientPhoneNumbers';
import PatientAddressInfo from './PatientAddressInfo';
import PatientMedications from './PatientMedications';
import ThemeContext from './utils/ThemeContext';
import PatientProblems from './PatientProblems';
import PatientProblemList from './PatientProblemList';
import PatientMedicationsList from './PatientMedicationsList';
import PatientEncounters from '../components/PatientEncounters';
import PatientOrders from '../components/PatientOrders';
import { useSelector } from 'react-redux';
import PatientNotes from '../components/PatientNotes';

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
               <div style={{display:"flex",flexDirection:"column"}}>
                   <PatientMedicationsList patient={props.patient}/>
                   <PatientProblemList patient={props.patient}/>
                   {/* <ChartReview patient={props.patient}/>
                   <PatientEncounters patient={props.patient}/>
                   <PatientOrders patient={props.patient}/>
                   <PatientNotes patient={props.patient}/>
                   <PatientProblems patient={props.patient}/>
                   <PatientMedications patient={props.patient}/> */}
                </div>
            </div>
        </>
    );
}
export default ChartReview;