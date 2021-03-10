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
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';
import ThemeContext from './utils/ThemeContext';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const imageStyle={
    hieght:"32px",
    width:"32px",
    color:"#4ba7fa"
  }

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

function PatientAddressInfo(props) { 
    console.log(props)
    const context = useContext(HomeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)

    const themeContext = useContext(ThemeContext)
    return (
        <>
                <div style={{display:"flex",flexDirection:"column",borderRadius:"9px", width:"fit-content"}}>
                    <div style={{display:"flex",flexDirection:"row",padding:"4px",backgroundColor:"transparent", width:"fit-content",borderRadius:"8px",alignItems:"center"}}>
                        <LocationOnIcon style={{...imageStyle}}/>
                        <div style={{display:"flex",flexDirection:"column", width:"fit-content", marginLeft:"3px"}}>
                        { props.patient.address_line_one ? <span> <span style={{fontSize:"14px"}}>{props.patient.address_line_one}</span> </span> : ""}
                        { props.patient.address_line_two ? <span> <span style={{fontSize:"14px"}}>{props.patient.address_line_two}</span> </span> : ""}
                        { props.patient.address_line_three ? <span> <span style={{fontSize:"14px"}}>{props.patient.address_line_three}</span> </span> : ""}
                        { props.patient.address_city ? <span><span style={{fontSize:"14px"}}>{props.patient.address_city}, {props.patient.address_state}</span> 
                        <span style={{fontSize:"14px"}}>{props.patient.address_zip}</span> </span> : ""}
                        </div>
                    </div>
                </div>
        </>
    );
}

export default PatientAddressInfo;