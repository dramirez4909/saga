import React, { useContext } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PatientPhoneNumbers from './PatientPhoneNumbers';
import PatientAddressInfo from './PatientAddressInfo';
import ThemeContext from './utils/ThemeContext';
import ChartReviewSmallActivityButton from './ChartReviewSmallActivityButton'
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

const imageStyle={
    hieght:"34px",
    width:"34px"
  }

const tabStyle = {
'&:hover': {
  background:"grey"
}

}

const metricContainerStyle={
display:"flex",
flexDirection:"row",
fontSize:"18px",
borderRadius:"9px",
margin:"4px",
cursor:"pointer",
fontWeight:"strong",
padding:"4px",
alignItems:"center",
'&:hover': {
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
}
}

const metricTextStyle ={
marginLeft:"6px"
}

function ChartReviewBasicAttributes(props) { 
    const context = useContext(HomeContext)
    const dispatch = useDispatch()
    const themeContext = useContext(ThemeContext)
    const openTabs = useSelector(state=>state.activities.open_tabs)

    const openChart=(id)=>{
        if (!openTabs.some(activity=>activity.name === `${props.patient.lastName}, ${props.patient.firstName}`)) dispatch(openPatientChart(id))
        context.setSelectedTab(`${props.patient.lastName}, ${props.patient.firstName}`,props.patient)
    }

    return (
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    width:"100%",
                    justifyContent:"flex-start",
                    maxWidth:"650px"
                    }}>
                    {/* <div style={{...metricContainerStyle,color:themeContext.themes === "dark" ? "white" : "grey",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}> */}
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/heart-removebg-preview.png"></img> */}
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/heart-compact-flat.svg"></img> */}
                        {/* <div>Heart Rate:</div> */}
                        <ChartReviewSmallActivityButton title={"Heart Rate"} value={props.patient.beats_per_minute} icon={<FavoriteIcon style={{color:"#4ba7fa",width:"27px",height:"27px",marginRight:"5px"}}/>}/>
                    {/* </div> */}
                    {/* <div style={{...metricContainerStyle,color:themeContext.themes === "dark" ? "white" : "grey",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}> */}
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/113553339-weights-concept-vector-linear-icon-isolated-on-transparent-background-weights-concept-transparency-c-removebg-preview.png"></img> */}
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-barbell-100.png"></img> */}
                        {/* <div>Weight:</div>
                        <span style={{...metricTextStyle}}>{props.patient.weight}<span style={{fontSize:"18px", color:"lightgrey"}}>kgs</span></span>
                    </div> */}
                        <ChartReviewSmallActivityButton title={"Weight"} value={props.patient.weight + "lb"} icon={<FitnessCenterIcon style={{color:"#4ba7fa",width:"27px",height:"27px",marginRight:"5px"}}/>}/>
                    {/* <div style={{...metricContainerStyle,color:themeContext.themes === "dark" ? "white" : "grey",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}> */}
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-compare-heights-100+(1).png"></img> */}
                        {/* <div>Height:</div>
                        <span style={{...metricTextStyle}}>{props.patient.height}</span>
                    </div> */}
                        <ChartReviewSmallActivityButton title={"Height"} value={props.patient.height} icon={<AccessibilityIcon style={{color:"#4ba7fa",width:"27px",height:"27px",marginRight:"5px"}}/>}/>
                    {/* <div style={{...metricContainerStyle,color:themeContext.themes === "dark" ? "white" : "grey",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}> */}
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-bmi-100+(1).png"></img> */}
                        {/* <div>BMI:</div>
                        <span style={{...metricTextStyle}}>{props.patient.bmi}</span>
                    </div> */}
                        <ChartReviewSmallActivityButton title={"BMI"} value={props.patient.bmi} icon={<TrackChangesIcon style={{color:"#4ba7fa",width:"27px",height:"27px",marginRight:"5px"}}/>}/>

                </div>
    );
}

export default ChartReviewBasicAttributes;