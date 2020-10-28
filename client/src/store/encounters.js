import Cookies from 'js-cookie'
import {removeAppointmentOrder} from './orders'

const LOAD_ENCOUNTERS = 'encounter/LOAD_ENCOUNTERS'
const ENCOUNTERS_BY_WEEK = 'encounter/ENCOUNTERS_BY_WEEK'
const OPEN_TAB = 'encounter/OPEN_TAB'
const OPEN_CHART = 'encounter/OPEN_CHART'
const ADD_ENCOUNTER = 'encounter/ADD_ENCOUNTER'

export const loadProviderEncounters = (id) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch(`/api/encounters/provider/${id}`)
    if (res.ok) {
        const data = await res.json()
        // dispatch(setEncounters(data.encounters))
    }
}

export const loadDepartmentEncounters = () => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch(`/api/encounters/department`)
    if (res.ok) {
        const data = await res.json()
        dispatch(setEncounters(data.encounters))
    }
}

export const createEncounterFromOrder = (encounterProps,order) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const encounter = {...encounterProps, order}
    const jsonEncounter = JSON.stringify(encounter)
    const res = await fetch('/api/encounterfromorder/create',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: jsonEncounter
    })
    const data = await res.json()
    console.log(data)
    dispatch(removeAppointmentOrder(order))
}

export const createNewEncounter=(encounter)=>async(dispatch)=>{
        console.log(encounter)
        const csrfToken = Cookies.get("XSRF-TOKEN")
        const jsonEncounter = JSON.stringify(encounter)
        const res = await fetch('/api/encounters/create',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: jsonEncounter
        })
        const data = await res.json()
        console.log(data)
    }

export const addEncounter = (encounter) => {
    return {
        type: ADD_ENCOUNTER,
        encounter
    }
}


export const setEncounters = (encounters) => {
    return {
        type: LOAD_ENCOUNTERS,
        encounters
    }
}

// export const openPatientChart = (patientId) => async (dispatch) => {
//     const res = await fetch(`/api/patients/id/${patientId}`)
//     const data = await res.json()
//     console.log(data)
//     dispatch(openChart(data.patient))
// }

const getWeekNumber =(d)=>{
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    const weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
    }

export default function encountersReducer(state = {my_encounters: {}} ,action) {
    let newState = Object.assign({},state);
    switch (action.type){
        case LOAD_ENCOUNTERS:
            action.encounters.forEach(encounter=>{
                newState["my_encounters"][encounter.id] = encounter
            })
            const encsByWeek = {}
            Object.values(action.encounters).forEach((encounter,index)=>{
                    const newEncounterCard = {x:"",y:"",w:1,h:"",i:`${index + 2}`,minW: 1,maxW:1,encounter,patient:encounter.patient,start:"",end:""}
                    const dateStartArr = encounter.start.split(" ")
                    console.log(encounter.start)
                    dateStartArr.pop()
                    const newStartDateNoTZ = dateStartArr.join(" ")
                    const encStartTime = new Date(newStartDateNoTZ)
                    const encounterWeekNumber = getWeekNumber(encStartTime)
                    console.log(encounterWeekNumber)
                    const encWeek = encounterWeekNumber[1]
                    encsByWeek[encWeek] ? encsByWeek[encWeek][encounter.id]=encounter : encsByWeek[encWeek] = {[encounter.id]:encounter}
                })
                console.log(encsByWeek)
            newState["by_week"] = encsByWeek
            return newState
        // case ADD_ENCOUNTER:
        //     const encounterWeeks = Object.assign({},state.by_week)
        //     const newEncounterCard = {x:"",y:"",w:1,h:"",i:`${index + 2}`,minW: 1,maxW:1,encounter,patient:encounter.patient,start:"",end:""}
        //     const dateStartArr = encounter.start.split(" ")
        //     console.log(encounter.start)
        //     dateStartArr.pop()
        //     const newStartDateNoTZ = dateStartArr.join(" ")
        //     const encStartTime = new Date(newStartDateNoTZ)
        //     const encounterWeekNumber = getWeekNumber(encStartTime)
        //     console.log(encounterWeekNumber)
        //     const encWeek = encounterWeekNumber[1]
        //     encsByWeek[encWeek] ? encsByWeek[encWeek][encounter.id]=encounter : encsByWeek[encWeek] = {[encounter.id]:encounter}
        default:
            return state
    }
}