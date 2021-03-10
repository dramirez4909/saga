import React, {useState, useEffect} from 'react'
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
    width:"100%",
    marginLeft:"0px",
    marginRight:"0px",
    fontSize:"20px",
    cursor:"pointer",
    justifyContent:"center",
    position:"absolute",
    maxWidth:"800px",
    transition:".2s",
    alignItems:"center",
    backgroundColor:"white",
    borderBottomLeftRadius:"8px",
    borderBottomRightRadius:"8px",
    height:"197px",
    // boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    // backgroundImage:"linear-gradient(to bottom, #ff6e7f 0%, white 100%)",
    ':hover':{
        // backgroundColor:"rgba(0,0,0,.03)",
        backgroundColor:"#F1F1F1"
        // boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}


const DashButton = (props) => {
    console.log(props)
    const classes = useStyles()
    const [loading,setLoading] = useState(true)
    const [department,setDepartment] = useState({})
    const departmentFromStore = useSelector(state=>state.currentRecord)

    useEffect(()=>{
        if (departmentFromStore) {
            setDepartment(departmentFromStore)
            console.log("Dep from store",departmentFromStore)
            setLoading(false)
        }
    },[departmentFromStore])

    return (
        <div style={buttonStyle}>
                  {loading ? "" : <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"100%",alignItems:"center",paddingTop:"10px",paddingBottom:"10px"}}>
                      {props.empty ? 
                      <div style={{display:"flex",flexDirection:"row",justifyContent:"center",minWidth:"240px",border:"1px solid tomato",borderRadius:"8px",alignItems:"center",paddingTop:"20px",paddingBottom:"20px"}}>
                      <ErrorIcon style={{color:"tomato"}}/>
                      <span style={{marginLeft:"5px"}}>Please provide an address</span>
                      </div>
                      :
                      <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            width:"388px",
                            color:"black"
                        }}
                      >
                          <span>{department.address_line_one}</span>
                          <span>{department.address_line_two}</span>
                          <span>{department.address_city + ", " + department.address_state}</span>
                          <span>{department.address_zip}</span>
                      </div>}
                  </div>}
        </div>
    )
}

const AddressDisplayField = Radium(DashButton);

export default AddressDisplayField