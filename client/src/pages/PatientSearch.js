import React, { useContext, useEffect, useState } from 'react';
import {withStyles,makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PatientPreviewCard from '../components/PatientPreviewCard'
import PatientSearchContext from '../components/utils/PatientSearchContext';
import PatientSearchResults from '../components/PatientSearchResults';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ThemeContext from '../components/utils/ThemeContext';


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

const resultStyle = {
    display:"flex",
    cursor: "pointer",
    margin: "4px",
    background:"white",
    fontSize:"14px",
    '&:hover': {
        backgroundColor: "#abc4ff",
    }
}

function PatientSearch(props) {
    const [patientSearchTerm,setPatientSearchTerm] = useState("")
    const [patientSearchResults,setPatientSearchResults]=useState([])
    const [selectedPatient,setSelectedPatient] = useState({})
    const [selectedIndex, setSelectedIndex] = useState();
    const themeContext = useContext(ThemeContext)

    useEffect(()=>{
        const searchPatients= async (searchTerm) => {
            const response = await fetch(`/api/patients/search/${searchTerm}`)
            const data = await response.json()
            setPatientSearchResults(data.patients)
            return;
        }
        if (patientSearchTerm.length > 0) {
            searchPatients(patientSearchTerm)

        }
    },[patientSearchTerm])

    return (
        <>  
            
            <div style={{display:"flex",flexDirection:"row", margin:"20px"}}>
                <div style={{display:"flex",flexDirection:"column",width:"50%"}}>
                    <h1 style={{color: themeContext.themes === "dark" ? "white" : "black"}}>Patient Search</h1>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <LoginTextField  placeholder="enter a patient's name, id, or mrn" value={patientSearchTerm} onChange={(e)=>setPatientSearchTerm(e.target.value)}></LoginTextField>
                        <div style={{background: themeContext.themes === "dark" ? "#444444" : "white"}}>
                            {patientSearchResults.length ? <PatientSearchResults patientSearchResults={patientSearchResults}/> : <></>}
                        </div>
                    </div>
                </div>
                <div>
                    {!selectedPatient.firstName ? "" : <PatientPreviewCard patient={selectedPatient}/>}
                </div>
            </div>
        </>
    );
}
export default PatientSearch;