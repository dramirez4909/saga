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
            <div style={{display:"flex",flexDirection:"column", background:themeContext.themes === "dark" ? "#444444" : "white", height:"100vh"}}>
               <div style={{display:"flex",flexDirection:"row"}}>
                   <PatientMedicationsList patient={props.patient}/>
                   <PatientProblemList patient={props.patient}/>
                </div>
            </div>
        </>
    );
}
export default ChartReview;