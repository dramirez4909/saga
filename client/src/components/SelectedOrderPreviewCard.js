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
import PatientPhoneNumbers from './PatientPhoneNumbers';
import PatientAddressInfo from './PatientAddressInfo';


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

function SelectedOrderPreviewCard(props) { 
    console.log(props)
    const context = useContext(HomeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const themeContext = useContext(ThemeContext)

    const openChart=(id)=>{
        if (!openTabs.some(activity=>activity.name === `${props.patient.lastName}, ${props.patient.firstName}`)) dispatch(openPatientChart(id))
        context.setSelectedTab(`${props.patient.lastName}, ${props.patient.firstName}`,props.patient)
    }

    return (
        <>
            <div style={{display:"flex",flexDirection:"column",borderRadius:"7px",padding:"10px",margin:"10px",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white",boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"}}>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center", justifyContent:"space-between"}}>
                    <p style={{color:themeContext.themes === "dark" ? "white" : "#999999"}}>{props.patient.firstName} {props.patient.lastName}</p>
                    <ColorButton style={{backgroundColor:themeContext.themes === "dark" ? "#666666" : "",color:themeContext.themes === "dark" ? "white" : ""}} size="small" onClick={()=>openChart(props.patient.id)}>
                        <span>Open Chart</span> 
                        <ExitToAppTwoToneIcon style={{marginLeft:"3px"}}/>
                    </ColorButton></div>
                <Divider style={{marginTop:"3px",marginBottom:"3px"}}/>
                <div style={{display:"flex",flexDirction:"row"}}>
                {/* <div className={"small-circular--portrait"} style={{justifyContent:"left", marginTop:"5px"}}>
                <img id="user-photo" src={props.patient.picture ? props.patient.picture : ""}/>
                </div> */}
                <div style={{display:"flex",flexDirection:"column",marginLeft:"6px"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                    <PatientPhoneNumbers patient={props.patient}/>
                    <PatientAddressInfo patient={props.patient}/>
                </div>
                    {/* <div style={{display:"flex",flexDirection:"column",padding:"4px",borderRadius:"4px",backgroundColor:themeContext.themes === "dark" ? "#666666" : "white",border:"2px solid ivory", width:"fit-content"}}>
                        <span><HomeTwoToneIcon style={{color:"coral"}} size="small"/> <span style={{fontWeight:"bolder",color:themeContext.themes === "dark" ? "white" : "#343434"}}>{props.patient.home_phone}</span></span>
                        <span><StayPrimaryPortraitTwoToneIcon style={{color:"lightblue"}} size="small"/> <span style={{fontWeight:"bolder",color:themeContext.themes === "dark" ? "white" : "#343434"}}>{props.patient.mobile_phone}</span></span>
                        <span><BusinessTwoToneIcon style={{color:"lightgreen"}} size="small"/> <span style={{fontWeight:"bolder",color:themeContext.themes === "dark" ? "white" : "#343434"}}>{props.patient.work_phone}</span></span>
                    </div> */}
                    <div>
                        Ordering Provider: {props.order.provider.full_name}
                    </div>
                    <div>
                        Order Note: {props.order.note}
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default SelectedOrderPreviewCard;