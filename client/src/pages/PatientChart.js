import React, { useState, useEffect } from 'react';
import {withStyles,makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

function PatientChart(props) {
    const [dxSearchTerm,setDxSearchTerm] = useState("")
    const [dxSearchResults,setDxSearchResults]=useState([]);
    useEffect(()=>{
        const searchDxs= async (searchTerm) => {
            const response = await fetch(`/api/umls/search-term/${searchTerm}`)
            const data = await response.json()
            setDxSearchResults(data.results)
            return;
        }
        if (dxSearchTerm.length > 0) {
            searchDxs(dxSearchTerm)
        }
    },[dxSearchTerm])
    const [schedule,setSchedule] = useState("")
    return (
        <>
            <div style={{margin:"20px"}}>
            <h1>{props.patient.firstName + " " + props.patient.lastName}</h1>
            <LoginTextField placeholder="enter a diagnosis" value={dxSearchTerm} onChange={(e)=>setDxSearchTerm(e.target.value)}></LoginTextField>
            <ul>
                {dxSearchResults.map(dx=>{
                    return(
                        <li>{dx}</li>
                    )
                    })}
            </ul>
            </div>
        </>
    );
}
export default PatientChart;