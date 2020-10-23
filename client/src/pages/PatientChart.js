import React, { useState, useEffect, useRef } from 'react';
import {withStyles,makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../styles/PatientChart.css'

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
    const [patient,setPatient] = useState(props.patient)
    const form = useRef(null)

    const submit = e => {
    e.preventDefault()
    const data = new FormData(form.current)
    fetch(`/api/patients/upload/${patient.id}`, {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(json => {
          console.log(json)
          setPatient(json.patient)
        })
    }

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

    const submitProfilePicture=(e)=>{
        console.log(e)
    }


    return (
        <>
            <div style={{margin:"20px"}}>
            <h1>{patient.firstName + " " + patient.lastName}</h1>
            <div className={"user-photo"}>
            <div className={"circular--portrait"}>
                <img id="user-photo" src={patient.picture ? patient.picture : "https://saga-health.s3-us-west-1.amazonaws.com/IMG_6788.jpg"}/>
            </div>
            </div>
            <LoginTextField placeholder="enter a diagnosis" value={dxSearchTerm} onChange={(e)=>setDxSearchTerm(e.target.value)}></LoginTextField>
            <ul>
                {dxSearchResults.map(dx=>{
                    return(
                        <li>{dx}</li>
                    )
                    })}
            </ul>
            {/* <form class="upload-form" action='/upload' method="post" encType="multipart/form-data" onSubmit={(e)=>{submitProfilePicture(e)}}>
            </form> */}
            <form ref={form} onSubmit={submit}>
                <input type="file" name="file"></input>
                <input type="submit" name="Sign Up" />
            </form>
            </div>
        </>
    );
}
export default PatientChart;