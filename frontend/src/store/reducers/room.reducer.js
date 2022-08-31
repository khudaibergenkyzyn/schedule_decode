import * as types from '../actions/types';

const initialState = {
    isLoading : false,
    rooms : [],
}

export default function roomsReducers(state = initialState , action){
    switch(action.type){
        case types.RECIEVED_GET_ROOMS:
            return{...state , rooms: action.payload}
        case types.FAILURE_GET_ROOMS:
            alert('Введутся технические работы. Попробуйте позже')
            return state
        default:
            return state
    }
}