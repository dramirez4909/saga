import React from 'react'
import Radium from 'radium'
import ReactDOM from 'react-dom'

const buttonStyle = {
    fontFamily:"Google Sans,Roboto,Arial,sans-serif",
    display:"flex",
    flexDirection:"row",
    boxShadow:"rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",
    alignItems:"center",
    paddingLeft:"4px",
    paddingRight:"4px",
    borderRadius:"4px",
    transition:".2s",
    color:"black",
    backgroundColor:"transparent",
    cursor:"pointer",
    // boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    // backgroundImage:"linear-gradient(to bottom, #ff6e7f 0%, white 100%)",
    ':hover':{
        backgroundColor:"rgba(250,250,250)",
        // transform:"scale(1.02)",
        // boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}


const DashButton = (props) => {
    return (
        <div style={buttonStyle}>
            <div style={{color:"grey",margin:"4px"}} >
                {props.icon}
            </div>
            <span style={{color:"grey",fontSize:"14px",fontWeight:"lighter"}}>{props.title}</span>
        </div>
    )
}

const ChartReviewActivityButton = Radium(DashButton);

export default ChartReviewActivityButton