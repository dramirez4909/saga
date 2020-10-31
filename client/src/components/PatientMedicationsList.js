import React, { useContext, useEffect,useState } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import HomeIcon from '@material-ui/icons/Home';
import StayCurrentPortraitIcon from '@material-ui/icons/StayCurrentPortrait';
import StayPrimaryPortraitTwoToneIcon from '@material-ui/icons/StayPrimaryPortraitTwoTone';
import BusinessTwoToneIcon from '@material-ui/icons/BusinessTwoTone';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';
import ThemeContext from './utils/ThemeContext';


const ColorButton = withStyles((theme) => ({
    root: {
        color: "#ed4959",
        paddingRight: "10px",
        paddingLeft: "10px",
        margin: "4px",
        backgroundColor:"white",
        border:"1px solid #ed4959",
        '&:hover': {
            backgroundColor: "#ed4959 !important",
            color:"white",
            border:"1px solid #ed4959",
        },
    },
    }))(Button);

function PatientMedicationsList(props) { 
    console.log("prs!!",props.patient)
    console.log("ptheseasdfadfddd",{...props.patient})
    
    const themeContext = useContext(ThemeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const [patient,setPatient] = useState(props.patient)
    // console.log(props.patient)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        if (props.patient.medications) {
            setPatient(props.patient)
            setLoading(false)
        }
    },[props.patient])

    if (loading) {
        return "...loading"
    }

    
    return (
        <>
                <div style={{display:"flex",flexDirection:"column",borderRadius:"9px",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", width:"fit-content",padding:"8px",marginRight:"9px"}}>
                    <div style={{display:"flex",flexDirection:"column",padding:"4px",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white", width:"fit-content",borderRadius:"8px"}}>
                        {patient.medications.map((med,index)=>{
                            return(
                            <>
                            <div style={{display:"flex",flexDirection:"column", backgroundColor:themeContext.themes === "dark" ? "#444444" : "white",color:themeContext.themes === "dark" ? "white" : "black",}}>
                            <div style={{display:"flex",flexDirection:"row",borderRadius:"4px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
                                {med.name}
                            </div>
                            {/* <div style={{display:"flex",flexDirection:"row",borderRadius:"4px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
                                {med.created_at}
                            </div> */}
                            </div>
                            </>)
                        })}
                    </div>
                </div>
        </>
    );
}

export default PatientMedicationsList;