import React, {useState, useEffect} from 'react';
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
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    //   display:"flex",
    //   flexDirection:"row"
    },  modal: {
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
  }));

function PatientEncounters(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const current_user = useSelector(state=>state.auth.user)
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [displayOrderForm,setDisplayOrderForm] = useState(false)
    const [newOrderType,setNewOrderType] =useState("Outpatient Appointment Request")
    const [newOrderPatientName,setNewOrderPatientName]=useState(props.patient.fullName)
    const [newOrderStatus,setNewOrderStatus]=useState("unscheduled")
    const [newOrderSignature,setNewOrderSignature]=useState("")
    const [createNewOrder,setCreateNewOrder]=useState(true)
    const dispatch = useDispatch()

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
            <div className={classes.root} style={{zIndex:-1}}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem
                        button
                        disabled
                        style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}
                    >
                        <div>Date</div>
                        <div>Duration</div>
                        <div>Type</div>
                        <div>Provider</div>
                    </ListItem>
                    {props.patient.encounters.map((encounter,index)=>{
                        const start = encounter.start.split(" ")
                        const startTime = start[4]
                        const end = encounter.end.split(" ")
                        const endTime = end[4]
                        const date = start.slice(0,4).join(" ")
                        return (
                        <ListItem
                        button
                        selected={selectedIndex === index + 1}
                        onClick={(event) => handleListItemClick(event, index + 1)}
                    >
                        <ListItemIcon>
                            <EventIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${date}`} />
                        <ListItemText style={{color:"grey"}} primary={`From ${startTime} to ${endTime}`} />
                        <ListItemText primary={`${encounter.type.name}`} />
                        <ListItemText primary={`${encounter.provider.full_name}`} />
                    </ListItem>)})}
                    <ListItem
                    button
                    selected={selectedIndex === props.patient.encounters.length + 1}
                    onClick={(event) => {
                        handleListItemClick(event, props.patient.encounters.length + 1)
                        handleOpen()
                    }}
                    style={{border:"lightgreen"}}
                    >
                        <ListItemIcon>
                            <AddBoxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`New Encounter Order`} />
                    </ListItem>
                </List>
                {/* <Slide direction="up" in={displayOrderForm} mountOnEnter unmountOnExit>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <form>
                            HELLOO!!!!!!!!!!!!!
                        </form>
                    </div>
                </Slide> */}
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