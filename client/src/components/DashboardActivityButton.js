import React from 'react'
import Radium from 'radium'

const buttonStyle = {
    fontFamily:"Google Sans,Roboto,Arial,sans-serif",
    fontWeight:"400",
    fontSize:"22px",
    display:"block",
    width:"100%",
    borderRadius:"8px",
    height:"100px",
    cursor:"pointer",
    color:"cornflowerblue",
    padding:"20px 16px 24px",
    transition:".2s",
    boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    // backgroundImage:"linear-gradient(to bottom, #ff6e7f 0%, white 100%)",
    ':hover':{
        // backgroundColor:"rgba(0,0,0,.03)",
        transform:"scale(1.05)",
        boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}


const DashButton = (props) => {
    return (
        <div style={buttonStyle}>
            {props.title}
        </div>
    )
}

const DashboardActivityButton = Radium(DashButton);

export default DashboardActivityButton