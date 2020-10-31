import React, { useEffect, useState, useContext} from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Grid, Container, Card, InputBase, TextField } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'

function getModalStyle() {
    const top = 15
    const left = 40
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }  


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

function PatientNotes(props) { 
    const useStyles = makeStyles((theme) => ({
        paper: () => {
          return {
            position: 'absolute',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: 380,
            backgroundColor: "rgba(0, 121, 191, 0)",
            outline: 'none',
            height: '150px',
          }
        },
        teamModal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        teamPaper: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
        blue: {
          height: "15px",
          width: "15px",
          backgroundColor: "rgb(0, 121, 191)",
          marginBottom: "4px",
          '&:hover': {
            cursor: 'pointer',
          }
        },
    
        green: {
          height: "15px",
          width: "15px",
          backgroundColor: "rgb(75, 191, 107)",
          marginBottom: "4px",
          '&:hover': {
            cursor: 'pointer',
          }
        },
    
        red: {
          height: "15px",
          width: "15px",
          backgroundColor: "rgb(176, 70, 50)",
          marginBottom: "4px",
          '&:hover': {
            cursor: 'pointer',
          }
        },
    
        orange: {
          height: "15px",
          width: "15px",
          backgroundColor: "rgb(210, 144, 52)",
          marginBottom: "4px",
          '&:hover': {
            cursor: 'pointer',
          }
        },
    
        tan: {
          height: "15px",
          width: "15px",
          backgroundColor: "tan",
          marginBottom: "4px",
          '&:hover': {
            cursor: 'pointer',
          }
        },
    
        purple: {
          height: "15px",
          width: "15px",
          backgroundColor: "rgb(137, 96, 158)",
          marginBottom: "4px",
          '&:hover': {
            cursor: 'pointer',
          }
        },
    
        black: {
          height: "15px",
          width: "15px",
          backgroundColor: "black",
          marginBottom: "4px",
          '&:hover': {
            cursor: 'pointer',
          }
        },
    
        pink: {
          height: "15px",
          width: "15px",
          backgroundColor: "rgb(205, 90, 145)",
          marginBottom: "4px",
          '&:hover': {
            cursor: 'pointer',
          }
        },
    
        grey: {
          height: "15px",
          width: "15px",
          backgroundColor: "rgb(131, 140, 145)",
          marginBottom: "4px",
          '&:hover': {
            cursor: 'pointer',
          }
        },
    
        root: {
          display: "flex",
          justifyContent: 'center',
          padding: theme.spacing(4),
        },
    
        h3: {
          color: "#172b4d",
          margin: "0",
        },
    
        p: {
          textAlign: 'center',
        },
    
        ul: {
          listStyle: 'none',
          marginRight: "20px",
        },
    
        buttons: {
          fontSize: ".9em",
        },
    
        Createboard: {
          display: "flex",
          height: "80px",
          borderRadius: "3px",
          backgroundColor: "rgba(9,30,66,.04)",
          alignItems: "center",
          justifyContent: "center",
          '&:hover': {
            backgroundColor: 'rgba(9, 30, 66, .2)',
            cursor: 'pointer'
          }
        },
    
        title: {
          display: "flex",
          height: "0",
          marginTop: '20px',
          marginBottom: '20px',
        },
    
        board: {
          display: "flex",
          height: "80px",
          borderRadius: "3px",
          backgroundColor: "rgb(0, 121, 191)",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
          color: 'white',
          fontWeight: '700',
          '&:hover': {
            backgroundColor: 'rgb(0, 71, 141)',
            cursor: 'pointer'
          }
        },
    
        boardsContainer: {
          display: 'flex',
          flexDirection: 'column'
        },
    
        modalForm: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '120px',
        },
    
        modalInput: {
          borderRadius: '5px',
          borderBottom: 'none',
          '&:hover': {
            backgroundColor: 'rgba(150, 150, 150, .4)'
          },
          fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
          color: 'white',
          fontWeight: '700',
          paddingLeft: '5px'
        },
    
        modalInputFocused: {
          backgroundColor: 'rgba(255, 255, 255, .45)',
          border: 'none',
          fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
          color: 'white',
          fontWeight: '700',
          paddingLeft: '5px'
        },
    
        inputContainer: {
          borderRadius: '3px',
          height: '80px',
          width: '240px',
          padding: '10px',
    
        },
    
        formButton: () => {
          return {
            borderRadius: '3px',
            width: 'fit-content',
            border: 'none',
            backgroundColor: title ? 'green' : 'lightgrey',
            color: title ? 'white' : 'grey',
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
            padding: '6px'
          }
        },
    
        templates: {
          paddingTop: '3px'
        }
    
      }));
    console.log(props)
    const user = useSelector(state => state.auth.user);
    const [title, setTitle] = useState("");
    const [dynamicColor, setDynamicColor] = useState("rgb(0, 121, 191)");
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const userId = user.id;
    const context = useContext(HomeContext)
    const dispatch = useDispatch()
    const openTabs = useSelector(state=>state.activities.open_tabs)
    const classes = useStyles();
  const [creatingNewTeam,setCreatingNewTeam] = useState(false)
  const [createTeam,setCreateTeam] = useState(false)
  const [newTeamName,setNewTeamName] =useState("")
  const [newTeam,setNewTeam] =useState({})
  const [newTeamDescription,setNewTeamDescription] =useState("")
  const [teamOpen,setTeamOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDynamicColor("rgb(0, 121, 191)")
  };

  const handleSubmit = async () => {
    console.log(title, userId, dynamicColor)
    debugger
    // dispatch(createBoard(title, userId, dynamicColor))
    setTitle("");
    handleClose()
  };

  const handleBoard = (e) => {
    setTitle(e.target.value)
  }

  const boards = useSelector(state => state.currentPatient.encounters);

  if (boards === undefined) {
    return null;
  }

  return (
    <>
    <Container maxWidth='lg' className={classes.root}>
      <Grid container>
        <Grid item xs={21}>
          <Grid container className={classes.boardsContainer}>
            <Grid item xs={21}>
              <Grid container maxWidth='lg' spacing={2}>
                {Object.values(boards).map(object => {
                  return (
                    <Grid key={object.id} item lg={3}>
                      <NavLink style={{ textDecoration: "none" }} to={`boards/${object.id}`}>
                        <Card className={classes.board} style={{color:"black", backgroundColor: object.color ? object.color : "white",padding:"5px" }}>
                          <p>{object.start}</p>
                        </Card>
                      </NavLink>
                    </Grid>
                  )
                })}
                <Grid item xs={3}>
                  <Card onClick={handleOpen} className={classes.Createboard}>
                    Create Board
                    </Card>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <Grid style={modalStyle} className={classes.paper}>
                      <Grid item xs={8}>
                        <form className={classes.modalForm}>
                          <div style={{ backgroundColor: dynamicColor }} className={classes.inputContainer}>
                            <InputBase autoFocus className={classes.modalInput} classes={{ focused: classes.modalInputFocused }} placeholder="Add Board Title" name="title" value={title} onChange={handleBoard} />
                          </div>
                          <button className={classes.formButton} onClick={handleSubmit}>Create Board</button>
                        </form>
                      </Grid>
                      <Grid container item xs={2} className={classes.templates}>
                        <Grid item xs={4}>
                          <Card className={classes.blue} onClick={() => setDynamicColor("rgb(0, 121, 191)")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.green} onClick={() => setDynamicColor("rgb(75, 191, 107)")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.red} onClick={() => setDynamicColor("rgb(176, 70, 50)")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.orange} onClick={() => setDynamicColor("rgb(210, 144, 52)")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.tan} onClick={() => setDynamicColor("tan")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.purple} onClick={() => setDynamicColor("rgb(137, 96, 158)")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.black} onClick={() => setDynamicColor("black")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.pink} onClick={() => setDynamicColor("rgb(205, 90, 145)")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.grey} onClick={() => setDynamicColor("rgb(131, 140, 145)")} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Modal>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    </>
    )
}

export default PatientNotes;