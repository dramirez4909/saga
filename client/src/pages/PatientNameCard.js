import React, {useEffect, useState} from 'react'
import ColorizeIcon from '@material-ui/icons/Colorize';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useSelector } from 'react-redux';
import PatientAddressInfo from '../components/PatientAddressInfo';
import PatientPhoneNumbers from '../components/PatientPhoneNumbers';


const PatientNameCard = (props) => {

    const currentPatient = useSelector(state=>state.currentPatient)
    const [patientDob,setPatientDob] = useState()
    // const [loading,setLoading] =useState(true)
    // useEffect(()=>{
    //     if (props.patient.id === currentPatient.id) {
    //       const dobstr = patient.dob + "-500"
    //       const dob = new Date(dobstr)
    //       setPatientDob(dob)
    //       setPatient(currentPatient)
    //       setLoading(false)
    //     }
    //   },[currentPatient])

    //   if (loading) return ""

    return (
        <div style={{
            display:"flex",
            flexDirection:"column", 
            // backgroundColor:"white"
            borderRadius:"4px",
            // boxShadow:"rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",
            // minWidth:"450px",
            paddingTop:"4px",
            color:"black"
            }}>
          <div style={{
            display:"flex",
            flexDirection:"row", 
            height:"150px",
            // boxShadow:"rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",
            paddingLeft:"10px",
            }}>
                  <div style={{display:"flex",flexDirection:"column",justifyContent:"center",margin:"15px",color:"black"}}>
                    <div style={{display:"flex",justifyContent:"flex-start",fontWeight:"500",fontSize:"23px"}}>
                      {props.patient.lastName+ "," + " " + props.patient.firstName}
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",color:"black"}}>
                    <div>
                    <div style={{fontWeight:"400",fontSize:"14px"}}>
                    {props.patientDob ? `${props.patient.sex.charAt(0).toUpperCase() + props.patient.sex.slice(1)}, ${props.patientDob.getMonth() + 1}.${props.patientDob.getDate()}.${props.patientDob.getFullYear()}` : ""}
                    </div>
                    <div style={{fontWeight:"400",fontSize:"14px"}}>
                      {props.patient.occupation}
                    </div>
                    <PatientAddressInfo patient={props.patient}/>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                      <PatientPhoneNumbers patient={props.patient}/>
                    </div>
                    </div>
                  </div>
  
          </div>
          <div style={{display:"flex",flexDirection:"row",width:"100%", borderTop:"1px solid gainsboro"}}>
          <div style={{display:"flex",flexDirection:"column",width:"50%",alignItems:"center",paddingTop:"4px",paddingBottom:"4px"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <BeachAccessIcon style={{color:"#4ba7fa"}}></BeachAccessIcon>
            <span>Coverage:</span>
            </div>
            <span style={{fontSize:"15px",textAlign:"center"}}>{props.patient.coverage}</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",width:"50%",alignItems:"center",paddingTop:"4px",paddingBottom:"4px",borderLeft:"1px solid gainsboro"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <AttachMoneyIcon style={{color:"#4ba7fa"}}></AttachMoneyIcon>
            <span>Visit Copay:</span>
            </div>
            <span style={{fontSize:"18px"}}>${props.patient.visit_copay}</span>
          </div>
          </div>
          </div>
    )
}

export default PatientNameCard