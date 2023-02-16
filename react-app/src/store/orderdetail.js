//action types
const READ_USERORDER = 'orders/READ_USERORDERS'
const CREATE_ORDER = 'orders/CREATE_ORDER'
const UPDATE_ORDER = 'orders/UPDATE_ORDER'
const DELETE_ORDER = 'orders/DELETE_ORDER'
const DELETE_USERORDER = 'orders/DELETE_USERORDERS'


//action creators
const getUserOrders = ({Orderdetails}) => ({
    type: READ_USERORDER,
    Orderdetails
})


const createOrder = (order) => ({
    type: CREATE_ORDER,
    order
})

const editOrder = (order) => ({
    type: UPDATE_ORDER,
    order
})

export const removeOrder = (id) => ({
    type: DELETE_ORDER ,
    id
})

export const deleteUserOrder = () =>{
    return {
    type: DELETE_USERORDER,
    };
};

//thunks
export const fetchUserOrders = () => async dispatch => {
    const response = await fetch(`/api/orderdetails/current`);
    if(response.ok){
        const ordersList = await response.json()
        dispatch(getUserOrders(ordersList))
    }
    if(response.status>=400) throw response
}


export const fetchCreateOrder = (order) => async dispatch => {
    const response = await fetch(`/api/orderdetails/current`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    if(response.ok){
        const neworder = await response.json()
        dispatch(createOrder(neworder))
        return neworder
    }
    if(response.status>=400) throw response
}

export const fetchUpdateOrder = (order) => async dispatch => {
    const response = await fetch(`/api/orderdetails/${order.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    if(response.ok){
        const editedorder = await response.json()
        dispatch(editOrder(editedorder))
        return editedorder
    }
    if(response.status>=400) throw response
}

export const fetchDeleteOrder = (id) => async dispatch => {
    const response = await fetch(`/api/orderdetails/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(removeOrder(id))
        return response
    }
    if(response.status>=400) throw response
}


//reducer
const initialState = {}

const ordersReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_USERORDER:
            newState={...state}
            action.Orderdetails.forEach(order => {
            newState[order.id] = order
            })
            return newState

        case CREATE_ORDER:
            newState = {...state}
            newState[action.order.id] = action.order
            return newState

        case UPDATE_ORDER:
            newState = {...state}
            newState[action.order.id] = action.order
            return newState

        case DELETE_ORDER:
            newState = {...state}
            delete newState[action.id]
            return newState

        case DELETE_USERORDER:
            newState = {...state}
            newState = {}
            return newState       

        default:
            return state

    }
}

export default ordersReducer