import React from 'react'
import Radium from 'radium'

const buttonStyle = {
    fontFamily:"Google Sans,Roboto,Arial,sans-serif",
    display:"flex",
    width:"100%",
    flexDirection:"column",
    boxShadow:"rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",
    borderRadius:"4px",
    height:"100px",
    cursor:"pointer",
    color:"dimgray",
    alignItems:"center",
    maxWidth:"100px",
    transition:".2s",
    margin:"6px",
    // boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    backgroundColor:"white",
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
            <div style={{
                color:"black",
                height:"40px",
                justifyContent:"center",
                borderBottom:"1px solid rgb(232,232,232)",
                alignItems:"center",
                width:"100%",
                fontSize:"14px",
                display:"flex",
                flexDirection:"row",
                fontFamily:"Google Sans,Roboto,Arial,sans-serif",
                letterSpacing:"1px",
                background:"white",
                borderTopLeftRadius:"4px",
                borderTopRightRadius:"4px"
                }}>
                {props.icon}
                {props.title}
            </div>
            {props.title === "Coverage" ? 
            <div style={{
                width:"100%",
                justifyContent:"center",
                display:"flex",
                height:"80px",
                flexDirection:"column",
                backgroudColor:"white",
                fontWeight:"400",
                alignItems:"center",
                fontSize:"14px",
                textAlign:"center",
                color:"black"
            }}>
                    <span>{props.coverage}</span>
            </div>
            : <div style={{
                width:"100%",
                justifyContent:"center",
                display:"flex",
                height:"80px",
                flexDirection:"column",
                backgroudColor:"white",
                fontWeight:"400",
                alignItems:"center",
                fontSize:"28px",
                color:"black"
            }}>
                    {props.value}
            </div>}
        </div>
    )
}

const ChartReviewSmallActivityButton = Radium(DashButton);

export default ChartReviewSmallActivityButton