import React, { useContext } from 'react';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import BasicPatientAttributes from './BasicPatientAttributes';
import PatientPhoneNumbers from './PatientPhoneNumbers';
import PatientAddressInfo from './PatientAddressInfo';
import PatientMedications from './PatientMedications';
import ThemeContext from './utils/ThemeContext';
import PatientProblems from './PatientProblems';


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
               <BasicPatientAttributes patient={props.patient}/>
               <div style={{display:"flex",flexDirection:"row"}}>
                   <PatientMedications patient={props.patient}/>
                   <PatientProblems patient={props.patient}/>
                </div>
            </div>
        </>
    );
}
export default ChartReview;