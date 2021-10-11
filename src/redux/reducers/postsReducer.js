/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../../constants/actionTypes';


export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            // console.log('action.payload:', action.payload)
            return posts.map((post) => post._id === action.payload.id
            ? action.payload : post); 
        case LIKE: 
            console.log('action.payload:', action.payload)
            return posts.map((post) => post._id === action.payload.id
            ? action.payload.likesCount : post); 
        case DELETE: 
                return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
};