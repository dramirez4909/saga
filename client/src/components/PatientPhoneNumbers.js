import React, { useContext } from 'react';
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

function PatientPhoneNumbers(props) { 
    console.log(props)
    const context = useContext(HomeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const themeContext = useContext(ThemeContext)
    return (
        <>
                <div style={{display:"flex",marginBottom:"4px",flexDirection:"column",borderRadius:"8px",width:"fit-content",padding:"4px",marginRight:"9px"}}>
                    <div style={{display:"flex",flexDirection:"column",padding:"4px",backgroundColor:"transparent", width:"fit-content",borderRadius:"8px"}}>
                        <div style={{margin:"4px"}}><img src="https://saga-health.s3-us-west-1.amazonaws.com/home-flat.svg" style={{height:"34px",width:"34px"}}></img> <span style={{fontWeight:"bolder",color:themeContext.themes === "dark" ? "white" : "grey"}}>{props.patient.home_phone}</span></div>
                        <div style={{margin:"4px"}}><img src="https://saga-health.s3-us-west-1.amazonaws.com/iphone-flat.svg" style={{height:"34px",width:"34px"}}></img> <span style={{fontWeight:"bolder",color:themeContext.themes === "dark" ? "white" : "grey"}}>{props.patient.mobile_phone}</span></div>
                        <div style={{margin:"4px"}}><img src="https://saga-health.s3-us-west-1.amazonaws.com/bank-flat.svg" style={{height:"34px",width:"34px"}}></img> <span style={{fontWeight:"bolder",color:themeContext.themes === "dark" ? "white" : "grey"}}>{props.patient.work_phone}</span></div>
                    </div>
                </div>
        </>
    );
}

export default PatientPhoneNumbers;