import React from 'react';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import BasicPatientAttributes from './BasicPatientAttributes';
import PatientPhoneNumbers from './PatientPhoneNumbers';
import PatientAddressInfo from './PatientAddressInfo';
import PatientMedications from './PatientMedications';


const imageStyle={
    hieght:"32px",
    width:"32px"
  }



const metricTextStyle ={
    marginLeft:"6px"
}
function ChartReview(props) {
    return (
        <>
            <div style={{display:"flex",flexDirection:"column", background:"white", height:"100vh"}}>
               <BasicPatientAttributes patient={props.patient}/>
               <div style={{display:"flex",flexDirection:"row"}}>
                    <PatientAddressInfo patient={props.patient}/>
                    <PatientPhoneNumbers patient={props.patient}/>
                    <div style={{borderRadius:"9px",display:"flex",color:"lightgrey",fontSize:"40px",padding:"9px",boxShadow: "rgba(0, 0, 0, 0.09) 0px 1px 2px 0px"}}>[ she / her ]</div>
                </div>
                <div>
                    <PatientMedications/>
                </div>
            </div>
        </>
    );
}
export default ChartReview;