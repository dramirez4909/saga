import Cookies from 'js-cookie'

const SET_USER = 'auth/SET_USER'
const REMOVE_USER = 'auth/REMOVE_USER';
const SIGNUP = 'auth/SIGNUP';
const REGISTER_ERRORS = 'auth/REGISTER_ERRORS'
const CLEAR_ERRORS = 'auth/CLEAR_ERRORS'

export const login = (username, password) => async dispatch => {
    if (!username || !password) {
        return
    }
    const csrfToken = Cookies.get("XSRF-TOKEN");
    const res = await fetch('/api/session/', {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && !data["errors"]) {
        dispatch(setUser(data));
        res.data = data
    } else {
        res.errors = data["errors"]
        dispatch(registerErrors(data["errors"]))
    }
    return res;
};

export const setUser = (user) =>{
    return {
        type: SET_USER,
        user
    }
}

export const registerErrors = (errors) => {
    return ({
        type: REGISTER_ERRORS,
        errors
    })
}

export const clearErrors = () => {
    return ({
        type: CLEAR_ERRORS,
    })
}

export const logout = () => async dispatch => {
    const res = await fetch('/api/session/logout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.ok) {
        dispatch(removeUser());
    }

    return res;
}

export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const signup = (username, email, password) => {
    return async (dispatch) => {
        if (!username || !password || !email) {
            return;
        }
        const csrfToken = Cookies.get("XSRF-TOKEN");
        const res = await fetch('/api/session/', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        if (res.ok && !data["errors"]) {
            console.log("data: ",data)
            dispatch(setUser(data['user']));
            res.data = data;
        } else {
            res.errors = data["errors"]
            dispatch(registerErrors(data["errors"]))
        }
        return res;
    };
}

export default function authReducer(state = { user: { id: null } },action) {
    const newState = Object.assign({},state);
    const currentErrors = Object.assign({},state.errors)
    switch (action.type){
        case SET_USER:
            newState.user = action.user
            return newState
        case REMOVE_USER:
            return { user: { id: null } };
        case REGISTER_ERRORS:
            console.log(action.errors)
            newState.errors = currentErrors
            const errorIds = Object.keys(action.errors)
            errorIds.forEach(errorId =>{
                newState.errors[errorId] = action.errors[errorId]
            })
            console.log(newState)
            return newState;
        case CLEAR_ERRORS:
            newState.errors = {}
            return newState
        default:
            return state
    }
}