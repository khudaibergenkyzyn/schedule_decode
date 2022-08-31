import {all} from 'redux-saga/effects';
import { mentorSagas } from './mentorSagas';
import {groupSagas} from './groupSagas';
import { searchSagas } from './searchSagas';
import {roomSagas} from './roomSagas'
import {courseSagas} from './courseSagas'
import {lessonSagas} from './lessonSagas'
export default function* rootSaga(){
    yield all([
        mentorSagas(),
        groupSagas(),
        searchSagas(),
        roomSagas(),
        courseSagas(),
        lessonSagas()
    ])
}