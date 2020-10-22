import Cookies from 'js-cookie'

const LOAD_ENCOUNTERS = 'encounter/LOAD_ENCOUNTERS'
const ENCOUNTERS_BY_WEEK = 'encounter/ENCOUNTERS_BY_WEEK'
const OPEN_TAB = 'encounter/OPEN_TAB'
const OPEN_CHART = 'encounter/OPEN_CHART'

export const loadProviderEncounters = (id) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch(`/api/encounters/provider/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(setProviderEncounters(data.encounters))
    }
}

export const loadProviderEncountersByWeek = (id) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch(`/api/encounters/provider/${id}/weeks`)
    if (res.ok) {
        const data = await res.json()
        dispatch(setProviderEncountersByWeek(data.weeks))
    }
}

export const setProviderEncountersByWeek = (weeks) => {
    return {
        type: ENCOUNTERS_BY_WEEK,
        weeks
    }
}


export const setProviderEncounters = (encounters) => {
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
        case ENCOUNTERS_BY_WEEK:
            console.log(action.weeks)
        default:
            return state
    }
}