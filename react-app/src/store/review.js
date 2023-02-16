//action types
const READ_REVIEWS = 'reviews/READ_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

//action creators
const getReviews = ({Reviews}) => ({
    type: READ_REVIEWS,
    Reviews
})


const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const editReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})

const removeReview = (id) => ({
    type: DELETE_REVIEW,
    id
})

//thunks
export const fetchAllReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews`);
    if(response.ok){
        const reviewsList = await response.json()
        dispatch(getReviews(reviewsList))
    }
    if(response.status>=400) throw response
}

export const fetchCreateReview = (review,productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    if(response.ok){
        const newreview = await response.json()
        dispatch(createReview(newreview))
        return newreview
    }
    if(response.status>=400) throw response
}

export const fetchUpdateReview = (review) => async dispatch => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    if(response.ok){
        const editedreview = await response.json()
        dispatch(editReview(editedreview))
        return editedreview
    }
    if(response.status>=400) throw response
}

export const fetchDeleteReview = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(removeReview(id))
        return response
    }
    if(response.status>=400) throw response
}


//reducer
const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_REVIEWS:
            newState={...state}
            action.Reviews.forEach(review => {
            newState[review.id] = review
            })
            return newState

        case CREATE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState

        case UPDATE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState

        case DELETE_REVIEW:
            newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state

    }
}

export default reviewsReducer
