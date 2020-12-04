import React, { useContext, useState } from 'react';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import BasicPatientAttributes from './BasicPatientAttributes';
import PatientPhoneNumbers from './PatientPhoneNumbers';
import PatientAddressInfo from './PatientAddressInfo';
import PatientMedications from './PatientMedications';
import ThemeContext from './utils/ThemeContext';
import PatientProblems from './PatientMentalProblems';
import PatientMentalProblemList from './PatientMentalProblemList';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import PatientPhysicalProblemList from './PatientPhysicalProblemList';
import PatientMedicationsList from './PatientMedicationsList';
import PatientEncounters from '../components/PatientEncounters';
import PatientOrders from '../components/PatientOrders';
import { useSelector } from 'react-redux';
import PatientNotes from '../components/PatientNotes';
import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton } from '@material-ui/core';
import PatientEncountersList from './PatientEncountersList';
import PatientOrdersList from './PatientOrdersList';
import AddIcon from '@material-ui/icons/Add';
import ChartReviewInfo from './ChartReviewInfo'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SelectedOrderPreviewCard from '../components/SelectedOrderPreviewCard';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import NewMedicationForm from './NewMedicationForm';
import NewMentalProblemForm from './newMentalProblemForm';
import NewPhysicalProblemForm from './NewPhysicalProblemForm';
import NewOrderForm from './NewOrderForm';
import PatientChartContext from './utils/PatientChartContext';

const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        paddingRight: "10px",
        paddingLeft: "10px",
        margin: "4px",
        backgroundColor:"grey",
        '&:hover': {
            backgroundColor: "#b1f3b1 !important",
        },
    },
    }))(Button);

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    accordion : {
        transition: "all .3s ease-in-out",
        '&hover': {
            transform:"scale(1.3)"
        }
    }
  }));
  

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
    const classes = useStyles()
    const themeContext = useContext(ThemeContext)

    const [formModalOpen, setFormModalOpen] = useState(false);
    const [modalForm, setModalForm] = useState("")

    const handleFormModalOpen = (e,modalForm) => {
        e.stopPropagation()
        setModalForm(modalForm)
        setFormModalOpen(true);
    };
  
    const handleFormModalClose = () => {
        setModalForm("")
        setFormModalOpen(false);
    };

    return (
        <>
            <PatientChartContext.Provider value={{handleFormModalClose}}>
            {/* <ChartReviewInfo {...defaultProps} patient={props.patient}/> */}
            <div style={{padding:"15px",display:"flex", background:themeContext.themes === "dark" ? "#444444" : "white"}}>
                <Grid container spacing={1}>
                    {/* <Grid container item md={6} sm={6} xs={6}>
                        <Grid item xs={12}>
                            <div style={{display:"flex",flexDirection:"column",borderRadius:"9px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                            <img style={{height:"34px",width:"34px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/256x256.png"></img>
                            <div style={{color: themeContext.themes === "dark" ? "white" : "black", width:"100%", padding:"4px", fontSize:"16px"}}> Physical Health Problems</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                <IconButton style={{height:"34px",width:"34px", marginRight:"10px"}}>
                                    <AddIcon style={{height:"24px",width:"24px",color:themeContext.themes === "dark" ? "white" : "lightgrey"}}></AddIcon>
                                </IconButton>
                            </div>
                            </div>
                            <PatientPhysicalProblemList patient={props.patient}/>
                            </div>
                        </Grid>
                        
                    </Grid> */}
                    <Grid container item lg={6} md={12} sm={12} xs={12}>
                        <Grid item xs={12} style={{overflow:"scroll",maxHeight:"70vh"}}>
                            <div style={{display:"flex",marginBottom:"8px",flexDirection:"column",borderRadius:"9px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white", width:"100%"}}>
                            <Accordion style={{width:"100%",margin:"0px",backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "light" ? "#444444" : "white",borderRadius:"4px",border:"2px solid #9ccb57"}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{color: themeContext.themes === "dark" ? "#9ccb57" : "#9ccb57"}}/>}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                                style={{justifyContent:"space-between", height:"30px"}}
                            >
                                <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                            <img style={{height:"34px",width:"34px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/91-919780_stimulant-drugs-clipart-png-download.png"></img>
                            <div style={{color: themeContext.themes === "dark" ? "white" : "black", width:"100%", padding:"4px", fontSize:"16px"}}> Medications</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                <IconButton onClick={(e)=>handleFormModalOpen(e,"NewMedicationForm")}  style={{height:"34px",width:"34px", marginRight:"4px",outline:"none"}}>
                                    <AddIcon style={{height:"24px",width:"24px",color:"#9ccb57"}}></AddIcon>
                                </IconButton>
                            </div>
                            </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <PatientMedicationsList patient={props.patient}/>
                            </AccordionDetails>
                            </Accordion>
                            </div>

                            <div style={{display:"flex",marginBottom:"8px",flexDirection:"column",borderRadius:"9px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white", width:"100%"}}>
                            <Accordion style={{width:"100%",margin:"0px",backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "light" ? "#444444" : "white",borderRadius:"4px",border:"2px solid #ed6969"}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{color: themeContext.themes === "dark" ? "#ed6969" : "#ed6969"}}/>}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                                style={{justifyContent:"space-between", height:"30px"}}
                            >
                                <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                            <img style={{height:"34px",width:"34px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/256x256.png"></img>
                            <div style={{color: themeContext.themes === "dark" ? "white" : "black", width:"100%", padding:"4px", fontSize:"16px"}}> Physical Health History</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                <IconButton onClick={(e)=>handleFormModalOpen(e,"NewPhysicalProblemForm")} style={{height:"34px",width:"34px", marginRight:"4px",outline:"none"}}>
                                    <AddIcon style={{height:"24px",width:"24px",color:"#ed6969"}}></AddIcon>
                                </IconButton>
                            </div>
                            </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <PatientPhysicalProblemList patient={props.patient}/>
                            </AccordionDetails>
                            </Accordion>
                            </div>

                            <div style={{display:"flex",marginBottom:"8px",flexDirection:"column",borderRadius:"9px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white", width:"100%"}}>
                            <Accordion style={{width:"100%",margin:"0px",backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "light" ? "#444444" : "white",borderRadius:"4px",border:"2px solid #3498DB"}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{color: themeContext.themes === "dark" ? "#3498DB" : "#3498DB"}}/>}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                                style={{justifyContent:"space-between", height:"30px"}}
                            >
                                <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center",justifyContent:"space-between"}}>
                                    <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                        <img style={{height:"34px",width:"34px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-brain-100+(4).png"></img>
                                    <div style={{color: themeContext.themes === "dark" ? "white" : "black", width:"100%", padding:"4px", fontSize:"16px"}}> Mental Health History</div>
                                </div>
                                <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                    <IconButton onClick={(e)=>handleFormModalOpen(e,"NewMentalProblemForm")} style={{height:"34px",width:"34px", marginRight:"4px",outline:"none"}}>
                                    <AddIcon style={{height:"24px",width:"24px",color:"#3498DB"}}></AddIcon>
                                </IconButton>
                                </div>
                            </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <PatientMentalProblemList patient={props.patient}/>
                            </AccordionDetails>
                            </Accordion>
                            </div>

                        </Grid>  
                    </Grid>
                    <Grid container item lg={6} md={12} sm={12} xs={12}>
                        <Grid item xs={12} style={{overflow:"scroll",maxHeight:"70vh"}}>

                        <div style={{display:"flex",marginBottom:"8px",flexDirection:"column",borderRadius:"9px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white", width:"100%"}}>
                            <Accordion style={{width:"100%",margin:"0px",backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "light" ? "#444444" : "white",borderRadius:"4px",border:"2px solid #a998f4"}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{color: themeContext.themes === "dark" ? "#a998f4" : "#a998f4"}}/>}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                                style={{justifyContent:"space-between", height:"30px"}}
                            >
                                <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                            <img style={{height:"34px",width:"34px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/paper-rocket-flat.svg"></img>
                            <div style={{color: themeContext.themes === "dark" ? "white" : "black", width:"100%", padding:"4px", fontSize:"16px"}}> Orders</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                <IconButton onClick={(e)=>handleFormModalOpen(e,"NewOrderForm")} style={{height:"34px",width:"34px", marginRight:"4px",outline:"none"}}>
                                    <AddIcon style={{height:"24px",width:"24px",color:"#a998f4"}}></AddIcon>
                                </IconButton>
                            </div>
                            </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <PatientOrdersList patient={props.patient}/>
                            </AccordionDetails>
                            </Accordion>
                            </div>

                            <div style={{display:"flex",flexDirection:"column",borderRadius:"9px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white", width:"100%"}}>
                            <Accordion style={{width:"100%",margin:"0px",backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "light" ? "#444444" : "white",borderRadius:"4px",border:"2px solid #f9dc5f"}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{color: themeContext.themes === "dark" ? "#f9dc5f" : "#f9dc5f"}}/>}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                                style={{justifyContent:"space-between", height:"30px"}}
                            >
                                <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                    <img style={{height:"34px",width:"34px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-calendar-100.png"></img>
                                    <div style={{color: themeContext.themes === "dark" ? "white" : "black", width:"100%", padding:"4px", fontSize:"16px"}}> Encounters</div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <PatientEncountersList patient={props.patient}/>
                            </AccordionDetails>
                            </Accordion>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={formModalOpen}
        onClose={handleFormModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction="up" in={formModalOpen}>
          <div className={classes.paper} style={{display:"flex",outline:"none",backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "dark" ? "white" : "#444444",padding:"0",maxWidth:"500px",width:"100%",borderRadius:"4px"}}>
        {/* <InputLabel htmlFor="demo-customized-select-native">Department</InputLabel> */}
        {/* <NativeSelect
          id="demo-customized-select-native"
          onChange={handleChange}
          input={<BootstrapInput style={{color:themeContext.themes === "dark" ? "white" : "black", backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}/>}
        > 
        <option aria-label="None" value="" />
        {
          departments.map((dept,index)=>{
            return <option value={index}>{dept.name}</option>
          })
        }
          </NativeSelect> */}
          {modalForm === "NewMedicationForm" ? <NewMedicationForm patient={props.patient}></NewMedicationForm> : <></> }
          {modalForm === "NewOrderForm" ? <NewOrderForm patient={props.patient}></NewOrderForm> : <></> }
          {modalForm === "NewMentalProblemForm" ? <NewMentalProblemForm patient={props.patient}></NewMentalProblemForm> : <></> }
          {modalForm === "NewPhysicalProblemForm" ? <NewPhysicalProblemForm patient={props.patient}></NewPhysicalProblemForm> : <></> }
          </div>
        </Slide>
      </Modal>
    </div>
            </div>
            </PatientChartContext.Provider>
        </>
    );
}
export default ChartReview;