import React, { useState, useEffect, useContext} from 'react'
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
import { Accordion, AccordionDetails, AccordionSummary, Avatar,Fade, Grid, IconButton, TextareaAutosize } from '@material-ui/core';
import PatientEncountersList from './PatientEncountersList';
import PatientOrdersList from './PatientOrdersList';
import AddIcon from '@material-ui/icons/Add';
import NewMedicationForm from './NewMedicationForm';
import NewMentalProblemForm from './newMentalProblemForm';
import NewPhysicalProblemForm from './NewPhysicalProblemForm';
import NewOrderForm from './NewOrderForm';
import {updateMedication} from '../store/current_patient';
import EditIcon from '@material-ui/icons/Edit';

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


const MedicationCard = (props) => {
    const classes = useStyles()
    console.log("prs!!",props.patient)
    console.log("ptheseasdfadfddd",{...props.patient})
    const [med,setMed] = useState(props.medication)
    const context = useContext(PatientChartContext)
    const themeContext = useContext(ThemeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const [patient,setPatient] = useState(props.patient)
    const [medsArray,setMedsArray] = useState([])
    const [selectedIndex, setSelectedIndex] = React.useState();
    const [previewCui,setPreviewCui] = useState("")
    const [selectedItemDefinitions,setSelectedItemDefinitions] = useState([])
    const [selectedMed,setSelectedMed] = useState({})
    const [selectedMedProviderId,setSelectedMedProviderId]=useState("")
    const [provider,setProvider]=useState({})
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [modalForm, setModalForm] = useState("")
    const [showInstructionEdit,setShowInstructionEdit] = useState(false)
    const [selectedMedInstructions,setSelectedMedInstructions] = useState("")

    const [loading,setLoading] = useState(true)

    const handleListItemClick = (med, index) => {
        setShowInstructionEdit(false)
        setSelectedMedProviderId(med.provider_id)
        setSelectedMed(med)
        setSelectedMedInstructions(med.instructions)
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

    useEffect(()=>{
        if (props.medication) {
            setMed(props.medication)
            setLoading(false)
        }
    },[props.medication])

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
        dispatch(updateMedication({id:med.id,instructions:selectedMedInstructions,current:selectedMed.current}))
    }

    const handleCancel = () => {
        setSelectedMedInstructions(selectedMed.instructions)
        setShowInstructionEdit(false)
    }

    const handleDiscontinue = () => {
        const newMed = {...selectedMed}
        newMed.current = "false"
        setSelectedMed(newMed)
        dispatch(updateMedication({id:med.id,instructions:selectedMedInstructions,current:"false"}))
    }

    const handleRestart = () => {
        const newMed = {...selectedMed}
        newMed.current = "true"
        setSelectedMed(newMed)
        dispatch(updateMedication({id:med.id,instructions:selectedMedInstructions,current:"true"}))
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
            setPreviewCui(med.cui)
        }
        if (med.provider_id) {
            searchForDoc(med.provider_id)
        }
    },[med])

    if (loading) {
        return ""
    }
    const rippleClasses = { rippleVisible: classes.rippleVisible, child: classes.child, [`${"@keyframes enter"}`]: classes[`${"@keyframes enter"}`] }

    return(
            <div style={{
                borderRadius:"8px",
                boxShadow:"rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px", 
                margin:"10px",
                overflow:"scroll",height:"fit-content",
                display:"flex",flexDirection:"column",
                width:"100%",
                maxWidth:"430px",
                minWidth:"430px",
                color:themeContext.themes === "dark" ? "white" : "#444444",background:themeContext.themes === "dark" ? "#444444" : "#f9f9f9"}}>
                <div style={{display:"flex",flexDirection:"column",width:"100%",color:themeContext.themes === "dark" ? "white" : "#444444",background:themeContext.themes === "dark" ? "#444444" : "white"}}>
                {med.current === "true" ? "" : <span style={{color:"white",fontSize:"24px",background:themeContext.themes === "dark" ? "#222222" : "gainsboro" ,padding:"2px", borderRadius:"4px",paddingLeft:"10px", paddingRight:"10px"}}>DISCONTINUED</span>}
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:"10px"}}>
                <h2 style={{color:"cornflowerblue"}}>{med.name}</h2>
                <span style={{marginLeft:"20px",color:"salmon"}}>
                    CUI: {" " + med.cui}
                </span>
                {med.current === "false" ? <GreenColorButton onClick={handleRestart}>Restart</GreenColorButton>: <ColorButton onClick={handleDiscontinue}>
                    discontinue
                </ColorButton>}
                </div>
                <Divider style={{ width: "100%" }} light={true} />
                <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"5px",paddingLeft:"50px",paddingRight:"50px"}}>
                        Prescribed: <span>{med.created_at}</span>
                    </div>
                    <Divider style={{ width: "100%"}} light={true} />
                    <div style={{background:themeContext.themes === "dark" ? "" : "#f9f9f9",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"5px",paddingLeft:"50px",paddingRight:"50px"}}>

                        <div style={{color:"cornflowerblue"}}>Instructions:</div> 
                        {!showInstructionEdit ? 
                        <>
                        <div style={{display:"flex",flexDirection:"column",marginLeft:"20px",marginRight:"20px"}}>
                        <div className={themeContext.themes === "dark" ? classes.patientInstructionsDark: classes.patientInstructions} onClick={(e)=>{setShowInstructionEdit(true)}} rows={4} style={{border:themeContext.themes === "dark" ? "2px solid grey" : "2px solid grey", borderRadius:"4px",width:"100%",padding:"10px"}}>{!selectedMedInstructions ? "No Instructions" : selectedMedInstructions}</div>
                        <div style={{display:"flex",marginLeft:"40px"}}><BlueColorButton onClick={(e)=>{setShowInstructionEdit(true)}}><EditIcon style={{marginRight:"4px"}}/>Edit</BlueColorButton> </div>
                        </div>
                        </>
                        : 
                        <div style={{display:"flex",flexDirection:"column",marginLeft:"20px",marginRight:"20px"}}>
                            <TextareaAutosize rows={4} style={{outline:"none",border:"2px solid cornflowerblue", borderRadius:"4px",width:"100%"}} onChange={(e)=>setSelectedMedInstructions(e.target.value)} value={!selectedMedInstructions ? "" : selectedMedInstructions}></TextareaAutosize>
                            <div style={{display:"flex",flexDirection:"row",marginLeft:"40px"}}>
                            <NewItemColorButton onClick={handleSave}> Save </NewItemColorButton>
                            <ColorButton onClick={handleCancel}>Cancel</ColorButton>
                            </div>
                        </div>}
                    </div>
                    <Divider style={{ width: "100%"}} light={true} />
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"5px",paddingLeft:"50px",paddingRight:"50px"}}>
                        Ordering Provider:
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",background:themeContext.themes === "dark" ? "transparent" : "aliceblue",borderRadius:"30px", padding:"7px",fontSize:"18px",border:themeContext.themes==="dark" ? "2px solid cornflowerblue" : ""}}>
                            {provider.picture ? <Avatar src={`${provider.picture}`} className={classes.large}></Avatar>
                            : <Avatar>
                                {provider.first_name ? provider.first_name[0] + " " + provider.last_name[0] : ""}
                                </Avatar>}
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center", marginLeft:"5px"}}>
                                <span style={{color:themeContext.themes === "dark" ? "white" : "cornflowerblue"}}>{provider.full_name}</span>
                                <span style={{color:themeContext.themes === "dark" ? "white" : "yellowgreen"}}>{provider.specialty}</span>
                            </div>
                            </div>
                    </div>
                    <Divider style={{ width: "100%"}} light={true} />
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>

                    </div>
                </div>

                </div>
                <h5 style={{padding:"10px",color:"cornflowerblue"}}>Unified Medical Language Definitions: </h5>
                {selectedItemDefinitions.map((def,index)=>{
                return (
                <div key={index} style={{width:"100%", display:"flex",flexDirection:"column"}}>
                <div style={{display:"flex",flexDirection:"space-between", alignItems:"center"}}>
                    <span style={{padding:"20px"}}>{def.source}:</span><span style={{color:themeContext.themes === "dark" ? "darkgray" : "grey"}}>{def.value}</span>
                </div>
                <Divider style={{ color:"cornflowerblue",width: "100%", backgroundColor:themeContext.themes === "dark" ? "white" : "#666666" }} light={true} />
                </div>
                )
                })}
        </div>
    )
}

export default MedicationCard