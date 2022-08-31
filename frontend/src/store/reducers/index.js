import {combineReducers} from 'redux';
import mentorsReducers from './mentor.reducers';
import groupsReducers from './group.reducers'
import searchReducers from './search.reducers';
import roomsReducers from './room.reducer';
import coursesReducers from './course.reducers';
import lessonReducers from './lesson.reducers';
export default combineReducers({
    mentorsReducers,
    groupsReducers,
    searchReducers,
    roomsReducers,
    coursesReducers,
    lessonReducers
})