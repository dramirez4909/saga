import React from 'react'
import Radium from 'radium'

const buttonStyle = {
    fontFamily:"Google Sans,Roboto,Arial,sans-serif",
    display:"flex",
    width:"100%",
    flexDirection:"column",
    boxShadow:"rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",
    borderRadius:"8px",
    height:"360px",
    cursor:"pointer",
    color:"dimgray",
    alignItems:"center",
    transition:".2s",
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
                height:"44px",
                padding:"12px 0px 12px 16px",
                justifyContent:"space-between",
                borderBottom:"1px solid rgb(232,232,232)",
                lineHeight:"16px",
                width:"100%",
                fontSize:"16px",
                fontWeight:"500",
                fontFamily:"Google Sans,Roboto,Arial,sans-serif",
                letterSpacing:"1px",
                background:"white",
                borderTopLeftRadius:"8px",
                borderTopRightRadius:"8px"
                }}>
                {props.title}
            </div>
            <div style={{
                height:"210px",
                justifyContent:"center",
                display:"flex",
                flexDirection:"column",
                backgroudColor:"white"
            }}>
            {props.title === "User Editor" 
            ? 
            <>
            <img style={{
                alignSelf:"center",
                padding:"16px 16px 0px",
                height:"auto"
            }} 
            // src="https://www.gstatic.com/identity/boq/accountsettingsmobile/privacycheckup_scene_316x112_3343d1d69c2d68a4bd3d28babd1f9e80.png"
            src="https://www.gstatic.com/identity/boq/accountsettingsmobile/dataandpersonalization_icon_96x96_cdb6dff2e31ed6745ece4662231bfd48.png">
                
            </img>
            </>
            : 
            ""
            }
            {props.title === "Department Editor" 
            ? 
            <>
            <img style={{
                alignSelf:"center",
                padding:"16px 16px 0px",
                height:"auto",
                width:"210px"
            }}             // src="https://www.gstatic.com/identity/boq/accountsettingsmobile/privacycheckup_scene_316x112_3343d1d69c2d68a4bd3d28babd1f9e80.png"
            src="https://developers.google.com/my-business/images/landing-page-leverage-2-2x.png">
            </img>
            </>
            : 
            ""
            }
            </div>
            <div style={{
                display:"flex",
                flexDirection:"column",
                padding:"16px 16px 0px",
                marginBottom:"0px",
                color:"black"
                }}>
                This is an activity in saga
            </div>
        </div>
    )
}

const ChartReviewActivityButton = Radium(DashButton);

export default ChartReviewActivityButton