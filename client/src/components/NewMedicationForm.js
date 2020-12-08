import React, { useContext,useState, useEffect } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Grid, Container, Card, InputBase, TextField, CircularProgress, Input } from '@material-ui/core';
import ThemeContext from './utils/ThemeContext';
import FindInPageTwoToneIcon from '@material-ui/icons/FindInPageTwoTone';
import AddIcon from '@material-ui/icons/AddCircleTwoTone';
import IconButton from '@material-ui/core/IconButton';
import {createMedication} from '../store/current_patient'
import InputAdornment from '@material-ui/core/InputAdornment';
import PatientMedicationsList from './PatientMedicationsList';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import PatientChartContext from './utils/PatientChartContext';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


const useStylesLoginTextField = makeStyles((theme) => ({
    root: {
      border: '2px solid #e2e2e1',
      overflow: 'hidden',
      paddingLeft: "10px",
      paddingTop: "4px",
      paddingBottom: "4px",
      marginTop: "14px",
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&$focused': {
        border: '2px solid rgb(94, 158, 214)',
        backgroundColor: '#fff',
        // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 1px`,
      },
    },
    focused: {},
  }));

  function LoginTextField(props) {
    const classes = useStylesLoginTextField();
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }

  const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }));

  const ColorButton = withStyles((theme) => ({
    root: {
        color: "#ed4959",
        paddingRight: "10px",
        paddingLeft: "10px",
        margin: "4px",
        backgroundColor:"white",
        border:"1px solid #ed4959",
        '&:hover': {
            backgroundColor: "#ed4959 !important",
            color:"white",
            border:"1px solid #ed4959",
        },
    },
    }))(Button);

const NewMedicationForm = (props) => {
    const classes = useStyles();
    const context = useContext(HomeContext)
    const chartContext = useContext(PatientChartContext)
    const dispatch = useDispatch()
    const provider_id = useSelector(state=>state.auth.user.id)
    const [medications,setMedications] = useState([])
    const themeContext = useContext(ThemeContext)
    const [dxSearchTerm,setDxSearchTerm] = useState("")
    const [dxSearchResults,setDxSearchResults]=useState([]);
    const [dxPerformSearch,setDxPerformSearch]=useState(false)
    const [searchingForMeds,setSearchingForMeds]=useState(false)
    const [selectedMedicationIndex,setSelectedMedicationIndex]=useState()
    const [displayMedicationQuestions,setDisplayMedicationQuestions] = useState(false)
    const [newMedInstructions,setNewMedInstructions] = useState("")
    const [blueCheck,setBlueCheck] =useState(true)
    const [yellowCheck,setYellowCheck] =useState(true)
    const [greenCheck,setGreenCheck] =useState(true)
    const [greenAnchorEl, setGreenAnchorEl] = React.useState(null);
    const [displayImage,setDisplayImage] = useState(true)
    const greenOpen = Boolean(greenAnchorEl);

    const handleGreenPopoverOpen = (event) => {
        // setGreenAnchorEl(event.currentTarget);
      };
    
      const handleGreenPopoverClose = () => {
        setGreenAnchorEl(null);
      };

    const handleBlueCheck = (event) => {
        setBlueCheck(!blueCheck)
      };

    const handleYellowCheck = (event) => {
        setYellowCheck(!yellowCheck)
      };
    

    const handleGreenCheck = (event) => {
        setGreenCheck(!greenCheck)
      };

    const addMedication = (medicationName,instructions,cui) => {
        dispatch(createMedication({medicationName,instructions,patient:props.patient.id,provider_id,cui}))
    }

    useEffect(()=>{
        const searchDxs= async (searchTerm) => {
            const response = await fetch(`/api/umls/search-term/${searchTerm}`)
            // const response = await fetch(`/api/umls/search-cui`)
            const data = await response.json()
            console.log(data)
            setSearchingForMeds(false)
            setDxSearchResults(data.results)
            return;
        }
        if (dxSearchTerm.length > 0) {
            searchDxs(dxSearchTerm)
        }
    },[dxPerformSearch])


    return (
        <>
                    <div style={{display:"flex",flexDirection:"column",boxShadow: "rgba(0, 0, 0, 0.09) 0px 1px 2px 0px",width:"100%",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white"}}>
                        <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white",paddingLeft:"8px",paddingRight:"8px",paddingTop:"12px",paddingBottom:"12px",borderBottom: themeContext.themes === "dark" ? "": ""}}>
                            <div style={{backgroundColor: themeContext.themes === "dark" ? "#444444" : "white",display:"flex",flexDirection:"row",alignItems:"center",padding:"4px"}}>
                            <div style={{color:themeContext.themes === "dark" ? "white" : "black", padding:"4px", borderRadius:"4px",fontSize:"18px"}}>New Medication</div> 
                                <div style={{color:themeContext.themes === "dark" ? "white" : "cornflowerblue", fontSize:"18px",marginLeft:"5px"}}>
                                    <span style={{fontWeight:"normal"}}>for: </span>{props.patient.firstName + " " + props.patient.lastName}
                                </div>
                            </div>
                            <div>
                                    <IconButton 
                                    // onClick={chartContext.handleFormModalClose}
                                     style={{color:themeContext.themes === "dark" ? "#ed6969" : "#ed6969", outline:"none"}}>
                                        <CloseIcon></CloseIcon>
                                    </IconButton>
                                </div>
                        </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",backgroundColor:themeContext.themes === "dark" ? "#444444" : "#f9fbfb"}}>
                    <div style={{display:"flex",flexDirection:"column",padding:"4px",transition:"all .4s ease-in-out",transitionProperty:"width",width:"100%"}}>
                        {/* <div style={{borderRadius:"4px",background:"darkgrey",padding:"10px",color:"white"}}>
                            Saga works with the Unified Medical Language System (UMLS) to help providers search over every prescribable drug in existence.
                        </div> */}
                        {/* <div style={{display:"flex",flexDirection:"row",justifyContent:"center",fontSize:"18px"}}>Source Vocabularies: </div> */}
                        <div style={{borderRadius:"8px",color:themeContext.themes === "dark" ? "white" : "cornflowerblue",marginTop:"20px",fontSize:"18px",display:"flex",justifyContent:"center",textAlign:"center"}}>
                            Select the medication source vocabularies to include in your search.
                        </div>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                        <div>
                            <FormControlLabel
                              aria-owns={greenOpen ? 'mouse-over-popover' : undefined}
                              aria-haspopup="true"
                              onMouseEnter={handleGreenPopoverOpen}
                              onMouseLeave={handleGreenPopoverClose}
                              control={<GreenCheckbox checked={greenCheck} onChange={handleGreenCheck} name="checkedG" />} label="DrugBank"/>
                            <Popover
                              id="mouse-over-popover"
                              className={classes.popover}
                              classes={{
                                paper: classes.paper,
                              }}
                              open={greenOpen}
                              anchorEl={greenAnchorEl}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              onClose={handleGreenPopoverClose}
                              disableRestoreFocus
                            >
                              {/* <Typography>RxNorm now includes the United States Pharmacopeia (USP) Compendial Nomenclature from the United States Pharmacopeial Convention. USP is a cumulative data set of all Active Pharmaceutical Ingredients (API).</Typography> */}
                            </Popover>
    </div>
                        <FormControlLabel control={<GreenCheckbox checked={blueCheck} onChange={handleBlueCheck} name="checkedH" />} label="RxNorm"/>
                        <FormControlLabel control={<GreenCheckbox checked={yellowCheck} onChange={handleYellowCheck} name="checkedI" />} label="SNOMED-CT"/>
                        </div>
                    {displayMedicationQuestions ? "" : <div style={{display:"flex",flexDirection:"column",paddingLeft:"15px",paddingRight:"15px"}}>
                    <Input placeholder="e.g. Tylenol, Vyvanse, Melatonin 5mg, Vitamin D etc..." autoFocus={true} style={{color:themeContext.themes === "dark" ? "white" : "black",fontSize:"23px"}} value={dxSearchTerm} onChange={(e)=>setDxSearchTerm(e.target.value)}
                     endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>{
                                setDisplayMedicationQuestions(false)
                                setDxSearchResults([])
                                setSearchingForMeds(true)
                                setDisplayImage(false)
                                setDxPerformSearch(!dxPerformSearch)
                                }}
                            edge="end"
                            style={{outline:"none"}}
                            autoCapitalize={true}
                            focusRipple={true}
                          >
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>}
                        
                    ></Input>
                    </div>}
                        <div style={{display:"flex",flexDirection:"column",maxHeight:"300px",overflow:"scroll"}}>
                        {searchingForMeds ? <CircularProgress style={{justifySelf:"center",alignSelf:"center",margin:"30px", height:"50px",width:"50px"}}/> : <></>}
                        {displayMedicationQuestions ? 
                        <div style={{display:"flex",flexDirection:"column",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white",color:themeContext.themes === "dark" ? "white" : "black", borderRadius:"4px",padding:"10px"}}>
                            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                            <div style={{fontSize:"24px",marginBottom:"3px"}}>{dxSearchResults[selectedMedicationIndex].name}</div>
                            <Button size="medium" onClick={()=>setDisplayMedicationQuestions(false)}>
                                back
                            </Button>
                            </div>
                            <form>
                                <div style={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
                                    <p style={{marginBottom:"0px",fontSize:"18px",color:themeContext.themes === "dark" ? "white" : "cornflowerblue"}}>Patient Insructions:</p>
                                    <TextareaAutosize rowsMax={8} rows={4} rowsMin={4} value={newMedInstructions} onChange={(e)=>setNewMedInstructions(e.target.value)}></TextareaAutosize>
                                </div>
                                <Button size="large" variant="outlined" fullWidth={"true"} style={{marginTop:"5px",justifySelf:"center", alginSelf:"center",outline:"none"}}
                                    onClick={()=>{
                                        console.log("new med riht her ",dxSearchResults[selectedMedicationIndex].name,newMedInstructions)
                                        addMedication(dxSearchResults[selectedMedicationIndex].name,newMedInstructions,dxSearchResults[selectedMedicationIndex].cui)
                                        setDisplayImage(true)
                                        setDxSearchResults([])
                                        setDxSearchTerm("")
                                        setNewMedInstructions("")
                                        setDisplayMedicationQuestions(false)}}>
                                    <AddIcon size={"large"} style={{color:green[600],marginRight:"3px" }}/>
                                        Add Medication
                                </Button>
                            </form>
                        </div>
                        : dxSearchResults.map((dx,index)=>{
                          if (dx.name === "NO RESULTS") return;
                        return(
                            <div onClick={()=>setSelectedMedicationIndex(index)} 
                            style={{transition:"all .4s ease-in-out",transitionProperty:"width",display:"flex",
                            flexDirection:"row", justifyContent:"center", alignItems:"center",cursor:"pointer",color:themeContext.themes === "dark" ? "white" : "black",
                            marginTop:"3px",padding:"4px",borderRadius:"3px",
                            fontSize:"18px",
                            background:themeContext.themes === "dark" ? index === selectedMedicationIndex ? "#999999" : "#343434" : index === selectedMedicationIndex ? "yellowgreen" : "white"}}>
                                <AddIcon onClick={(e)=>setDisplayMedicationQuestions(true)} size="medium" style={{color:index === selectedMedicationIndex ? "white" : "yellowgreen",cursor:"pointer"}}/>
                                {dx.name}
                            </div>
                        )
                        })}
                        </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%"}}>
                    {displayImage ? <img style={{height:"180px",marginTop:"-30px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/medication-drugs-pills-pharmacy-drug-bottles-flat-illustration_102902-333-removebg-preview+(1).png"></img> : ""}
                    </div>
                    </div>
                </div>
        </>
    )
}

export default NewMedicationForm