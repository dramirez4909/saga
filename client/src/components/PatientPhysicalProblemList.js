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

function PatientProblemList(props) { 
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
            <List style={{ width: "100%",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white",borderRadius:"8px", margin:"6px"}} component="nav" aria-label="main mailbox folders">
                        {patient.problems.map((prob,index)=>{
                            
                            const noted =prob.created_at.split(" ")
                            const notedDate = noted.slice(0,4).join(" ")
                            if (prob.type !== "mental"){return(
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
                                    handleListItemClick(event, index)
                                }}
                                className={"TaskPaperListItem"}
                                style={{ paddingTop: "3px", paddingBottom: "3px", outline: "none", backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",color: themeContext.themes === "light" ? "#444444" : "white" }}
                            >
                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                                    <span>{prob.name}</span> <span style={{color:"grey"}}>{notedDate}</span>
                                </div>
                                <span className={"MuiTouchRipple-root" + " " + "rainbow" + " " + "party"}></span>
                            </ListItem>
                            </div>
                            </ButtonBase>
                            </>
                            )}
                        })}
                
                </List>
        </>
    );
}

export default PatientProblemList;