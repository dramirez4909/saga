import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



export default function RegistrationBasicInfoForm() {

    const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
    return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="First Name" variant="outlined" />
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="Last Name" variant="outlined" />
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-around"}}>

            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <FormLabel >Date Of Birth: </FormLabel>
                <TextField type="date" style={{margin:"10px"}}id="outlined-basic" variant="standard" />
            </div>
            <FormControl component="fieldset">
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <FormLabel component="legend">Gender Identity: </FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </div>
                </RadioGroup>
                </div>
            </FormControl>
            </div>
        <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="Address Line 1" variant="outlined" />
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="Address Line 2" variant="outlined" />
            </div>
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="City" variant="outlined" />
                <TextField fullWidth style={{margin:"10px"}}id="outlined-basic" label="State" variant="outlined" />
            </div>
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"column", width:"100%"}}>
                <TextField type="tel" fullWidth style={{margin:"10px"}}id="outlined-basic" label="Home Phone Number" variant="standard" />
                <TextField type="tel" fullWidth style={{margin:"10px"}}id="outlined-basic" label="Mobile Phone Number" variant="standard" />
                <TextField type="tel" fullWidth style={{margin:"10px"}}id="outlined-basic" label="Work Phone Number" variant="standard" />
                <TextField type="email" fullWidth style={{margin:"10px"}}id="outlined-basic" label="Email" variant="outlined" />
            </div>
        </div>
        </div>
    )
}