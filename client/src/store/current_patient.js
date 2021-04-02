import Cookies from 'js-cookie'

const SET_PATIENT = "/currentPatient/SET_PATIENT"
const ADD_ORDER = "/currentPatient/ADD_ORDER"
const ADD_MED = "/currentPatient/ADD_MED"
const ADD_PROBLEM = "/currentPatient/ADD_PROBLEM"
const UPDATE_MED = "/currentPatient/UPDATE_MED"
const UPDATE_PROB = "/currentPatient/UPDATE_PROB"
const UPDATE_ORDER = "/currentPatient/UPDATE_ORDER"


export const setPatient = (patient) => {
    return {
        type:SET_PATIENT,
        patient
    }
}

export const setCurrentPatient = (patient)=> async (dispatch)=> {
    const res = await fetch(`/api/patients/id/${patient.id}`)
    const data = await res.json()
    console.log(data)
    dispatch(setPatient(data.patient))
}

export const createMedication = (medication) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const jsonMed = JSON.stringify(medication)
    const res = await fetch('/api/medications/create',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: jsonMed
    })
    const data = await res.json()
    console.log(data)
    dispatch(addMedication(data.medication))
}

export const updateMedication = (medication) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const jsonMed = JSON.stringify(medication)
    const res = await fetch('/api/medications/update',{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: jsonMed
    })
    const data = await res.json()
    console.log(data)
    dispatch(updateMed(data.medication))
}

export const updateProblem = (problem) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const jsonMed = JSON.stringify(problem)
    const res = await fetch('/api/problems/update',{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: jsonMed
    })
    const data = await res.json()
    console.log(data)
    dispatch(updateProb(data.problem))
}

export const updateMed = (medication) => {
    return {
        type:UPDATE_MED,
        medication
    }
}

export const updateProb = (problem) => {
    return {
        type:UPDATE_PROB,
        problem
    }
}

export const createProblem = (problem) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const jsonProb = JSON.stringify(problem)
    const res = await fetch('/api/problems/create',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: jsonProb
    })
    const data = await res.json()
    console.log(data)
    dispatch(addProblem(data.problem))
}

export const addMedication = (medication) => {
    return {
        type: ADD_MED,
        medication
    }
}

export const addProblem = (problem) => {
    return {
        type: ADD_PROBLEM,
        problem
    }
}

export const updateVitals = (vitals) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const jsonVitals = JSON.stringify(vitals)
    const res = await fetch(`/api/patients/update-vitals/${vitals.patient_id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: jsonVitals
    })
    const data = await res.json()
    console.log(data)
    dispatch(setPatient(data.patient))
}

export const updatePatientInfo = (info) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const jsonInfo = JSON.stringify(info)
    const res = await fetch(`/api/patients/update-patient/${info.patient_id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: jsonInfo
    })
    const data = await res.json()
    console.log(data)
    dispatch(setPatient(data.patient))
}

export const updateOrder = (order) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const jsonOrd = JSON.stringify(order)
    const res = await fetch('/api/orders/update',{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: jsonOrd
    })
    const data = await res.json()
    console.log(data)
    dispatch(updateOrd(data.order))
}

export const updateOrd = (order) => {
    return {
        type:UPDATE_ORDER,
        order
    }
}

export const addOrder = (order) => {
    return {
        type:ADD_ORDER,
        order
    }
}

export default function currentPatientReducer(state={orders:{},medications:{},problems:{},encounters:[]},action){
    const newState = Object.assign({},state)
    const meds = {...state.medications}
    const probs = {...state.problems}
    const orders = {...state.orders}
    switch (action.type) {
        case SET_PATIENT:
            return action.patient
        case ADD_ORDER:
            newState.orders = orders
            newState.orders[action.order.id] = (action.order)
            return newState
        case ADD_MED:
            newState.medications = meds
            newState.medications[action.medication.id] = action.medication
            return newState
        case UPDATE_MED: 
            newState.medications = meds
            newState.medications[action.medication.id] = action.medication
            return newState
        case ADD_PROBLEM: 
            newState.problems = probs
            newState.problems[action.problem.id] = action.problem
            return newState
        case UPDATE_PROB: 
            newState.problems = probs
            newState.problems[action.problem.id] = action.problem
            return newState
        case UPDATE_ORDER: 
            newState.orders = orders
            newState.orders[action.order.id] = action.order
            return newState
        default:
            return state
    }
}