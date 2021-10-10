import * as api from '../../api';
// import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';


export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.log(error.message)
    }

};

export const createPost = (post) => async (dispatch) => {
    console.log('post:', post)
    try {
        const { data } = await api.createPost(post);
        console.log('data:', data)

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
};