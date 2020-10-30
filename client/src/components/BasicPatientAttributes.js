import React, { useContext } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';


const imageStyle={
    hieght:"32px",
    width:"32px"
  }

const tabStyle = {
'&:hover': {
  background:"grey"
}

}

const metricContainerStyle={
marginRight:"10px",
fontSize:"24px",
borderRadius:"9px",
cursor:"pointer",
background:"white",
fontWeight:"strong",
boxShadow: "rgba(0, 0, 0, 0.09) 0px 1px 2px 0px",
padding:"4px",
color:"grey",
alignItems:"center",
'&:hover': {
    boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
}
}

const metricTextStyle ={
marginLeft:"6px"
}

function BasicPatientAttributes(props) { 
    const context = useContext(HomeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)

    const openChart=(id)=>{
        if (!openTabs.some(activity=>activity.name === `${props.patient.lastName}, ${props.patient.firstName}`)) dispatch(openPatientChart(id))
        context.setSelectedTab(`${props.patient.lastName}, ${props.patient.firstName}`,props.patient)
    }

    return (
        <>
            <div style={{display:"flex",flexDirection:"column",borderRadius:"7px",margin:"10px"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"left", margin:"8px"}}>
                    <div style={{...metricContainerStyle}}>
                        {props.patient.sex === "female" ? 
                            <img style={{height:"29px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/female-removebg-preview.png"></img>
                            :
                            <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/_Pngtree_vector_male_sign_icon_4184181-removebg-preview.png"></img>}
                    </div>
                    <div style={{...metricContainerStyle}}>
                        <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/my-baby-page-height-38152201fffe401cf5b4a5c923b5ad80.png"></img>
                        <span style={{...metricTextStyle}}>{props.patient.height}</span>
                    </div>
                    <div style={{...metricContainerStyle}}>
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/113553339-weights-concept-vector-linear-icon-isolated-on-transparent-background-weights-concept-transparency-c-removebg-preview.png"></img> */}
                        <FitnessCenterIcon style={{height: "32px", width:"32px", color:"rgb(85, 177, 250)"}} />
                        <span style={{...metricTextStyle}}>{props.patient.weight}<span style={{fontSize:"18px", color:"lightgrey"}}>kgs</span></span>
                    </div>
                    <div style={{...metricContainerStyle}}>
                        {/* <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/heart-removebg-preview.png"></img> */}
                        <FavoriteIcon style={{height: "32px", width:"32px", color:"red"}}/>
                        <span style={{...metricTextStyle}}>{props.patient.beats_per_minute}<span style={{fontSize:"18px", color:"lightgrey"}}>bpm</span></span>
                    </div>
                    <div style={{...metricContainerStyle}}>
                        <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/unnamed.png"></img>
                        <span style={{...metricTextStyle}}>{props.patient.bmi}</span>
                    </div>
                    <div style={{...metricContainerStyle}}>
                        {props.patient.smoker ? 
                            <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/images-removebg-preview.png"></img>
                            :
                            <img style={{...imageStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/no-smoking-smoke-cigarette-forbidden-habit-cigar-tobacco-nicotine-prohibition-toxic-unhealthy_1--removebg-preview.png"></img>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default BasicPatientAttributes;