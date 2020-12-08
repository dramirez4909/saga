import React, { useContext, useEffect,useState } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import HomeIcon from '@material-ui/icons/Home';
import StayCurrentPortraitIcon from '@material-ui/icons/StayCurrentPortrait';
import StayPrimaryPortraitTwoToneIcon from '@material-ui/icons/StayPrimaryPortraitTwoTone';
import BusinessTwoToneIcon from '@material-ui/icons/BusinessTwoTone';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';
import ThemeContext from './utils/ThemeContext';
import ListItem from '@material-ui/core/ListItem';
import ButtonBase from "@material-ui/core/ButtonBase";
import List from '@material-ui/core/List';
import PatientChartContext from './utils/PatientChartContext';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Grid, IconButton } from '@material-ui/core';
import PatientEncountersList from './PatientEncountersList';
import PatientOrdersList from './PatientOrdersList';
import AddIcon from '@material-ui/icons/Add';


const ColorButton = withStyles((theme) => ({
    root: {
        color: "salmon",
        paddingRight: "10px",
        paddingLeft: "10px",
        margin: "4px",
        backgroundColor:"transparent",
        border:"1px solid salmon",
        '&:hover': {
            backgroundColor: "salmon !important",
            color:"white",
            border:"1px solid salmon",
        }
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
    }));

function PatientMedicationsList(props) { 
    const classes = useStyles()
    console.log("prs!!",props.patient)
    console.log("ptheseasdfadfddd",{...props.patient})
    
    const context = useContext(PatientChartContext)
    const themeContext = useContext(ThemeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const [patient,setPatient] = useState(props.patient)
    const [selectedIndex, setSelectedIndex] = React.useState();
    const [previewCui,setPreviewCui] = useState("")
    const [selectedItemDefinitions,setSelectedItemDefinitions] = useState([])
    const [selectedMed,setSelectedMed] = useState({})
    const [selectedMedProviderId,setSelectedMedProviderId]=useState("")
    const [provider,setProvider]=useState({})

    // console.log(props.patient)
    const [loading,setLoading] = useState(true)

    const handleListItemClick = (med, index) => {
        setSelectedMedProviderId(med.provider_id)
        setSelectedMed(med)
        setPreviewCui(med.cui)
        setSelectedIndex(index)
    };

    useEffect(()=>{
        if (props.patient.problems) {
            setPatient(props.patient)
            setLoading(false)
        }
    },[props.patient])

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
        return "...loading"
    }
    const rippleClasses = { rippleVisible: classes.rippleVisible, child: classes.child, [`${"@keyframes enter"}`]: classes[`${"@keyframes enter"}`] }

    return (
        <>  
            <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
            <List style={{ width: "27%",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white",borderRadius:"8px",paddingTop:"0px"}} component="nav" aria-label="main mailbox folders">
                        {patient.medications.map((med,index)=>{
                            const noted =med.created_at.split(" ")
                            const notedDate = noted.slice(0,4).join(" ")
                            return(
                                <>
                            {selectedIndex !== index && selectedIndex !== index - 1 ? <Divider style={{ width: "100%" }}/> : <Divider style={{ width:"100%" }} light />}
                            <ButtonBase
                                style={{
                                    width: "100%",
                                    outline:"none",
                                }}
                                // primary
                                TouchRippleProps={{ classes: {...rippleClasses}}}
                            >
                                <div style={{width:"100%"}} className={classes.colorSplash}>
                            <ListItem
                                key={`list-item-${index}`}
                                selected={selectedIndex === index}
                                onClick={(event) => {
                                    handleListItemClick(med, index)
                                }}
                                className={"TaskPaperListItem"}
                                style={{ paddingTop: "3px", paddingBottom: "3px", outline: "none", backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "light" ? "#444444" : "white" }}
                            >
                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                                {/* <span style={{color:themeContext.themes === "light" ? "#444444" : "lightgreen"}}>{notedDate}</span>  */}
                                <span>{med.name}</span> 
                                </div>
                                <span className={"MuiTouchRipple-root" + " " + "rainbow" + " " + "party"}></span>
                            </ListItem>
                            </div>
                            </ButtonBase>
                            </>
                            )
                        })}
                
                </List>
                {selectedMed.name && provider.first_name ? 
                <div style={{borderRadius:"4px",
                margin:"20px",
                boxShadow:"rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                overflow:"scroll",maxHeight:"450px",
                display:"flex",flexDirection:"column",maxWidth:"60%",color:themeContext.themes === "dark" ? "white" : "#444444",background:themeContext.themes === "dark" ? "#444444" : "#f9f9f9"}}>
                    <div style={{display:"flex",flexDirection:"column",width:"100%",color:themeContext.themes === "dark" ? "white" : "#444444",background:themeContext.themes === "dark" ? "#444444" : "white"}}>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:"10px"}}>
                        <h2 style={{color:"cornflowerblue"}}>{selectedMed.name}</h2>
                        <span style={{marginLeft:"20px",color:"salmon"}}>
                            CUI: {" " + selectedMed.cui}
                        </span>
                        <ColorButton>
                            discontinue
                        </ColorButton>
                    </div>
                        <Divider style={{ width: "100%" }} light={true} />
                        <div style={{display:"flex",flexDirection:"column"}}>
                            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"5px",paddingLeft:"50px",paddingRight:"50px"}}>
                                Prescribed: <span>{selectedMed.created_at}</span>
                            </div>
                            <Divider style={{ width: "100%"}} light={true} />
                            <div style={{background:themeContext.themes === "dark" ? "" : "#f9f9f9",display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"5px",paddingLeft:"50px",paddingRight:"50px",alignItems:"center"}}>

                                <div style={{color:"cornflowerblue"}}>Instructions:</div> <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><span>{!selectedMed.instructions ? "No Instructions" : selectedMed.instructions}</span>
                                <Button>Edit</Button>
                                </div>
                            </div>
                            <Divider style={{ width: "100%"}} light={true} />
                            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"5px",paddingLeft:"50px",paddingRight:"50px"}}>
                                Ordering Provider:
                                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",background:themeContext.themes === "dark" ? "transparent" : "aliceblue",borderRadius:"30px", padding:"7px",fontSize:"18px",border:themeContext.themes==="dark" ? "2px solid cornflowerblue" : ""}}>
                                    {provider.picture ? <Avatar src={`${provider.picture}`} className={classes.large}></Avatar>
                                    : <Avatar className={classes.large}>{provider.first_name[0] + " " + provider.last_name[0]}</Avatar>}
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
                            <>
                        <div style={{display:"flex",flexDirection:"space-between", alignItems:"center"}}>
                            <span style={{padding:"20px"}}>{def.source}:</span><span style={{color:themeContext.themes === "dark" ? "darkgray" : "grey"}}>{def.value}</span>
                        </div>
                        <Divider style={{ color:"cornflowerblue",width: "100%", backgroundColor:themeContext.themes === "dark" ? "white" : "#666666" }} light={true} />
                        </>
                        )
                    })}
                </div> : 
                <div style={{borderRadius:"9px",
                margin:"20px",
                boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",display:"flex",flexDirection:"column",width:"50%",height:"450px", color:themeContext.themes === "dark" ? "white" : "#444444",background:themeContext.themes === "dark" ? "#444444" : "white"}}>
                    <h3>Select a medication to preview</h3>
                </div>}
                </div>
        </>
    );
}

export default PatientMedicationsList;