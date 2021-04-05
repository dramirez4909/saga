import React from 'react'
import { NavLink } from 'react-router-dom';

const SplashPage = () => {
    return (
        <div style={{display: "block",
            margin: 0,
            minHeight: "100vh",
            height:"100vh",
            overflowX: "visible",
            overflowY: "scroll",
            }}>
            <div style={{
                flexGrow:1,position:"fixed",display:"block",left:0,right:0,top:0,zIndex:999,minHeight:"44px",  boxShadow: "rgb(0 0 0 / 10%) 0px 1px 3px 0px, rgb(0 0 0 / 6%) 0px 1px 2px 0px",
                backgroundColor:"#80bf42"
            }}></div>
            <div style={{position:"relative",display:"flex",marginTop:"44px"}}>

            </div>
            <img style={{width:"900px",position:"relative"}} src="https://saga-health.s3-us-west-1.amazonaws.com/IMG-2666+(2).jpg"></img>
            <NavLink to="/login">Login</NavLink>
        </div>
    )
}

export default SplashPage;