import { combineReducers } from 'redux';
import authRedeucer from './authReducer';
import streamReducer from './streamReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    form: formReducer,
    auth: authRedeucer,
    streams: streamReducer
});