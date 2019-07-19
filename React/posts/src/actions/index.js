import jsonPlaceholder from '../api/jsonplaceholder';

export const fetchPosts = () => async dispatch => {

    const posts = await jsonPlaceholder.get('/posts');
    
    dispatch({ type: "FETCH_POSTS", payload: posts });
} 