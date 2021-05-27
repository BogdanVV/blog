import { Action } from 'redux';
import {
    CLEAR_CURRENT_POST,
    FETCH_POSTS_FAIL,
    FETCH_POSTS_START,
    FETCH_POSTS_SUCCESS,
    SET_CURRENT_POST,
} from '../actions/actionTypes';

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
    currentPost: null,
};

export default function postsReducer(state = initialState, action: any) {
    switch (action.type) {
        case FETCH_POSTS_START:
            return {
                ...state,
                isLoading: true,
            };

        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                posts: action.posts,
            };

        case FETCH_POSTS_FAIL:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };

        case CLEAR_CURRENT_POST:
            return {
                ...state,
                currentPost: null,
            };

        case SET_CURRENT_POST:
            return {
                ...state,
                isLoading: false,
                currentPost: action.post,
            };

        default:
            return state;
    }
}
