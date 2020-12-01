import React, { useContext, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import {openDepartmentSchedule} from '../store/activities'

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const iconStyle = {
    height: "30px",
    width: "30px",
  }

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: "grey",
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        paddingTop:"2px",
        paddingBottom:"2px",
        margin: "4px",
        outline:"none",
        textDecoration:"none",
        backgroundColor:"grey",
        '&:hover': {
            backgroundColor: "#b1f3b1 !important",
        },
    },
    }))(Button);

const ScheduleSelector = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [departments,setDepartments] = useState([])
    const [loading,setLoading] = useState(true)
    const openTabs = useSelector(state=>state.activities.open_tabs)

    const dispatch = useDispatch()
    const homeContext = useContext(HomeContext)

    const openSchedule=(department)=>{
        setAnchorEl(null);
        if (!openTabs.some(activity=>activity.name === `${department.name}`)) dispatch(openDepartmentSchedule(department))
        homeContext.setSelectedTab(`${department.name}`)
      }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(()=>{
        const getDepartmentNames = async () => {
            const response = await fetch('/api/departments/list')
            const data = await response.json()
            setDepartments(data.departments)
            setLoading(false)
        }
        getDepartmentNames()
    },[])

    return (
        <>
            <div>
                <ColorButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                 <span style={{textTransform:"none",marginRight:"3px"}}>Dept. Schedules </span><img src="https://saga-health.s3-us-west-1.amazonaws.com/calendar-flat-2.svg" style={{...iconStyle }}></img>
                </ColorButton>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {departments.map((department)=>{ 
                      return (
                      <StyledMenuItem onClick={(e)=>openSchedule(department)}>
                        <ListItemText primary={department.name} />
                    </StyledMenuItem>
                )})}
                </StyledMenu>
            </div>
        </>
    )
}

export default ScheduleSelector