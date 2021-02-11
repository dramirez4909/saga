import Cookies from 'js-cookie'

const SET_RECORD = "/currentRecord/SET_RECORD"
const ADD_ORDER = "/currentPatient/ADD_ORDER"
const ADD_MED = "/currentPatient/ADD_MED"
const ADD_PROBLEM = "/currentPatient/ADD_PROBLEM"
const UPDATE_MED = "/currentPatient/UPDATE_MED"
const UPDATE_PROB = "/currentPatient/UPDATE_PROB"
const UPDATE_RECORD = "/currentRecord/UPDATE_RECORD"
const UPDATE_ORDER = ""
const UPDATE_RESOURCE = "currentRecord/UPDATE_RESOURCE"
const CREATE_RESOURCE = "currentRecord/CREATE_RESOURCE"


export const setRecord = (record) => {
    return {
        type:SET_RECORD,
        record
    }
}

export const setCurrentRecord = (record)=> async (dispatch)=> {
    console.log("record from reducer",record)
    if (record.type === "user") {
        const res = await fetch(`/api/users/id/${record.user.id}`)
        const data = await res.json()
        const user = data.user
        user.type="user"
        dispatch(setRecord(user))
    } else if (record.type === "department") {
        console.log("here I am !",record)
        const response = await fetch(`/api/departments/id/${record.department.id}`)
        const dataDept = await response.json()
        console.log("OKAY!",dataDept)
        const department = {...dataDept.department,type:"department"}
        dispatch(setRecord(department))
    }
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
        dispatch(updateRec(data.user))
    } else if (record.type === "department") {
        console.log("department to udpate: ",record)
        const csrfToken = Cookies.get("XSRF-TOKEN")
        const jsonRecord = JSON.stringify(record)
        const res = await fetch(`/api/departments/update/${record.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: jsonRecord
        })
        const data = await res.json()
        const department = data.department
        department.type="department"
        dispatch(updateRec(department))
    }
    else if (record.type === "resource") {
        console.log("department to udpate: ",record)
        const csrfToken = Cookies.get("XSRF-TOKEN")
        const jsonRecord = JSON.stringify(record)
        const res = await fetch(`/api/resources/update/${record.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: jsonRecord
        })
        const data = await res.json()
        const resource = data.resource
        dispatch(updateResource(resource))
    }
}

export const updateResource = (resource) => {
    return {
        type: UPDATE_RESOURCE,
        resource
    }
}

export const updateRec = (record) => {
    return {
        type:UPDATE_RECORD,
        record
    }
}

export const createRecord = (record) => async (dispatch) => {
    if (record.type === "resource") {    
        const csrfToken = Cookies.get("XSRF-TOKEN")
        const jsonRecord = JSON.stringify(record)
        const res = await fetch(`/api/resources/create`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: jsonRecord
        })
        const data = await res.json()
        const resource = data.resource
        dispatch(createResource(resource))
    }
}

export const createResource = (resource) => {
    return {
        type:CREATE_RESOURCE,
        resource
    }
}


export default function currentRecordReducer(state={},action){
    const newState = Object.assign({},state)
    switch (action.type) {
        case SET_RECORD:
            return action.record
        case UPDATE_RECORD:
            return action.record
        case CREATE_RESOURCE:
            const newResourcesList = {...newState.resources}
            newResourcesList[action.resource.id] = action.resource
            newState.resources = newResourcesList
            return newState
        case UPDATE_RESOURCE: 
            const newResources = {...newState.resources}
            newResources[action.resource.id] = action.resource
            newState.resources = newResources
            return newState
        default:
            return state
        }
}