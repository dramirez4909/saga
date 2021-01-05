import React, {useState, useEffect, useContext} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import EventIcon from '@material-ui/icons/Event';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Slide } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {createOrder} from '../store/orders'
import { set } from 'js-cookie';
import ThemeContext from './utils/ThemeContext';
import ButtonBase from "@material-ui/core/ButtonBase";

const useStylesLoginTextField = makeStyles((theme) => ({
    root: {
      border: '2px solid #e2e2e1',
      overflow: 'hidden',
      paddingLeft: "10px",
      paddingTop: "4px",
      paddingBottom: "4px",
      marginTop: "14px",
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&$focused': {
        border: '2px solid rgb(94, 158, 214)',
        backgroundColor: '#fff',
        // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 1px`,
      },
    },
    focused: {},
  }));

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

  function LoginTextField(props) {
    const classes = useStylesLoginTextField();
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }

const useStyles = makeStyles((theme) => ({
        colorSpash: {
            backgroundColor: "lightgreen",
        },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display:"flex",
        flexDirection:"column"
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
  }));

function PatientEncounters(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const current_user = useSelector(state=>state.auth.user)
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [displayOrderForm,setDisplayOrderForm] = useState(false)
    const [newOrderType,setNewOrderType] =useState(1)
    const [newOrderPatientName,setNewOrderPatientName]=useState(props.patient.fullName)
    const [newOrderStatus,setNewOrderStatus]=useState("Needs Scheduled")
    const [newOrderSignature,setNewOrderSignature]=useState("")
    const [createNewOrder,setCreateNewOrder]=useState(true)
    const themeContext = useContext(ThemeContext)
    const dispatch = useDispatch()

    const rippleClasses = { rippleVisible: classes.rippleVisible, child: classes.child, [`${"@keyframes enter"}`]: classes[`${"@keyframes enter"}`] }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        if (newOrderSignature) {
            setNewOrderSignature("")
            dispatch(createOrder({order_type:newOrderType,patient_id:props.patient.id,status:newOrderStatus,provider_id:current_user.id}))
        }
    },[createNewOrder])

    return (
        <>
            <div style={{zIndex:-1, width:"100%",color: themeContext.themes === "dark" ? "white" : "black", backgroundColor: themeContext.themes === "dark" ? "#666666" : "white"}}>
                <List component="nav" aria-label="main mailbox folders" style={{overflow:"scroll",height:"400px"}}>
                    {props.patient.encounters.map((encounter,index)=>{
                        const start = encounter.start.split(" ")
                        const startTime = start[4]
                        const end = encounter.end.split(" ")
                        const endTime = end[4]
                        const date = start.slice(0,4).join(" ")
                        return (
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
                        button
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}
                        style={{color: selectedIndex === index ? themeContext.themes === "dark" ? "black" : "black" : themeContext.themes === "dark" ? "white" : "black"}}
                    >
                        <ListItemIcon>
                            <EventIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${date}`} />
                        <ListItemText style={{color:"grey"}} primary={`From ${startTime} to ${endTime}`} />
                        <ListItemText primary={`${encounter.type.name}`} />
                        <ListItemText primary={`${encounter.provider.full_name}`} />
                    </ListItem>
                    </div>
                    </ButtonBase>
                    )})}
                </List>
                <ListItem
                    button
                    onClick={(event) => {
                        handleOpen()
                    }}
                    style={{border:"lightgreen"}}
                    >
                        <ListItemIcon>
                            <AddBoxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`New Encounter Order`} />
                    </ListItem>
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                          <div className={classes.paper}>
                            <form>
                                <div>Type: <LoginTextField disabled value={newOrderType}/></div>
                                <div>Patient: <LoginTextField disabled value={newOrderPatientName}/></div>
                                <div>Status: <LoginTextField disabled value={newOrderStatus}/></div>
                                <ColorButton onClick={()=>{
                                    setNewOrderSignature(true)
                                    setCreateNewOrder(!createNewOrder)
                                    handleClose()
                                }}>Request Encounter</ColorButton>
                            </form>
                          </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
        </>
    );
}
export default PatientEncounters;