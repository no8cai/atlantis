//action types
const READ_USERCHATS = 'aichats/READ_USERCHATS'
const READ_AICHATS = 'aichats/READ_AICHATS'
const CREATE_USERCHATS = 'aichats/CREATE_USERCHATS'
const CREATE_AICHATS = 'aichats/CREATE_READ_AICHATS'


//action creators
export const getUserChats = () => ({
    type: READ_USERCHATS,
})


export const createUserChats = (userchat) => ({
    type: CREATE_USERCHATS,
    userchat
})

export const getAiChats = () => ({
    type: READ_AICHATS,
})


export const createAiChats = (Aichat) => ({
    type: CREATE_AICHATS,
    Aichat
})

//thunks

export const fetchAiChat = (question) => async dispatch => {
    const response = await fetch(`/api/aichats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    })
    if(response.ok){
        const answer = await response.json()
        dispatch(createUserChats(question))
        dispatch(createAiChats(answer))
        return answer
    }
    if(response.status>=400) throw response
}


//reducer
const initialState = {userchats:{},aichats:{}}

// const aichatsReducer = (state = initialState, action) => {
//     let newState;
//     switch(action.type){
//         case READ_USERCHATS:
//             newState={...state,userchats:{...state.userchats},aichats:{...state.aichats}}
//             return newState

//         case CREATE_USERCHATS:
//             newState = {...state}
//             for(let index in newState){
//               if(parseInt(newState[index].productId)==parseInt(action.cartitem.productId) && parseInt(newState[index].userId)==parseInt(action.cartitem.userId) ){
//                   delete newState[index]
//                }
//             }
//             newState[action.cartitem.id] = action.cartitem
//             return newState


//         default:
//             return state

//     }
// }

// export default aichatsReducer