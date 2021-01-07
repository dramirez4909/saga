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
                <TextField fullWidth value={regContext.firstName} onChange={(e)=>regContext.setFirstName(e.target.value)} style={{margin:"10px"}}id="outlined-basic" label="First Name" variant="outlined" />
                <TextField fullWidth value={regContext.lastName} onChange={(e)=>regContext.setLastName(e.target.value)}style={{margin:"10px"}}id="outlined-basic" label="Last Name" variant="outlined" />
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
        <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                <TextField fullWidth value={regContext.addressLineOne} onChange={(e)=>regContext.setAddressLineOne(e.target.value)} style={{margin:"10px"}}id="outlined-basic" label="Address Line 1" variant="outlined" />
                <TextField fullWidth value={regContext.addressLineTwo} onChange={(e)=>regContext.setAddressLineTwo(e.target.value)} style={{margin:"10px"}}id="outlined-basic" label="Address Line 2" variant="outlined" />
            </div>
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                <TextField fullWidth value={regContext.addressCity} onChange={(e)=>regContext.setAddressCity(e.target.value)} style={{margin:"10px"}}id="outlined-basic" label="City" variant="outlined" />
                <TextField fullWidth value={regContext.addressState} onChange={(e)=>regContext.setAddressState(e.target.value)} style={{margin:"10px"}}id="outlined-basic" label="State" variant="outlined" />
                <TextField fullWidth value={regContext.addressZip} onChange={(e)=>regContext.setAddressZip(e.target.value)} style={{margin:"10px"}}id="outlined-basic" label="Zip Code" variant="outlined" />
            </div>
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"column", width:"100%"}}>
                <TextField type="tel" value={regContext.homePhone} onChange={(e)=>regContext.setHomePhone(e.target.value)} fullWidth style={{margin:"10px"}}id="outlined-basic" label="Home Phone Number" variant="standard" />
                <TextField type="tel" value={regContext.mobilePhone} onChange={(e)=>regContext.setMobilePhone(e.target.value)} fullWidth style={{margin:"10px"}}id="outlined-basic" label="Mobile Phone Number" variant="standard" />
                <TextField type="tel" value={regContext.workPhone} onChange={(e)=>regContext.setWorkPhone(e.target.value)} fullWidth style={{margin:"10px"}}id="outlined-basic" label="Work Phone Number" variant="standard" />
                <TextField type="email" value={regContext.email} onChange={(e)=>regContext.setEmail(e.target.value)} fullWidth style={{margin:"10px"}}id="outlined-basic" label="Email" variant="outlined" />
            </div>
        </div>
        </div>
    )
}