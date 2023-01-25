//action types
const READ_PRODUCTS = 'products/READ_PRODUCTS'
const READ_SINGLE_PRODUCT = 'products/READ_SINGLE_PRODUCT'
const CREATE_PRODUCT = 'products/CREATE_PRODUCT'
const UPDATE_PRODUCT = 'products/UPDATE_PRODUCT'
const DELETE_PRODUCT = 'products/DELETE_PRODUCT'

//action creators
const getAllProducts = ({Products}) => ({
    type: READ_PRODUCTS,
    Products
})

const getOneProduct = (product) => ({
    type: READ_SINGLE_PRODUCT,
    product
}
)

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
})

const editProduct = (product) => ({
    type: UPDATE_PRODUCT,
    product
})

const removeProduct = (id) => ({
    type: DELETE_PRODUCT,
    id
})

//thunks
export const fetchAllProducts = () => async dispatch => {
    const response = await fetch(`/api/products`);
    if(response.ok){
        const productsList = await response.json()
        dispatch(getAllProducts(productsList))
    }
    if(response.status>=400) throw response
}

export const fetchOneProduct = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`)
    if(response.ok){
        const singleProduct = await response.json()
        dispatch(getOneProduct(singleProduct))
    }
    if(response.status>=400) throw response
}

export const fetchCreateProduct = (product) => async dispatch => {
    const response = await fetch(`/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    if(response.ok){
        const newproduct = await response.json()
        dispatch(createProduct(newproduct))
        return newproduct
    }
    if(response.status>=400) throw response
}

export const fetchUpdateProduct = (product) => async dispatch => {
    const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    if(response.ok){
        const editproduct = await response.json()
        dispatch(editProduct(editproduct))
        return editproduct
    }
    if(response.status>=400) throw response
}

export const fetchDeleteProduct = (id) => async dispatch => {
    const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(removeProduct(id))
        return response
    }
    if(response.status>=400) throw response
}

//reducer
const initialState = {}

const productsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_PRODUCTS:
            newState={...state}
            action.Products.forEach(product => {
            newState[product.id] = product
            })
            return newState

        case READ_SINGLE_PRODUCT:
            newState = {...state}
            newState[action.product.id] = action.product
            return newState

        case CREATE_PRODUCT:
            newState = {...state}
            newState[action.product.id] = action.product
            return newState

        case UPDATE_PRODUCT:
            newState = {...state}
            newState[action.product.id] = action.product
            return newState

        case DELETE_PRODUCT:
            newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state

    }
}

export default productsReducer
