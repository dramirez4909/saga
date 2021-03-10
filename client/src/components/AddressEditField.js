import React, {useState, useContext} from 'react'
import Radium from 'radium'
import { AppBar, Toolbar, Box, IconButton, Avatar, Typography, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd } from '@fortawesome/free-solid-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ErrorIcon from '@material-ui/icons/Error';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecord } from '../store/current_record';
import LocationContext from './utils/LocationContext'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      outline:"none",
      borderRadius:"8px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  }));

const buttonStyle = {
    fontFamily:"Google Sans,Roboto,Arial,sans-serif",
    fontWeight:"400",
    display:"flex",
    justifyContent:"center",
    width:"100%",
    flexDirection:"column",
    paddingLeft:"10px",
    paddingRight:"10px",
    marginLeft:"0px",
    marginRight:"0px",
    cursor:"pointer",
    transition:".2s",
    minWidth:"388px",
    alignItems:"center",
    backgroundColor:"white",
    // boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    // backgroundImage:"linear-gradient(to bottom, #ff6e7f 0%, white 100%)",
    ':hover':{
        // backgroundColor:"rgba(0,0,0,.03)",
        // backgroundColor:"#F1F1F1"
        // boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}

const ColorButton = withStyles((theme) => ({
    root: {
        color:"dodgerblue",
        paddingRight: "10px",
        paddingLeft: "10px",
        outline: "none",
        margin:"10px",
        fontSize:"18px",
        fontFamily:"Google Sans,Roboto,Arial,sans-serif",
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


const DashButton = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [addressLineOne,setAddressLineOne] = useState(props.department.address_line_one || "")
    const [addressLineTwo,setAddressLineTwo] = useState(props.department.address_line_two || "")
    const [addressCity,setAddressCity] = useState(props.department.address_city || "")
    const [addressState,setAddressState] = useState(props.department.address_state || "")
    const [addressZip,setAddressZip] = useState(props.department.address_zip || "")
    const context = useContext(LocationContext)

    const saveAddress = () => {
        dispatch(
            updateRecord({
              type:"department",
              name:props.department.name,
              specialty:props.department.specialty,
              id:props.department.id,
            //   context.setAddressLineOne(addressLineOne),
            //   context.setAddressLineTwo(addressLineTwo),
            //   context.setAddressCity(addressCity),
            //   context.setAddressState(addressState),
            //   context.setAddressZip(addressZip),
              timeOpen:props.department.timeOpen,
              timeClosed:props.department.timeClosed}))
              context.saveChanges();
        props.setEditAddressDisplay(false)
    }
    return (
        <div style={buttonStyle}>
                <div style={{
                  display:"flex",
                  flexDirection:"column",
                  width:"100%",
                  alignItems:"center",
                  justifyContent:"space-around",
                  paddingTop:"10px",
                  paddingBottom:"10px",
                  }}>
                    <div style={{
                      display:"flex",
                      flexDirection:"row",
                      alignItems:"center",
                      justifyContent:"space-around",
                      width:"100%"
                      }}>
                        <div style={{minWidth:"80px"}}>Line 1:</div>
                        {/* <input value={context.addressLineOne} onChange={(e)=>context.setAddressLineOne(e.target.value)}/> */}
                        <InputGroup size="md" style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"yellowgreen"}}>
                          <FormControl
                          placeholder={`\"4909 23rd St.\", \"Apartment 1\"`}
                          aria-label="line one"
                          aria-describedby="basic-addon1"
                          value={context.addressLineOne}
                          onChange={(e)=>context.setAddressLineOne(e.target.value)}
                          />
                        </InputGroup>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around",width:"100%"}}>
                        <div style={{minWidth:"80px"}}>Line 2:</div>
                        <InputGroup size="md" style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"yellowgreen"}}>
                          <FormControl
                          placeholder={`\"4909 23rd St.\", \"Apartment 1\"`}
                          aria-label="line two"
                          aria-describedby="basic-addon1"
                          value={context.addressLineTwo}
                          onChange={(e)=>context.setAddressLineTwo(e.target.value)}
                          />
                        </InputGroup>
                        {/* <input value={context.addressLineTwo} onChange={(e)=>context.setAddressLineTwo(e.target.value)}/> */}
                    </div>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around",width:"100%"}}>
                        <div style={{minWidth:"80px"}}>City:</div>
                        {/* <input value={context.addressCity} onChange={(e)=>context.setAddressCity(e.target.value)}/> */}
                        <InputGroup size="md" style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"yellowgreen"}}>
                          <FormControl
                          placeholder={`\"Austin\", \"Austin, TX\"`}
                          aria-label="city"
                          aria-describedby="basic-addon1"
                          value={context.addressCity}
                          onChange={(e)=>context.setAddressCity(e.target.value)}
                          />
                        </InputGroup>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around",width:"100%"}}>
                        <div style={{minWidth:"80px"}}>State:</div>
                        {/* <input value={context.addressState} onChange={(e)=>context.setAddressState(e.target.value)}/> */}
                        <InputGroup size="md" style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"yellowgreen"}}>
                          <FormControl
                          placeholder={`\"Texas\", \"TX\", "`}
                          aria-label="city"
                          aria-describedby="basic-addon1"
                          value={context.addressState}
                          onChange={(e)=>context.setAddressState(e.target.value)}
                          />
                        </InputGroup>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around",width:"100%"}}>
                        <div style={{minWidth:"80px"}}>Zip:</div>
                        {/* <input value={context.addressZip} onChange={(e)=>context.setAddressZip(e.target.value)}/> */}
                        <InputGroup size="md" style={{margin:"5px",fontFamily:"Roboto,Arial,sans-serif",fontSize:"18px",color:"yellowgreen"}}>
                          <FormControl
                          placeholder={`\"77539\"`}
                          aria-label="city"
                          aria-describedby="basic-addon1"
                          value={context.addressZip}
                          onChange={(e)=>context.setAddressZip(e.target.value)}
                          />
                        </InputGroup>
                    </div>
                </div>
        </div>
    )
}

const AddressEditField = Radium(DashButton);

export default AddressEditField