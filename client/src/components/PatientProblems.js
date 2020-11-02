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
import {createProblem} from '../store/current_patient'
import PatientMedicationsList from './PatientMedicationsList';
import PatientProblemList from './PatientProblemList';


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
        backgroundColor:"transparent",
        border:"1px solid #ed4959",
        '&:hover': {
            backgroundColor: "#ed4959 !important",
            color:"white",
            border:"1px solid #ed4959",
        },
    },
    }))(Button);

function PatientProblems(props) { 
    console.log(props)
    const context = useContext(HomeContext)
    const dispatch = useDispatch()
    const provider_id = useSelector(state=>state.auth.user.id)
    const [medications,setMedications] = useState([])
    const themeContext = useContext(ThemeContext)
    const [problemSearchTerm,setProblemSearchTerm] = useState("")
    const [problemSearchResults,setProblemSearchResults]=useState([]);
    const [problemPerformSearch,setProblemPerformSearch]=useState(false)
    const [searchingForProblems,setSearchingForProblems]=useState(false)
    const [selectedProblemIndex,setSelectedProblemIndex]=useState()
    const [displayProblemQuestions,setDisplayProblemQuestions] = useState(false)
    const [newProblemInstructions,setNewProblemInstructions] = useState("")

    const addProblem = (problemName) => {
        dispatch(createProblem({problemName,patient:props.patient.id,provider_id}))
    }

    useEffect(()=>{
        const searchProblems= async (searchTerm) => {
            // const response = await fetch(`/api/umls/search-cui/`)
            const response = await fetch(`/api/umls/search-term/mental-health-problems/${searchTerm}`)
            const data = await response.json()
            console.log(data)
            setSearchingForProblems(false)
            setProblemSearchResults(data.results)
            return;
        }
        if (problemSearchTerm.length > 0) {
            searchProblems(problemSearchTerm)
        }
    },[problemPerformSearch])


    return (
        <>
                <div style={{display:"flex",flexDirection:"column",borderRadius:"9px",boxShadow: "rgba(0, 0, 0, 0.09) 0px 1px 2px 0px", width:"fit-content",padding:"8px",marginLeft:"9px",marginRight:"9px"}}>
                    <PatientProblemList patient={{...props.patient}}/>
                    <div style={{display:"flex",flexDirection:"row",padding:"4px",backgroundColor:themeContext.themes === "dark" ? "#444444" : "white", width:"fit-content",transition:"all .4s ease-in-out",transitionProperty:"width"}}>
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{fontSize:"23px",color:themeContext.themes === "dark" ? "antiquewhite" : "grey"}}>add a mental health condition:</div>
                    <LoginTextField placeholder="enter a diagnosis" value={problemSearchTerm} onChange={(e)=>setProblemSearchTerm(e.target.value)}></LoginTextField>
                    <ColorButton onClick={()=>{
                        setDisplayProblemQuestions(false)
                        setProblemSearchResults([])
                        setSearchingForProblems(true)
                        setProblemPerformSearch(!problemPerformSearch)
                        }}
                        style={{background:"transparent"}}
                        ><FindInPageTwoToneIcon style={{marginRight:"4px"}}/>search for mental health condition</ColorButton>
                    </div>
                        <div style={{display:"flex",flexDirection:"column",height:"200px",overflow:"scroll",marginLeft:"10px"}}>
                        {searchingForProblems ? <img src="https://saga-health.s3-us-west-1.amazonaws.com/ezgif.com-gif-maker.gif" style={{height:"140px",marginLeft:"10px"}}></img> : <></>}
                        {displayProblemQuestions ? 
                        <div style={{display:"flex",flexDirection:"column",backgroundColor:themeContext.themes === "dark" ? "#999999" : "white",color:themeContext.themes === "dark" ? "antiquewhite" : "grey",marginLeft:"10px", borderRadius:"4px",padding:"10px"}}>
                            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                            <div style={{fontSize:"20px"}}>{problemSearchResults[selectedProblemIndex]}</div>
                            <Button size="small" onClick={()=>setDisplayProblemQuestions(false)}>
                                back
                            </Button>
                            </div>
                            <form>
                                <div style={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
                                    <p>Insructions:</p>
                                    {/* <input value={newMedInstructions} onChange={(e)=>setNewMedInstructions(e.target.value)}></input> */}
                                </div>
                                <IconButton size="large">
                                    <AddIcon style={{color:"lightgreen"}} onClick={()=>{
                                        setNewProblemInstructions("")
                                        setDisplayProblemQuestions(false)
                                        addProblem(problemSearchResults[selectedProblemIndex],newProblemInstructions)}}/>
                                </IconButton>
                            </form>
                        </div>
                        : problemSearchResults.map((problem,index)=>{
                        return(
                            <div onClick={()=>setSelectedProblemIndex(index)} 
                            style={{transition:"all .4s ease-in-out",transitionProperty:"width",display:"flex",
                            flexDirection:"row", alignItems:"center",cursor:"pointer",color:themeContext.themes === "dark" ? "white" : "black",
                            marginTop:"3px",padding:"4px",borderRadius:"3px",
                            background:themeContext.themes === "dark" ? index === selectedProblemIndex ? "#999999" : "#343434" : index === selectedProblemIndex ? "aliceblue" : "ivory"}}>
                                <IconButton size="small" onClick={(e)=>setDisplayProblemQuestions(true)}>
                                <AddIcon style={{color:themeContext.themes === "dark" ? "goldenrod" : "goldenrod", borderRadius:"3px",margin:"2px",padding:"2px",cursor:"pointer"}}/>
                                </IconButton>
                                {problem}
                            </div>
                        )
                        })}
                        </div>
                    </div>
                </div>
        </>
    );
}

export default PatientProblems;
