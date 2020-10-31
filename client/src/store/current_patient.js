import Cookies from 'js-cookie'

const SET_PATIENT = "/currentPatient/SET_PATIENT"
const ADD_ORDER = "/currentPatient/ADD_ORDER"
const ADD_MED = "/currentPatient/ADD_MED"
const ADD_PROBLEM = "/currentPatient/ADD_PROBLEM"


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

export const addOrder = (order) => {
    return {
        type:ADD_ORDER,
        order
    }
}

export default function currentPatientReducer(state={},action){
    const newState = Object.assign({},state)
    switch (action.type) {
        case SET_PATIENT:
            return action.patient
        case ADD_ORDER:
            const orders = [...state.orders]
            newState.orders = orders
            newState.orders.push(action.order)
            return newState
        case ADD_MED:
            const meds = [...state.medications]
            newState.medications = meds
            newState.medications.push(action.medication)
            return newState
        case ADD_PROBLEM: 
            const probs = [...state.problems]
            newState.problems = probs
            newState.problems.push(action.problem)
            return newState
        default:
            return state
    }
}