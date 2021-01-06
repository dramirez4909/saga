import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



export default function RegistrationBiometricInfo() {

    const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
    return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="Weight" variant="outlined" />
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="Height" variant="outlined" />
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="BMI" variant="outlined" />
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="Heart Rate" variant="outlined" />
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-around"}}>
            <FormControl component="fieldset">
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <FormControlLabel value="yes" control={<Radio />} label="Smoker" />
                        <FormControlLabel value="no" control={<Radio />} label="Non-Smoker" />
                    </div>
                </RadioGroup>
                </div>
            </FormControl>
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="Occupation" variant="outlined" />
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="Reason for Today's Visit" variant="outlined" />
            </div>
        </div>
    )
}