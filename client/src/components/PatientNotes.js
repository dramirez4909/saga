import React, { useContext } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Grid, Container, Button, Card, InputBase, TextField } from '@material-ui/core';



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

function PatientMedications(props) { 
    console.log(props)
    const context = useContext(HomeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)
    return (
        <>
                <div style={{display:"flex",flexDirection:"column",borderRadius:"9px",boxShadow: "rgba(0, 0, 0, 0.09) 0px 1px 2px 0px", width:"fit-content",padding:"8px",marginLeft:"9px",marginRight:"9px"}}>
                    <div style={{display:"flex",flexDirection:"row",padding:"4px",backgroundColor:"white", width:"fit-content"}}>
                        {/* {props.patient.medications.map} */}
                    </div>
                </div>
        </>
    );
}

export default PatientMedications;