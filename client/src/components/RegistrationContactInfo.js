import React, {useState,useContext} from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RegistrationContext from './utils/RegistrationContext';

export default function RegistrationContactInfo() {

    const regContext = useContext(RegistrationContext)

    return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                <TextField size="small" fullWidth value={regContext.addressLineOne} onChange={(e)=>regContext.setAddressLineOne(e.target.value)} style={{margin:"5px"}}id="outlined-basic" label="Address Line 1" variant="outlined" />
                <TextField size="small" fullWidth value={regContext.addressLineTwo} onChange={(e)=>regContext.setAddressLineTwo(e.target.value)} style={{margin:"5px"}}id="outlined-basic" label="Address Line 2" variant="outlined" />
            </div>
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                <TextField size="small" fullWidth value={regContext.addressCity} onChange={(e)=>regContext.setAddressCity(e.target.value)} style={{margin:"5px"}}id="outlined-basic" label="City" variant="outlined" />
                <TextField size="small" fullWidth value={regContext.addressState} onChange={(e)=>regContext.setAddressState(e.target.value)} style={{margin:"5px"}}id="outlined-basic" label="State" variant="outlined" />
                <TextField size="small" fullWidth value={regContext.addressZip} onChange={(e)=>regContext.setAddressZip(e.target.value)} style={{margin:"5px"}}id="outlined-basic" label="Zip Code" variant="outlined" />
            </div>
        </div>
        <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"column", width:"100%"}}>
                <TextField size="small" type="tel" value={regContext.homePhone} onChange={(e)=>regContext.setHomePhone(e.target.value)} fullWidth style={{margin:"5px"}}id="outlined-basic" label="Home Phone Number" variant="standard" />
                <TextField size="small" type="tel" value={regContext.mobilePhone} onChange={(e)=>regContext.setMobilePhone(e.target.value)} fullWidth style={{margin:"5px"}}id="outlined-basic" label="Mobile Phone Number" variant="standard" />
                <TextField size="small" type="tel" value={regContext.workPhone} onChange={(e)=>regContext.setWorkPhone(e.target.value)} fullWidth style={{margin:"5px"}}id="outlined-basic" label="Work Phone Number" variant="standard" />
                <TextField size="small" type="email" value={regContext.email} onChange={(e)=>regContext.setEmail(e.target.value)} fullWidth style={{margin:"5px"}}id="outlined-basic" label="Email" variant="outlined" />
            </div>
        </div>
        </div>
    )
}