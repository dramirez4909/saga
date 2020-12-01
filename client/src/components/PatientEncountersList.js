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
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

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

function PatientEncountersList(props) { 
    const classes = useStyles()
    console.log("prs!!",props.patient)
    console.log("ptheseasdfadfddd",{...props.patient})
    
    const themeContext = useContext(ThemeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const [patient,setPatient] = useState(props.patient)
    const [selectedIndex, setSelectedIndex] = React.useState();

    // console.log(props.patient)
    const [loading,setLoading] = useState(true)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    };

    useEffect(()=>{
        if (props.patient.problems) {
            setPatient(props.patient)
            setLoading(false)
        }
    },[props.patient])

    if (loading) {
        return "...loading"
    }
    const rippleClasses = { rippleVisible: classes.rippleVisible, child: classes.child, [`${"@keyframes enter"}`]: classes[`${"@keyframes enter"}`] }

    return (
        <>
            <div style={{display:"flex",flexDirection:"column", width: "100%",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white", maxHeight:"500px", overflow:"scroll",paddingTop:"0px"}} component="nav" aria-label="main mailbox folders">
                        {patient.encounters.map((enc,index)=>{
                            let date = enc.start.split(" ")
                            date = date.slice(0,4).join(" ")
                            const eventEnd = enc.end + "-500"
                            const eventStart = enc.start + "-500"
                            let end = new Date(eventEnd)
                            let start = new Date(eventStart)
                            let startTime = `${start.getHours()}:${start.getMinutes() === 0 ? "00" : start.getMinutes()}`
                            let endTime = `${end.getHours()}:${end.getMinutes() === 0 ? "00" : end.getMinutes()}`
                            return(
                                <>
                            {/* {selectedIndex !== index && selectedIndex !== index - 1 ? <Divider style={{ width: "100%" }}/> : <Divider style={{ width:"100%" }} light />} */}
                            <ButtonBase
                                style={{
                                    width: "100%",
                                    outline:"none",
                                }}
                                // primary
                                TouchRippleProps={{ classes: {...rippleClasses}}}
                            >
                                <div style={{width:"100%"}} className={classes.colorSplash}>
                            {/* <div
                                key={`list-item-${index}`}
                                selected={selectedIndex === index}
                                onClick={(event) => {
                                    handleListItemClick(event, index)
                                }}
                                className={"TaskPaperListItem"}
                                style={{ paddingRight: "0px",paddingLeft: "0px",paddingTop: "0px", paddingBottom: "0px", outline: "none", backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "light" ? "#444444" : "white" }}
                            > */}
                                {/* <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                                <span style={{color:"grey"}}>{startTime}</span> <span>{enc.type.name}</span> <span>{enc.provider.full_name}</span> <span>{enc.resource.name}</span> <span></span>
                                </div> */}
                                <Accordion style={{width:"100%",margin:"0px",backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "light" ? "#444444" : "white"}} square={true}>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon style={{height:"15px",width:"15px", padding:"0px",color: themeContext.themes === "dark" ? "white" : "#444444"}}/>}
                                      aria-label="Expand"
                                      aria-controls="additional-actions1-content"
                                      id="additional-actions1-header"
                                      style={{justifyContent:"space-between", minHeight:"0px", height:"30px"}}
                                    >
                                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                                        <span>{enc.type.name}</span> <span style={{color:"grey"}}>{date}</span>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails >
                                        <div style={{paddingRight:"14px",paddingLeft:"14px",paddingTop:"10px",paddingBottom:"10px",backgroundColor: themeContext.themes === "dark" ? "#222222" : "cornflowerblue",color: themeContext.themes === "dark" ? "cornflowerblue" : "white",flexDirection:"column",width:"100%"}}>
                                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><div>Encounter Provider: </div> <div>{enc.provider.full_name}</div> </div>
                                        <Divider style={{ width: "100%", backgroundColor:"pink" }} light={true} />
                                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><div>Date: </div> <div>{date}</div> </div>
                                        <Divider style={{ width: "100%", backgroundColor:"lightgreen"}} light={true} />
                                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><div>Duration: </div> <div>{startTime} - {endTime}</div> </div>
                                        <Divider style={{ width: "100%", backgroundColor:"white"}} />
                                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><div>Location: </div> <div>{enc.department.name}</div> </div>
                                        <Divider style={{ width: "100%", backgroundColor:"yellow" }} light={true}/>
                                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><div>Room: </div> <div>{enc.resource.name}</div> </div>
                                        </div>
                                    </AccordionDetails>
                            </Accordion>
                                {/* <span className={"MuiTouchRipple-root" + " " + "rainbow" + " " + "party"}></span> */}
                            </div>
                            {/* </div> */}
                            </ButtonBase>
                            </>
                            )
                        })}
                
                </div>
        </>
    );
}

export default PatientEncountersList;