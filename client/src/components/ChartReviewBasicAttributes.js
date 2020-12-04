import React, { useContext } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PatientPhoneNumbers from './PatientPhoneNumbers';
import PatientAddressInfo from './PatientAddressInfo';
import ThemeContext from './utils/ThemeContext';


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
        <>
            <div style={{display:"flex",flexDirection:"column",borderRadius:"7px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white",marginLeft:"10px", marginRight:"5px",
            // boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{display:"flex",flexDirection:"column"}}>
                    {/* <div style={{display:"flex",flexDirection:"row",alignItems:"center"}} >
                        <div style={{...metricContainerStyle,color:themeContext.themes === "dark" ? "white" : "grey",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
                            {props.patient.sex === "female" ? 
                                <img style={{height:"29px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/female-removebg-preview.png"></img>
                                :
                                <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/_Pngtree_vector_male_sign_icon_4184181-removebg-preview.png"></img>}
                        </div>
                        <div style={{borderRadius:"9px",display:"flex",color: themeContext.themes === "dark" ? "white" : "grey",fontSize:"20px",zIndex:"3",padding:"9px",boxShadow: "rgba(0, 0, 0, 0.09) 0px 1px 2px 0px"}}>[ she / her ]</div>
                        <div style={{...metricContainerStyle,marginTop:"4px",color:themeContext.themes === "dark" ? "white" : "grey",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
                            {props.patient.smoker ? 
                                <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/images-removebg-preview.png"></img>
                                :
                                <img style={{ width: "50px", height: "35px"}}  src="https://saga-health.s3-us-west-1.amazonaws.com/no-smoking-smoke-cigarette-forbidden-habit-cigar-tobacco-nicotine-prohibition-toxic-unhealthy_1--removebg-preview.png"></img>
                            }
                        </div>
                    </div> */}
                </div>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{...metricContainerStyle,color:themeContext.themes === "dark" ? "white" : "grey",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/heart-removebg-preview.png"></img> */}
                        <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/heart-compact-flat.svg"></img>
                        <span style={{...metricTextStyle}}>{props.patient.beats_per_minute}<span style={{fontSize:"18px", color:"lightgrey"}}> bpm</span></span>
                    </div>
                    <div style={{...metricContainerStyle,color:themeContext.themes === "dark" ? "white" : "grey",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/113553339-weights-concept-vector-linear-icon-isolated-on-transparent-background-weights-concept-transparency-c-removebg-preview.png"></img> */}
                        <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-barbell-100.png"></img>
                        <span style={{...metricTextStyle}}>{props.patient.weight}<span style={{fontSize:"18px", color:"lightgrey"}}>kgs</span></span>
                    </div>
                    <div style={{...metricContainerStyle,color:themeContext.themes === "dark" ? "white" : "grey",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
                        <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-compare-heights-100+(1).png"></img>
                        <span style={{...metricTextStyle}}>{props.patient.height}</span>
                    </div>
                    <div style={{...metricContainerStyle,color:themeContext.themes === "dark" ? "white" : "grey",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
                        <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-bmi-100+(1).png"></img>
                        <span style={{...metricTextStyle}}>{props.patient.bmi}</span>
                    </div>
                </div>
                {/* <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                    <PatientPhoneNumbers patient={props.patient}/>
                    <PatientAddressInfo patient={props.patient}/>
                </div> */}
                </div>
            </div>
        </>
    );
}

export default ChartReviewBasicAttributes;