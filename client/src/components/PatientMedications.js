import React, { useContext,useState, useEffect } from 'react';
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Grid, Container, Card, InputBase, TextField } from '@material-ui/core';
import ThemeContext from './utils/ThemeContext';
import FindInPageTwoToneIcon from '@material-ui/icons/FindInPageTwoTone';
import AddIcon from '@material-ui/icons/AddCircleTwoTone';
import IconButton from '@material-ui/core/IconButton';
import {createMedication} from '../store/current_patient'


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

const SelectMedButton = withStyles((theme) => ({
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

function PatientMedications(props) { 
    console.log(props)
    const context = useContext(HomeContext)
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

    const addMedication = (medicationName,instructions) => {
        dispatch(createMedication({medicationName,instructions,patient:props.patient.id,provider_id}))
    }

    useEffect(()=>{
        const searchDxs= async (searchTerm) => {
            const response = await fetch(`/api/umls/search-term/${searchTerm}`)
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
                <div style={{display:"flex",flexDirection:"column",borderRadius:"9px",boxShadow: "rgba(0, 0, 0, 0.09) 0px 1px 2px 0px", width:"fit-content",padding:"8px",marginLeft:"9px",marginRight:"9px"}}>
                    <div style={{display:"flex",flexDirection:"row",padding:"4px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white", width:"fit-content",transition:"all .4s ease-in-out",transitionProperty:"width"}}>
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{fontSize:"23px",color:themeContext.themes === "dark" ? "antiquewhite" : "grey"}}>add a medication:</div>
                    <LoginTextField placeholder="enter a diagnosis" value={dxSearchTerm} onChange={(e)=>setDxSearchTerm(e.target.value)}></LoginTextField>
                    <ColorButton onClick={()=>{
                        setDisplayMedicationQuestions(false)
                        setDxSearchResults([])
                        setSearchingForMeds(true)
                        setDxPerformSearch(!dxPerformSearch)
                        }}><FindInPageTwoToneIcon style={{marginRight:"4px"}}/> search for med</ColorButton>
                    </div>
                        <div style={{display:"flex",flexDirection:"column",height:"200px",overflow:"scroll",marginLeft:"10px"}}>
                        {searchingForMeds ? <img src="https://saga-health.s3-us-west-1.amazonaws.com/ezgif.com-gif-maker.gif" style={{height:"140px",marginLeft:"10px"}}></img> : <></>}
                        {displayMedicationQuestions ? 
                        <div style={{display:"flex",flexDirection:"column",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white",color:themeContext.themes === "dark" ? "antiquewhite" : "grey",marginLeft:"10px", borderRadius:"4px",padding:"10px"}}>
                            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                            <div style={{fontSize:"20px"}}>{dxSearchResults[selectedMedicationIndex]}</div>
                            <Button size="small" onClick={()=>setDisplayMedicationQuestions(false)}>
                                back
                            </Button>
                            </div>
                            <form>
                                <div style={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
                                    <p>Insructions:</p>
                                    <input value={newMedInstructions} onChange={(e)=>setNewMedInstructions(e.target.value)}></input>
                                </div>
                                <IconButton size="large">
                                    <AddIcon style={{color:"lightgreen"}} onClick={()=>{addMedication(dxSearchResults[selectedMedicationIndex],newMedInstructions)}}/>
                                </IconButton>
                            </form>
                        </div>
                        : dxSearchResults.map((dx,index)=>{
                        return(
                            <div onClick={()=>setSelectedMedicationIndex(index)} 
                            style={{transition:"all .4s ease-in-out",transitionProperty:"width",display:"flex",
                            flexDirection:"row", alignItems:"center",cursor:"pointer",color:themeContext.themes === "dark" ? "white" : "black",
                            marginTop:"3px",padding:"4px",borderRadius:"3px",
                            background:themeContext.themes === "dark" ? index === selectedMedicationIndex ? "#999999" : "#343434" : index === selectedMedicationIndex ? "aliceblue" : "ivory"}}>
                                <IconButton size="small" onClick={(e)=>setDisplayMedicationQuestions(true)}>
                                <AddIcon style={{color:themeContext.themes === "dark" ? "goldenrod" : "goldenrod", borderRadius:"3px",margin:"2px",padding:"2px",cursor:"pointer"}}/>
                                </IconButton>
                                {dx}
                            </div>
                        )
                        })}
                        </div>
                    </div>
                </div>
        </>
    );
}

export default PatientMedications;
