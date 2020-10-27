import Cookies from 'js-cookie'

const SET_PATIENT = "/currentPatient/SET_PATIENT"
const ADD_ORDER = "/currentPatient/ADD_ORDER"


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
        default:
            return state
    }
}