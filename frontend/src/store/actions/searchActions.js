import * as types from './types';

export function searchLessons(data){
    return {type: types.SEARCH_LESSONS , data}
}

export function autoCompleteFunc(key){
    return {type: types.AUTOCOMPLETE , key}
}
// export function deleteGroup(id){
//     return {type: types.DELETE_GROUP , id}
// }

// export function updateGroup(data){
//     return {type: types.UPDATE_GROUP , ...data}
// }