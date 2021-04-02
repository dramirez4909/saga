import React from 'react'
import Radium from 'radium'
import ReactDOM from 'react-dom'
import { Button } from '@material-ui/core'
import NewItemModal from './NewItemModal'

const buttonStyle = {
    fontFamily:"Google Sans,Roboto,Arial,sans-serif",
    display:"flex",
    flexDirection:"row",
    // boxShadow:"rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",
    alignItems:"center",
    margin:"5px",
    maxWidth:"400px",
    paddingLeft:"4px",
    paddingTop:"8px",
    height:"200px",
    paddingBottom:"8px",
    paddingRight:"4px",
    width:"100%",
    border:"1px solid #dadce0",
    borderRadius:"8px",
    color:"black",
    fontFamily:"Roboto,RobotoDraft,Helvetica,Arial,sans-serif",
    transition:"border 280ms  cubic-bezier(.4,0,.2,1) ,box-shadow 280ms cubic-bezier(.4,0,.2,1),background-color 280ms cubic-bezier(.4,0,.2,1)",
    justifyContent:"center",
    backgroundColor:"white",
    cursor:"pointer",
    // boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    // backgroundImage:"linear-gradient(to bottom, #ff6e7f 0%, white 100%)",
    ':hover':{
        // backgroundColor:"rgba(250,250,250)",
        boxShadow:"0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)"
        // transform:"scale(1.02)",
        // boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}

const iconStyle = {
    height:"46px",
    width:"46px",
    transition:"all .3s ease-in-out"
}


const DashButton = (props) => {
    let handleShow;
    let icon;
    let modalForm;
    let items = []

    if (props.title === "Medications") {
        handleShow = props.handleShowMedications;
        icon = <img style={{...iconStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/91-919780_stimulant-drugs-clipart-png-download.png"></img>
        modalForm = "NewMedicationForm"
        items = Object.values(props.patient.medications)
    } else if (props.title == "Problems List") {
        handleShow = props.handleShowPhysicalProblems
        icon = <img style={{...iconStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/256x256.png"></img>
        modalForm = "NewPhysicalProblemForm"
        items = Object.values(props.patient.problems)
        items = items.filter(el=>el.type === "physical")
    } else if (props.title == "Mental Health") {
        handleShow = props.handleShowMentalProblems
        icon = <img style={{...iconStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-brain-100+(6).png"></img>
        modalForm = "NewMentalProblemForm"
        items = Object.values(props.patient.problems)
        items = items.filter(el=>el.type === "mental")
    } else if (props.title == "Procedure Orders") {
        handleShow = props.handleShowOrders
        icon = <img style={{...iconStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/paper-rocket-flat.svg"></img>
        modalForm = "NewOrderForm"
        items = Object.values(props.patient.orders)
    } else if (props.title == "Encounters") {
        handleShow = props.handleShowEncounters
        icon = <img style={{...iconStyle}} src="https://saga-health.s3-us-west-1.amazonaws.com/icons8-calendar-100.png"></img>
        // items = Object.values(props.patient.encounters)
    }

    return (
        <div style={buttonStyle} onClick={handleShow}>
            {icon}
            <div style={{display:"flex",flexDirection:"column"}}>
            <span style={{fontSize:"18px",fontWeight:"400", marginLeft:"8px"}}>{props.title}</span>
            <div style={{padding:"8px"}}>
            {items.map(el=>{
                return (
                    <div>
                        {el.name}
                    </div>
                )
            })}
            {props.title === "Encounters" ? <></> : <NewItemModal modalForm={modalForm} patient={props.patient} />}
            </div>
            </div>
        </div>
    )
}

const ChartReviewActivityButtonLarge = Radium(DashButton);

export default ChartReviewActivityButtonLarge