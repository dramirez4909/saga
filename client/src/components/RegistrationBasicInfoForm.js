import React, {useState,useContext} from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RegistrationContext from './utils/RegistrationContext';



export default function RegistrationBasicInfoForm() {

    const regContext = useContext(RegistrationContext)

    return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                <TextField size="small" fullWidth value={regContext.firstName} onChange={(e)=>regContext.setFirstName(e.target.value)} style={{margin:"5px"}}id="outlined-basic" label="First Name" variant="outlined" />
                <TextField size="small" fullWidth value={regContext.lastName} onChange={(e)=>regContext.setLastName(e.target.value)}style={{margin:"5px"}}id="outlined-basic" label="Last Name" variant="outlined" />
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-around"}}>

            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <FormLabel >Date Of Birth: </FormLabel>
                <TextField value={regContext.birthday} onChange={(e)=>regContext.setBirthday(e.target.value)} type="date" style={{margin:"10px"}}id="outlined-basic" variant="standard" />
            </div>
            <FormControl component="fieldset">
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <FormLabel component="legend">Gender Identity: </FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={regContext.sex} onChange={(e)=>regContext.setSex(e.target.value)}>
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </div>
                </RadioGroup>
                </div>
            </FormControl>
            </div>
        </div>
    )
}