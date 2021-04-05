import { Avatar } from '@material-ui/core'
import React from 'react'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
const DashboardUserHeader = (props) => {
    return (
        <div style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"center",
            fontFamily:'"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
            marginBottom:"30px"
        }}>
            <Avatar style={{height:"72px",width:"72px",border:"2px solid rgb(0, 120, 212)"}} src={props.user.picture}/>
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"flex-start",
                marginLeft:"15px",
                paddingTop:"11px"
            }}>
                <span style={{
                    fontSize:"24px",
                    fontWeight:"600",
                }}>
                    {props.user.first_name + " " + props.user.last_name}
                </span>
                <span style={{
                    fontSize:"12px",
                    color:"rgb(96, 94, 92)"
                }}>@{props.user.username}</span>
            </div>
            {/* <div style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center"
            }}>
                <div style={{
                    backgroundColor:"rgb(207, 229, 246)",
                    color:"rgb(0, 120, 212)",
                    borderRadius:"50%",
                    height:"32px",
                    width:"32px",
                    display:"flex"
                    }}>
                    <EmailRoundedIcon style={{
                        margin:"auto"
                    }}
                    ></EmailRoundedIcon>
                </div>
                <span>{props.user.email}</span>
            </div> */}
        </div>
    )
}

export default DashboardUserHeader;