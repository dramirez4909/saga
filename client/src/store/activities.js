import Cookies from 'js-cookie'

const LOAD_ACTIVITES = 'activities/LOAD_ACTIVITIES'
const OPEN_TAB = 'activities/OPEN_TAB'

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

export const openTab = (activity) => {
    return {
        type: OPEN_TAB,
        activity
    }
}

export default function activitiesReducer(state = {} ,action) {
    let newState = Object.assign({},state);
    switch (action.type){
        case LOAD_ACTIVITES:
            newState = action.activities
            newState["open_tabs"] = [{id:"0",name:"dashboard"}]
            return action.activities
        case OPEN_TAB:
            const openTabs = [...state.open_tabs]
            newState.open_tabs = openTabs
            newState.open_tabs.push(action.activity)
            return newState
        default:
            return state
    }
}