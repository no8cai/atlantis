//action types
const READ_USERCARTITEMS = 'cartitems/READ_USERCARTITEMS'
const CREATE_CARTITEM = 'cartitems/CREATE_CARTITEM'
const UPDATE_CARTITEM = 'cartitems/UPDATE_CARTITEM'
const DELETE_CARTITEM = 'cartitems/DELETE_CARTITEM'


//action creators
const getUserCartItems = ({Cartitems}) => ({
    type: READ_USERCARTITEMS,
    Cartitems
})


const createCartItem = (cartitem) => ({
    type: CREATE_CARTITEM,
    cartitem
})

const editCartItem = (cartitem) => ({
    type: UPDATE_CARTITEM,
    cartitem
})

const removeCartItem = (id) => ({
    type: DELETE_CARTITEM ,
    id
})


//thunks
export const fetchUserCartItems = () => async dispatch => {
    const response = await fetch(`/api/cartitems/current`);
    if(response.ok){
        const productsList = await response.json()
        dispatch(getUserCartItems(productsList))
    }
    if(response.status>=400) throw response
}


export const fetchCreateCartItem = (cartitem,productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}/cartitems`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartitem)
    })
    if(response.ok){
        const newcartitem = await response.json()
        dispatch(createCartItem(newcartitem))
        return newcartitem
    }
    if(response.status>=400) throw response
}

export const fetchUpdateCartItem = (cartitem) => async dispatch => {
    const response = await fetch(`/api/cartitems/${cartitem.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartitem)
    })
    if(response.ok){
        const editcartitem = await response.json()
        dispatch(editCartItem(editcartitem))
        return editcartitem
    }
    if(response.status>=400) throw response
}

export const fetchDeleteCartItem = (id) => async dispatch => {
    const response = await fetch(`/api/cartitems/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(removeCartItem(id))
        return response
    }
    if(response.status>=400) throw response
}

//reducer
const initialState = {}

const cartitemsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_USERCARTITEMS:
            newState={...state}
            action.Cartitems.forEach(cartitem => {
            newState[cartitem.id] = cartitem
            })
            return newState

        case CREATE_CARTITEM:
            newState = {...state}
            newState[action.cartitem.id] = action.cartitem
            return newState

        case UPDATE_CARTITEM:
            newState = {...state}
            newState[action.cartitem.id] = action.cartitem
            return newState

        case DELETE_CARTITEM:
            newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state

    }
}

export default cartitemsReducer
