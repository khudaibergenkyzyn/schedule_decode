import { def } from '@vue/shared';
import * as types from '../actions/types';

const initialState = {
    isLoading : false,
    courses : [],
}

export default function coursesReducers(state = initialState , action){
    switch(action.type){
        case types.RECIEVED_GET_COURSES:
            return{...state , courses: action.payload}
        case types.FAILURE_GET_COURSES:
            alert('Введутся технические работы. Попробуйте позже')
            return state
        default:
            return state
    }
}