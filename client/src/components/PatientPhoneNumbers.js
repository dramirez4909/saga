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
    return (
        <>
                <div style={{display:"flex",flexDirection:"column",borderRadius:"8px",boxShadow: "rgba(0, 0, 0, 0.09) 0px 1px 2px 0px",width:"fit-content",padding:"4px",marginRight:"9px",}}>
                    <div style={{display:"flex",flexDirection:"column",padding:"4px",backgroundColor:"white", width:"fit-content"}}>
                        <span><HomeTwoToneIcon style={{color:"coral"}} size="small"/> <span style={{fontWeight:"bolder",color:"grey"}}>{props.patient.home_phone}</span></span>
                        <span><StayPrimaryPortraitTwoToneIcon style={{color:"lightblue"}} size="small"/> <span style={{fontWeight:"bolder",color:"grey"}}>{props.patient.mobile_phone}</span></span>
                        <span><BusinessTwoToneIcon style={{color:"green"}} size="small"/> <span style={{fontWeight:"bolder",color:"grey"}}>{props.patient.work_phone}</span></span>
                    </div>
                </div>
        </>
    );
}

export default PatientPhoneNumbers;