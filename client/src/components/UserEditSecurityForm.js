import React, { useState, useRef, useContext, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import { AppBar, Toolbar, Box, IconButton, Avatar, Fade,Typography, Button, CircularProgress, Divider, InputAdornment } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { logout } from '../store/auth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircle';
import {openTab} from '../store/activities'
import HomeContext from '../components/utils/HomeContext'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';
import ScheduleSelector from './ScheduleSelector';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import ListItemText from '@material-ui/core/ListItemText';
import {Breakpoint} from 'react-socks'
import PatientSearchResults from '../components/PatientSearchResults';
import { fade} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PatientSearchContext from './utils/PatientSearchContext'
import ThemeContext from './utils/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecord } from '../store/current_record';
import UserEditFormField from './UserEditFormField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    mobileInputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '5ch',
        '&:focus': {
          width: '10ch',
        },
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '40ch',
        '&:focus': {
          width: '50ch',
        },
      },
    },
    appbar: {
      backgroundColor: "rgb(255, 107, 107)",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0px",
      height: "15px"
    },
    left: {
      display: 'flex',
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    logo: {
      color: "white",
      textDecoration: "none",
      fontSize: "18px",
      margin: "2px",
    },
    icon: {
      fontSize: "28px",
      color: "rgba(255,255,255,.5)",
      opacity: "white",
    },
    button: {
      color: "white",
      backgroundColor: "hsla(0,0%,100%,.3)",
      borderRadius: "5px",
      padding: "5px",
      margin: "2px",
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      boxShadow: theme.shadows[2],
      padding: theme.spacing(2, 4, 3),},
    
    input: {
        display: 'none',
      },
    cardHeader: {
    padding: theme.spacing(1, 2),
    fontSize:"24px",
    fontWeight:"400"
    },
    list: {
    width: "100%",
    minWidth:"240px",
    backgroundColor: theme.palette.background.paper,
    overflow:"scroll",
    maxHeight:"380px",
    },
    button: {
    margin: theme.spacing(0.5, 0),
    },
  
  }));

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a, b) {
    return [...a, ...not(b, a)];
  }
  

  const ColorButton = withStyles((theme) => ({
    root: {
        color:"dodgerblue",
        paddingRight: "10px",
        paddingLeft: "10px",
        outline: "none",
        margin:"10px",
        marginTop:"15px",
        border:"1px solid dodgerblue",
        textDecoration:"none",
        margin: "4px",
        backgroundColor:"transparent",
        '&:hover': {
            backgroundColor: "dodgerblue !important",
            color:"white"
        },
    },
  }))(Button);

const UserEditSecurityForm = (props) => {
    const classes = useStyles();

    const [user,setUser]=useState(props.user)
    const [firstName,setFirstName]=useState(props.user.first_name)
    const [lastName,setLastName]=useState(props.user.last_name)
    const [username,setUsername]=useState(props.user.username)
    const [anchorEl, setAnchorEl] = useState(null);
    const [roleSecurity,setRoleSecurity]=useState({})
    const [allPoints,setAllPoints] = useState({})
    const [loadingPicture,setLoadingPicture] = useState(false)
    const themeContext = useContext(ThemeContext)
    const [loading,setLoading]=useState(true)
    const currentRecord = useSelector(state=>state.currentRecord)
    const dispatch = useDispatch()
    const [email,setEmail] =useState(props.user.email)
    const [points, setPoints]=useState({})
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([0, 1, 2, 3]);
    const [right, setRight] = useState([4, 5, 6, 7]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items));
        } else {
        setChecked(union(checked, items));
        }
    };

    useEffect(()=>{
        const getRoles = async () => {
            const response = await fetch('/api/security_points/all')
            const data = await response.json()
            const pointsFromDb = {}
            Object.values(data.security_points).forEach(point=>{
                pointsFromDb[point.name] = point
            })
            setAllPoints(pointsFromDb)
            console.log(data)
            setRight(Object.values(props.user.security_points).map(point=>{
                return point.name
            }))
            const pointsFromRoles = {}
            Object.values(props.user.roles).forEach(role=>{
              Object.values(role.security_points).forEach(point=>{
                if (!pointsFromRoles[point.name]) {
                  pointsFromRoles[point.name] = role
                }
              })
            })
            setRoleSecurity(pointsFromRoles)
            const userHaspoint = (point) => (
                Object.values(props.user.security_points).some(userpoint=>{
                    return userpoint.name === point.name
                })
            )
            const nonUserPoints = []
            const findNonUserpoints = Object.values(data.security_points).forEach((point)=>{
                if (!userHaspoint(point)) {
                    nonUserPoints.push(point.name)
                }
            })
            setLeft(nonUserPoints)
            console.log(nonUserPoints)
            setLoading(false)
        }
        getRoles()
    },[dispatch])

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title, items) => (
        <Card style={{width:"100%",borderRadius:"8px", minWidth:"350px",paddingTop:"12px",paddingRight:"10px",paddingLeft:"10px",paddingBottom:"10px"}}>
            <div style={{display:"flex",flexDirection:"column"}}>
                <div style={{fontSize:"24px",fontWeight:"400"}}>{title}</div>
            </div>
            <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <Checkbox
                onClick={handleToggleAll(items)}
                checked={numberOfChecked(items) === items.length && items.length !== 0}
                indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                disabled={items.length === 0}
                inputProps={{ 'aria-label': 'all items selected' }}
            />
                <div onClick={handleToggleAll(items)} style={{display:"flex",fontSize:"16px",cursor:"pointer",color:"dimgray"}}>
                    Select All
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",color:"#777777"}}>
                <div>{`${numberOfChecked(items)}/${items.length} selected`}</div>
            </div>
            </div>
        <Divider />
        <List className={classes.list} dense component="div" role="list">
            {items.map((value) => {
            console.log(roleSecurity)
            const role = roleSecurity[`${value}`]
            console.log(role)
            const labelId = `transfer-list-all-item-${value}-label`;
            return (
                  <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                <ListItemIcon>
                    <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <div style={{display:"flex",flexDirection:"column"}}>
                <div style={{fontSize:"18px",color:"#777777",textTransform:"capitalize"}} id={labelId} >{`${value}`}</div>
                    <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",maxWidth:"290px"}}>
                        { role ? 
                                <div>
                                    <Chip size="medium" style={{margin:"1px",color:"dimgray",textTransform:"capitalize",cursor:"pointer"}} icon={<CheckCircleOutlineIcon style={{color:"yellowgreen"}}/>} label={`via ${role.name}`} variant="outlined" />
                                </div>
                                : 
                                ""
                            }
                    </div>
                </div>
                </ListItem>           
            );
            })}
            <ListItem />
        </List>
        </Card>
    );

    //   useEffect(()=>{
    //     if (props.user.id === currentRecord.id) {
    //       setUser(currentRecord)
    //       setLoading(false)
    //     }
    //   },[currentRecord,props.user])

    //   if (loading) {
    //     return (
    //       <CircularProgress/>
    //     )
    //   }

      const saveChanges = (e) => {
          e.preventDefault()
          const roles = []
          right.forEach(roleName=>{
            const role = allPoints[`${roleName}`]
            roles.push(role)
          })
          dispatch(updateRecord({type:"user",first_name:firstName,last_name:lastName,email,username,id:user.id,security_points:roles}))
      }
    
    return (
      <Fade in={loading === false}>
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",maxWidth:"800px",border:"1px solid #dadce0",marginTop:"25px",borderRadius:"8px"}}>
        {/* <div style={{display:"flex",flexDirection:"row",marginBottom:"10px",alignItems:"center",justifyContent:"space-between",width:"100%",paddingLeft:"24px"}}>
            <Chip size="medium" style={{margin:"1px",color:"dimgray"}} icon={<CheckCircleOutlineIcon style={{color:"yellowgreen"}}/>} label={`Security Points already granted to the User through a User Role`} variant="outlined" />
            <ColorButton onClick={(e)=>saveChanges(e)}>Accept Changes <CheckCircleOutlineIcon style={{marginLeft:"8px"}}></CheckCircleOutlineIcon></ColorButton>
        </div> */}
        <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between",paddingLeft:"16px",paddingRight:"16px",alignItems:"center"}}>
          <h3>User Security</h3>
        <div style={{display:"flex",flexDirection:"row",marginBottom:"10px"}}>
            <ColorButton onClick={(e)=>saveChanges(e)}>Accept Changes <CheckCircleOutlineIcon style={{marginLeft:"8px"}}></CheckCircleOutlineIcon></ColorButton>
        </div>
        </div>
        <Divider style={{width:"100%"}} />
        <div style={{outline:"none",width:"max-content",borderRadius:"8px",display:"flex",flexDirection:"column",paddingLeft:"0px",paddingRight:"0px"}}>
        {loading ? <CircularProgress/> : 
        <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item style={{alignSelf:"baseline"}}>{customList('Security Points', left)}</Grid>
            <Grid item style={{display:"flex",flexDirection:"column",justifyContent:"center",height:"calc(100% - 16px",borderLeft:"1px solid #dadce0",borderRight:"1px solid #dadce0"}}>
                <Grid container direction="column" alignItems="center">
                <Button
                    variant="outlined"
                    size="large"
                    className={classes.button}
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                >
                    &gt;
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    className={classes.button}
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                >
                    &lt;
                </Button>
                </Grid>
            </Grid>
            <Grid item style={{alignSelf:"baseline"}}>{customList('User Level Security Points', right)}</Grid>
            </Grid>}
        </div>
        </div>
        </Fade>
    )
}

export default UserEditSecurityForm