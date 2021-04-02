import React, {useState,useEffect,useContext} from 'react'
import ChartReviewBasicAttributes from './ChartReviewBasicAttributes'
import ChartReviewMetrics from './ChartReviewMetrics'
import PatientVitalsForm from './PatientVitalsForm'


const PatientVitals = (props) => {
    return (
        <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",maxWidth:"450px"}}>
          <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center", justifyContent:"center"}}>
            <PatientVitalsForm patient={props.patient}></PatientVitalsForm>
          </div>
          <ChartReviewBasicAttributes chartData={props.chartData} patient={props.patient}></ChartReviewBasicAttributes>
        </div>
    )
}

export default PatientVitals