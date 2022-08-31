import * as types from '../actions/types';

const initialState = {
    isLoading : false,
    errors : null
}

export default function lessonReducers(state = initialState , action){
    switch(action.type){
        case types.CREATE_LESSON_IN_WEEK:
            return {...state, isLoading : true}
        case types.RECIEVED_NEW_LESSON_IN_WEEK:
            return {...state, isLoading:false}
        case types.FAILURE_CREATE_LESSON_IN_WEEK:
                alert(JSON.stringify(action.errors))
                return {...state, isLoading:false, errors:action.errors}
        default:
            return state
    }
}