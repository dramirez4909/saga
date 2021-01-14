import React from 'react'

export default function DashboardActivityButton(props){
    return (
        <div style={{display:"flex",flexDirection:"row",
        color:"white",
        width:"100%",
        opacity:".8",
        backgroundColor:props.color
        }}>
            {props.title}
        </div>
    )
}