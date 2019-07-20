import jsonPlaceholder from '../api/jsonplaceholder';
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach((id) => dispatch(fetchUser(id)))
        .value();
}

const fetchPosts = () => async dispatch => {
    const posts = await jsonPlaceholder.get('/posts');
    
    dispatch({ type: "FETCH_POSTS", payload: posts.data });
} 

const fetchUser = id => async dispatch => {
    const user = await jsonPlaceholder.get(`/users/${id}`);
    
    dispatch({ type: "FETCH_USERS", payload: user.data });
}