import React, { useContext, useEffect,useState } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Divider from '@material-ui/core/Divider';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import HomeIcon from '@material-ui/icons/Home';
import StayCurrentPortraitIcon from '@material-ui/icons/StayCurrentPortrait';
import StayPrimaryPortraitTwoToneIcon from '@material-ui/icons/StayPrimaryPortraitTwoTone';
import BusinessTwoToneIcon from '@material-ui/icons/BusinessTwoTone';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';
import ThemeContext from './utils/ThemeContext';
import Slide from '@material-ui/core/Slide';
import ListItem from '@material-ui/core/ListItem';
import ButtonBase from "@material-ui/core/ButtonBase";
import List from '@material-ui/core/List';
import PatientChartContext from './utils/PatientChartContext';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Fade, Grid, IconButton, TextareaAutosize } from '@material-ui/core';
import PatientEncountersList from './PatientEncountersList';
import PatientOrdersList from './PatientOrdersList';
import AddIcon from '@material-ui/icons/Add';
import NewMedicationForm from './NewMedicationForm';
import NewMentalProblemForm from './newMentalProblemForm';
import NewPhysicalProblemForm from './NewPhysicalProblemForm';
import NewOrderForm from './NewOrderForm';
import {updateMedication, updateProblem} from '../store/current_patient';
import EditIcon from '@material-ui/icons/Edit';
import PhysicalProblemCard from './PhysicalProblemCard';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const NewItemColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        paddingRight: "10px",
        paddingLeft: "10px",
        margin: "4px",
        outline:"none",
        width:"fit-content",
        backgroundColor:"#a9a9a9",
        '&:hover': {
            backgroundColor: "yellowgreen !important",
        },
    },
    }))(Button);

const GreenColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        paddingRight: "10px",
        paddingLeft: "10px",
        outline:"none",
        margin: "4px",
        backgroundColor:"#a9a9a9",
        '&:hover': {
            backgroundColor: "yellowgreen !important",
        }
    },
    }))(Button);


const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        paddingRight: "10px",
        paddingLeft: "10px",
        outline:"none",
        margin: "4px",
        backgroundColor:"#a9a9a9",
        border:"1px solid #a9a9a9",
        '&:hover': {
            backgroundColor: "#ed462f !important",
            color:"white",
            border:"1px solid #ed462f",
        }
    },
    }))(Button);
    const BlueColorButton = withStyles((theme) => ({
        root: {
            color: "white",
            paddingRight: "10px",
            paddingLeft: "10px",
            outline:"none",
            margin: "4px",
            width:"fit-content",
            backgroundColor:"#a9a9a9",
            '&:hover': {
                backgroundColor: "dodgerblue !important",
            },
        },
        }))(Button);


    const useStyles = makeStyles((theme) => ({
        colorSpash: {
            backgroundColor: "lightgreen",
        },
        child: {
            backgroundColor: 'blue',
            backgroundImage: `"${"url(\"../images/159960637489457530 (1).png\")"}`
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
          },
        rippleVisible: {
            opacity: 0.5,
            animation: `$enter 550ms ${theme.transitions.easing.easeInOut}`
        },
        "@keyframes enter": {
            "0%": {
                transform: "scale(0)",
                opacity: 0.2
            },
            "100%": {
                transform: "scale(1)",
                opacity: 0.5
            }
        },
        [`${"MuiTouchRipple-root"}`]: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            overflow: "hidden",
            position: "absolute",
            borderRadius: "inherit",
            pointerEvents: "none",
            color:"blue",
            display: "none"
        },
        polygon: {
            fill: theme.palette.common.white,
            stroke: theme.palette.divider,
            strokeWidth: 1,
        },
        touchRipple:{
            opacity: 1,
            color: `lightgreen`,
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            outline: "none",
            padding: theme.spacing(2, 4, 3),
            boxSizing: "auto"
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        modalPaper: {
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
          },
        patientInstructions : {
            cursor:"pointer",
            transition:"all .3s ease-in-out",
            '&:hover': {
                background:"gainsboro"
            }
        
        },
        patientInstructionsDark : {
            cursor:"pointer",
            transition:"all .3s ease-in-out",
            '&:hover': {
                background:"grey"
            }
        }
    }));

function PatientProblemList(props) { 
    const classes = useStyles()
    console.log("prs!!",props.patient)
    console.log("ptheseasdfadfddd",{...props.patient})
    
    const context = useContext(PatientChartContext)
    const themeContext = useContext(ThemeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const [patient,setPatient] = useState(props.patient)
    const [probsArray,setProbsArray] = useState([])
    const [selectedIndex, setSelectedIndex] = useState();
    const [previewCui,setPreviewCui] = useState("")
    const [selectedItemDefinitions,setSelectedItemDefinitions] = useState([])
    const [selectedMed,setSelectedMed] = useState({})
    const [selectedMedProviderId,setSelectedMedProviderId]=useState("")
    const [provider,setProvider]=useState({})
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [modalForm, setModalForm] = useState("")
    const [showInstructionEdit,setShowInstructionEdit] = useState(false)
    const [selectedMedInstructions,setSelectedMedInstructions] = useState("")

    // console.log(props.patient)
    const [loading,setLoading] = useState(true)

    const handleListItemClick = (med, index) => {
        setShowInstructionEdit(false)
        setSelectedMedProviderId(med.provider_id)
        setSelectedMed(med)
        setSelectedMedInstructions(med.note)
        setPreviewCui(med.cui)
        setSelectedIndex(index)
    };

    const handleFormModalOpen = (modalForm) => {
        setModalForm(modalForm)
        console.log(modalForm)
        setFormModalOpen(true);
    };
  
    const handleFormModalClose = () => {
        setModalForm("")
        setFormModalOpen(false);
    };

    const current_patient = useSelector(state=>state.currentPatient)

    // useEffect(()=>{
    //     if (props.patient.problems) {
    //         setPatient(props.patient)
    //         setLoading(false)
    //     }
    // },[props.patient])

    useEffect(()=>{
        if (current_patient) {
            setProbsArray(Object.values(current_patient.problems))
            console.log("MEDS ARRAAAY:",probsArray)
            setLoading(false)
        }
    },[current_patient])

    useEffect(()=>{
        const searchForCui = async (cui) => {
            if (cui=== "") return;
            const response = await fetch(`/api/umls/search-cui/${cui}`)
            const data = await response.json()
            const definitions = data.definitions.map(def=>{
                return (
                    {
                        value: def.value,
                        source: def.rootSource
                    }
                )
            })
            setSelectedItemDefinitions(definitions)
            console.log(data)
        }
        if (previewCui !== "") {
            searchForCui(previewCui)
        }
    },[previewCui])

    const handleSave =()=>{
        const newMed = {...selectedMed}
        newMed.instructions = selectedMedInstructions
        setSelectedMed(newMed)
        setSelectedMedInstructions(selectedMedInstructions)
        setShowInstructionEdit(false)
        dispatch(updateProblem({id:selectedMed.id,note:selectedMedInstructions,current:selectedMed.current}))
    }

    const handleCancel = () => {
        setSelectedMedInstructions(selectedMed.instructions)
        setShowInstructionEdit(false)
    }

    const handleDiscontinue = () => {
        const newMed = {...selectedMed}
        newMed.current = "false"
        setSelectedMed(newMed)
        dispatch(updateProblem({id:selectedMed.id,note:selectedMedInstructions,current:"false"}))
    }

    const handleRestart = () => {
        const newMed = {...selectedMed}
        newMed.current = "true"
        setSelectedMed(newMed)
        dispatch(updateProblem({id:selectedMed.id,note:selectedMedInstructions,current:"true"}))
    }


    // useEffect(()=>{
    //     const updateItem = async (item) => {
    //         const response = await fetch(`/api/providers/photo/${providerId}`,{
    //             method:"post",
                
    //         })
    //         const data = await response.json()
    //     }
    // },[updateRecord])

    useEffect(()=>{
        const searchForDoc = async (providerId) => {
            console.log("providerID:: ",providerId)
            if (providerId === "") return;
            const response = await fetch(`/api/providers/photo/${providerId}`)
            const data = await response.json()
            setProvider(data.provider)
        }
        if (selectedMedProviderId !== "") {
            searchForDoc(selectedMedProviderId)
        }
    },[selectedMedProviderId])

    if (loading) {
        return ""
    }
    const rippleClasses = { rippleVisible: classes.rippleVisible, child: classes.child, [`${"@keyframes enter"}`]: classes[`${"@keyframes enter"}`] }


    return (
        <>  

            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                <div style={{width:"100%"}}>
                    <ColorButton onClick={()=>props.hidePhysicalProblems()}> <ArrowBackIcon style={{marginRight:"4px"}}></ArrowBackIcon>{props.patient.firstName}'s chart</ColorButton>
                </div>
                    <div style={{display:"flex",flexDirection:"column",width: selectedMed.name ? "35%" : "70%",transition:"width .2s ease-in-out"}}>
                    <NewItemColorButton fullWidth={"false"} onClick={(e)=>handleFormModalOpen("NewPhysicalProblemForm")} style={{outline:"none"}}>
                        <AddIcon></AddIcon> Add A Physical Health Issue
                    </NewItemColorButton>
            <div style={{backgroundColor:"transparent",width:"100%",flexDirection:"row",flexWrap:"wrap",display:"flex"}} >
                        {probsArray.map((problem,index)=>{
                            if (problem.type === "mental") return 
                            // console.log("porblemmsssssss: ",problem)
                            return (
                                <PhysicalProblemCard problem={problem}></PhysicalProblemCard>
                            // const noted =med.created_at.split(" ")
                            // const notedDate = noted.slice(0,4).join(" ")
                            )
                        })}
                </div>
            </div>
                    {/* <img src="https://saga-health.s3-us-west-1.amazonaws.com/student-mental-health-removebg-preview.png" style={{width:"400px"}}></img> */}
            </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={formModalOpen}
        onClose={handleFormModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200
        }}
      >
        <Slide direction="up" in={formModalOpen}>
          <div className={classes.modalPaper} style={{autooverflow:"hidden",display:"flex",outline:"none",backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "dark" ? "white" : "#444444",padding:"0",overflow:"hidden"}}>
          {modalForm === "NewMedicationForm" ? <NewMedicationForm patient={props.patient}></NewMedicationForm> : <></> }
          {modalForm === "NewOrderForm" ? <NewOrderForm patient={props.patient}></NewOrderForm> : <></> }
          {modalForm === "NewMentalProblemForm" ? <NewMentalProblemForm patient={props.patient}></NewMentalProblemForm> : <></> }
          {modalForm === "NewPhysicalProblemForm" ? <NewPhysicalProblemForm patient={props.patient}></NewPhysicalProblemForm> : <></> }
          </div>
        </Slide>
      </Modal>
        </>
    )
}

export default PatientProblemList;