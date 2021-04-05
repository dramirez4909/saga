import { Avatar, Button, CircularProgress, Grid,IconButton,Divider } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../store/auth'
import Cookies from 'js-cookie'
import { withStyles } from '@material-ui/core/styles';
import DashboardComponent from '../components/DashboardComponent'
import ThemeContext from '../components/utils/ThemeContext';
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';
import json2mq from 'json2mq';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Breakpoint} from 'react-socks'
import { openEditor, openPatientCheckin, openPatientRegistration } from '../store/activities'
import HomeContext from '../components/utils/HomeContext'
import DashboardActivityButton from '../components/DashboardActivityButton'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { setCurrentRecord } from '../store/current_record'
import UserCard from '../components/UserCard'
import UserCardNarrow from '../components/UserCardNarrow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd } from '@fortawesome/free-solid-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import CloseIcon from '@material-ui/icons/Close';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/PersonAddRounded';

const ColorButton = withStyles((theme) => ({
    root: {
        color:"dodgerblue",
        paddingRight: "10px",
        paddingLeft: "10px",
        outline: "none",
        margin:"10px",
        marginTop:"15px",
        border:"1px solid dodgerblue",
        textDecoration:"none",
        margin: "4px",
        backgroundColor:"transparent",
        '&:hover': {
            backgroundColor: "dodgerblue !important",
            color:"white"
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
      outline:"none",
      boxShadow: theme.shadows[5],
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  }));

const UserSearchResults = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [searchTerm,setSearchTerm]=useState("")
    const [users,setUsers] = useState(props.users)
    const [creatingNewUser,setCreatingNewUser] = useState(false)
    
    const handleNewUserClick = () => {
        setCreatingNewUser(true)
    }

    useEffect(()=>{
        const csrfToken = Cookies.get("XSRF-TOKEN")
        const createNewUser = async () => {
        const newUser = {first_name:"New User"}
        const jsonRecord = JSON.stringify(newUser)
        const res = await fetch(`/api/users/create`,{
            method: "POST",
            headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
            body: jsonRecord
            })
        const data = await res.json()
        const user = data.user
        props.handleUserEditorClick(user)
        setCreatingNewUser(false)
        }
        if (creatingNewUser) {
            createNewUser()
        }
    },[creatingNewUser])

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value)
    }

    useEffect(()=>{
        const getMatchingUsers = async (searchterm) => {
            const response = await fetch(`/api/users/search-term/${searchTerm}`)
            const data = await response.json();
            console.log("results from api call: ",users)
            setUsers(data.users)
            console.log(users)
        }
        if (searchTerm.length) {
            getMatchingUsers(searchTerm)
        }
    },[searchTerm])
    
    useEffect(()=>{
        setUsers(props.users)
    },[props.users])
    return (
        <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 200,
            }}
        >
            <Fade in={props.modalLoading === false && props.open}>
            <div className={classes.paper} style={{maxWidth:"600px",width:"100%",display:"flex",flexDirection:"column",backgroundColor:"#f9f9f9",overflow:"scroll",height:"656px",borderRadius:"4px"}}>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",backgroundColor:"white",justifyContent:"space-between",paddingLeft:"16px",paddingRight:"10px",borderRadius:"8px"}}>
                <div style={{display:"flex",flexDirection:"row",maxWidth:"500px",width:"100%",alignItems:"center",justifyContent:"space-between"}}>
                <h2 style={{marginTop:"16px",color:"dimgrey"}}>
                    Users
                </h2>
                <ColorButton onClick={handleNewUserClick}>
                    <AddIcon style={{marginRight:"8px"}}/>
                    Create New User
                </ColorButton>
                </div>
                <IconButton onClick={(e)=>props.setOpen(false)} size="large" style={{alignSelf:"baseline",marginRight:"-10px"}}>
                    <CloseIcon/>
                </IconButton>
                </div>
                <div style={{display:"flex",flexDirection:"row",paddingBottom:"10px",paddingLeft:"15px",width:"100%",backgroundColor:"white"}}>
                <div style={{display:"flex",flexDirection:"row", marginRight:"10px",alignItems:"center"}}>
                    <FontAwesomeIcon icon={faUserMd} style={{width:"20px",height:"20px",color:"yellowgreen"}}/>
                    <div style={{marginLeft:"5px",fontWeight:"300",fontSize:"18px"}}>
                     Provider
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"row", marginRight:"10px",alignItems:"center"}}>
                    <FontAwesomeIcon icon={faUserCog} style={{width:"20px",height:"20px",color:"dodgerblue"}}/>
                    <div style={{marginLeft:"5px",fontWeight:"300",fontSize:"18px"}}>
                     Administrator
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"row", marginRight:"10px",alignItems:"center"}}>
                    <FontAwesomeIcon icon={faCalendarAlt} style={{width:"20px",height:"20px",color:"lightcoral"}}/>
                    <div style={{marginLeft:"5px",fontWeight:"300",fontSize:"18px"}}>
                     Scheduler
                    </div>
                </div>
                </div>
                <InputGroup size="lg" style={{paddingRight:"25px",paddingLeft:"25px",background:"white",borderBottom:"1px solid rgb(206, 212, 218)",paddingBottom:"15px"}}>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><SearchIcon></SearchIcon></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="Search users by name, email or username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={searchTerm}
                    onChange={(e)=>handleSearchInput(e)}
                    />
                </InputGroup>
                {/* {props.modalLoading ? <CircularProgress/> : */}
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",maxWidth:"600px",width:"100%",overflow:"scroll",maxHeight:"500px"}}>
                {users.map(user=>{
                    {console.log(user)}
                    return(
                    <div onClick={(e)=>props.handleUserEditorClick(user)} style={{display:"flex",flexDirection:"column",alignItems:"center",marginLeft:"14px",marginRight:"14px",width:"100%",borderBottom:"1px solid whitesmoke"}}>
                        <UserCardNarrow user={user}/>
                    </div>
                    )
                })}
                </div>
                {/* } */}
            </div>
            </Fade>
        </Modal>
    </div>
    )
}

export default UserSearchResults