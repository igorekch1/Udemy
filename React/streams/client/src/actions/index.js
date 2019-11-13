import streams from '../apis/streams';
import history from '../history';
import { 
    SIGN_IN, 
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_SINGLE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM  
} from './types';

export const signIn = userId =>({ type: SIGN_IN, payload: userId });

export const signOut = () => ({ type: SIGN_OUT });

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    
    dispatch({ type: FETCH_STREAMS, payload: response.data });
}

export const fetchSingleStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_SINGLE_STREAM, payload: response.data });
}

export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });

    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
}

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
}