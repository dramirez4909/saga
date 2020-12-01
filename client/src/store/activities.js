import Cookies from 'js-cookie'

const LOAD_ACTIVITES = 'activities/LOAD_ACTIVITIES'
const OPEN_TAB = 'activities/OPEN_TAB'
const OPEN_CHART = 'activities/OPEN_CHART'
const CLOSE_TAB = 'activities/CLOSE_TAB'
const OPEN_DEPARTMENT_SCHEDULE = 'activities/OPEN_DEPARTMENT_SCHEDULE'

export const closeTab = (tabName,index) => {
    console.log("given index close tab: ",index)
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
    const res = await fetch(`/api/patients/id/${patientId}`)
    const data = await res.json()
    console.log(data)
    dispatch(openChart(data.patient))
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

export const openTab = (activity) => {
    return {
        type: OPEN_TAB,
        activity,
    }
}

export default function activitiesReducer(state = {} ,action) {
    let newState = Object.assign({},state);
    switch (action.type){
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
            return newState
        case OPEN_CHART:
            const currentTabs = [...state.open_tabs]
            newState.open_tabs = currentTabs
            newState.open_tabs.push({id:5, patient:action.patient, name:action.patient.lastName + ", " + action.patient.firstName})
            return newState
        case OPEN_DEPARTMENT_SCHEDULE:
            const opentabs = [...state.open_tabs]
            newState.open_tabs = opentabs
            newState.open_tabs.push({id:6, department:action.department, name:action.department.name})
            return newState
        // case UPDATE_CHART_ORDERS: 
        //     const tabs = [...state.opentabs]
        //     newState.openTabs = tabs
        //     const patient = openTabs.find((patientTab)=>patientTab.name = )
        default:
            return state
    }
}