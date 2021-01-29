import React, {useState,useContext,useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import User from '../components/User';
import UserEditor from '../components/UserEditor'


export default function RecordEditor(props) {
    const currentRecord = useSelector(state=>state.currentRecord)
    const [loading,setLoading] =useState(true)

    useEffect(()=>{
        if (props.record.user) {
            if (props.record.user.id === currentRecord.id && props.record.type === currentRecord.type) {
                setLoading(false)
              }
        } else if (props.record.department) {
            console.log("PROPS.RECORD.DEPARTMENT: ",props.record.department)
            console.log("PROPS.RECORD: ",props.record)
            console.log("currentRecord.type: ",currentRecord.type)
            console.log("currentRecord.id: ",currentRecord.id)



            if (props.record.department.id === currentRecord.id && props.record.type === currentRecord.type) {
                setLoading(false)
              }
        }
    },[currentRecord])

    if (loading) return (
        <CircularProgress/>
    )
    return (
        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
            {currentRecord.type === "user" ? <UserEditor user={currentRecord}></UserEditor> : <></>}
            {/* {currentRecord.type === "department" ? <DepartmentEditor department={currentRecord}></DepartmentEditor> : <></>} */}

        </div>
    )

}