import React, { useContext } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';

function PatientPreviewCard(props) { 
    const context = useContext(HomeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)

    const openChart=(id)=>{
        if (!openTabs.some(activity=>activity.name === `${props.patient.lastName}, ${props.patient.firstName}`)) dispatch(openPatientChart(id))
        context.setSelectedTabName(`${props.patient.lastName}, ${props.patient.firstName}`)
    }

    return (
        <>
            <div>
                <strong>full name:</strong> {props.patient.firstName} {props.patient.lastName}
                <button onClick={()=>openChart(props.patient.id)}>Open Chart</button>
            </div>
        </>
    );
}

export default PatientPreviewCard;