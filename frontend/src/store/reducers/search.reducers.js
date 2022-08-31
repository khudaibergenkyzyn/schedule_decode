import { def } from '@vue/shared';
import * as types from '../actions/types';

const initialState = {
    isLoading : false,
    list : [],
    autoCompleteData: {}
}

export default function searchReducers(state = initialState , action){
    switch(action.type){
        case types.SUCCESS_SEARCH_LESSONS:
            return {...state , list : action.payload}
        case types.FAILURE_SEARCH_LESSONS:
            alert('Введутся технические работы. Попробуйте позже')
            return state
        case types.SUCCESS_AUTOCOMPLETE:
            return {...state , autoCompleteData : action.payload}
        case types.FAILURE_AUTOCOMPLETE:
            alert('Введутся технические работы. Попробуйте позже')
            return state
        default:
            return state
    }
}

