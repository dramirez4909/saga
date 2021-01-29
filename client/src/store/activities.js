import Cookies from 'js-cookie'

const LOAD_ACTIVITES = 'activities/LOAD_ACTIVITIES'
const OPEN_TAB = 'activities/OPEN_TAB'
const OPEN_CHART = 'activities/OPEN_CHART'
const CLOSE_TAB = 'activities/CLOSE_TAB'
const OPEN_DEPARTMENT_SCHEDULE = 'activities/OPEN_DEPARTMENT_SCHEDULE'
const OPEN_PATIENT_REGISTRATION = 'activities/OPEN_PATIENT_REGISTRATION'
const OPEN_PATIENT_CHECKIN = 'activities/OPEN_PATIENT_CHECKIN'
const OPEN_EDITOR = 'activities/OPEN_EDITOR'
const SET_TABS = 'activities/SET_TABS'

export const closeTab = (tabName,index) => {
    console.log("given index close tab: ",index)
    console.log("given name close tab: ",tabName)
    return {
        type:CLOSE_TAB,
        tabName,
        index
    }
}

export const loadActivities = () => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch('/api/activity/user_activities')
    if (res.ok) {
        const data = await res.json()
        dispatch(loadUserActvities(data))
    }
}

export const loadUserActvities = (activities) => {
    return {
        type: LOAD_ACTIVITES,
        activities
    }
}

export const openPatientChart = (patientId) => async (dispatch) => {
    console.log(patientId)
    const res = await fetch(`/api/patients/id/${patientId}`)
    const data = await res.json()
    console.log(data)
    dispatch(openChart(data.patient))
}

export const reorderTabs = (tabs) =>{
    return {
        type: SET_TABS,
        tabs
    }
}

export const openEditor = (record) => async (dispatch) => {
    console.log("record to look for: ",record)
    if (record.type === "user") {
        const res = await fetch(`/api/users/id/${record.user.id}`)
        const data = await res.json()
        const user = data.user
        const userRecord = {type:"user",user}
        dispatch(openEdit(userRecord))
    } else if (record.type === "department") {
        console.log("here I am ACTIVITY!",record)
        console.log(record.department.id)
        const res = await fetch(`/api/departments/id/${record.department.id}`)
        const data = await res.json()
        console.log(data)
        const department = data.department
        const departmentRecord = {type:"department",department}
        dispatch(openEdit(departmentRecord))
    }
}

export const openPatientRegistration = () => {
    return {
        type: OPEN_PATIENT_REGISTRATION,
    }
}

export const openPatientCheckin = () => {
    return {
        type: OPEN_PATIENT_CHECKIN,
    }
}

// export const openDepartmentSchedule = (departmentId) => async (dispatch) => {
//     const res = await fetch(`/api/orders/department/${departmentId}`)
//     const data = await res.json()
//     console.log(data)
    
//     dispatch(openDepartmentSched(department))
// }

export const openDepartmentSchedule = (department) => {
    return {
        type: OPEN_DEPARTMENT_SCHEDULE,
        department
    }
}

export const openChart=(patient)=>{
    return {
        type:OPEN_CHART,
        patient
    }
}

export const openEdit=(record)=>{
    return {
        type:OPEN_EDITOR,
        record
    }
}

export const openTab = (activity) => {
    return {
        type: OPEN_TAB,
        activity,
    }
}

const newRecordTab = (record) => {
    console.log("record from newTabFunction: ",record)
    switch (record.type){
        case "user":
            return {
                record,
                name:record.user.first_name + " " + record.user.last_name
            }
        case "department":
            return {
                record,
                name:record.department.name + " Settings",
            }
        default:
            return;
    }
}

export default function activitiesReducer(state = {open_tabs:[]} ,action) {
    let newState = Object.assign({},state);
    const opentabs = [...state.open_tabs]
    switch (action.type){
        case SET_TABS:
            newState.open_tabs = action.tabs
            return newState
        case LOAD_ACTIVITES:
            newState = action.activities
            newState["open_tabs"] = [{id:0,name:"dashboard"}]
            return action.activities
        case OPEN_TAB:
            const openTabs = [...state.open_tabs]
            newState.open_tabs = openTabs
            newState.open_tabs.push(action.activity)
            return newState
        case CLOSE_TAB: 
            let tabs = [...state.open_tabs]
            console.log("the index used to delete a tab",action.index)
            tabs.splice(action.index,1)
            console.log("after deletion tabs: ",tabs)
            newState.open_tabs = tabs
            console.log("NEW STTTTAAAAATE BOIII!: ",newState.open_tabs)
            return newState
        case OPEN_CHART:
            const currentTabs = [...state.open_tabs]
            newState.open_tabs = currentTabs
            newState.open_tabs.push({id:5, patient:action.patient, name:action.patient.lastName + ", " + action.patient.firstName})
            return newState
        case OPEN_EDITOR:
            newState.open_tabs = opentabs
            console.log("record from store",action.record)
            newState.open_tabs.push(newRecordTab(action.record))
            return newState
        case OPEN_DEPARTMENT_SCHEDULE:
            newState.open_tabs = opentabs
            newState.open_tabs.push({id:6, department:action.department, name:action.department.name})
            return newState
        case OPEN_PATIENT_REGISTRATION:
            newState.open_tabs = opentabs
            newState.open_tabs.push({id:8, name:"Patient Registration"})
            return newState
        case OPEN_PATIENT_CHECKIN:
            newState.open_tabs = opentabs
            newState.open_tabs.push({id:9, name:"Patient Check-in"})
            return newState
        // case UPDATE_CHART_ORDERS: 
        //     const tabs = [...state.opentabs]
        //     newState.openTabs = tabs
        //     const patient = openTabs.find((patientTab)=>patientTab.name = )
        default:
            return state
    }
}