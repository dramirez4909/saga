import React, { useContext } from 'react';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import BasicPatientAttributes from './BasicPatientAttributes';
import PatientPhoneNumbers from './PatientPhoneNumbers';
import PatientAddressInfo from './PatientAddressInfo';
import PatientMedications from './PatientMedications';
import ThemeContext from './utils/ThemeContext';
import PatientProblems from './PatientMentalProblems';
import PatientMentalProblemList from './PatientMentalProblemList';
import PatientPhysicalProblemList from './PatientPhysicalProblemList';
import PatientMedicationsList from './PatientMedicationsList';
import PatientEncounters from '../components/PatientEncounters';
import PatientOrders from '../components/PatientOrders';
import { useSelector } from 'react-redux';
import PatientNotes from '../components/PatientNotes';
import { Grid, IconButton } from '@material-ui/core';
import PatientEncountersList from './PatientEncountersList';
import PatientOrdersList from './PatientOrdersList';
import AddIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import ChartReviewInfo from './ChartReviewInfo'

const imageStyle={
    hieght:"32px",
    width:"32px"
  }


const defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: { lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 },
  };

const metricTextStyle ={
    marginLeft:"6px"
}
function ChartReview(props) {

    const themeContext = useContext(ThemeContext)
    return (
        <>
            {/* <ChartReviewInfo {...defaultProps} patient={props.patient}/> */}
            <div style={{padding:"15px",display:"flex", background:themeContext.themes === "dark" ? "#444444" : "white"}}>
                <Grid container spacing={1}>
                    {/* <Grid container item md={6} sm={6} xs={6}>
                        <Grid item xs={12}>
                            <div style={{display:"flex",flexDirection:"column",borderRadius:"9px",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                            <img style={{height:"25px",width:"25px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/256x256.png"></img>
                            <div style={{color: themeContext.themes === "dark" ? "white" : "rgb(85, 177, 250)", width:"100%", padding:"4px", fontSize:"16px"}}> Physical Health Problems</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                <IconButton style={{height:"25px",width:"25px", marginRight:"10px"}}>
                                    <AddIcon style={{height:"25px",width:"25px",color:"lightgreen"}}></AddIcon>
                                </IconButton>
                            </div>
                            </div>
                            <PatientPhysicalProblemList patient={props.patient}/>
                            </div>
                        </Grid>
                        
                    </Grid> */}
                    <Grid container item md={6} sm={12} xs={12}>
                        <Grid item xs={12}>
                            <div style={{display:"flex",marginBottom:"8px",flexDirection:"column",borderRadius:"9px",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                            <img style={{height:"25px",width:"25px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/91-919780_stimulant-drugs-clipart-png-download.png"></img>
                            <div style={{color: themeContext.themes === "dark" ? "white" : "rgb(85, 177, 250)", width:"100%", padding:"4px", fontSize:"16px"}}> Medications</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                <IconButton style={{height:"25px",width:"25px", marginRight:"4px"}}>
                                    <AddIcon style={{height:"25px",width:"25px",color:"lightgreen"}}></AddIcon>
                                </IconButton>
                            </div>
                            </div>
                            <PatientMedicationsList patient={props.patient}/>
                            </div>
                            <div style={{display:"flex",marginBottom:"8px",flexDirection:"column",borderRadius:"9px",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                            <img style={{height:"25px",width:"25px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/256x256.png"></img>
                            <div style={{color: themeContext.themes === "dark" ? "white" : "rgb(85, 177, 250)", width:"100%", padding:"4px", fontSize:"16px"}}> Physical Health Problems</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                <IconButton style={{height:"25px",width:"25px", marginRight:"4px"}}>
                                    <AddIcon style={{height:"25px",width:"25px",color:"lightgreen"}}></AddIcon>
                                </IconButton>
                            </div>
                            </div>
                            <PatientPhysicalProblemList patient={props.patient}/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",borderRadius:"9px",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                            <img style={{height:"25px",width:"25px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/64x64.png"></img>
                            <div style={{color: themeContext.themes === "dark" ? "white" : "rgb(85, 177, 250)", width:"100%", padding:"4px", fontSize:"16px"}}> Orders</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                <IconButton style={{height:"25px",width:"25px", marginRight:"4px"}}>
                                    <AddIcon style={{height:"25px",width:"25px",color:"lightgreen"}}></AddIcon>
                                </IconButton>
                            </div>
                            </div>
                            <PatientOrdersList patient={props.patient}/>
                            </div>
                        </Grid>  
                    </Grid>
                    <Grid container item md={6} sm={12} xs={12}>
                        <Grid item xs={12}>
                            <div style={{display:"flex",flexDirection:"column",marginBottom:"8px",borderRadius:"9px",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                            <img style={{height:"25px",width:"25px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/hiclipart.com.png"></img>
                            <div style={{color: themeContext.themes === "dark" ? "white" : "rgb(85, 177, 250)", width:"100%", padding:"4px", fontSize:"16px"}}> Mental Health Problems</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                <IconButton style={{height:"25px",width:"25px", marginRight:"4px"}}>
                                    <AddIcon style={{height:"25px",width:"25px",color:"lightgreen"}}></AddIcon>
                                </IconButton>
                            </div>
                            </div>
                            <PatientMentalProblemList patient={props.patient}/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",borderRadius:"9px",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white", width:"100%"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                            <img style={{height:"25px",width:"25px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/128x128.png"></img>
                            <div style={{color: themeContext.themes === "dark" ? "white" : "rgb(85, 177, 250)", width:"100%", padding:"4px", fontSize:"16px"}}> Encounters</div>
                            </div>
                            <PatientEncountersList patient={props.patient}/>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
export default ChartReview;