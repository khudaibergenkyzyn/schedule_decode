import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';

function* creatLesson({data}){
    try{
        const lesson = yield axios.post(`${BASE_URL}/api/lesson-in-week` , data).then(res => res.data);
        yield put({type:types.RECIEVED_NEW_LESSON_IN_WEEK , payload : lesson})
    }catch(e){
        yield put({type: types.FAILURE_CREATE_LESSON_IN_WEEK, errors: e})
    }
}

export function* lessonSagas(){
    yield all([
        yield takeLatest(types.CREATE_LESSON_IN_WEEK , creatLesson),
    ])
}