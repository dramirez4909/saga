import Cookies from 'js-cookie'
import {addOrder} from './current_patient'

const CREATE_ORDER_CURRENT_PATIENT = "/orders/CREATE_ORDER_CURRENT_PATIENT"
const SET_DEPARTMENT_APPOINTMENT_ORDERS = "/orders/SET_DEPARTMENT_ORDERS"
const REMOVE_APPOINTMENT_ORDER = "/orders/REMOVE_APPOINTMENT_ORDER"


export const loadDepartmentOrders = () => async (dispatch) => {
    // const csrfToken = Cookies.get("XSRF-TOKEN");
    // const res = await fetch(`/api/orders/department`)
    // if (res.ok) {
    //     const data = await res.json()
    //     dispatch(setDepartmentOrders(data.orders))
    // }
}

export const createOrder = (order) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const jsonOrder = JSON.stringify(order)
    const res = await fetch('/api/orders/create',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: jsonOrder
    })
    const data = await res.json()
    console.log(data)
    dispatch(makeOrder(data.order))
    dispatch(addOrder(data.order))
}


export const removeAppointmentOrder =(order)=>{
    return {
        type: REMOVE_APPOINTMENT_ORDER,
        order
    }
}


export const makeOrder = (order) => {
    return {
        type:CREATE_ORDER_CURRENT_PATIENT,
        order
    }
}

export const setDepartmentOrders = (orders) => {
    console.log(orders)
    return {
        type:SET_DEPARTMENT_APPOINTMENT_ORDERS,
        orders
    }
}

export default function ordersReducer(state={},action){
    const newState = Object.assign({},state)
    switch (action.type) {
        case CREATE_ORDER_CURRENT_PATIENT:
            console.log("order from reducer: ",action.order)
            return state
        case SET_DEPARTMENT_APPOINTMENT_ORDERS:
            newState["appointment_requests"] = {}
            action.orders.forEach(order=>{
                console.log(order)
                newState["appointment_requests"][order.id] = order
            })
            return newState
        case REMOVE_APPOINTMENT_ORDER:
            const apptRequests = Object.assign({},state.appointment_requests)
            delete apptRequests[action.order.id]
            newState["appointment_requests"] = apptRequests;
            return newState
        default:
            return state
    }
}