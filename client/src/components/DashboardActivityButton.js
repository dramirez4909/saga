import React from 'react'
import Radium from 'radium'

const buttonStyle = {
    fontFamily:"Google Sans,Roboto,Arial,sans-serif",
    fontWeight:"400",
    fontSize:"22px",
    display:"flex",
    width:"100%",
    borderRadius:"8px",
    height:"100px",
    cursor:"pointer",
    color:"cornflowerblue",
    alignItems:"center",
    justifyContent:"space-between",
    transition:".2s",
    boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    // backgroundImage:"linear-gradient(to bottom, #ff6e7f 0%, white 100%)",
    ':hover':{
        // backgroundColor:"rgba(0,0,0,.03)",
        transform:"scale(1.02)",
        // boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}


const DashButton = (props) => {
    return (
        <div style={buttonStyle}>
            {props.title === "User Editor" 
            ? 
            <>
            <img style={{alignSelf:"center"}} 
            // src="https://www.gstatic.com/identity/boq/accountsettingsmobile/privacycheckup_scene_316x112_3343d1d69c2d68a4bd3d28babd1f9e80.png"
            src="https://www.gstatic.com/identity/boq/accountsettingsmobile/dataandpersonalization_icon_96x96_cdb6dff2e31ed6745ece4662231bfd48.png">
                
            </img>
            <div style={{marginRight:"15px"}}>{props.title}</div>
            </>
            : 
            ""
}
        </div>
    )
}

const DashboardActivityButton = Radium(DashButton);

export default DashboardActivityButton