import React, {useState,useContext,useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';



export default function UserEditor(props) {
    const currentRecord = useSelector(state=>state.currentRecord)
    const [loading,setLoading] =useState(true)

    useEffect(()=>{
        if (props.record.user) {
            if (props.record.user.id === currentRecord.id && props.record.type === currentRecord.type) {
                setLoading(false)
              }
        } else if (props.record.department) {
            if (props.record.department.id === currentRecord.id && props.record.type === currentRecord.type) {
                setLoading(false)
              }
        }
    },[currentRecord])

    if (loading) return (
        <CircularProgress/>
    )
    return (
        "hello"
    )

}