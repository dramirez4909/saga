import Cookies from 'js-cookie'

const SET_RECORD = "/currentRecord/SET_RECORD"
const ADD_ORDER = "/currentPatient/ADD_ORDER"
const ADD_MED = "/currentPatient/ADD_MED"
const ADD_PROBLEM = "/currentPatient/ADD_PROBLEM"
const UPDATE_MED = "/currentPatient/UPDATE_MED"
const UPDATE_PROB = "/currentPatient/UPDATE_PROB"
const UPDATE_RECORD = "/currentRecord/UPDATE_RECORD"
const UPDATE_ORDER = ""


export const setRecord = (record) => {
    return {
        type:SET_RECORD,
        record
    }
}

export const setCurrentRecord = (record)=> async (dispatch)=> {
    console.log("record from reducer",record.user.id)
    if (record.type === "user") {
        const res = await fetch(`/api/users/id/${record.user.id}`)
        const data = await res.json()
        const user = data.user
        user.type="user"
        dispatch(setRecord(user))
    } else if (record.type === "department") {
        const res = await fetch(`/api/department/id/${record.department.id}`)
        const data = await res.json()
        console.log(data)
        const department = data.department
        department.type = "department"
        dispatch(setRecord(department))
    }
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

export const updateRecord = (record) => async (dispatch) => {
    if (record.type === "user") {    
        const csrfToken = Cookies.get("XSRF-TOKEN")
        const jsonRecord = JSON.stringify(record)
        const res = await fetch(`/api/users/update/${record.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: jsonRecord
        })
        const data = await res.json()
        const user = data.user
        user.type="user"
        dispatch(updateRec(data.user))}
}

export const updateRec = (record) => {
    return {
        type:UPDATE_RECORD,
        record
    }
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

export default function currentRecordReducer(state={},action){
    const newState = Object.assign({},state)
    switch (action.type) {
        case SET_RECORD:
            return action.record
        case UPDATE_RECORD:
            return action.record
        default:
            return state
    }
}