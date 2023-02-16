//action types
const READ_USERORDERITEMS = 'orderitems/READ_USERORDERITEMS'
const CREATE_ORDERITEM = 'orderitems/CREATE_ORDERITEM'
const UPDATE_ORDERITEM = 'orderitems/UPDATE_ORDERITEM'
const DELETE_ORDERITEM = 'orderitems/DELETE_ORDERITEM'
const DELETE_USERORDERITEMS = 'orderitems/DELETE_USERORDERITEMS'
const DELETE_ITEMSBYORDER = 'orderitems/DELETE_ITEMSBYORDER'

//action creators
const getUserOrderitems = ({Orderitems}) => ({
    type: READ_USERORDERITEMS,
    Orderitems
})


const createOrderitem = (orderitem) => ({
    type: CREATE_ORDERITEM,
    orderitem
})

const editOrderitem = (orderitem) => ({
    type: UPDATE_ORDERITEM,
    orderitem
})

export const removeOrderitem = (id) => ({
    type: DELETE_ORDERITEM,
    id
})

export const deleteUserOrderitems = () =>{
    return {
    type: DELETE_USERORDERITEMS,
    };
};
export const removeItemsbyOrder = (id) => ({
    type: DELETE_ITEMSBYORDER,
    id
})


//thunks
export const fetchUserOrderitems = () => async dispatch => {
    const response = await fetch(`/api/orderitems/current`);
    if(response.ok){
        const orderitemsList = await response.json()
        dispatch(getUserOrderitems(orderitemsList))
    }
    if(response.status>=400) throw response
}


export const fetchCreateOrderitem = (orderitem,orderId) => async dispatch => {
    const response = await fetch(`/api/orderdetails/${orderId}/orderitems`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderitem)
    })
    if(response.ok){
        const neworder = await response.json()
        dispatch(createOrderitem(neworder))
        return neworder
    }
    if(response.status>=400) throw response
}

export const fetchUpdateOrderitem = (orderitem) => async dispatch => {
    const response = await fetch(`/api/orderitems/${orderitem.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderitem)
    })
    if(response.ok){
        const editedorderitem = await response.json()
        dispatch(editOrderitem(editedorderitem))
        return editedorderitem
    }
    if(response.status>=400) throw response
}

export const fetchDeleteOrderitem = (id) => async dispatch => {
    const response = await fetch(`/api/orderitems/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(removeOrderitem(id))
        return response
    }
    if(response.status>=400) throw response
}

//reducer
const initialState = {}

const orderitemsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_USERORDERITEMS:
            newState={...state}
            action.Orderitems.forEach(orderitem => {
            newState[orderitem.id] = orderitem
            })
            return newState

        case CREATE_ORDERITEM:
            newState = {...state}
            newState[action.orderitem.id] = action.orderitem
            return newState

        case UPDATE_ORDERITEM:
            newState = {...state}
            newState[action.orderitem.id] = action.orderitem
            return newState

        case DELETE_ORDERITEM:
            newState = {...state}
            delete newState[action.id]
            return newState

        case DELETE_USERORDERITEMS:
            newState = {...state}
            newState = {}
            return newState       

        case DELETE_ITEMSBYORDER:
            newState = {...state}
            for(let index in newState){
                    if(parseInt(newState[index].orderId)==parseInt(action.id)){
                        delete newState[index]
                     }
                }
            return newState

        default:
            return state

    }
}

export default orderitemsReducer